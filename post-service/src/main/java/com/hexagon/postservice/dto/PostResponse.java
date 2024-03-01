package com.hexagon.postservice.dto;

import com.hexagon.authservice.dto.UserResponse;
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
}