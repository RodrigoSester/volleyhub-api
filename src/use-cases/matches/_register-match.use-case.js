import Joi from "joi";
import { matchService } from "../../services/index.js";

function _validateRegisterMatchBody(match) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    teamHomeId: Joi.number().integer().required(),
    teamAwayId: Joi.number().integer().optional(),
    modality: Joi.string().allow('male', 'female', 'mixed').required(),
    type: Joi.string().allow('friendly', 'leisure', 'training', 'tournament').required(),
    value: Joi.number().integer().min(0).optional(),
    date: Joi.date().required(),
    adress: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(match, {
    allowUnknown: true
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function registerMatch(matchData) {
  _validateRegisterMatchBody(matchData);
  
  const match = await matchService.register(matchData);
  
  // Register all team players with pending status
  await matchService.registerMatchTeamPlayers(
    match.id, 
    matchData.teamHomeId, 
    matchData.teamAwayId
  );
  
  return match;
}