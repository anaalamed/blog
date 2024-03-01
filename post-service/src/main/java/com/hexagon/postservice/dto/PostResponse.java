package com.hexagon.postservice.dto;

import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.postservice.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse {
    private int id;
    private String title;
    private String content;
    private Instant creationTime;
    private UserResponse author;

    public PostResponse(Post post, UserResponse author) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.creationTime = post.getCreationTime();
        this.author = author;
    }
}