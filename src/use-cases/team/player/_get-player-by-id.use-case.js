import { 
  teamService,
  teamPlayerService,
} from '../../../services/index.js';


export async function getPlayerById(teamPlayersDTO) {
  const team = await teamService.getById(teamPlayersDTO.teamId);

  if (!team) {
    throw new Error('Team not found');
  }

  const player = await teamPlayerService.getById(teamPlayersDTO.playerId);

  if (!player) {
    throw new Error('Player not found');
  }

  return player;
};