package com.hexagon.postservice.controller;

import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.postservice.dto.PostRequest;
import com.hexagon.postservice.dto.PostResponse;
import com.hexagon.postservice.entity.Post;
import com.hexagon.postservice.service.PostService;
import java.util.List;
import java.util.Optional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin("*")
@RequestMapping(value = "/post")
@RestController
public class PostController {
  private static final Logger logger = LogManager.getLogger(PostController.class.getName());

  @Autowired private PostService postService;

  @Autowired private RestTemplate restTemplate;

  private static final String authServiceUrl = "http://AUTH-SERVICE/auth/user";

  @PostMapping("/addPost")
  public PostResponse addPost(@RequestBody PostRequest postRequest, @RequestHeader String token) {
    String getAuthorReqUrl = authServiceUrl + "?token=" + token;
    UserResponse author = restTemplate.getForObject(getAuthorReqUrl, UserResponse.class);
    Post post = new Post(postRequest, author.getId());

    return getPostResponse(postService.addPost(post));
  }

  @GetMapping
  public List<PostResponse> getPosts() {
    return postService.getPosts().stream().map(this::getPostResponse).toList();
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getPostById(@PathVariable int id) {
    Optional<PostResponse> postResponse = postService.getPostById(id).map(this::getPostResponse);
    return ResponseEntity.of(postResponse);
  }

  private UserResponse getPostAuthor(Post post) {
    return restTemplate.getForObject(authServiceUrl + "/" + post.getUserId(), UserResponse.class);
  }

  private PostResponse getPostResponse(Post post) {
    return new PostResponse(post, getPostAuthor(post));
  }
}
