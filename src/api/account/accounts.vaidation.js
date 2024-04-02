import { accounts } from "../../../app.js";
import { createResponse } from "../../utilities/responseHandler/createReponse.js";
//validate email using regex
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

//validation comman data for user
const validateData = (data) => {
  if (!data || data.trim() === 0) {
    return false;
  }
  return true;
};
export const validateUserSignUpDetail = (req, res, next) => {
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

export const validateUserSignIn = (req, res, next) => {
  const { userEmail, userPassword } = req.body;

  // Extracting existing user emails and passwords for comparison using map
  const userEmailAlready = accounts.map((account) => account.userEmail);
  const userPasswordAlready = accounts.map((account) => account.userPassword);

  if (!validateData(userEmail) || !validateEmail(userEmail)) {
    return res
      .status(401)
      .json(createResponse(401, "Enter Email or Email  is not valid"));
  }
  if (!validateData(userPassword) || userPassword.length === 0) {
    return res.status(401).json(createResponse(401, "Enter password"));
  }

  // Check if provided email and password match any existing user
  if (
    !userEmailAlready.includes(userEmail) ||
    !userPasswordAlready.includes(userPassword)
  ) {
    return res
      .status(401)
      .json(
        createResponse(401, "Email or Password does not match with you tried")
      );
  }
  // If validations pass and user is found, proceed to the next middleware
  next();
};
