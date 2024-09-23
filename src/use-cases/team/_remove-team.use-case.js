import { teamService } from '../../services';

export async function removeTeam(teamId) {
  const team = await teamService.getById(teamId);

  if (!team) {
    throw new Error(`Team ${teamId} does not exists`);
  }

  return await teamService.remove(teamId);
}