/* eslint-disable import/no-cycle */
import express from "express";
import { handleTodosGetCall, handleTodosPostCall } from "./todos.controller.js";

const todosRouter = express.Router();

todosRouter.get("/alltodos", handleTodosGetCall);

todosRouter.post("/addtodos", handleTodosPostCall);

export default todosRouter;
