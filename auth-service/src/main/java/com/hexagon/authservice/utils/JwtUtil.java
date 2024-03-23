package com.hexagon.authservice.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import java.util.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtUtil {

  private static final String SECRET = "secret_key";

  /** Expiration time (unit: second) */
  private static final long EXPIRATION = 3600L;

  public static String createToken(Integer userId, String account, String password) {
    Map<String, Object> map = new HashMap<>();
    map.put("alg", "HS256");
    map.put("typ", "JWT");
    String token =
        JWT.create()
            .withHeader(map)
            .withAudience(String.valueOf(userId))
            .withClaim("account", account)
            .withClaim("password", password)
            .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION * 1000))
            .withIssuedAt(new Date())
            .sign(Algorithm.HMAC256(SECRET));
    return token;
  }

  public static Integer getUserId(List<String> audience) {
    if (!audience.isEmpty()) {
      return Integer.parseInt(audience.get(0));
    }
    return null;
  }

  /** Verify token and parse token */
  public static Optional<Integer> verify(String token) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(SECRET);
      JWTVerifier verifier = JWT.require(algorithm).build();
      DecodedJWT jwt = verifier.verify(token);
      if (null != jwt) {
        return Optional.ofNullable(getUserId(jwt.getAudience()));
      }
    } catch (IllegalArgumentException | JWTVerificationException e) {
      e.printStackTrace();
    }
    return Optional.empty();
  }
}
