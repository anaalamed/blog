package com.hexagon.authservice.controller;

import com.hexagon.authservice.dto.Token;
import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.authservice.model.User;
import com.hexagon.authservice.service.AuthService;
import com.hexagon.authservice.utils.InputValidations;
import java.util.Optional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private static final Logger logger = LogManager.getLogger(AuthService.class.getName());
  @Autowired private AuthService authService;

  @PostMapping("/signup")
  public ResponseEntity<?> createUser(@RequestBody User user) {
    if (!InputValidations.isValidEmail(user.getEmail())
        || !InputValidations.isValidName(user.getName())
        || !InputValidations.isValidPassword(user.getPassword())) {
      return ResponseEntity.badRequest().body("Invalid inputs");
    }

    try {
      User userResponse = authService.createUser(user);
      return ResponseEntity.ok(userResponse);
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.badRequest().body(user.getEmail() + " Email already exists");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody User user) {
    if (!InputValidations.isValidEmail(user.getEmail())
        || !InputValidations.isValidPassword(user.getPassword())) {
      return ResponseEntity.badRequest().body("Invalid inputs");
    }

    Optional<String> token = authService.login(user.getEmail(), user.getPassword());
    return ResponseEntity.of(token.map(Token::new));
  }

  @RequestMapping(method = RequestMethod.GET, path = "/user")
  public ResponseEntity<?> getUserByToken(@RequestParam(value = "token") String token) {
    Optional<UserResponse> userResponse = authService.getUserByToken(token);

    if (userResponse.isPresent()) {
      return ResponseEntity.ok(userResponse.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @RequestMapping(method = RequestMethod.GET, path = "/user/{id}")
  public ResponseEntity<?> getUserById(@PathVariable int id) {
    Optional<UserResponse> userResponse = authService.getUserById(id);

    if (userResponse.isPresent()) {
      return ResponseEntity.ok(userResponse.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
