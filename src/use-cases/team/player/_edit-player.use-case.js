import {
  teamService,
  teamPlayerService,
} from '../../../services/index.js';

export async function editPlayer(playerDTO) {
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