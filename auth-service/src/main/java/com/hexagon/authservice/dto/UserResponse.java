package com.hexagon.authservice.dto;

import com.hexagon.authservice.model.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserResponse {
  private int id;
  private String name;
  private String email;

  public UserResponse(User user) {
    this.id = user.getId();
    this.name = user.getName();
    this.email = user.getEmail();
  }
}
