const express = require("express");

const {
  newTodo,
  allTodos,
  updateTodo,
  deleteTodo,
  updateTodoStatus,
} = require("../controller/todoController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// create
router.post("/new-todo", authMiddleware, newTodo);

// read / get todos by user_email
router.get("/alltodos/:user_email", authMiddleware, allTodos);

// update by id
router.put("/update/:id", authMiddleware, updateTodo);

// update task status by id
router.patch("/update/status/:id", updateTodoStatus);

// delete by id
router.delete("/delete-todo/:id", authMiddleware, deleteTodo);

module.exports = router;
