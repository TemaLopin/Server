const express = require("express");
const { defaultError } = require("../Utilits/ErrorMessage");
const fs = require("fs").promises;

const router = express.Router();

router.delete("/todo/:uuid", async (req, res) => {
  try {
    const {
      params: { uuid },
    } = req;
    const data = await fs.readFile("todoList.json");

    const todos = JSON.parse(data);
    const deletedTask = todos.find((item) => item.uuid === uuid);

    if (!deletedTask) {
      return res.status(404).send("Task not found");
    }
    newTasks = todos.filter((task) => task.uuid !== deletedTask.uuid);
    fs.writeFile("todoList.json", JSON.stringify(newTasks));
    return res.send(`Task with uuid ${deletedTask.uuid} was deleted`);
  } catch (err) {
    res.status(err.status).send(err);
  }
});

module.exports = router;
