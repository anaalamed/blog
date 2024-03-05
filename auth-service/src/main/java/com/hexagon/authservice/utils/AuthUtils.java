package com.hexagon.authservice.utils;

import at.favre.lib.crypto.bcrypt.BCrypt;

import java.time.Instant;
import java.util.UUID;

public class AuthUtils {
  public static String generateUniqueToken() {
    StringBuilder token = new StringBuilder();
    long currentTimeInMillisecond = Instant.now().toEpochMilli();
    return token.append(currentTimeInMillisecond).append("-").append(UUID.randomUUID()).toString();
  }

  public static String hashPassword(String password) {

    if (password == null || password.equals("")) {
      return password;
    }
    return BCrypt.withDefaults().hashToString(12, password.toCharArray());
  }

  public static boolean verifyPassword(String passwordFromUser, String passwordFromDB) {

    BCrypt.Result result =
        BCrypt.verifyer().verify(passwordFromUser.toCharArray(), passwordFromDB.toCharArray());

    return result.verified;
  }
}
