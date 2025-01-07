// models/updateCourseOutlineSchema.js

import mongoose from "mongoose";

const coveredTopicSchema = new mongoose.Schema(
  {
    teacherId: { type: String, required: true },
    batch:{type: String, required: true },
    courseId: { type: String, required: true },
    days: {
      type: [String],
      required: true,
      enum: ["MWF", "TTS", "Weekend", "Sunday"],
    },
    sectionId: { type: String, required: true },
    coveredTopic: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const RecentlycoveredTopics =
  mongoose.models.coveredtopic ||
  mongoose.model("coveredtopic", coveredTopicSchema);

export default RecentlycoveredTopics;
