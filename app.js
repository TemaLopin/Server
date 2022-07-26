require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use("/", require('./Routes/todo.get'))
app.use("/", require('./Routes/todo.delete'))
app.use("/", require('./Routes/todo.post'))
app.use("/", require('./Routes/todo.patch'))




app.listen(5000)
