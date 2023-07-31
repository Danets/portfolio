import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
