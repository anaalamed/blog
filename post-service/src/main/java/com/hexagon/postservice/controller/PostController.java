package com.hexagon.postservice.controller;

import com.hexagon.postservice.dto.PostResponse;
import com.hexagon.postservice.entity.Post;
import com.hexagon.postservice.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RequestMapping(value = "/post")
@RestController
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping
    public PostResponse addPost(@RequestBody Post post) {
        return postService.addPost(post);
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
