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

    topics: { 
      type: [String],
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const newCourse =
  mongoose.models.courses || mongoose.model("courses", coursemodel);

export default newCourse;
