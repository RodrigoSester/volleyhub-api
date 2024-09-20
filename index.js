
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import routes from "./src/routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const PORT = dotenv.config().parsed?.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;