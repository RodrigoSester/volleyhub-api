import { matchService } from "../../services/index.js";

export async function getAllMatchesByUserId(userId) {
  return await matchService.getMatchesByUser(userId);
}