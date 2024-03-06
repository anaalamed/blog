package com.hexagon.postservice.service;

import com.hexagon.postservice.dto.PostRequest;
import com.hexagon.postservice.entity.Post;
import com.hexagon.postservice.repository.PostRepository;
import java.nio.file.AccessDeniedException;
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

  public Post addPost(PostRequest postRequest, int authorId) {
    Post post = new Post(postRequest, authorId);
    return postRepository.save(post);
  }

  public Post editPost(int postId, PostRequest postRequest, int authorId)
      throws AccessDeniedException {
    Post postToUpdate = postRepository.findById(postId).get();

    if (postToUpdate.getUserId() != authorId) {
      throw new AccessDeniedException("User can update only his own post");
    }

    postToUpdate.setTitle(postRequest.getTitle());
    postToUpdate.setContent(postRequest.getContent());
    return postRepository.save(postToUpdate);
  }

  public List<Post> getPosts() {
    return postRepository.findAllByOrderByCreationTimeDesc();
  }

  public List<Post> getPostsByUserId(int userId) {
    return postRepository.findAllByUserIdOrderByCreationTimeDesc(userId);
  }

  public List<Post> getPostsByTitleOrContentContaining(String value) {
    return postRepository.findAllByTitleOrContentContaining(value, value);
  }

  public Optional<Post> getPostById(int id) {
    return postRepository.findById(id);
  }
}
