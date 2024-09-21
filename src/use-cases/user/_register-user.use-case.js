import Joi from 'joi';
import bcrypt from 'bcrypt';

import { userService } from '../../services/index.js';

function _validateUserBody (user) {
  const schema = Joi.object({
    profile_photo: Joi.string().uri(),
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    document: Joi.string().min(11).required(),
    age: Joi.number().integer().min(0).required(),
  });

  const { error } = schema.validate(user);

  if (error) {
    throw new Error(error.message);
  }
};

export async function registerUser (user) {
  _validateUserBody(user);

  const hashedPassword = await bcrypt.hash(user.password, 10);

  user.password = hashedPassword;

  try {
    const userRegistered = await userService.register(user);

    return userRegistered;
  } catch (error) {
    if (error.message.includes('duplicate key value violates unique constraint')) {
      throw new Error('User already exists');
    }

    throw new Error(error.message);
  }
};