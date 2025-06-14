import {
  registerMatch as registerMatchUseCase
} from "../use-cases/matches/index.js";

const register = async (req, res) => {
  const { userId } = req.authorizer;
  const matchDTO = {
    ...req.body,
    userId,
  };

  try {
    const match = await registerMatchUseCase(matchDTO);
    
    res.status(201).send({
      message: "Match registered successfully",
      body: match,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export default {
  register
};