import {
  getUserByEmail as getUserByEmailUseCase,
  registerUser as registerUserUseCase,
} from "../use-cases/user/index.js";

import jsonwebtoken from "jsonwebtoken";

const register = async (req, res) => {
  const body = {...req.body};

  const user = await registerUserUseCase(body);

  jsonwebtoken.sign({ user });

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
  };

  const user = await getUserByEmailUseCase(userDTO);

  jsonwebtoken.verify({ user });

  res.send({
    message: "User logged in successfully",
    body: user,
  }).status(200);
};

export default {
  register,
  login,
};
