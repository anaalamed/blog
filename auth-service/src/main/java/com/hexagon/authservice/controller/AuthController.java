package com.hexagon.authservice.controller;

import com.hexagon.authservice.dto.UserRequest;
import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.authservice.model.User;
import com.hexagon.authservice.service.AuthService;
import com.hexagon.authservice.utils.InputValidations;
import java.util.Optional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private static final Logger logger = LogManager.getLogger(AuthService.class.getName());
  @Autowired private AuthService authService;

  @PostMapping("/signup")
  public ResponseEntity<?> createUser(@RequestBody UserRequest userRequest) {
    if (!InputValidations.isValidEmail(userRequest.getEmail())
        || !InputValidations.isValidName(userRequest.getName())
        || !InputValidations.isValidPassword(userRequest.getPassword())) {
      return ResponseEntity.badRequest().body("Invalid inputs");
    }

    Optional<UserResponse> userResponse = authService.createUser(userRequest);
    if (userResponse.isEmpty()) {
      return ResponseEntity.badRequest().body(userRequest.getEmail() + " Email already exists");
    }
    return ResponseEntity.ok(userResponse);
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody User user) {
    if (!InputValidations.isValidEmail(user.getEmail())
        || !InputValidations.isValidPassword(user.getPassword())) {
      return ResponseEntity.badRequest().body("Invalid inputs");
    }

    return ResponseEntity.of(authService.login(user.getEmail(), user.getPassword()));
  }

  @RequestMapping(method = RequestMethod.GET, path = "/user")
  public ResponseEntity<?> getUserByToken(@RequestParam(value = "token") String token) {
    return ResponseEntity.of(authService.getUserByToken(token));
  }

  @RequestMapping(method = RequestMethod.GET, path = "/user/{id}")
  public ResponseEntity<?> getUserById(@PathVariable int id) {
    return ResponseEntity.of(authService.getUserById(id));
  }
}
