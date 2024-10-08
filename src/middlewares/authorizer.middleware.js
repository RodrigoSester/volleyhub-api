import {
  getUserById as getUserByIdUseCase,
} from "../use-cases/user/index.js";

import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

async function _verifyAuthorization(authorization) {
  if (!authorization) {
    throw new Error("Unauthorized");
  }

  return jsonwebtoken.verify(authorization, process.env.JWT_SECRET, (err) => {
    if (err) {
      throw new Error("Unauthorized");
    }

    const tokenUser = jsonwebtoken.decode(authorization);

    if (!tokenUser) {
      throw new Error("Unauthorized");
    }

    return tokenUser;
  });
}

export async function authorizer(req, res, next) {
  const { authorization } = req.headers;

  try {
    const tokenUser = await _verifyAuthorization(authorization);

    await getUserByIdUseCase(tokenUser.id);

    req.authorizer = {
      userId: tokenUser.id,
    };

    next();
  } catch {
    res.status(401).json({ message: "Unauthorized"});
  }
}