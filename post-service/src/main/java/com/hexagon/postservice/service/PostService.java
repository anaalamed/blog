package com.hexagon.postservice.service;

import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.postservice.dto.PostResponse;
import com.hexagon.postservice.entity.Post;
import com.hexagon.postservice.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private RestTemplate restTemplate;

    public Post addPost(Post post){
        return postRepository.save(post);
    }
    public List<Post> getPosts(){
        return postRepository.findAll();
    }

    public ResponseEntity<?> getPostById(int id){
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            UserResponse author = restTemplate.getForObject("http://AUTH-SERVICE/user/" + post.get().getUserId(), UserResponse.class);
            PostResponse postResponse = new PostResponse(post.get().getId(), post.get().getTitle(), post.get().getContent(), post.get().getCreationTime(), author);
            return new ResponseEntity<>(postResponse, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("No Post Found",HttpStatus.NOT_FOUND);
        }
    }
}
