import { teamService } from '../../services';

export async function getTeamById(teamId) {
  const team = await teamService.getById(teamId);

  if (!team) {
    throw new Error(`Team ${teamId} does not exists`);
  }

  return team;
}