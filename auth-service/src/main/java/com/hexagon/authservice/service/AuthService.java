package com.hexagon.authservice.service;

import com.hexagon.authservice.dto.LoginResponse;
import com.hexagon.authservice.dto.UserRequest;
import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.authservice.model.User;
import com.hexagon.authservice.repository.UserRepository;
import com.hexagon.authservice.utils.AuthUtils;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private static final Logger logger = LogManager.getLogger(AuthService.class.getName());
  @Autowired private UserRepository userRepository;

  Map<Integer, String> tokens = new HashMap<>();

  public UserResponse createUser(UserRequest userRequest) {
    User user = new User(userRequest);
    user.setPassword(AuthUtils.hashPassword(userRequest.getPassword()));
    UserResponse userResponse = new UserResponse(userRepository.save(user));

    logger.info("User {} was created", userResponse);
    return userResponse;
  }

  public Optional<LoginResponse> login(String email, String password) {
    Optional<User> user = userRepository.findByEmail(email);

    if (user.isEmpty()) {
      logger.info("User with email {} doesn't exist", email);
      return Optional.empty();
    }

    if (!AuthUtils.verifyPassword(password, user.get().getPassword())) {
      logger.info("User with email {} - password doesn't match", email);
      return Optional.empty();
    }

    String token = AuthUtils.generateUniqueToken();
    tokens.put(user.get().getId(), token);

    UserResponse userResponse = new UserResponse(user.get());
    logger.info("User {} logged in", userResponse);
    return Optional.of(new LoginResponse(token, userResponse));
  }

  public Optional<UserResponse> getUserById(int id) {
    return userRepository.findById(id).map(UserResponse::new);
  }

  public Optional<UserResponse> getUserByToken(String token) {
    Optional<Integer> userId =
        tokens.entrySet().stream()
            .filter(entry -> token.equals(entry.getValue()))
            .map(Map.Entry::getKey)
            .findFirst();

    if (userId.isEmpty()) {
      return Optional.empty();
    }

    return userRepository.findById(userId.get()).map(UserResponse::new);
  }
}
