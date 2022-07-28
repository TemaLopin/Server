const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const { FILTERS, SORT_BY_DATE } = require("../constant/constant");

router.get("/todos", async (req, res) => {
  try {
    const data = await fs.readFile("todoList.json");
    let todos = JSON.parse(data);
    let count = todos.length;

    if (req.query.order === SORT_BY_DATE.ASC) {
      todos = todos.sort((prev, next) => {
        return new Date(prev.createdAt) - new Date(next.createdAt);
      });
    }
    if (req.query.order === SORT_BY_DATE.DESC) {
      todos = todos.sort((prev, next) => {
        return new Date(next.createdAt) - new Date(prev.createdAt);
      });
    }
    if (req.query.filterBy === FILTERS.DONE) {
      todos = todos.filter((task) => task.done);
      count = todos.length;
    }
    if (req.query.filterBy === FILTERS.UNDONE) {
      todos = todos.filter((task) => !task.done);
      count = todos.length;
    }
    if (req.query.pp && req.query.page) {
      const lastTaskIndex = req.query.page * req.query.pp;
      const firstTaskIndex = lastTaskIndex - req.query.pp;
      todos = todos.slice(firstTaskIndex, lastTaskIndex);
    }

    res.send({ count: count, todos });
  } catch (err) {
    res.status(err.status).send(err);
  }
});

module.exports = router;
