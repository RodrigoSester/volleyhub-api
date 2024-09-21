import bcrypt from 'bcrypt';

export async function getUserByEmail (user) {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  user.password = hashedPassword;

  return user;
};