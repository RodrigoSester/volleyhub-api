import Joi from 'joi';
import { teamService } from '../../services/index.js';

function _validateUpdateTeamBody(team) {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().min(3).required(),
    abbreviation: Joi.string().max(5).required(),
    flag_url: Joi.string().uri().empty(''),
    monthly_fee: Joi.number().integer(),
    user_id: Joi.number().integer().required(),
  });
  
  const { error } = schema.validate(team);
  
  if (error) {
    throw new Error(error.message);
  }
}

export async function editTeam(body) {
  _validateUpdateTeamBody(body);

  const team = await teamService.getById(body.id);

  if (!team) {
    throw new Error(`Team ${team.id} does not exists`);
  }

  try {
    const teamUpdated = await teamService.edit(body);

    return teamUpdated;
  } catch (error) {
    if (error.constraint === 'teams_name_unique') {
      throw new Error("Team name already in use");
    }

    throw new Error(error.message);
  }
}