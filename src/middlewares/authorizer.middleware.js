import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

function _verifyAuthorization(authorization) {
  if (!authorization) {
    throw new Error("Unauthorized");
  }

  jsonwebtoken.verify(authorization, dotenv.config().parsed.JWT_SECRET, (err) => {
    if (err) {
      throw new Error("Unauthorized");
    }
  });
}

export function authorizer(req, res, next) {
  const { authorization } = req.headers;

  try {
    _verifyAuthorization(authorization);
  
    req.authorizer = jsonwebtoken.decode(authorization);
  
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized"});
  }
}