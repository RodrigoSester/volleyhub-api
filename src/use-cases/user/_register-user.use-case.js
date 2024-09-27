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
    if (error.constraint) {
      switch (error.constraint) {
        case 'users_email_unique':
          throw new Error('Email already in use');
        case 'users_document_unique':
          throw new Error('Document already in use');
        case 'users_phone_unique':
          throw new Error('Phone already in use');
      }
    }

    throw new Error(error.message);
  }
};