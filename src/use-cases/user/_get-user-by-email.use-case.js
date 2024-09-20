import bcrypt from 'bcryptjs';

const getUserByEmail = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  user.password = hashedPassword;

  return user;
};

export default {
  getUserByEmail,
};
