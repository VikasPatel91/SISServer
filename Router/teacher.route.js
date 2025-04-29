import express from "express";
import upload from "../Middleware/upload.js"; 
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../Controller/teacher.controller.js";
const router = express.Router();
router.get("/test", (req, res) => {
  res.send("Hello from teacher route");
});
router.post("/register", upload.single("image"), createTeacher);
router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
router.put("/:id", upload.single("image"), updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
