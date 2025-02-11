import { SignInData, SignUpData } from "./types";

type IValidationResult = { isValid: boolean; error: string | null };

export default class UserValidator {
  /**
   * Метод для валидации данных пользователя при регистрации.
   * @param {object} data - Объект данных пользователя, который необходимо проверить.
   * @param {string} data.username - Имя пользователя (обязательное поле).
   * @param {string} data.email - Email пользователя (обязательное поле).
   * @param {string} data.password - Пароль пользователя (обязательное поле, должно быть определенной длины).
   * @returns {object} - Объект, содержащий результат валидации.
   * @returns {boolean} isValid - Флаг, указывающий на валидность данных.
   * @returns {string|null} error - Сообщение об ошибке валидации, если имеется, иначе null.
   */
  static validateSignUp(data: SignUpData): IValidationResult {
    const { username, email, password } = data; // Деструктуризация объекта данных для получения полей username, email и password.

    //! Проверка валидности поля username
    if (!username || typeof username !== "string" || username.trim() === "") {
      // Если username отсутствует, не является строкой или является пустой строкой
      return {
        isValid: false, // Данные невалидные
        error: "Username is required and must be a non-empty string.", // Сообщение об ошибке с указанием типа ошибки
      };
    }

    //! Проверка валидности поля email
    if (
      !email ||
      typeof email !== "string" ||
      email.trim() === "" ||
      !this.validateEmail(email) // Проверка на валидность email
    ) {
      // Если email отсутствует или некорректен
      return {
        isValid: false, // Данные невалидные
        error:
          "Email is required, must be a non-empty string, and must be a valid email address.", // Более детальное сообщение об ошибке
      };
    }

    //! Проверка валидности поля password
    if (
      !password ||
      typeof password !== "string" ||
      password.trim() === "" ||
      !this.validatePassword(password) // Проверка на валидность password
    ) {
      // Если password отсутствует или некорректен
      return {
        isValid: false, // Данные невалидные
        error:
          "Password is required, must be a non-empty string, contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.", // Подробное сообщение об ошибке
      };
    }

    //* Если все проверки пройдены, возвращаем валидный результат.
    return {
      isValid: true, // Данные валидные
      error: null, // Нет ошибок
    };
  }

  /**
   * Метод для валидации данных для входа.
   * @param {object} data - Объект данных для входа.
   * @param {string} data.email - Email пользователя (обязательное поле).
   * @param {string} data.password - Пароль пользователя (обязательное поле).
   * @returns {object} - Объект, содержащий результат валидации.
   * @returns {boolean} isValid - Флаг, указывающий на валидность данных.
   * @returns {string|null} error - Сообщение об ошибке валидации, если имеется, иначе null.
   */
  static validateSignIn(data: SignInData): IValidationResult {
    const { email, password } = data; // Деструктуризация данных для входа

    //! Проверка валидности поля email
    if (
      !email ||
      typeof email !== "string" ||
      email.trim() === "" ||
      !this.validateEmail(email) // Проверка на валидность email
    ) {
      return {
        isValid: false,
        error: "Email is required and must be a valid email address.",
      };
    }

    //! Проверка валидности поля password
    if (!password || typeof password !== "string" || password.trim() === "") {
      return {
        isValid: false,
        error: "Password is required and must not be an empty string.",
      };
    }

    //* Если все проверки пройдены, возвращаем валидный результат.
    return {
      isValid: true,
      error: null,
    };
  }

  /**
   * Метод для валидации email.
   * @param {string} email - Email для проверки.
   * @returns {boolean} - Является ли email валидным.
   */
  static validateEmail(email: string): boolean {
    // Регулярное выражение для проверки формата email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Проверка email на соответствие регулярному выражению
    return emailPattern.test(email); // Возвращает true, если email валиден; false в противном случае
  }

  /**
   * Метод для валидации пароля.
   * @param {string} password - Пароль для проверки.
   * @returns {boolean} - Является ли пароль валидным согласно заданным требованиям.
   */
  static validatePassword(password: string): boolean {
    // Регулярные выражения для проверки требований к паролю
    const hasUpperCase = /[A-Z]/; // Проверка на наличие заглавной буквы
    const hasLowerCase = /[a-z]/; // Проверка на наличие строчной буквы
    const hasNumbers = /\d/; // Проверка на наличие цифры
    const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|[\]<>]/; // Проверка на наличие спецсимвола
    const isValidLength = password.length >= 8; // Проверка на минимальную длину

    // Проверка всех условий
    if (
      !hasUpperCase.test(password) ||
      !hasLowerCase.test(password) ||
      !hasNumbers.test(password) ||
      !hasSpecialCharacters.test(password) ||
      !isValidLength
    ) {
      return false; // Пароль не валиден
    } else {
      return true; // Пароль валиден
    }
  }
}
