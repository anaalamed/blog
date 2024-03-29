package com.hexagon.commentservice.entity;

import com.hexagon.commentservice.dto.CommentRequest;
import jakarta.persistence.*;
import java.time.Instant;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "comment")
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private int id;

  private String content;

  @CreationTimestamp private Instant creationTime;

  @UpdateTimestamp private Instant updateTime;
  private int userId;
  private int postId;

  public Comment(CommentRequest commentRequest, int authorId) {
    this.content = commentRequest.getContent();
    this.postId = commentRequest.getPostId();
    this.userId = authorId;
  }
}
