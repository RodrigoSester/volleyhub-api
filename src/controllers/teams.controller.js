import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

import {
  registerTeam as registerTeamUseCase,
} from "../use-cases/teams/index.js";


const register = async (req, res) => {
  const body = {...req.body};

  jsonwebtoken.verify(body.token, dotenv.config().parsed?.JWT_SECRET);

  const authorizer = jsonwebtoken.decode(body.token);

  body.authorizer = authorizer;

  const user = await registerTeamUseCase(body);

  res.send({
    message: "User registered successfully",
    body: user,
  }).status(201);
};

export default {
  register,
};
