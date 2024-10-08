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
  const { userId } = req.authorizer;

  const teamDTO = {
    ...req.body,
    id: req.params.id,
    user_id: userId,
  };

  try {
    const updatedTeam = await editTeamUseCase(teamDTO);

    res.send({
      message: "Team updated successfully",
      body: updatedTeam,
    }).status(200);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }

};

const remove = async (req, res) => {
  const teamId = req.params.id;
  const { userId } = req.authorizer;

  try {
    await removeTeamUseCase(teamId, userId);
  
    res.send({
      message: "Team removed successfully",
    }).status(204);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }

};

const getAll = async (req, res) => {
  try {
    const teams = await getAllTeamsUseCase();
  
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

const getById = async (req, res) => {
  const teamId = req.params.id;

  try {
    const team = await getTeamByIdUseCase(teamId);
  
    res.send({
      message: "",
      body: team,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default {
  register,
  edit,
  remove,
  getAll,
  getById,
};
