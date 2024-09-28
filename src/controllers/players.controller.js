import {
  getAllPlayers as getAllPlayersUseCase,
  getPlayerById as getPlayerByIdUseCase,
  editPlayer as editPlayerUseCase,
  removeTeamPlayer as removeTeamPlayerUseCase,
} from '../use-cases/team/index.js';

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