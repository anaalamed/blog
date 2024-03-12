package com.hexagon.authservice;

import static com.google.common.truth.Truth.assertThat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hexagon.authservice.dto.LoginResponse;
import com.hexagon.authservice.dto.UserRequest;
import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.authservice.model.User;
import com.hexagon.authservice.repository.UserRepository;
import java.io.IOException;
import java.util.Optional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AuthApiIntegrationTest {
  private static final Logger logger = LogManager.getLogger(AuthApiIntegrationTest.class.getName());

  @LocalServerPort private int port;

  @Autowired private TestRestTemplate restTemplate;

  @Autowired private UserRepository userRepository;

  private static HttpHeaders headers;

  private final ObjectMapper objectMapper = new ObjectMapper();

  private static UserRequest userRequest;

  @BeforeAll
  public static void init() {
    headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    userRequest = new UserRequest("test", "testtt@test.com", "aaaaaaa111");
  }

  @AfterEach
  public void afterEach() {
    // TODO(make tests not interact with real DB)
    Optional<User> user = userRepository.findByEmail("testtt@test.com");
    user.ifPresent(value -> userRepository.delete(value));
  }

  private String createURLWithPort() {
    return "http://localhost:" + port + "/auth";
  }

  @Test
  public void signup_success() throws JsonProcessingException {
    ResponseEntity<?> response = signup(userRequest);

    UserResponse userResponse =
        objectMapper.readValue(response.getBody().toString(), UserResponse.class);
    verifyUserResponse(userResponse, userRequest);
  }

  @Test
  public void signup_emailAlreadyExist_fails() throws JsonProcessingException {
    ResponseEntity<?> response1 = signup(userRequest);
    assertThat(response1.getStatusCode()).isEqualTo(HttpStatus.OK);
    UserResponse userResponse =
        objectMapper.readValue(response1.getBody().toString(), UserResponse.class);
    verifyUserResponse(userResponse, userRequest);

    ResponseEntity<?> response2 = signup(userRequest);
    assertThat(response2.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    assertThat(response2.getBody().toString()).contains("Email already exists");
  }

  @Test
  public void login_success() throws JsonProcessingException {
    signup(userRequest);

    ResponseEntity<?> response = login(userRequest);
    LoginResponse loginResponse =
        objectMapper.readValue(response.getBody().toString(), LoginResponse.class);

    verifyUserResponse(loginResponse.getUserResponse(), userRequest);
    assertThat(loginResponse.getToken()).isNotNull();
  }

  @Test
  public void login_userNotExist_fails() throws JsonProcessingException {
    ResponseEntity<?> response = login(userRequest);
    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
  }

  @Test
  public void getUserById_success() throws IOException {
    ResponseEntity<?> signupResponse = signup(userRequest);
    int userId =
        objectMapper.readValue(signupResponse.getBody().toString(), UserResponse.class).getId();

    ResponseEntity<?> response = getUserById(userId);
    UserResponse userResponse =
        objectMapper.readValue(response.getBody().toString(), UserResponse.class);
    verifyUserResponse(userResponse, userRequest);
  }

  @Test
  public void getUserById_notFound() {
    ResponseEntity<?> response = getUserById(1000001);

    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    assertThat(response.getBody()).isNull();
  }

  @Test
  public void getUserByToken_wrongToken_fails() {
    ResponseEntity<?> response = getUserByToken("aaaa");
    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
  }

  private ResponseEntity<?> signup(UserRequest userRequest) throws JsonProcessingException {

    HttpEntity<String> entity =
        new HttpEntity<>(objectMapper.writeValueAsString(userRequest), headers);

    return restTemplate.exchange(
        createURLWithPort().concat("/signup"), HttpMethod.POST, entity, String.class);
  }

  private ResponseEntity<?> login(UserRequest userRequest) throws JsonProcessingException {

    HttpEntity<String> entity =
        new HttpEntity<>(objectMapper.writeValueAsString(userRequest), headers);

    return restTemplate.exchange(
        createURLWithPort().concat("/login"), HttpMethod.POST, entity, String.class);
  }

  private ResponseEntity<?> getUserById(int userId) {
    HttpEntity<String> entity = new HttpEntity<>(null, headers);
    return restTemplate.exchange(
        createURLWithPort().concat("/user/".concat(String.valueOf(userId))),
        HttpMethod.GET,
        entity,
        String.class);
  }

  private ResponseEntity<?> getUserByToken(String token) {
    HttpEntity<String> entity = new HttpEntity<>(null, headers);
    return restTemplate.exchange(
        createURLWithPort().concat("/user?token=".concat(token)),
        HttpMethod.GET,
        entity,
        String.class);
  }

  private void verifyUserResponse(UserResponse userResponse, UserRequest userRequest) {
    assertThat(userResponse.getId()).isNotNull();
    assertThat(userResponse.getName()).isEqualTo(userRequest.getName());
    assertThat(userResponse.getEmail()).isEqualTo(userRequest.getEmail());
  }
}
