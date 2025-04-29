import mongoose from "mongoose";

const { Schema } = mongoose;

const teacherSchema = new Schema({
  teacherId: { 
    type: Number,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
