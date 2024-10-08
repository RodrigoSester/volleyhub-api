import {
  teamService,
  teamPlayerService,
} from '../../../services/index.js';

export async function removeTeamPlayer(playerDTO) {
  const team = await teamService.getById(playerDTO.teamId);

  if (!team) {
    throw new Error('Team not found');
  }

  const player = await teamPlayerService.getById(playerDTO.id);

  if (!player) {
    throw new Error('Player not found');
  }

  const playerRemoved = await teamPlayerService.remove(playerDTO);

  return playerRemoved;
};