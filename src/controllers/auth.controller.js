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
    expiresIn: "30s",
  });

  user.token = token;
  req.headers.authorization = token;

  return token;
}

function _setRefreshToken(req, user) {
  const refreshTokenData = {
    id: user.id,
    email: user.email,
  };
  const refreshToken = jsonwebtoken.sign(refreshTokenData, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  user.refreshToken = refreshToken;
  req.headers.refreshToken = refreshToken;

  return refreshToken;
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
    _setRefreshToken(req, user);
  
    res.status(200).send({
      message: "User logged in successfully",
      body: user,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw new Error("Unauthorized");
    }

    if (!refreshToken) {
      throw new Error("Unauthorized");
    }

    const tokenUser = jsonwebtoken.decode(authorization);
    const refreshTokenUser = jsonwebtoken.decode(refreshToken);

    if (tokenUser.id !== refreshTokenUser.id) {
      throw new Error("Unauthorized");
    }

    const user = await getUserByEmailUseCase({ email: refreshTokenUser.email });

    const token = _setToken(req, user);
    const newRefreshToken = _setRefreshToken(req, user);

    res.status(200).send({
      message: "Token refreshed successfully",
      body: {
        token,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: error.message,
    });
  }
};

export default {
  register,
  login,
  refreshToken,
};
