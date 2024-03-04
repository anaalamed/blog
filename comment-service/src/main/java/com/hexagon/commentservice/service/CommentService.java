package com.hexagon.commentservice.service;

import com.hexagon.commentservice.dto.CommentRequest;
import com.hexagon.commentservice.entity.Comment;
import com.hexagon.commentservice.repository.CommentRepository;
import java.nio.file.AccessDeniedException;
import java.time.Instant;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
  private static final Logger logger = LogManager.getLogger(CommentService.class.getName());

  @Autowired private CommentRepository commentRepository;

  public Comment addComment(CommentRequest commentRequest, int authorId) {
    Comment comment = new Comment(commentRequest, authorId);
    comment.setCreationTime(Instant.now());
    return commentRepository.save(comment);
  }

  public Comment editComment(int commentId, CommentRequest commentRequest, int authorId)
      throws AccessDeniedException {
    Comment commentToUpdate = commentRepository.findById(commentId).get();

    if (commentToUpdate.getUserId() != authorId) {
      throw new AccessDeniedException("User can update only his own comment");
    }

    commentToUpdate.setContent(commentRequest.getContent());
    commentToUpdate.setUpdateTime(Instant.now());
    return commentRepository.save(commentToUpdate);
  }

  public List<Comment> getCommentsByPostId(int postId) {
    return commentRepository.findAllByPostId(postId);
  }
}
