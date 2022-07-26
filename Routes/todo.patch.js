const express = require("express");
const fs = require("fs").promises;

const router = express.Router();

router.patch("/todo/:uuid", (req, res) => {
    const { params: { uuid }, body } = req;
    fs.readFile('todoList.json').then(date => {
        const todos = JSON.parse(date)
        const currentTodos = todos.filter(task => task.uuid !== uuid)
        const changeableTask = todos.find(task => task.uuid === uuid)
        const newTask = {...changeableTask, ...body,  }
        currentTodos.push(newTask)

        fs.writeFile("todoList.json", JSON.stringify(currentTodos));
    })
         return res.send('Task was updated\n');

 })

  module.exports = router