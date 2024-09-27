import { userService } from '../../services/index.js';

export async function getUserById (userId) {
  const user = await userService.getUserById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};