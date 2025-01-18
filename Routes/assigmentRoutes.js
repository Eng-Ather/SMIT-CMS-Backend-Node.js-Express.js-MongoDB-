import express from "express";
import newAssignmentModel from "../models/assignment.js";
import recentlySubmitedAssignmentModel from "../models/submitedAssignment.js";

const assignmentRoutes = express.Router();

// to create new Assignment
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

// Rout to submit Assigment
assignmentRoutes.post("/submit-assignment", async (req, res) => {
  try {
    const {
      studentId,
      batch,
      courseId,
      days,
      sectionId,
      assignment,
      assignmentId,
      codeLink,
      deploymentLink,
    } = req.body;

    if (
      !studentId ||
      !batch ||
      !courseId ||
      !days ||
      !sectionId ||
      !assignment ||
      !assignmentId ||
      !codeLink ||
      !deploymentLink
    ) {
      return res.status(400).json({ message: "Please provide all fields." });
    }

    const submitAssignment = new recentlySubmitedAssignmentModel({
      studentId,
      batch,
      courseId,
      days,
      sectionId,
      assignment,
      assignmentId,
      codeLink,
      deploymentLink,
    });
    const submission = await submitAssignment.save();
    res.status(200).json({
      message: " Assigment Submited Successfully",
      submission,
    });
  } catch (error) {
    console.error("Error during Assigment submission:", error);
    res.status(500).json({
      message: "Error during Assignment Submission",
      error: error.message,
    });
  }
});

//Route to get Submited Assigment of specific user
assignmentRoutes.get(
  "/get-submited-assignment/:batch/:courseId/:sectionId/:days/:studentId/",
  async (req, res) => {
    try {
      const { batch, courseId, sectionId, days, studentId } = req.params; // Use req.params for route params

      // Validate request parameters
      if (!batch || !courseId || !sectionId || !days || !studentId) {
        return res.status(400).json({
          message: "Missing required parameters",
        });
      }

      // Query the database for assignments
      const studentSubmitedAssignment =
        await recentlySubmitedAssignmentModel.find({
          batch,
          courseId,
          sectionId,
          days,
          studentId,
        });

      if (
        !studentSubmitedAssignment ||
        studentSubmitedAssignment.length === 0
      ) {
        return res.status(404).json({
          status: 404,
          message:
            "No data found against provided courseId, days, studentId, sectionId, and batch.",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Data retrieved successfully.",
        data: studentSubmitedAssignment,
      });
    } catch (error) {
      console.error("Error while fetching Submited assignments:", error);
      res.status(500).json({
        message:
          "Internal server error occurred while fetching submited assignments.",
        error: error.message,
      });
    }
  }
);

//route to get all Assignment of specific course
assignmentRoutes.get(
  "/get-assignment/:courseId/:teacherId/:sectionId/:days/:batch",
  async (req, res) => {
    try {
      const { courseId, teacherId, sectionId, days, batch } = req.params; // Use req.params for route params

      // Validate request parameters
      if (!courseId || !teacherId || !sectionId || !days || !batch) {
        return res.status(400).json({
          message: "Missing required parameters",
        });
      }

      // Query the database for assignments
      const studentAssignment = await newAssignmentModel.find({
        courseId,
        teacherId,
        sectionId,
        days,
        batch,
      });

      if (!studentAssignment || studentAssignment.length === 0) {
        return res.status(404).json({
          status: 404,
          message:
            "No data found against provided courseId, days, teacherId, sectionId, and batch.",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Data retrieved successfully.",
        data: studentAssignment,
      });
    } catch (error) {
      console.error("Error while fetching assignments:", error);
      res.status(500).json({
        message: "Internal server error occurred while fetching assignments.",
        error: error.message,
      });
    }
  }
);

// Route to get a specific assignments of a specific course
assignmentRoutes.get(
  "/get-specific-assignment/:courseId/:teacherId/:sectionId/:days/:batch/:assignmentId",
  async (req, res) => {
    try {
      const { courseId, teacherId, sectionId, days, batch, assignmentId } =
        req.params;

      // Validate request parameters
      if (
        !courseId ||
        !teacherId ||
        !sectionId ||
        !days ||
        !batch ||
        !assignmentId
      ) {
        return res.status(400).json({
          message: "Missing required parameters",
        });
      }

      // Query the database for a specific assignment including the batch field
      const studentAssignment = await newAssignmentModel.findOne({
        courseId,
        teacherId,
        sectionId,
        days,
        batch, // added batch to query
        assignmentId,
      });

      if (!studentAssignment) {
        return res.status(404).json({
          status: 404,
          message: `No assignment found for assignmentId: ${assignmentId} with the provided courseId, teacherId, sectionId, days, and batch.`,
        });
      }

      res.status(200).json({
        status: 200,
        message: "Assignment retrieved successfully.",
        data: studentAssignment,
      });
    } catch (error) {
      console.error("Error while fetching assignment:", error);
      res.status(500).json({
        message:
          "Internal server error occurred while fetching the assignment.",
        error: error.message,
      });
    }
  }
);

// Route to get a leatest assignments of a specific course

assignmentRoutes.get(
  "/get-leatest-assignment/:courseId/:teacherId/:sectionId/:days/:batch",
  async (req, res) => {
    try {
      const { courseId, teacherId, sectionId, days, batch } = req.params;

      // Validate request parameters
      if (!courseId || !teacherId || !sectionId || !days || !batch) {
        return res.status(400).json({
          message: "Missing required parameters",
        });
      }

      // Query the database for the most recent assignment based on the given parameters
      const studentAssignment = await newAssignmentModel
        .findOne({
          courseId,
          teacherId,
          sectionId,
          days,
          batch,
        })
        .sort({ _id: -1 }) // Sort by _id in descending order to get the last added document
        .limit(1); // Limit to only 1 document

      if (!studentAssignment) {
        return res.status(404).json({
          status: 404,
          message: `No assignment found for the provided courseId, teacherId, sectionId, days, and batch.`,
        });
      }

      res.status(200).json({
        status: 200,
        message: "Last assignment retrieved successfully.",
        data: studentAssignment,
      });
    } catch (error) {
      console.error("Error while fetching assignment:", error);
      res.status(500).json({
        message:
          "Internal server error occurred while fetching the assignment.",
        error: error.message,
      });
    }
  }
);

//Route to get Submited Assigment with Specific Assignment ID
assignmentRoutes.get(
  "/get-submited-assignment-for-teacher/:batch/:courseId/:sectionId/:days/:assignmentId",
  async (req, res) => {
    try {
      const { batch, courseId, sectionId, days, assignmentId } = req.params; // Use req.params for route params

      // Validate request parameters
      if (!batch || !courseId || !sectionId || !days || !assignmentId) {
        return res.status(400).json({
          message: "Missing required parameters",
        });
      }

      // Query the database for assignments
      const studentSubmitedAssignment =
        await recentlySubmitedAssignmentModel.find({
          batch,
          courseId,
          sectionId,
          days,
          assignmentId,
        });

      if (
        !studentSubmitedAssignment ||
        studentSubmitedAssignment.length === 0
      ) {
        console.log("studentSubmitedAssignment", studentSubmitedAssignment);

        return 
        
        res.status(404).json({
          status: 404,
          message:
            "No data found ",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Data retrieved successfully.",
        data: studentSubmitedAssignment,
      });
    } catch (error) {
      console.error("Error while fetching Submited assignments:", error);
      res.status(500).json({
        message:
          "Internal server error occurred while fetching submited assignments.",
        error: error.message,
      });
    }
  }
);

export default assignmentRoutes;
