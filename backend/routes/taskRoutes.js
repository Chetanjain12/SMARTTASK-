const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  softDeleteTask,
  restoreTask,
  permanentDeleteTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", softDeleteTask);
router.put("/restore/:id", restoreTask);
router.delete("/permanent/:id", permanentDeleteTask);

module.exports = router;