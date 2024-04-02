import { accounts } from "../../../app.js";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import { createResponse } from "../../utilities/responseHandler/createReponse.js";
export const handlerSignUp = (req, res) => {
  const { userName, userEmail, userPassword, userGender } = req.body;
  const newUser = {
    id: uuid(),
    userName,
    userEmail,
    userPassword,
    userGender,
  };
  accounts.push(newUser);

  res.status(201).json(createResponse(newUser, "User created Successfully"));
};

//Handle sign in get data from req body and generate token
export const handleSignIn = (req, res) => {
  const { userEmail, userPassword } = req.body;
  const userToken = jwt.sign({ id: "123poop" }, "secretKey");
  return res
    .status(200)
    .json(
      createResponse(
        { Token: userToken, userEmail: userEmail },
        "User Logged in "
      )
    );
};
