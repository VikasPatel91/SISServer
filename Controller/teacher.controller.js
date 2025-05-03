import Teacher from "../Model/teacher.js";
import bcrypt from "bcrypt";

export const createTeacher = async (req, res) => {
  try {
    const {
      id,
      name,
      college,
      areaOfTeaching,
      mobile,
      email,
      qualification,
      professionLogin = "teacher",
      password,
    } = req.body;

    if (!id || !name || !email || !mobile || !password || !college) {
      return res.status(400).json({
        message:
          "ID, name, email, mobile, password, and college are required.",
      });
    }

    const existingTeacher = await Teacher.findOne({ $or: [{ id }, { email }] });
    if (existingTeacher) {
      return res.status(409).json({
        message: "Teacher with this ID or email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const imageFilename = req.file?.filename || null;

    const newTeacher = new Teacher({
      id,
      name,
      college,
      areaOfTeaching,
      mobile,
      email,
      qualification,
      professionLogin,
      password: hashedPassword,
      image: imageFilename,
    });

    let saved = await newTeacher.save();

    res.status(201).json({
      message: "Teacher created successfully",
      teacher: { saved },
    });
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).json({
      message: "Failed to create teacher",
      error: error.message,
    });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching teachers", error: err.message });
  }
};

// Get a teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const teacherId = parseInt(req.params.id, 10); // Ensure it's a number
    const teacher = await Teacher.findOne({ id: teacherId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(teacher);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching teacher", error: err.message });
  }
};

// Update teacher details
export const updateTeacher = async (req, res) => {
  try {
    const teacherId = parseInt(req.params.id, 10);

    const teacher = await Teacher.findOneAndUpdate(
      { id: teacherId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher updated successfully", teacher });
  } catch (err) {
    res.status(500).json({
      message: "Error updating teacher",
      error: err.message,
    });
  }
};

// Delete a teacher
export const deleteTeacher = async (req, res) => {
  try {
    const teacherId = parseInt(req.params.id, 10);

    const teacher = await Teacher.findOneAndDelete({ id: teacherId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting teacher",
      error: err.message,
    });
  }
};
