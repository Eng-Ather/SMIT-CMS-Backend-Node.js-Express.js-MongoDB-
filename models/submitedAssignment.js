
import mongoose from "mongoose";

const submitAssignmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },

    batch: {
      type: [String],
      required: true,
    },

    courseId: {
      type: [String],
      required: true,
    },

    days: {
      type: [String],
      required: true,
    },

    sectionId: {
      type: [String],
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

    codeLink:{
        type: String,
      required: true,
    },

    deploymentLink:{
        type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const recentlySubmitedAssignmentModel =
  mongoose.models.submitedAssignment ||
  mongoose.model("submitedAssignment", submitAssignmentSchema);

export default recentlySubmitedAssignmentModel;
