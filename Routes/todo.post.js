const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const uuid = require("uuid");

router.post("/todos/", (req, res, next) => {
  try {
    if (!req.body.name) {
      const error = new Error("Invalid fields in request!!!");
      error.status = 422;
      return next(error);
    }
    fs.readFile("todoList.json").then((data) => {
      const todos = JSON.parse(data);

      const createdTask = {
        name: req.body.name,
        uuid: uuid.v4(),
        done: req.body.done || false,
        createdAt: new Date(),
        updateAt: new Date(),
      };

      todos.push(createdTask);

      fs.writeFile("todoList.json", JSON.stringify(todos));
      res.send(createdTask);
    });
  } catch (error) {
    return res.send("Error." + " " + error.message);
  }
});

module.exports = router;
