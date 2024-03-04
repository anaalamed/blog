package com.hexagon.commentservice.controller;

import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.commentservice.dto.CommentRequest;
import com.hexagon.commentservice.dto.CommentResponse;
import com.hexagon.commentservice.entity.Comment;
import com.hexagon.commentservice.service.CommentService;

import java.nio.file.AccessDeniedException;
import java.util.List;
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

  @Autowired private CommentService commentService;

  @Autowired private RestTemplate restTemplate;

  private static final String authServiceUrl = "http://AUTH-SERVICE/auth/user";

  @PostMapping("/addComment")
  public CommentResponse addComment(
      @RequestBody CommentRequest commentRequest, @RequestHeader String token) {
    String getAuthorReqUrl = authServiceUrl + "?token=" + token;
    int authorId = restTemplate.getForObject(getAuthorReqUrl, UserResponse.class).getId();

    return getCommentResponse(commentService.addComment(commentRequest, authorId));
  }

  @PutMapping("/editComment/{commentId}")
  public ResponseEntity<?> editComment(
      @RequestBody CommentRequest commentRequest,
      @RequestHeader String token,
      @PathVariable int commentId) {
    String getAuthorReqUrl = authServiceUrl + "?token=" + token;
    int authorId = restTemplate.getForObject(getAuthorReqUrl, UserResponse.class).getId();

    try {
      CommentResponse commentResponse =
          getCommentResponse(commentService.editComment(commentId, commentRequest, authorId));
      return ResponseEntity.ok(commentResponse);
    } catch (AccessDeniedException e) {
      return ResponseEntity.badRequest().body(e);
    }
  }

  @GetMapping
  public List<CommentResponse> getCommentsByPostId(@RequestParam(value = "postId") int postId) {
    return commentService.getCommentsByPostId(postId).stream()
        .map(this::getCommentResponse)
        .toList();
  }

  private UserResponse getCommentAuthor(Comment comment) {
    return restTemplate.getForObject(
        authServiceUrl + "/" + comment.getUserId(), UserResponse.class);
  }

  private CommentResponse getCommentResponse(Comment comment) {
    return new CommentResponse(comment, getCommentAuthor(comment));
  }
}
