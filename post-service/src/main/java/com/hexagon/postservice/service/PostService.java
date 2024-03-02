package com.hexagon.postservice.service;

import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.postservice.dto.PostResponse;
import com.hexagon.postservice.entity.Post;
import com.hexagon.postservice.repository.PostRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PostService {
  private static final Logger logger = LogManager.getLogger(PostService.class.getName());

  @Autowired private PostRepository postRepository;

  @Autowired private RestTemplate restTemplate;

  private static final String authServiceUrl = "http://AUTH-SERVICE/auth/user";

  public PostResponse addPost(Post post, String token) {
    String link = authServiceUrl + "?token=" + token;
    UserResponse user = restTemplate.getForObject(link, UserResponse.class);
    post.setUserId(user.getId());
    return new PostResponse(postRepository.save(post), user);
  }

  public List<PostResponse> getPosts() {
    List<Post> posts = postRepository.findAll();
    logger.info(posts);
    return posts.stream().map(this::getPostResponse).collect(Collectors.toList());
  }

  public Optional<PostResponse> getPostById(int id) {
    return postRepository.findById(id).map(this::getPostResponse);
  }

  private PostResponse getPostResponse(Post post) {
    logger.info(post);
    UserResponse author =
        restTemplate.getForObject(authServiceUrl + "/" + post.getUserId(), UserResponse.class);
    return new PostResponse(post, author);
  }
}
