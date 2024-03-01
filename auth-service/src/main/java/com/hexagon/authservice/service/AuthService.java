package com.hexagon.authservice.service;

import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.authservice.model.User;
import com.hexagon.authservice.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  @Autowired private UserRepository userRepository;

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public Optional<UserResponse> getUserById(int id) {
    return userRepository.findById(id).map(UserResponse::new);
  }
}
