package com.hexagon.authservice.utils;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.google.common.base.Strings;
import java.time.Instant;
import java.util.UUID;

public class AuthUtils {

  private static final BCrypt.Hasher HASHER = BCrypt.withDefaults();
  private static final BCrypt.Verifyer VERIFIER = BCrypt.verifyer();

  public static String generateUniqueToken() {
    StringBuilder token = new StringBuilder();
    long currentTimeInMillisecond = Instant.now().toEpochMilli();
    return token.append(currentTimeInMillisecond).append("-").append(UUID.randomUUID()).toString();
  }

  public static String hashPassword(String password) {
    if (Strings.isNullOrEmpty(password)) {
      return password;
    }
    return HASHER.hashToString(12, password.toCharArray());
  }

  public static boolean verifyPassword(String passwordFromUser, String passwordFromDB) {
    BCrypt.Result result =
        VERIFIER.verify(passwordFromUser.toCharArray(), passwordFromDB.toCharArray());

    return result.verified;
  }
}
