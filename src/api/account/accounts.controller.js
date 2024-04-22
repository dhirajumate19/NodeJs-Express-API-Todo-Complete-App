/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable new-cap */
/* eslint-disable comma-dangle */
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
// eslint-disable-next-line import/no-cycle
import { createResponse } from "../../utilities/responseHandler/createReponse.js";
import accountModel from "./accounts.model.js";

export const handlerSignUp = async (req, res) => {
  const { userName, userEmail, userPassword, userGender, userAddress } =
    req.body;
  const userDetails = {
    id: uuid(),
    userName,
    userEmail,
    userPassword,
    userGender
  };
  const { building, flatNo, pinCode } = userAddress;
  console.log("flatno", flatNo);

  const newUser = {
    ...userDetails,
    userAddress: { building, flatNo, pinCode }
  };
  const dbrespose = await accountModel.create(newUser);

  res.status(201).json(createResponse(dbrespose, "User created Successfully"));
};

// Handle sign in get data from req body and generate token
export const handleSignIn = async (req, res) => {
  const { userEmail } = req.body;
  const userToken = jwt.sign({ id: "123poop" }, "secretKey");
  const dbResponse = await accountModel.findOne({ userEmail });
  return res
    .status(200)
    .json(createResponse({ Token: userToken, dbResponse }, "User Logged in "));
};
