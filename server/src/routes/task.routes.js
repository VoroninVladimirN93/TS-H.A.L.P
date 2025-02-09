const router = require("express").Router();
const TaskController = require("../controllers/Task.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

router.post("/", verifyAccessToken, TaskController.create);
router.get("/", TaskController.getAll);
router.get("/:id", TaskController.getById);
router.put("/:id", verifyAccessToken, TaskController.update);
router.delete("/:id", verifyAccessToken, TaskController.delete);

module.exports = router;
