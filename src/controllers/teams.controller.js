import {
  editTeam as editTeamUseCase,
  registerTeam as registerTeamUseCase,
  removeTeam as removeTeamUseCase,
} from "../use-cases/team/index.js";

import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

const register = async (req, res) => {
  const body = {...req.body};

  jsonwebtoken.verify(body.token, dotenv.config().parsed?.JWT_SECRET);

  const authorizer = jsonwebtoken.decode(body.token);

  body.authorizer = authorizer;

  const team = await registerTeamUseCase(body);

  res.send({
    message: "Team registered successfully",
    body: team,
  }).status(201);
};

const edit = async (req, res) => {
  const body = {...req.body};

  const updatedTeam = await editTeamUseCase(body);

  res.send({
    message: "Team updated successfully",
    body: updatedTeam,
  }).status(200);
};

const remove = async (req, res) => {
  const teamId = req.params.id;

  await removeTeamUseCase(teamId);

  res.send({
    message: "Team removed successfully",
  }).status(204);
};

export default {
  register,
  edit,
  remove,
};
