const express = require("express");
const fs = require("fs").promises;
const {COUNT_SYMBOL_IN_TASK} = require('../constant/constant')
const router = express.Router();

router.patch("/todo/:uuid", async (req, res) => {
  try {
    const {
      params: { uuid },
      body,
    } = req;

    const regExp = /[a-zA-Z0-9]/g;
    if (body.name !== undefined) {
      if (!body.name || !regExp.test(body.name)) {
        return res
          .status(422)
          .send("Invalid fields in request! Try to rewrite your task");
      }
      if (body.name.length > COUNT_SYMBOL_IN_TASK) {
        res.status(500).send("Too many symbols. Max is 250");
      }
    }

    const data = await fs.readFile("todoList.json");
    const todos = JSON.parse(data);
    const twinTask = todos.find(
      (item) => item.name === body.name && item.uuid !== uuid
    );

    if (twinTask) {
      return res
        .status(400)
        .send("Task not created! Maybe the same task already exists");
    }
    const currentTask = todos.find((item) => item.uuid === uuid);
    const updatedTask = { ...currentTask, ...body };

    const newTasks = todos.map((item) => {
      if (item.uuid === uuid) {
        const newItem = { ...item, ...body, updateAT: new Date()};
        return newItem;
      }
      return item;
    });

    fs.writeFile("todoList.json", JSON.stringify(newTasks, null, '\t'));

    return res.send(updatedTask);
  } catch (err) {
    res.status(err.status).send(err);
  }
});

module.exports = router;
