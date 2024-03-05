package com.hexagon.postservice.entity;

import com.hexagon.postservice.dto.PostRequest;
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
@Table(name = "post")
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private int id;

  private String title;

  @Column(columnDefinition = "LONGTEXT")
  private String content;

  @CreationTimestamp private Instant creationTime;
  @UpdateTimestamp private Instant updateTime;
  private int userId;

  public Post(PostRequest postRequest, int authorId) {
    this.title = postRequest.getTitle();
    this.content = postRequest.getContent();
    this.userId = authorId;
  }
}
