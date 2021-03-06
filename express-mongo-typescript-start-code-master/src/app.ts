require("dotenv").config();
import express from "express";
import path from "path";
const app = express();
import { users, UserFacade } from "../facades/userFacade";

// Enable reading body
// Middleware
app.use(express.json());

// app.get("/api/dummy", (req, res) => {
//   res.json({ msg: "Hello" });
// });

app.get("/api/users", (req, res) => {
  res.send(UserFacade.getAllUsers());
});

// app.get("/api/user/:id", (req, res) => {
//   const id = req.params.id;
//   UserFacade.getUser();
// });

/**
 * POST
 */
app.post("/api/user", (req, res) => {
  const user = {
    name: req.body.name,
    userName: req.body.username,
    password: req.body.password,
    role: req.body.role
  };
  const success = UserFacade.addUser(user);
  if (success) {
    res.send("User has been created");
  } else {
    res.send("Failed to create user");
  }
});

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT);
console.log(`Server started, listening on port: ${PORT}`);
module.exports.server = server;
