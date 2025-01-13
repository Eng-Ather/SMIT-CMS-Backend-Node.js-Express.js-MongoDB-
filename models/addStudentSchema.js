import mongoose from "mongoose";

const addStudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    CNICno: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      required: true,
    },

    teacherId: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    batch: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    courseId: {
      type: String,
      required: true,
    },

    days: {
      type: String,
      required: true,
    },

    sectionId: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const addStudent =
  mongoose.models.students || mongoose.model("students", addStudentSchema);
export default addStudent;
