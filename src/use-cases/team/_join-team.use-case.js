import { teamService } from '../../services/team.service.js';
import { teamPlayerService } from '../../services/index.js';

import teamPlayerTypeEnum from '../../enums/team-player-type.enum.js';

export async function joinTeamUseCase(body) {
  const { queryParams, link, userId } = body;

  if (!link || !link.startsWith(`${process.env.BASE_URL}/teams/invite`)) {
    throw new Error('Invalid team link format');
  }

  if (!queryParams?.expiration && !queryParams?.teamId) {
    throw new Error('Missing required query parameters: expiration or teamId');
  }

  const creationTimestamp = parseInt(queryParams.expiration, 10);
  if (isNaN(creationTimestamp)) {
    throw new Error('Invalid expiration timestamp format');
  }

  const now = Date.now();
  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
  const expiryTime = creationTimestamp + twentyFourHoursInMs;

  if (now >= expiryTime) {
    throw new Error('Team invitation link has expired (valid for 24 hours from creation)');
  }

  const teamId = queryParams.teamId;

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