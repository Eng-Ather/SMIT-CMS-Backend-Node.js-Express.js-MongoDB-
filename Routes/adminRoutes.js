import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import User from "../models/userSchema.js";
import newCourse from "../models/courseSchema.js";
import addStudent from "../models/addStudentSchema.js";
const adminRoutes = express.Router();

adminRoutes.post("/addTeacher", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      userId,
      batch,
      course,
      courseId,
      days,
      sectionId,
    } = req.body;

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

    const hashpassword = bcrypt.hashSync(password, 10);

    let newUser = new User({
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

    newUser = await newUser.save(); // Save the user to the database
    sendResponse(res, 201, newUser, false, "Teacher Added Successfully");
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


adminRoutes.post("/addCourse", async (req, res) => {
  try {
    const { courseId, courseTitle, courseDescription, topics } = req.body;
    let addedCourse = new newCourse({
      courseId,
      courseTitle,
      courseDescription,
      topics,
    });
    addedCourse = await addedCourse.save();
    sendResponse(res, 201, addedCourse, false, "Course Added Successfully");
  } catch (error) {
    sendResponse(res, 404, null, true, "Error Adding Course");
  }
});


adminRoutes.get("/getAllCourses", async (req, res) => {
  try {
    const allCourses = await newCourse.find();
    sendResponse(res, 201, allCourses, false, "Courses Fetched Successfully");
  } catch (error) {
    sendResponse(res, 404, null, true, "Error Fetching Courses");
  }
});


adminRoutes.post("/addStudent", async (req, res) => {
  try {
    const {
      name,
      fatherName,
      CNICno,
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

    if (
      !name ||
      !fatherName ||
      !CNICno ||
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
      return sendResponse(res, 404, null, true, "All Fields are required");
    }

    const hashpassword = bcrypt.hashSync(password, 10);

    let newStudent = new addStudent({
      name,
      fatherName,
      CNICno,
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
    newStudent = await newStudent.save(); // Save the user to the database
    sendResponse(res, 201, newStudent, false, "Student Added Successfully");
  } catch (error) {
    sendResponse(res, 400, null, true, "Error in Adding Student");
  }
});


adminRoutes.get("/getAllStudents", async(req, res) => {
  try {
    const allStudents = await addStudent.find()
    sendResponse(res, 201, allStudents, false, "Students Fetched Successfully")
  } catch (error) {
    sendResponse(res, 400, null, true, "Error Fetching Students")
  }
});



export default adminRoutes;
