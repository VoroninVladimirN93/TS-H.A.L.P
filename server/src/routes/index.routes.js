const router = require("express").Router();
const authRoutes = require("./user.routes");
const taskRoutes = require("./task.routes");
const formatResponse = require("../utils/formatResponse");

router
  .use("/auth", authRoutes)
  .use("/tasks", taskRoutes)

router.use("*", (req, res) => {
  res
    .status(404)
    .json(formatResponse(404, "Not found", null, "Resource not found"));
});

module.exports = router;
