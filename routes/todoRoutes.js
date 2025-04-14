const addTodo = require("../controllers/todo/addTodoItem");
const changeTodoStatus = require("../controllers/todo/changeTodoStatus");
const getTodoDetailsById = require("../controllers/todo/getTodoDetailsById");
const getTodoList = require("../controllers/todo/getTodoList");
const updateTodoItem = require("../controllers/todo/updateTodoItem");
const verifyJwtToken = require("../middleware/verifyJwtToken");

const todoRoutes = require("express").Router();

todoRoutes.post("/add-todo", verifyJwtToken, addTodo);
todoRoutes.post("/get-todo-list", verifyJwtToken, getTodoList);
todoRoutes.post("/update-todo", verifyJwtToken, updateTodoItem);
todoRoutes.post("/change-todo-status", verifyJwtToken, changeTodoStatus);
todoRoutes.post("/get-todo-detail", verifyJwtToken, getTodoDetailsById);

module.exports = todoRoutes;