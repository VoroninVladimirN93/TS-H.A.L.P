"use strict";

class UserValidator {
  // Валидация для регистрации пользователя
  static validateSignUp(data) {
    const { username, email, password, } = data;

    // Проверка на имя
    if (!username || typeof username !== "string" || username.trim() === "") {
      return {
        isValid: false,
        error: "First name is required and must be a non-empty string.",
      };
    }

    // Проверка на email
    if (
      !email ||
      typeof email !== "string" ||
      email.trim() === "" ||
      !this.validateEmail(email)
    ) {
      return {
        isValid: false,
        error:
          "Email is required, must be a non-empty string, and must be a valid email address.",
      };
    }

    // Проверка на пароль
    if (
      !password ||
      typeof password !== "string" ||
      password.trim() === "" ||
      !this.validatePassword(password)
    ) {
      return {
        isValid: false,
        error:
          "Password is required, must be a non-empty string, contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
      };
    }
    return {
      isValid: true,
      error: null,
    };
  }

  // Валидация для входа пользователя
  static validateSignIn(data) {
    const { email, password } = data;

    // Проверка на email
    if (
      !email ||
      typeof email !== "string" ||
      email.trim() === "" ||
      !this.validateEmail(email)
    ) {
      return {
        isValid: false,
        error: "Email is required and must be a valid email address.",
      };
    }

    // Проверка на пароль
    if (!password || typeof password !== "string" || password.trim() === "") {
      return {
        isValid: false,
        error: "Password is required and must not be an empty string.",
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }

  // Проверка на корректность email
  static validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  // Проверка на корректность пароля
  static validatePassword(password) {
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumbers = /\d/;
    const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/;
    const isValidLength = password.length >= 8;

    return (
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasNumbers.test(password) &&
      hasSpecialCharacters.test(password) &&
      isValidLength
    );
  }
}

module.exports = UserValidator;
