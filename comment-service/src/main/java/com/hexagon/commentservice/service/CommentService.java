package com.hexagon.commentservice.service;

import com.hexagon.commentservice.dto.CommentRequest;
import com.hexagon.commentservice.entity.Comment;
import com.hexagon.commentservice.repository.CommentRepository;
import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;
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
    return commentRepository.save(comment);
  }

  public Comment editComment(int commentId, CommentRequest commentRequest, int authorId)
      throws AccessDeniedException {
    Optional<Comment> optionalCommentToUpdate = commentRepository.findById(commentId);

    if (optionalCommentToUpdate.isEmpty()) {
      logger.info("Comment with id {} is not found", commentId);
      throw new RuntimeException("Comment is not found");
    }

    Comment commentToUpdate = optionalCommentToUpdate.get();
    if (commentToUpdate.getUserId() != authorId) {
      logger.info("User can only update his own comment");
      throw new AccessDeniedException("User can update only his own comment");
    }

    commentToUpdate.setContent(commentRequest.getContent());
    Comment updatedComment = commentRepository.save(commentToUpdate);
    logger.info("The comment was updated: {}", updatedComment);
    return updatedComment;
  }

  public void deleteComment(int commentId, int authorId) throws AccessDeniedException {
    Optional<Comment> commentToDelete = commentRepository.findById(commentId);

    if (commentToDelete.isEmpty()) {
      logger.info("Comment with id {} is not found", commentId);
      throw new RuntimeException("Comment is not found");
    }

    if (authorId != commentToDelete.get().getUserId()) {
      logger.info("User can only delete his own comment");
      throw new AccessDeniedException("User can only delete his own comment");
    }

    commentRepository.deleteById(commentId);
    logger.info("Comment with id {} was deleted", commentId);
  }

  public List<Comment> getCommentsByPostId(int postId) {
    return commentRepository.findAllByPostIdOrderByCreationTimeDesc(postId);
  }
}
