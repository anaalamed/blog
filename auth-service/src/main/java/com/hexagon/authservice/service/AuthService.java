package com.hexagon.authservice.service;

import com.hexagon.authservice.dto.LoginResponse;
import com.hexagon.authservice.dto.UserRequest;
import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.authservice.model.User;
import com.hexagon.authservice.repository.UserRepository;
import com.hexagon.authservice.utils.BcryptPasswordUtils;
import com.hexagon.authservice.utils.JwtUtil;
import java.util.Optional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private static final Logger logger = LogManager.getLogger(AuthService.class.getName());
  @Autowired private UserRepository userRepository;

  public Optional<UserResponse> createUser(UserRequest userRequest) {
    User user = new User(userRequest);
    user.setPassword(BcryptPasswordUtils.hashPassword(userRequest.getPassword()));

    try {
      UserResponse userResponse = new UserResponse(userRepository.save(user));
      logger.info("User {} was created", userResponse);
      return Optional.of(userResponse);
    } catch (DataIntegrityViolationException e) {
      return Optional.empty();
    }
  }

  public Optional<LoginResponse> login(String email, String password) {
    Optional<User> user = userRepository.findByEmail(email);

    if (user.isEmpty()) {
      logger.info("User with email {} doesn't exist", email);
      return Optional.empty();
    }

    if (!BcryptPasswordUtils.verifyPassword(password, user.get().getPassword())) {
      logger.info("User with email {} - password doesn't match", email);
      return Optional.empty();
    }

    String token = JwtUtil.createToken(user.get().getId(), email, password);

    UserResponse userResponse = new UserResponse(user.get());
    logger.info("User {} logged in", userResponse);
    return Optional.of(new LoginResponse(token, userResponse));
  }

  public Optional<UserResponse> getUserById(int id) {
    return userRepository.findById(id).map(UserResponse::new);
  }
}
