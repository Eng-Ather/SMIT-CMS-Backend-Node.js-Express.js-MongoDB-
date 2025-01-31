import mongoose from "mongoose";

const newAnnouncement = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const announcement =
  mongoose.models.announcements ||
  mongoose.model("announcements", newAnnouncement);

export default announcement;
