package com.hexagon.authservice.utils;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.google.common.base.Strings;

public class BcryptPasswordUtils {

  private static final BCrypt.Hasher HASHER = BCrypt.withDefaults();
  private static final BCrypt.Verifyer VERIFIER = BCrypt.verifyer();

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
