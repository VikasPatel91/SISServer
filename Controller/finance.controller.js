import Student from "../Model/finance.js";

export const createStudent = async (req, res) => {
  try {
    const userId = req.body.id;

    const formData = {
      fullName: req.body.fullName,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      phone: req.body.phone,
      governmentId: req.body.governmentId,
      institution: req.body.institution,
      course: req.body.course,
      year: req.body.year,
      semester: req.body.semester,
      cgpa: req.body.cgpa,
      admissionType: req.body.admissionType,
      familyIncome: req.body.familyIncome,
      guardianOccupation: req.body.guardianOccupation,
      accountNumber: req.body.accountNumber,
      bankName: req.body.bankName,
      ifsc: req.body.ifsc,
      loanRequested: req.body.loanRequested,
      loanPurpose: req.body.loanPurpose,
      currentTime: req.body.currentTime,
      incomeCertificate: req.files?.incomeCertificate?.[0]?.filename || "",
      annualIncomeCertificate:
        req.files?.annualIncomeCertificate?.[0]?.filename || "",
      feeStructure: req.files?.feeStructure?.[0]?.filename || "",
      bankPassbook: req.files?.bankPassbook?.[0]?.filename || "",
      photo: req.files?.photo?.[0]?.filename || "",
      signature: req.files?.signature?.[0]?.filename || "",
      academicRecords:
        req.files?.academicRecords?.map((file) => file.filename) || [],
    };

    const student = new StudentModel(formData);
    await student.save();

    return res.status(201).json({
      message: "Application uploaded successfully",
      data: student,
    });
  } catch (err) {
    console.error("Error in createStudent:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// GET All Students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve students", error: err.message });
  }
};

// GET Student by studentId
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.id });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve student", error: err.message });
  }
};

// UPDATE Student
export const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findOneAndUpdate(
      { studentId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student updated", student: updated });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update student", error: err.message });
  }
};

// DELETE Student
export const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findOneAndDelete({
      studentId: req.params.id,
    });
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted", student: deleted });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete student", error: err.message });
  }
};
