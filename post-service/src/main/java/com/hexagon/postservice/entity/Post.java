package com.hexagon.postservice.entity;

import com.hexagon.postservice.dto.PostRequest;
import jakarta.persistence.*;
import java.time.Instant;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "post")
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private int id;

  private String title;

  @Column(columnDefinition = "LONGTEXT")
  private String content;

  private Instant creationTime;
  private Instant updateTime;
  private int userId;

  public Post(PostRequest postRequest, int authorId) {
    this.title = postRequest.getTitle();
    this.content = postRequest.getContent();
    this.userId = authorId;
  }
}
