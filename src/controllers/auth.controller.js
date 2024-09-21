import {
  getUserByEmail as getUserByEmailUseCase,
  registerUser as registerUserUseCase,
} from "../use-cases/user/index.js";

import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

const register = async (req, res) => {
  const body = {...req.body};

  const user = await registerUserUseCase(body);

  const token = jsonwebtoken.sign({ user }, dotenv.config().parsed?.JWT_SECRET, {
    expiresIn: "1h",
  });

  user.token = token;

  res.send({
    message: "User registered successfully",
    body: user,
  }).status(201);
};

const login = async (req, res) => {
  const body = {...req.body};

  const userDTO = {
    email: body.email,
    password: body.password,
    token: body.token,
  };

  const user = await getUserByEmailUseCase(userDTO);

  jsonwebtoken.verify(user.token, dotenv.config().parsed?.JWT_SECRET);

  res.send({
    message: "User logged in successfully",
    body: user,
  }).status(200);
};

export default {
  register,
  login,
};
