package com.hexagon.authservice.service;

import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.authservice.model.User;
import com.hexagon.authservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<?> createUser(User user){
        try{
            return new ResponseEntity<User>(userRepository.save(user), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> getUserById(int id){
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            UserResponse postResponse = new UserResponse(user.get().getId(), user.get().getName(), user.get().getEmail());
            return new ResponseEntity<>(postResponse, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("No User Found",HttpStatus.NOT_FOUND);
        }
    }
}
