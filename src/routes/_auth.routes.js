import app from "../../index.js";
import { register, login } from "../controllers/auth.controller.js";

export default () => {
  app.get("/auth/register", register);
  app.get("/auth/login", login);
}