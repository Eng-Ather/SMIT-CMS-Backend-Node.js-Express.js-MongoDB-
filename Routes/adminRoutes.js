import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import User from "../models/userSchema.js";
const adminRoutes = express.Router();

adminRoutes.post("/addTeacher", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      teacherId,
      userId,
      batch,
      course,
      courseId,
      days,
      sectionId,
    } = req.body;

    if (role === "teacher") {
      if (
        !name ||
        !email ||
        !password ||
        !role ||
        !userId ||
        !batch ||
        !course ||
        !courseId ||
        !days ||
        !sectionId
      ) {
        return res.status(400).json({ message: "Please provide all fields." });
      }
    }

    if (role === "student") {
      if (
        !name ||
        !email ||
        !password ||
        !role ||
        !teacherId ||
        !userId ||
        !batch ||
        !course ||
        !courseId ||
        !days ||
        !sectionId
      ) {
        return res.status(400).json({ message: "Please provide all fields." });
      }
    }

    const hashpassword = bcrypt.hashSync(password, 10);

    let newUser;

    if (role === "student") {
      //if user is teacher
      newUser = new User({
        name,
        email,
        password: hashpassword,
        role,
        teacherId,
        userId,
        batch,
        course,
        courseId,
        days,
        sectionId,
      });
    } else if (role === "teacher") {
      //if user is teacher
      newUser = new User({
        name,
        email,
        password: hashpassword,
        role,
        userId,
        batch,
        course,
        courseId,
        days,
        sectionId,
      });
    }

    const savedUser = await newUser.save(); // Save the user to the database
    sendResponse(res, 201, savedUser, false, "Teacher Added Successfully");
  } catch (error) {
    sendResponse(res, 404, null, true, "Error Adding Teacher");
  }
});

adminRoutes.get("/getallteachers", async (req, res) => {
  try {
    const allTeachers = await User.find({ role: "teacher" });
    sendResponse(res, 201, allTeachers, false, "Teachers Fetched Successfully");
  } catch (error) {
    sendResponse(res, 404, null, true, "Error Fetching All Teachers");
  }
});

adminRoutes.get("/addStudent", (req, res) => {
  sendResponse(res, 201, null, true, "Working");
});
adminRoutes.get("/getattendance", (req, res) => {
  sendResponse(res, 201, null, true, "Working");
});
adminRoutes.put("/courses/:id", (req, res) => {
  sendResponse(res, 201, null, true, "Working");
});
adminRoutes.post("/notifications", (req, res) => {
  sendResponse(res, 201, null, true, "Working");
});
adminRoutes.post("/createsection", (req, res) => {
  sendResponse(res, 201, null, true, "Working");
});
adminRoutes.post("/createbatch", (req, res) => {
  sendResponse(res, 201, null, true, "Working");
});
adminRoutes.post("/mergebatch", (req, res) => {
  sendResponse(res, 201, null, true, "Working");
});
adminRoutes.get("/getallstudents", (req, res) => {
  sendResponse(res, 201, null, true, "Working");
});
adminRoutes.delete("/terminatestudent", (req, res) => {
  sendResponse(res, 201, null, true, "Working");
});

export default adminRoutes;
