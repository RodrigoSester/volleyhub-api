import Joi from 'joi';
import bcrypt from 'bcrypt';

function _validateUserBody (user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
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

  return user;
};