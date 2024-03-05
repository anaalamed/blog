package com.hexagon.commentservice.controller;

import com.hexagon.commentservice.dto.CommentRequest;
import com.hexagon.commentservice.dto.CommentResponse;
import com.hexagon.commentservice.entity.Comment;
import com.hexagon.commentservice.service.CommentService;
import com.hexagon.common.TokenUtils;
import com.hexagon.common.UserResponseCache;
import java.nio.file.AccessDeniedException;
import java.util.Optional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RequestMapping(value = "/comment")
@RestController
public class CommentController {
  private static final Logger logger = LogManager.getLogger(CommentController.class.getName());

  private final CommentService commentService;

  private final UserResponseCache userResponseCache;

  private final RestTemplate restTemplate;

  @Autowired
  public CommentController(CommentService commentService, RestTemplate restTemplate) {
    this.commentService = commentService;
    this.restTemplate = restTemplate;
    this.userResponseCache = new UserResponseCache(restTemplate);
  }

  @PostMapping("/addComment")
  public ResponseEntity<?> addComment(
      @RequestBody CommentRequest commentRequest, @RequestHeader String token) {
    Optional<Integer> authorId = TokenUtils.getUserIdFromToken(restTemplate, token);

    if (authorId.isEmpty()) {
      logger.info("User is not authorized");
      return ResponseEntity.badRequest().body("User is not authorized");
    }

    return ResponseEntity.ok(
        getCommentResponse(commentService.addComment(commentRequest, authorId.get())));
  }

  @PutMapping("/editComment/{commentId}")
  public ResponseEntity<?> editComment(
      @RequestBody CommentRequest commentRequest,
      @RequestHeader String token,
      @PathVariable int commentId) {
    Optional<Integer> authorId = TokenUtils.getUserIdFromToken(restTemplate, token);

    if (authorId.isEmpty()) {
      logger.info("User is not authorized");
      return ResponseEntity.badRequest().body("User is not authorized");
    }

    try {
      CommentResponse commentResponse =
          getCommentResponse(commentService.editComment(commentId, commentRequest, authorId.get()));
      return ResponseEntity.ok(commentResponse);
    } catch (AccessDeniedException | RuntimeException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @DeleteMapping("/deleteComment/{commentId}")
  public ResponseEntity<?> deleteComment(@RequestHeader String token, @PathVariable int commentId) {
    Optional<Integer> authorId = TokenUtils.getUserIdFromToken(restTemplate, token);

    if (authorId.isEmpty()) {
      logger.info("User is not authorized");
      return ResponseEntity.badRequest().body("User is not authorized");
    }

    try {
      commentService.deleteComment(commentId, authorId.get());
      return ResponseEntity.ok().build();
    } catch (AccessDeniedException | RuntimeException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping
  public ResponseEntity<?> getCommentsByPostId(@RequestParam(value = "postId") int postId) {
    return ResponseEntity.ok(
        commentService.getCommentsByPostId(postId).stream().map(this::getCommentResponse).toList());
  }

  private CommentResponse getCommentResponse(Comment comment) {
    return new CommentResponse(comment, userResponseCache.getUserResponse(comment.getUserId()));
  }
}
