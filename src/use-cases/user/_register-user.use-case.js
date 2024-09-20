import bcrypt from 'bcryptjs';

const registerUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  user.password = hashedPassword;

  return user;
};

export default {
  registerUser,
};
