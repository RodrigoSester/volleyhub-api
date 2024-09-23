import { teamService } from "../../services";


export async function getAllTeams() {
  return await teamService.getAll();
}