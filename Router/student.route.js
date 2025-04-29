import express from "express";
import upload from "../Middleware/upload.js";
import {
  registerStudent,
  getAllStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  loginStudent,
} from "../Controller/student.controller.js";
const router = express.Router();
router.post("/login", loginStudent);
router.post("/register", upload.single("image"), registerStudent);
router.get("/", getAllStudent);
router.get("/:id", getStudentById);
router.put("/:id", upload.single("image"), updateStudent);
router.delete("/:id", deleteStudent);

export default router;
