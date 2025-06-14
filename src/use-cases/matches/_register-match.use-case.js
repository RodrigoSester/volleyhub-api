import Joi from "joi";
import { matchService } from "../../services/index.js";

function _validateRegisterMatchBody(match) {
  const schema = Joi.object({
    team_home_id: Joi.number().integer().required(),
    team_away_id: Joi.number().integer().required(),
    modality: Joi.string().valid(['male', 'female', 'mixed']).required(),
    value: Joi.number().integer().min(0).required(),
    date: Joi.date().required(),
    location: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(match);

  if (error) {
    throw new Error(error.message);
  }
}

export async function registerMatch(matchData) {
  _validateRegisterMatchBody(matchData);
  return await matchService.registerMatch(matchData);
}