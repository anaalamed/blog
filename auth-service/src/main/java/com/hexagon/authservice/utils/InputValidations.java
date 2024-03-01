package com.hexagon.authservice.utils;

import java.util.regex.Pattern;

public class InputValidations {

  private static final Pattern EMAIL_PATTERN =
      Pattern.compile("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

  // Only letters. length: 3-30
  private static final Pattern NAME_PATTERN = Pattern.compile("[ a-zA-Z]{3,30}");

  // Minimum eight characters, at least one letter and one number:
  private static final Pattern PASSWORD_PATTERN =
      Pattern.compile("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");

  public static boolean isValidEmail(String email) {
    return EMAIL_PATTERN.matcher(email).matches();
  }

  public static boolean isValidName(String name) {
    return NAME_PATTERN.matcher(name).matches();
  }

  public static boolean isValidPassword(String password) {
    return PASSWORD_PATTERN.matcher(password).matches();
  }
}
