const TaskService = require("../services/Task.service");
const formatResponse = require("../utils/formatResponse");
const TaskValidator = require("../utils/Task.validator");

class TaskController {
  static async create(req, res) {
    const { title, description, status = 'undone' } = req.body;
    const { user } = res.locals;
    const { isValid, error } = TaskValidator.validateCreate({
      title,
      description,
      status,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    try {
      const newTask = await TaskService.create({
        title,
        description,
        status,
        user_id: user.id,
      });

      if (!newTask) {
        return res
          .status(400)
          .json(formatResponse(400, "Failed to create new task"));
      }
      const fullTask = await TaskService.getById(newTask.id);
      res
        .status(201)
        .json(formatResponse(201, "Task created successfully", fullTask));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getAll(req, res) {
    try {
      const tasks = await TaskService.getAll();
      res
        .status(200)
        .json(formatResponse(200, "Tasks retrieved successfully", tasks));
    } catch (error) {
      res
        .status(500)
        .json(
          formatResponse(500, "Internal server error", null, error.message)
        );
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const task = await TaskService.getById(id);
      if (!task) {
        return res
          .status(404)
          .json(formatResponse(404, "Task not found", null));
      }
      res
        .status(200)
        .json(formatResponse(200, "Task retrieved successfully", task));
    } catch (error) {
      res
        .status(500)
        .json(
          formatResponse(500, "Internal server error", null, error.message)
        );
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { user } = res.locals;
    const { title, description, status } = req.body;

    try {
      const currentTask = await TaskService.getById(id);
      if (!currentTask) {
        return res
          .status(404)
          .json(formatResponse(404, "Task not found", null));
      }

      if (currentTask.user_id !== user.id) {
        res
          .status(400)
          .json(formatResponse(400, "No rights", null, "No rights"));
      } else {
        const { isValid, error } = TaskValidator.validateUpdate({
          title,
          description,
          status,
        });

        if (!isValid) {
          return res
            .status(400)
            .json(formatResponse(400, "Validation error", null, error));
        }

        const updatedTask = await TaskService.update(id, {
          title,
          description,
          status,
        });

        if (!updatedTask) {
          return res
            .status(400)
            .json(formatResponse(400, "Failed to update task"));
        }

        res
          .status(200)
          .json(formatResponse(200, "Task updated successfully", updatedTask));
      }
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const { user } = res.locals;
      const task = await TaskService.getById(id);

      if (!task) {
        return res
          .status(404)
          .json(formatResponse(404, "Task not found", null));
      }
      if (task.user_id === user.id) {
        await TaskService.delete(id);
        res.status(200).json(formatResponse(200, "Task delete", task));
      } else {
        res
          .status(400)
          .json(formatResponse(400, "No rights", null, "No rights"));
      }
    } catch (error) {
      res
        .status(500)
        .json(
          formatResponse(500, "Internal server error", null, error.message)
        );
    }
  }
}

module.exports = TaskController;
