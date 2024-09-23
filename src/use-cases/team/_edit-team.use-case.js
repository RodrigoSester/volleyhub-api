import Joi from 'joi';
import { teamService } from '../../services';

function _validateUpdateTeamBody(team) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    abbreviation: Joi.string().max(5).required(),
    flag_url: Joi.string().uri(),
    monthly_fee: Joi.number().integer(),
  });
  
  const { error } = schema.validate(team);
  
  if (error) {
    throw new Error(error.message);
  }
}

export async function editTeam(body) {
  _validateUpdateTeamBody(body);

  const team = teamService.getById(body.id);

  if (!team) {
    throw new Error(`Team ${team.id} does not exists`);
  }

  try {
    const teamUpdated = await teamService.edit(body);

    return teamUpdated;
  } catch (error) {
    throw new Error(error.message);
  }
}