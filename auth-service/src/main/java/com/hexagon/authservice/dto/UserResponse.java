package com.hexagon.authservice.dto;

import com.hexagon.authservice.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
  private String name;
  private String email;

  public UserResponse(User user) {
    this.name = user.getName();
    this.email = user.getEmail();
  }
}
