package com.hexagon.common;

import com.hexagon.authservice.dto.UserResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.client.RestTemplate;

public class TokenUtils {
  private static final Logger logger = LogManager.getLogger(TokenUtils.class.getName());

  private static final String AUTH_SERVICE_URL = "http://AUTH-SERVICE/auth/user";

  public static int getUserIdFromToken(RestTemplate restTemplate, String token) {
    String getAuthorReqUrl = AUTH_SERVICE_URL + "?token=" + token;
    int userId = restTemplate.getForObject(getAuthorReqUrl, UserResponse.class).getId();
    logger.info("User {} authorized", userId);
    return userId;
  }
}
