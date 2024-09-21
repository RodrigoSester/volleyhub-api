import db from "../../knexfile.js";

export async function register(user) {
  return await db("users")
    .insert(user)
    .returning("*");
};