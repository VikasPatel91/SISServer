import express from "express";
import cookieParser from "cookie-parser";
import studentRoutes from "./Router/student.route.js";
import teacherRoutes from "./Router/teacher.route.js";
import testRouter from "./Router/test.route.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import "./db.js";
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("uploads/", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/teacher", teacherRoutes);

app.use(`/api/student`, studentRoutes);
app.use(`/api/test`, testRouter);

app.listen(3500, () => {
  console.log("Server is Running on port 3500");
});
