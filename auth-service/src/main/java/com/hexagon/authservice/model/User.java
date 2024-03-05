package com.hexagon.authservice.model;

import com.hexagon.authservice.dto.UserRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private int id;

  private String name;

  @Column(unique = true)
  private String email;

  private String password;

  public User(UserRequest userRequest) {
    this.name = userRequest.getName();
    this.email = userRequest.getEmail();
  }
}
