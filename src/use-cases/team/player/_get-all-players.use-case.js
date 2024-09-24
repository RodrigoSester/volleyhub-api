import { 
  teamService,
  teamPlayerService,
} from '../../../services/index.js';

export async function getAllPlayers(teamPlayersDTO) {
  const team = await teamsService.getById(teamPlayersDTO.teamId);

  if (!team) {
    throw new Error('Team not found');
  }

  return await teamPlayersService.getAll();
}