import { teamService } from "../../services/index.js";

export async function getAllTeamsByUser(userId) {
  return await teamService.getTeamsByUserId(userId);
}