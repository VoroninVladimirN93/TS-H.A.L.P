const { Task, User } = require("../db/models");

class TaskService {
  static async create(data) {
    return await Task.create(data);
  }

  static async getAll() {
    return await Task.findAll(
    //   {
    //   include: [{
    //     model: User,
    //     attributes: ['username', 'email'],
    //   }],
    // }
  );
  }

  static async getById(id) {
    console.log(id, "<><>><><><><><>");
    return await Task.findByPk(id, 
    //   {
    //   include:[{
    //     model: User,
    //     attributes: ['username', 'email'],
    //   }],
    // }
  );
  }

  static async update(id, data) {
    const task = await Task.findByPk(id);
    if (task) {
      return await task.update(data);
    }
    throw new Error("Task not found");
  }

  static async delete(id) {
    const task = await Task.findByPk(id);
    if (task) {
      return await task.destroy();
    }
    throw new Error("Task not found");
  }

  static async getTasksByUser(userId) {
    return await Task.findAll({ where: { user_id: userId } });
  }
}

module.exports = TaskService;
