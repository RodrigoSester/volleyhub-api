import db from '../../database/config/index.js';

export async function register(user) {
  return await db('users')
    .insert(user)
    .returning(['id', 'name', 'email', 'phone', 'profile_photo', 'document', 'age'])
    .then((results) => results[0]);
};