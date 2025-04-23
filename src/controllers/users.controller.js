'use strict';

import {
  getAllTeamsByUser as getTeamsByUserUseCase,
} from "../use-cases/team/index.js";

import {
  getAllMatchesByUserId as getMatchesByUserUseCase,
} from "../use-cases/matches/index.js";


const getAllTeamsByUser = async (req, res) => {
  const { userId } = req.authorizer;

  try {
    const teams = await getTeamsByUserUseCase(userId);
  
    res.send({
      message: "",
      body: teams,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAllMatchesByUser = async (req, res) => {
  const { userId } = req.authorizer;

  try {
    const matches = await getMatchesByUserUseCase(userId);
  
    res.send({
      message: "",
      body: matches,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default {
  getAllTeamsByUser,
  getAllMatchesByUser,
}