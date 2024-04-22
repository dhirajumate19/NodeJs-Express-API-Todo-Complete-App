/* eslint-disable comma-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import { v4 as uuid } from "uuid";
import Jwt from "jsonwebtoken";
import { todos } from "../../../app.js";
import { createResponse } from "../../utilities/responseHandler/createReponse.js";

export const handleTodosPostCall = (req, res) => {
  try {
    const { title, description } = req.body;
    const { authorization } = req.headers;
    const timeStamp = new Date().toISOString();
    const id = parseInt(uuid(), 10);
    let Id;
    if (!Number.isNaN(id)) {
      // Handle valid integer
      Id = id.toFixed();
    } else {
      // Handle case where `uuid()` did not generate a valid integer
      console.error(
        "uuid() did not generate a valid UUID. Generating fallback ID..."
      );
      // Generate a fallback ID using a different method, for example:
      Id = Math.floor(Math.random() * 1000).toFixed();
    }
    const newTodo = {
      Id,
      title,
      description,
      // eslint-disable-next-line comma-dangle
      timeStamp
    };
    if (Jwt.verify(authorization, "secretKey")) {
      todos.push(newTodo);
    } else {
      res.status(401).json(createResponse(401, "Your Token is not valid"));
    }

    const response = createResponse(newTodo, "Todo Created Succesfully");
    res.status(201).json(response);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

export const handleTodosGetCall = (req, res) => {
  try {
    const response = createResponse(
      { todos, totalRecords: todos.length },
      todos.length > 0 ? "Todo List" : "Empty List"
    );
    res.status(200).send(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
