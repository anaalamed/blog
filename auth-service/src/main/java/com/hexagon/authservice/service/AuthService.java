package com.hexagon.authservice.service;

import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.authservice.model.User;
import com.hexagon.authservice.repository.UserRepository;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private static final Logger logger = LogManager.getLogger(AuthService.class.getName());
  @Autowired private UserRepository userRepository;

  Map<Integer, String> tokens = new HashMap<>();

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public Optional<String> login(String email, String password) {
    Optional<User> user = userRepository.findByEmail(email);

    if (user.isPresent() && password.equals(user.get().getPassword())) {
      String token = generateUniqueToken();
      tokens.put(user.get().getId(), token);
      return Optional.of(token);
    }

    return Optional.empty();
  }

  public Optional<UserResponse> getUserById(int id) {
    return userRepository.findById(id).map(UserResponse::new);
  }

  public Optional<UserResponse> getUserByToken(String token) {
    int userId =
        tokens.entrySet().stream()
            .filter(entry -> token.equals(entry.getValue()))
            .map(Map.Entry::getKey)
            .findFirst()
            .get();

    return userRepository.findById(userId).map(UserResponse::new);
  }

  private static String generateUniqueToken() {
    StringBuilder token = new StringBuilder();
    long currentTimeInMillisecond = Instant.now().toEpochMilli();
    return token.append(currentTimeInMillisecond).append("-").append(UUID.randomUUID()).toString();
  }
}
