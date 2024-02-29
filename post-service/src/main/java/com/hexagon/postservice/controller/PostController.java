package com.hexagon.postservice.controller;

import com.hexagon.postservice.entity.Post;
import com.hexagon.postservice.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequestMapping(value = "/post")
@RestController
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping
    public Post addPost(@RequestBody Post post){
        return postService.addPost(post);
    }

    @GetMapping
    public List<Post> getPosts(){
        return  postService.getPosts();
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable int id){
        return postService.getPostById(id);
    }
}
