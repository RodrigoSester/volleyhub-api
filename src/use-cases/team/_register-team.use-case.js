import Joi from 'joi';
import { teamService } from '../../services';

function _validateTeamBody(team) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    abbreviation: Joi.string().max(5).required(),
    flag_url: Joi.string().uri(),
    monthly_fee: Joi.number().integer(),
    modality_enum: Joi.string().valid('female', 'male', 'mixed').required(),
  });
  
  const { error } = schema.validate(team);
  
  if (error) {
    throw new Error(error.message);
  }
}

export async function registerTeam(team) {
  _validateTeamBody(team);

  try {
    const teamRegistered = await teamService.register(team);

    return teamRegistered;
  } catch (error) {
    throw new Error(error.message);
  }
}