import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
