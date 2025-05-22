
const express = require("express");
const { getTodos, addTodo, deleteTodo } = require("../controllers/todoController");
const { summarizeTodos } = require("../services/geminiService");

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", addTodo);
router.delete("/todos/:id", deleteTodo);
router.post("/summarize", summarizeTodos);

module.exports = router;
