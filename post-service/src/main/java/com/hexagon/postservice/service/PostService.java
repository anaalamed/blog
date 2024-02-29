package com.hexagon.postservice.service;

import com.hexagon.postservice.entity.Post;
import com.hexagon.postservice.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Post addPost(Post post){
        return postRepository.save(post);
    }
    public List<Post> getPosts(){
        return postRepository.findAll();
    }
    public Post getPostById(int id){
        return postRepository.findById(id).orElse(null);
    }
}
