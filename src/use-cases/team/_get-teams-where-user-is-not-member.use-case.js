import { teamService } from "../../services/index.js";

export async function getTeamsWhereUserIsNotMember(userId) {
  return await teamService.getTeamsWhereUserIsNotMember(userId);
}
