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
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;

  private String title;
  private String content;
  private Instant creationTime;
  private int userId;

  public Post(PostRequest postRequest, int authorId) {
    this.title = postRequest.getTitle();
    this.content = postRequest.getContent();
    this.creationTime = postRequest.getCreationTime();
    this.userId = authorId;
  }
}
