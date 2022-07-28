const express = require("express");
const fs = require("fs").promises;
const { COUNT_SYMBOL_IN_TASK } = require("../constant/constant");
const uuid = require("uuid");

const router = express.Router();

router.post("/todos", async (req, res) => {
  try {
    const addiction = /[a-zA-Z0-9А-Яа-я]/g;
    if (!req.body.name || !addiction.test(req.body.name)) {
      return res
        .status(422)
        .send("Invalid fields in request! Try to rewrite your task");
    }
    if (req.body.name.length > COUNT_SYMBOL_IN_TASK) {
      return res.status(500).send("Too many symbols. Max is 250");
    }

    const data = await fs.readFile("todoList.json");

    const todos = JSON.parse(data);
    const twinTask = todos.find((item) => item.name === req.body.name);

    if (twinTask) {
      return res
        .status(400)
        .send("Task not created! Maybe the same task already exists");
    }
    const createdTask = {
      name: req.body.name,
      uuid: uuid.v4(),
      done: false,
      createdAt: new Date(),
      updateAt: new Date(),
    };
    todos.push(createdTask);
    fs.writeFile("todoList.json", JSON.stringify(todos, null, "\t"));
    res.send(createdTask);
  } catch (err) {
    res.status(err.status).send(err);
  }
});

module.exports = router;
