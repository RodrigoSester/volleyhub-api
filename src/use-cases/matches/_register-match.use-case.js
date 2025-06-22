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
    dateTime: Joi.date().required(),
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