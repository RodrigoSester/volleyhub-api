import { teamService } from '../../services/index.js';

export async function removeTeam(teamId, userId) {
  const team = await teamService.getById(teamId);

  if (!team) {
    throw new Error(`Team ${teamId} does not exists`);
  }

  return await teamService.remove(teamId, userId);
}