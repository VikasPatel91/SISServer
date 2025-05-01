import mongoose from "mongoose";

const { Schema } = mongoose;

const teacherSchema = new Schema({
  id: { 
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
  areaOfTeaching: {
    type: String,
    required: true,
  },
  mobile: {
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
  qualification: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
