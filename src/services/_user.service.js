import db from '../../database/config/index.js';

export async function register(user) {
  return await db('users')
    .insert(user)
    .returning(['id', 'name', 'email', 'phone', 'profile_photo', 'document', 'age'])
    .then((results) => results[0]);
};

export async function getUserByEmail (email) {
  return await db('users')
    .select('id', 'name', 'email', 'password')
    .where({ email })
    .first();
}

export async function getUserById (userId) {
  return await db('users')
    .select('id', 'name', 'email')
    .where({ id: userId })
    .first();
};