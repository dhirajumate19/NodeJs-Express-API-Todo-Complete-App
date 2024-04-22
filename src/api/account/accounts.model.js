/* eslint-disable comma-dangle */

import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
  userName: { type: String },
  userEmail: { type: String },
  userPassword: { type: String },
  userGender: { type: String },
  userAddress: {
    building: { type: String },
    flatNo: { type: Number },
    pinCode: { type: Number }
  }
});

const accountModel = mongoose.model("accounts", accountSchema);
export default accountModel;
