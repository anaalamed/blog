package com.hexagon.postservice.controller;

import com.hexagon.common.TokenUtils;
import com.hexagon.common.UserResponseCache;
import com.hexagon.postservice.dto.PostRequest;
import com.hexagon.postservice.dto.PostResponse;
import com.hexagon.postservice.entity.Post;
import com.hexagon.postservice.service.PostService;
import java.nio.file.AccessDeniedException;
import java.util.Optional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RequestMapping(value = "/post")
@RestController
public class PostController {
  private static final Logger logger = LogManager.getLogger(PostController.class.getName());

  private final RestTemplate restTemplate;

  private final UserResponseCache userResponseCache;

  private final PostService postService;

  @Autowired
  public PostController(PostService postService, RestTemplate restTemplate) {
    this.postService = postService;
    this.restTemplate = restTemplate;
    this.userResponseCache = new UserResponseCache(restTemplate);
  }

  @PostMapping("/addPost")
  public ResponseEntity<?> addPost(
      @RequestBody PostRequest postRequest, @RequestHeader String token) {
    Optional<Integer> authorId = TokenUtils.getUserIdFromToken(restTemplate, token);

    if (authorId.isEmpty()) {
      logger.info("User is not authorized");
      return ResponseEntity.badRequest().body("User is not authorized");
    }

    return ResponseEntity.ok(getPostResponse(postService.addPost(postRequest, authorId.get())));
  }

  @PutMapping("/editPost/{postId}")
  public ResponseEntity<?> editPost(
      @RequestBody PostRequest postRequest, @RequestHeader String token, @PathVariable int postId) {
    Optional<Integer> authorId = TokenUtils.getUserIdFromToken(restTemplate, token);

    if (authorId.isEmpty()) {
      logger.info("User is not authorized");
      return ResponseEntity.badRequest().body("User is not authorized");
    }

    try {
      PostResponse postResponse =
          getPostResponse(postService.editPost(postId, postRequest, authorId.get()));
      return ResponseEntity.ok(postResponse);
    } catch (AccessDeniedException e) {
      return ResponseEntity.badRequest().body(e);
    }
  }

  @GetMapping
  public ResponseEntity<?> getPosts() {
    return ResponseEntity.ok(postService.getPosts().stream().map(this::getPostResponse).toList());
  }

  @RequestMapping(method = RequestMethod.GET, path = "/user")
  public ResponseEntity<?> getPostsByUserId(@RequestParam(value = "userId") int userId) {
    return ResponseEntity.ok(
        postService.getPostsByUserId(userId).stream().map(this::getPostResponse).toList());
  }

  @RequestMapping(method = RequestMethod.GET, path = "/search")
  public ResponseEntity<?> getPostsByTitleOrContentContaining(
      @RequestParam(value = "q") String value) {
    return ResponseEntity.ok(
        postService.getPostsByTitleOrContentContaining(value).stream()
            .map(this::getPostResponse)
            .toList());
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getPostById(@PathVariable int id) {
    Optional<PostResponse> postResponse = postService.getPostById(id).map(this::getPostResponse);
    return ResponseEntity.of(postResponse);
  }

  private PostResponse getPostResponse(Post post) {
    return new PostResponse(post, userResponseCache.getUserResponse(post.getUserId()));
  }
}
