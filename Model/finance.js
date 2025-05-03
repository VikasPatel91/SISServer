import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  governmentId: { type: String, required: true },

  academicInfo: {
    institution: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: Number, required: true },
    semester: { type: Number, required: true },
    cgpa: { type: Number, required: true },
    admissionType: { type: String, required: true },
  },

  financialInfo: {
    familyIncome: { type: Number, required: true },
    guardianOccupation: { type: String, required: true },
    annualIncomeCertificate: { type: String, required: true },
    bankAccount: {
      accountNumber: { type: String, required: true },
      bankName: { type: String, required: true },
      ifsc: { type: String, required: true },
    },
    loanRequested: { type: Number },
    loanPurpose: { type: String, required: true },
  },

  documents: {
    incomeCertificate: { type: String, required: true },
    feeStructure: { type: String, required: true },
    bonafide: { type: String, required: true },
    bankPassbook: { type: String, required: true },
    photo: { type: String, required: true },
    signature: { type: String, required: true },
    academicRecords: [{ type: String }], // store file paths or URLs here
  },

  loanApplication: {
    applicationId: { type: String, required: true },
    status: { type: String, default: "Pending" },
    dateOfApplication: { type: Date, default: Date.now },
    approvedAmount: { type: Number },
    installmentPlan: [{ type: String }],
    disbursementStatus: [{ type: String }],
    repaymentStatus: { type: String },
    adminRemarks: { type: String },
    reviewedBy: { type: String },
  },

  verification: {
    eligibilityScore: { type: Number },
    verificationStatus: { type: String, default: "Not Verified" },
  },
});

export default mongoose.model("Finance", StudentSchema);
