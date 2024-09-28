import { 
  teamService,
  teamPlayerService,
} from '../../../services/index.js';

export async function getAllPlayers(teamPlayersDTO) {
  const team = await teamService.getById(teamPlayersDTO.teamId);

  if (!team) {
    throw new Error('Team not found');
  }

  return await teamPlayerService.getAll();
}