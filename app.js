/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import express from "express";
import userRoute from "./src/api/account/accounts.routes.js";
import todosRouter from "./src/api/todos/todos.routes.js";
import connectDB from "./src/config/DBConnection.js";

const app = express();
const PORT = 3000;
connectDB();

export const todos = [];

app.use(express.json());
app.use("/accounts", userRoute);
app.use("/todos", todosRouter);
app.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
});
