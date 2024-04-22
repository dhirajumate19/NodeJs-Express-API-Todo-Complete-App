/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */

import { createResponse } from "../../utilities/responseHandler/createReponse.js";
import accountModel from "./accounts.model.js";
// validate email using regex
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// validation comman data for user
const validateData = (data) => {
  if (!data || data.trim() === 0) {
    return false;
  }
  return true;
};
export const validateUserSignUpDetail = (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { userName, userEmail, userPassword, userGender } = req.body;

  if (!validateData(userName)) {
    return res.status(400).json(createResponse(400, "Plaease Check User Name"));
  }
  if (!validateData(userEmail) || !validateEmail(userEmail)) {
    return res
      .status(400)
      .json(createResponse(400, "Plaease Check User Email"));
  }
  if (!validateData(userPassword) || userPassword.length === 0) {
    return res
      .status(400)
      .json(createResponse(400, "Plaease Check User Password"));
  }
  if (!validateData(userGender)) {
    return res
      .status(400)
      .json(createResponse(400, "Plaease Check User gender"));
  }
  // If all validations pass, proceed to the next middleware
  next();
};

export const validateUserSignIn = async (req, res, next) => {
  const { userEmail, userPassword } = req.body;

  if (userEmail && userPassword) {
    const userMail = await accountModel.findOne({ userEmail });
    if (userMail) {
      if (userMail.userPassword !== userPassword) {
        return res
          .status(401)
          .json(createResponse(401, "Email or Password does not match"));
      }
    } else {
      return res
        .status(401)
        .json(
          createResponse(401, "Email or Password does not match with you tried")
        );
    }
  } else {
    return res
      .status(401)
      .json(createResponse(401, "Enter Email or Password "));
  }

  if (!validateData(userEmail) || !validateEmail(userEmail)) {
    return res
      .status(401)
      .json(createResponse(401, "Enter Email or Email  is not valid"));
  }
  if (!validateData(userPassword) || userPassword.length === 0) {
    return res.status(401).json(createResponse(401, "Enter password"));
  }

  // If validations pass and user is found, proceed to the next middleware
  next();
};
