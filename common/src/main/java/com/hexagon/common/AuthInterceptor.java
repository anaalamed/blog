package com.hexagon.common;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.HandlerInterceptor;

public class AuthInterceptor implements HandlerInterceptor {

  private static final Logger logger = LogManager.getLogger(AuthInterceptor.class.getName());

  private final RestTemplate restTemplate;

  public AuthInterceptor(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    logger.info("Inside preHandle method of CustomInterceptor");

    String token = request.getHeader("token");
    Optional<Integer> authorId = TokenUtils.getUserIdFromToken(restTemplate, token);

    if (authorId.isEmpty()) {
      logger.info("User is not authorized");
      response.sendError(401, "User is not authorized");
      return false;
    } else {
      request.setAttribute("authorId", authorId.get());
      return true;
    }
  }
}
