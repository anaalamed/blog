package com.hexagon.postservice.service;

import com.hexagon.postservice.entity.Post;
import com.hexagon.postservice.repository.PostRepository;
import java.util.List;
import java.util.Optional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {
  private static final Logger logger = LogManager.getLogger(PostService.class.getName());

  @Autowired private PostRepository postRepository;

  public Post addPost(Post post) {
    return postRepository.save(post);
  }

  public List<Post> getPosts() {
    return postRepository.findAll();
  }

  public Optional<Post> getPostById(int id) {
    return postRepository.findById(id);
  }
}
