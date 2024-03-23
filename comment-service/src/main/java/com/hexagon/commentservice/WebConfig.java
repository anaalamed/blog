package com.hexagon.commentservice;

import com.hexagon.authservice.AuthInterceptor;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
  private static final List<String> commentRoutesAuthRequired =
      Arrays.asList(
          "/comment/addComment/**", "/comment/editComment/**", "/comment/deleteComment/**");

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new AuthInterceptor()).addPathPatterns(commentRoutesAuthRequired);
  }
}
