package com.hexagon.authservice.controller;

import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.authservice.model.User;
import com.hexagon.authservice.service.AuthService;
import com.hexagon.authservice.utils.InputValidations;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class AuthController {
  @Autowired private AuthService authService;

  @PostMapping
  public ResponseEntity<?> createUser(@RequestBody User user) {
    try {
      if (InputValidations.isValidEmail(user.getEmail())
          && InputValidations.isValidName(user.getName())
          && InputValidations.isValidPassword(user.getPassword())) {
        User userResponse = authService.createUser(user);
        return ResponseEntity.ok(userResponse);
      } else {
        return ResponseEntity.badRequest().body("Invalid inputs");
      }
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.badRequest().body(user.getEmail() + " Email already exists");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getUserById(@PathVariable int id) {
    Optional<UserResponse> userResponse = authService.getUserById(id);

    if (userResponse.isPresent()) {
      return ResponseEntity.ok(userResponse.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
