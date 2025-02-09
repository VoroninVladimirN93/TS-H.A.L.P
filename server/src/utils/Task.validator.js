"use strict";

class TaskValidator {
  static validateCreate(data) {
    const { title,
      description,
      status } = data;

    if (!title || typeof title !== "string" || !title.trim()) {
      return {
        isValid: false,
        error: "Title is required and must be a non-empty string.",
      };
    }

    if (!description || typeof description !== "string" || !description.trim()) {
      return {
        isValid: false,
        error: "Description is required and must be a non-empty string.",
      };
    }
    if (!status || typeof status !== "string" || !status.trim()) {
      return {
        isValid: false,
        error: "Status is required and must be a non-empty string.",
      };
    }

    return { isValid: true, error: null };
  }

  static validateUpdate(data) {
    const {  title,
      description,
      status } = data;
    if (!title || typeof title !== "string" || !title.trim()) {
      return {
        isValid: false,
        error: "Title is required and must be a non-empty string.",
      };
    }

    if (!description || typeof description !== "string" || !description.trim()) {
      return {
        isValid: false,
        error: "Description is required and must be a non-empty string.",
      };
    }
    if (!status || typeof status !== "string" || !status.trim()) {
      return {
        isValid: false,
        error: "Status is required and must be a non-empty string.",
      };
    }

    return { isValid: true, error: null };
  }
}

module.exports = TaskValidator;
