import Teacher from "../Model/teacher.js";
import bcrypt from "bcrypt";
export const createTeacher = async (req, res) => {
  try {
    const {
      id,
      fullName,
      college,
      areaOfTeaching,
      mobile,
      email,
      qualification,
      image,
      password,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newTeacher = new Teacher({
      id,
      fullName,
      college,
      areaOfTeaching,
      mobile,
      qualification,
      email,
      image: req.file?.filename || null,
      password: hashedPassword,
    });

    await newTeacher.save();
    res
      .status(201)
      .json({ message: "Teacher created successfully", newTeacher });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating teacher", error: err.message });
  }
};

// Get all teachers
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
