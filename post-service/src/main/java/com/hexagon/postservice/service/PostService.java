package com.hexagon.postservice.service;

import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.postservice.dto.PostResponse;
import com.hexagon.postservice.entity.Post;
import com.hexagon.postservice.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private RestTemplate restTemplate;

    private static final String authServiceUrl = "http://AUTH-SERVICE/user/";

    public PostResponse addPost(Post post) {
        return getPostResponse(postRepository.save(post));
    }

    public List<PostResponse> getPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(this::getPostResponse).collect(Collectors.toList());
    }

    public Optional<PostResponse> getPostById(int id) {
        return postRepository.findById(id).map(this::getPostResponse);
    }

    private PostResponse getPostResponse(Post post) {
        UserResponse author = restTemplate.getForObject(authServiceUrl + post.getUserId(), UserResponse.class);
        return new PostResponse(post, author);
    }
}
