import {
  getAllPlayers as getAllPlayersUseCase,
  getPlayerById as getPlayerByIdUseCase,
  editPlayer as editPlayerUseCase,
  removeTeamPlayer as removeTeamPlayerUseCase,
} from '../use-cases/team/index.js';

const getAll = async (req, res) => {
  const teamId = req.params.teamId;

  const teamPlayersDTO = {
    teamId,
  };
  const players = await getAllPlayersUseCase(teamPlayersDTO);

  res.send({
    message: "",
    body: players,
  });
};

const getById = async (req, res) => {
  const teamId = req.params.teamId;
  const playerId = req.params.playerId;

  const teamPlayersDTO = {
    teamId,
    playerId,
  };
  const player = await getPlayerByIdUseCase(teamPlayersDTO);

  res.send({
    message: "",
    body: player,
  });
};

const edit = async (req, res) => {
  const teamId = req.params.teamId;
  const playerId = req.params.playerId;

  const teamPlayersDTO = {
    teamId,
    playerId,
    ...req.body,
  };
  const player = await editPlayerUseCase(teamPlayersDTO);

  res.send({
    message: "",
    body: player,
  });
};

const remove = async (req, res) => {
  const teamId = req.params.teamId;
  const playerId = req.params.playerId;

  const teamPlayersDTO = {
    teamId,
    playerId,
  };
  const player = await removeTeamPlayerUseCase(teamPlayersDTO);

  res.send({
    message: "",
    body: player,
  });
};

export default {
  getAll,
  getById,
  edit,
  remove,
}