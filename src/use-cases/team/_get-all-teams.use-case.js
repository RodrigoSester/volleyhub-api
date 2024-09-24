import { teamService } from "../../services/index.js";


export async function getAllTeams() {
  return await teamService.getAll();
}