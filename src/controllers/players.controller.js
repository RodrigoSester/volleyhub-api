import {
  getAllPlayers as getAllPlayersUseCase,
  getPlayerById as getPlayerByIdUseCase,
  editPlayer as editPlayerUseCase,
  removeTeamPlayer as removeTeamPlayerUseCase,
} from '../use-cases/team/index.js';

import crypto from 'crypto';

const getAll = async (req, res) => {
  const teamId = req.params.teamId;

  try {
    const teamPlayersDTO = {
      teamId,
    };
    const players = await getAllPlayersUseCase(teamPlayersDTO);
  
    res.send({
      message: "",
      body: players,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  const { teamId, id } = req.params;

  try {
    const teamPlayersDTO = {
      teamId,
      playerId: id,
    };
    const player = await getPlayerByIdUseCase(teamPlayersDTO);
  
    res.send({
      message: "",
      body: player,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const _isValidLink = (linkParams) => {
  const hashParams = {
    teamId: linkParams.teamId,
    teamOwnerId: linkParams.teamOwnerId,
  };
  const hashCheck = crypto.createHash('sha256').update(JSON.stringify(hashParams)).digest('hex');

  return linkParams.hash === hashCheck;
}

const invitePlayer = async (req, res) => {
  const { teamId, userId: teamOwnerId, hash } = req.query;
  const { userId } = req.authorizer;

  if (!_isValidLink({ teamId, teamOwnerId, hash })) {
    res.status(400).json({
      message: "Invalid link",
    });
  }

  try {
    const teamPlayersDTO = {
      teamId,
      playerId: userId,
      shirtNumber: null,
      type: 'player',
      isActive: true,
      userId: teamOwnerId,
      hash,
    };
    const player = await registerPlayerUseCase(teamPlayersDTO);
  
    res.send({
      message: "Player invited successfully",
      body: player,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const edit = async (req, res) => {
  const { teamId, id } = req.params;
  const { userId } = req.authorizer;

  try {
    const teamPlayersDTO = {
      ...req.body,
      teamId,
      playerId: id,
      user_id: userId,
    };
    const player = await editPlayerUseCase(teamPlayersDTO);
  
    res.send({
      message: "Player updated successfully",
      body: player,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  const { teamId, id } = req.params;
  const { userId } = req.authorizer;

  try {
    const teamPlayersDTO = {
      id,
      teamId,
      user_id: userId,
    };
    const player = await removeTeamPlayerUseCase(teamPlayersDTO);
  
    res.send({
      message: "Team player removed successfully",
      body: player,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default {
  getAll,
  getById,
  invitePlayer
  edit,
  remove,
}