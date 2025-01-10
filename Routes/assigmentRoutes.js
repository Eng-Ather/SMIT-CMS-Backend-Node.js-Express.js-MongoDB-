import express from "express";
import newAssignmentModel from "../models/assignment.js";

const assignmentRoutes = express.Router();

assignmentRoutes.post("/create-assignment", async (req, res) => {
  try {
    const {
      teacherId,
      batch,
      days,
      courseId,
      sectionId,
      assignment,
      assignmentId,
    } = req.body;

    if (
      !teacherId ||
      !batch ||
      !days ||
      !courseId ||
      !sectionId ||
      !assignment ||
      !assignmentId
    ) {
      return res.status(400).json({ message: "Please provide all fields." });
    }

    const createAssignment = new newAssignmentModel({
      teacherId,
      batch,
      days,
      courseId,
      sectionId,
      assignment,
      assignmentId,
    });

    const newAssignment = await createAssignment.save();
    res.status(200).json({
      message: "New Assigment Created Successfully",
      newAssignment,
    });
  } catch (error) {
    console.error("Error creating Assigment:", error);
    res
      .status(500)
      .json({ message: "Error creating Assignment", error: error.message });
  }
});

export default assignmentRoutes