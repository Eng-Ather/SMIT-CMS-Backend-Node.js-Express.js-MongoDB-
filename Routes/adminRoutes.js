import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import User from "../models/userSchema.js";
import newCourse from "../models/courseSchema.js";
import announcement from "../models/announcement.js";
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
    const {
      courseId,
      courseTitle,
      courseDescription,
      teacherName,
      teacherId,
      batch,
      sectionId,
      days,
      topics,
      image,
    } = req.body;
    let addedCourse = new newCourse({
      courseId,
      courseTitle,
      courseDescription,
      teacherName,
      teacherId,
      batch,
      sectionId,
      days,
      topics,
      image,
    });
    addedCourse = await addedCourse.save();
    sendResponse(res, 201, addedCourse, false, "Course Added Successfully");
  } catch (error) {
    sendResponse(res, 404, null, true, error.message);
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

adminRoutes.get("/getAllCourses/:courseId", async (req, res) => {
  try {
    const dynamicCourseDetail = await newCourse.findOne({
      courseId: req.params.courseId,
    });
    if (!dynamicCourseDetail)
      return sendResponse(res, 400, null, true, "Course Details Not Found");
    sendResponse(
      res,
      201,
      dynamicCourseDetail,
      false,
      "Data Retrieved Successfully"
    );
  } catch (error) {
    sendResponse(res, 404, null, true, error.message);
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

    let newStudent = new User({
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
    sendResponse(res, 400, null, true, error.message);
  }
});

adminRoutes.get("/getAllStudents", async (req, res) => {
  try {
    const allStudents = await User.find({ role: "student" });
    sendResponse(res, 201, allStudents, false, "Students Fetched Successfully");
  } catch (error) {
    sendResponse(res, 400, null, true, "Error Fetching Students");
  }
});

adminRoutes.post("/addAnnouncement", async (req, res) => {
  try {
    const { title, location, time, description } = req.body;
    let newAnnouncement = new announcement({
      title,
      location,
      time,
      description,
    });
    newAnnouncement = await newAnnouncement.save();
    sendResponse(
      res,
      200,
      newAnnouncement,
      false,
      "Announcement Added Successfully"
    );
  } catch (error) {
    sendResponse(res, 404, null, true, "Error in Adding Announcement");
  }
});

adminRoutes.get("/getAllAnnouncements", async (req, res) => {
  try {
    const allAnouncements = await announcement.find();
    sendResponse(
      res,
      201,
      allAnouncements,
      false,
      "Announcements Fetched Successfully"
    );
  } catch (error) {
    sendResponse(res, 400, null, true, "Error Fetching Announcements");
  }
});

export default adminRoutes;
