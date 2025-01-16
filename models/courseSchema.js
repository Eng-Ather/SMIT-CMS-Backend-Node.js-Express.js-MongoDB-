//model/courseSchema.js

import mongoose from "mongoose";

const coursemodel = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
      unique: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    teacherName: {
      type: String,
      required: true,
    },
    teacherId: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
      unique: true,
    },
    sectionId: {
      type: String,
      required: true,
    },
    days: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    topics: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const newCourse =
  mongoose.models.courses || mongoose.model("courses", coursemodel);

export default newCourse;
