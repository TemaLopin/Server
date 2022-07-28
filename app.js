require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const app = express();
const morgan = require("morgan");
app.disable("etag");

// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

app.use((err, req, res, next)=> {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", require("./Routes/todo.get"));
app.use("/", require("./Routes/todo.delete"));
app.use("/", require("./Routes/todo.post"));
app.use("/", require("./Routes/todo.patch"));



app.listen(PORT, () => {
  console.log("Server start on port", PORT);
});
