import {
  editTeam as editTeamUseCase,
  getAllTeams as getAllTeamsUseCase,
  getTeamById as getTeamByIdUseCase,
  registerTeam as registerTeamUseCase,
  removeTeam as removeTeamUseCase,
} from "../use-cases/team/index.js";

const register = async (req, res) => {
  const body = {...req.body};
  const { userId } = req.authorizer;

  const teamDTO = {
    ...body,
    user_id: userId,
  };

  try {
    const team = await registerTeamUseCase(teamDTO);
  
    res.send({
      message: "Team registered successfully",
      body: team,
    }).status(201);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
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

const getAll = async (req, res) => {
  const teams = await getAllTeamsUseCase();

  res.send({
    message: "",
    body: teams,
  });
};

const getById = async (req, res) => {
  const teamId = req.params.id;

  const team = await getTeamByIdUseCase(teamId);

  res.send({
    message: "",
    body: team,
  });
};

export default {
  register,
  edit,
  remove,
  getAll,
  getById,
};
