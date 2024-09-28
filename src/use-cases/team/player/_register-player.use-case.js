import {
  teamService,
  teamPlayerService,
  userService,
} from '../../../services/index.js';

import Joi from 'joi';

function _validateRegisterTeamPlayer(teamPlayerDTO) {
  const schema = Joi.object({
    teamId: Joi.number().integer().required(),
    playerId: Joi.number().integer().required(),
    shirtNumber: Joi.number().integer().empty(null),
    isActive: Joi.boolean().required(),
    type: Joi.string().valid('player', 'coach', 'assistant', 'owner').required(),
    userId: Joi.number().integer().required(),
  });

  const { error } = schema.validate(teamPlayerDTO);
  
  if (error) {
    throw new Error(error.details[0].message);
  }
}

const registerTeamPlayer = async (teamPlayerDTO) => {
  _validateRegisterTeamPlayer(teamPlayerDTO);

  const team = await teamService.getById(teamPlayerDTO.teamId);

  if (!team) {
    throw new Error('Team not found');
  }

  const user = await userService.getById(teamPlayerDTO.user_id);

  if (!user) {
    throw new Error('User not found');
  }

  return await teamPlayerService.register(teamPlayerDTO);
};