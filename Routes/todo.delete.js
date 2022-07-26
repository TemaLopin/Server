const express = require("express");
const fs = require("fs").promises;
const router = express.Router();

router.delete("/todo/:uuid", (req, res) => {
  const { params: { uuid } } = req;
    fs.readFile("todoList.json")
      .then((data) => {
        const todos = JSON.parse(data);
        const deletedTask = todos.find(item => item.uuid === uuid)
        newTasks = todos.filter((task) => task.uuid !== deletedTask.uuid)
        fs.writeFile("data.json", JSON.stringify(newTasks));
        return res.send(`Task with uuid ${deletedTask.uuid} was deleted`);
      })
  });

module.exports = router;