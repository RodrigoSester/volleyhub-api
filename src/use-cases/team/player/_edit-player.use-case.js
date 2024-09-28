import {
  teamService,
  teamPlayerService,
} from '../../../services/index.js';

import Joi from 'joi';

function _validateUpdateTeamPlayerBody(team) {
  const schema = Joi.object({
    teamId: Joi.number().integer().required(),
    playerId: Joi.number().integer().required(),
    shirt_number: Joi.number().integer().required(),
    is_active: Joi.boolean().required(),
    type: Joi.string().valid('player', 'coach', 'assistant', 'owner').required(),
    user_id: Joi.number().integer().required(),
  });
  
  const { error } = schema.validate(team);
  
  if (error) {
    throw new Error(error.message);
  }
}

export async function editPlayer(playerDTO) {
  _validateUpdateTeamPlayerBody(playerDTO);

  const team = await teamService.getById(playerDTO.teamId);

  if (!team) {
    throw new Error('Team not found');
  }

  const player = await teamPlayerService.getById(playerDTO.playerId);

  if (!player) {
    throw new Error('Player not found');
  }

  const playerUpdated = await teamPlayerService.edit(playerDTO);

  return playerUpdated;
};