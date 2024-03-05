package com.hexagon.common;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.hexagon.authservice.dto.UserResponse;
import java.time.Duration;
import java.util.concurrent.ExecutionException;
import org.springframework.web.client.RestTemplate;

public class UserResponseCache {

  private static final String AUTH_SERVICE_URL = "http://AUTH-SERVICE/auth/user";

  private final LoadingCache<Integer, UserResponse> cache;

  public UserResponseCache(RestTemplate restTemplate) {
    this.cache =
        CacheBuilder.newBuilder()
            .maximumSize(200L)
            .refreshAfterWrite(Duration.ofMinutes(1L))
            .build(
                new CacheLoader<>() {
                  @Override
                  public UserResponse load(Integer key) {
                    return restTemplate.getForObject(
                        AUTH_SERVICE_URL + "/" + key, UserResponse.class);
                  }
                });
  }

  public UserResponse getUserResponse(int id) {
    try {
      return cache.get(id);
    } catch (ExecutionException e) {
      throw new RuntimeException(e);
    }
  }

  public int getUserIdFromToken(RestTemplate restTemplate, String token) {
    String getAuthorReqUrl = AUTH_SERVICE_URL + "?token=" + token;
    return restTemplate.getForObject(getAuthorReqUrl, UserResponse.class).getId();
  }
}
