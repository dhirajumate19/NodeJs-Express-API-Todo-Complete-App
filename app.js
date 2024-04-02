import express from "express";
import userRoute from "./src/api/account/accounts.routes.js";
const app = express();
const PORT = 3000;
export let accounts = [];

app.use(express.json());
app.use("/accounts", userRoute);
app.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
});
