import { userService } from '../../services/index.js';

export async function getUserByEmail (userDTO) {
  const user = await userService.getUserByEmail(userDTO.email);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};