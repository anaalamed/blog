package com.hexagon.common;

import com.hexagon.authservice.dto.UserResponse;
import java.util.Optional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

public class TokenUtils {
  private static final Logger logger = LogManager.getLogger(TokenUtils.class.getName());

  private static final String AUTH_SERVICE_URL = "http://AUTH-SERVICE/auth/user";

  public static Optional<Integer> getUserIdFromToken(RestTemplate restTemplate, String token) {
    String getAuthorReqUrl = AUTH_SERVICE_URL + "?token=" + token;

    try {
      UserResponse userResponse = restTemplate.getForObject(getAuthorReqUrl, UserResponse.class);
      return Optional.of(userResponse.getId());
    } catch (HttpClientErrorException e) {
      return Optional.empty();
    }
  }
}
