"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        username: "Иван Иванов",
        email: "ivan.ivanov@mail.com",
        password: await bcrypt.hash("password123", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Петр Петров",
        email: "petr.petrov@mail.com",
        password: await bcrypt.hash("securepass", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Сергей Сергеев",
        email: "sergey.sergeev@mail.com",
        password: await bcrypt.hash("mypassword", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Анна Смирнова",
        email: "anna.smirnova@mail.com",
        password: await bcrypt.hash("12345", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Елена Орлова",
        email: "elena.orlova@mail.com",
        password: await bcrypt.hash("password1", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Ольга Новикова",
        email: "olga.novikova@mail.com",
        password: await bcrypt.hash("password2", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Алексей Кузнецов",
        email: "alexey.kuznetsov@mail.com",
        password: await bcrypt.hash("alexeypass", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Максим Федоров",
        email: "maxim.fedorov@mail.com",
        password: await bcrypt.hash("fedora123", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Мария Белова",
        email: "maria.belova@mail.com",
        password: await bcrypt.hash("mariapass", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Виктор Соколов",
        email: "victor.sokolov@mail.com",
        password: await bcrypt.hash("victorypass", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
