import { teamService, teamPlayerService } from '../../services/index.js';

import teamPlayerTypeEnum from '../../enums/team-player-type.enum.js';

export async function joinTeamUseCase(body) {
  const { link, userId } = body;

  if (!link?.startsWith(`${process.env.BASE_URL}/teams/invite`)) {
    throw new Error('Invalid team link format');
  }

  const queryParams = new URLSearchParams(link.split('?')[1]);
  if (!queryParams.has('expiration') && !queryParams.has('teamId')) {
    throw new Error('Missing required query parameters');
  }

  const creationTimestamp = parseInt(queryParams.get('expiration'), 10);
  if (isNaN(creationTimestamp)) {
    throw new Error('Invalid expiration timestamp format');
  }

  const now = Math.floor(Date.now() / 1000);
  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
  const expiryTime = creationTimestamp + twentyFourHoursInMs;

  if (now >= expiryTime) {
    throw new Error('Team invitation link has expired (valid for 24 hours from creation)');
  }

  const teamId = queryParams.get('teamId');

  const team = await teamService.getById(teamId);
  if (!team) {
    throw new Error(`Team with ID ${teamId} does not exist`);
  }

  const existingMembership = await teamPlayerService.getMembershipByUserIdAndTeamId(userId, teamId);
  if (existingMembership) {
    throw new Error(`User is already a member of the team with ID ${teamId}`);
  }

  const newPlayerDTO = {
    teamId: team.id,
    playerId: userId,
    isActive: true,
    type: teamPlayerTypeEnum.PLAYER,
    shirtNumber: null,
    userId
  };
  const membership = await teamPlayerService.register(newPlayerDTO);
  
  return membership;
}