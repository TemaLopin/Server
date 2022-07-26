const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

router.get("/todos/", (req, res) => {
  fs.readFile("todoList.json").then((date) => {
    let todos = JSON.parse(date);
    if (req.query.filterBy === "done") {
      todos = todos.filter((item) => item.done);
    }
    if (req.query.filterBy === "undone") {
      todos = todos.filter((item) => !item.done);
    }

    if (req.query.order === "asc") {
      todos = todos.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }
    if (req.query.order === "desc") {
      todos = todos.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    if (req.query.pp && req.query.page) {
      const lastTaskIndex = req.query.page * req.query.pp;
      const firstTaskIndex = lastTaskIndex - req.query.pp;
      todos = todos.slice(firstTaskIndex, lastTaskIndex);
    }

    res.send({ count: todos.length, todos });
  });
});

module.exports = router;
