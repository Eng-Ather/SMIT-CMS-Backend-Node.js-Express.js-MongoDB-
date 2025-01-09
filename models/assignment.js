//models/assignmentRoutes.js

import mongoose from "mongoose";

const newAssignmentSchema = new mongoose.Schema(
  {
    teacherId: {
      type: String,
      required: true,
    },

    batch: {
      type: String,
      required: true,
    },

    courseId: {
      type: String,
      required: true,
    },

    days: {
      type: [String],
      required: true,
    },

    sectionId: {
      type: String,
      required: true,
    },

    assignment: {
      type: String,
      required: true,
    },

    assignmentId: {
      type: String,
      required: true,
      unique:true
    },
  },
  {
    timestamps: true,
  }
);

const newAssignmentModel =
  mongoose.models.assignment ||
  mongoose.model("assignment", newAssignmentSchema);

export default newAssignmentModel;
