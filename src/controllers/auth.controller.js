import {
  getUserByEmail as getUserByEmailUseCase,
  registerUser as registerUserUseCase,
} from "../use-cases/user/index.js";

import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

function _setToken(req, user) {
  const tokenData = {
    id: user.id,
    email: user.email,
  };
  const token = jsonwebtoken.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  user.token = token;
  req.headers.authorization = token;

  return token;
}

const register = async (req, res) => {
  const body = {...req.body};

  try {
    const user = await registerUserUseCase(body);
  
    _setToken(req, user);
  
    res.send({
      message: "User registered successfully",
      body: user,
    }).status(201);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  const body = {...req.body};

  const userDTO = {
    email: body.email,
    password: body.password,
  };

  try {
    const user = await getUserByEmailUseCase(userDTO);

    const isPasswordValid = await bcrypt.compare(userDTO.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
  
    _setToken(req, user);
  
    res.send({
      message: "User logged in successfully",
      body: user,
    }).status(200);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default {
  register,
  login,
};
