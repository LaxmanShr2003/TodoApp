const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');

// Routes
router.post('/todos', todoController.createTodo); // POST /todos
router.get('/todos', todoController.getTodos); // GET /todos
router.patch('/todos/:id', todoController.updateTodo); // PUT /todos/:id
router.delete('/todos/:id', todoController.deleteTodo); // DELETE /todos/:id

module.exports = router;
