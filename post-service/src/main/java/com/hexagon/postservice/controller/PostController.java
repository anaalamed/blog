package com.hexagon.postservice.controller;

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

@CrossOrigin("*")
@RequestMapping(value = "/post")
@RestController
public class PostController {
  private static final Logger logger = LogManager.getLogger(PostController.class.getName());

  @Autowired private PostService postService;

  @PostMapping("/addPost")
  public PostResponse addPost(@RequestBody Post post, @RequestHeader String token) {
    logger.info(token);
    return postService.addPost(post, token);
  }

  @GetMapping
  public List<PostResponse> getPosts() {
    return postService.getPosts();
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getPostById(@PathVariable int id) {
    Optional<PostResponse> postResponse = postService.getPostById(id);

    if (postResponse.isPresent()) {
      return ResponseEntity.ok(postResponse.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
