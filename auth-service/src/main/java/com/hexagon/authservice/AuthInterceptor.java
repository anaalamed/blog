package com.hexagon.authservice;

import com.hexagon.authservice.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;
import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;

public class AuthInterceptor implements HandlerInterceptor {

  private static final Logger logger = LogManager.getLogger(AuthInterceptor.class.getName());

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    logger.info("Inside Auth Interceptor");

    String token = request.getHeader("Authorization");
    if (!StringUtils.isBlank(token)) {
      Optional<Integer> verify = JwtUtil.verify(token);
      if (verify.isPresent()) {
        request.setAttribute("authorId", verify.get());
        return true;
      }
    }

    response.sendError(401, "User information has expired，please login again");
    return false;
  }
}
