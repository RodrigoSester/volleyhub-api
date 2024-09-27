import Joi from 'joi';
import { teamService } from '../../services/index.js';

function _validateTeamBody(team) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    abbreviation: Joi.string().max(5).required(),
    flag_url: Joi.string().uri(),
    monthly_fee: Joi.number().integer(),
    modality: Joi.string().valid('female', 'male', 'mixed').required(),
    user_id: Joi.number().integer().required(),
  });
  
  const { error } = schema.validate(team);
  
  if (error) {
    throw new Error(error.message);
  }
}

export async function registerTeam(teamDTO) {
  _validateTeamBody(teamDTO);

  try {
    const teamRegistered = await teamService.register(teamDTO);
  
    return teamRegistered;
  } catch (error) {
    if (error.constraint === 'teams_name_unique') {
      throw new Error("Team name already in use");
    }

    throw new Error(error.message);
  }
}