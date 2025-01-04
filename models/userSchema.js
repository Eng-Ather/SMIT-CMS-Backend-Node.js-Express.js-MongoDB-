//models/userSchema.js

import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  course: {
    type: String,
    required: true,
  },

  courseId:{
    type: String,
    required: true,
  },

  batch: {
    type: String,
    required: true,
  },

  days: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true, // Ensures the email is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "teacher", "student"], // Example roles for your LMS
    required: true,
  },
},
  { 
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Check if the model already exists; if not, create it with collection "userdata"
// const User = mongoose.models.userinfoschema || mongoose.model("userinfoschema", userSchema);
// export default User;

// Check if the model already exists; if not, create it
const User = mongoose.models.userinfo || mongoose.model("userinfo", userSchema);
export default User;
