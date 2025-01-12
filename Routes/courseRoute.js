import express from "express";
import newCourse from "../models/courseSchema.js";
import RecentlycoveredTopics from "../models/updateCourseOutlineSchema.js";
import verifyToken from "../middlewares/tokenVerification.js";


const courseRoutes = express.Router();

// route to create new course
courseRoutes.post("/create-course", async (req, res) => {
  try {
    const { courseId, courseTitle, courseDescription, topics } = req.body;

    if (!courseId || !courseTitle || !courseDescription || !topics) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const newCourseData = new newCourse({
      courseId,
      courseTitle,
      courseDescription,
      topics,
    });

    const savedcourse = await newCourseData.save(); // Save the user to the database
    res.status(201).json({
      message: "Course created successfully",
      status: "201",
      course: savedcourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res
      .status(500)
      .json({ message: "Error creating course", error: error.message });
  }
});

// route to get course outline by course id
courseRoutes.get("/course-outline/:courseId", async (req, res) => {
  try {
    // Find course data by courseId
    const courseData = await newCourse.findOne({
      courseId: req.params.courseId,
    });

    if (!courseData) {
      //if course data doesnot exist
      res.status(404).json({
        message: "Course not found",
        status: "404",
      });
    }

    // If courseData exists
    res.status(200).json({
      message: "Course found",
      status: "200",
      course: courseData,
    });
  } catch (error) {
    console.error("Error while getting course outline:", error);
    res.status(500).json({
      message: "Error while getting course outline",
      error: error.message,
    });
  }
});

//route to update covered Tpics
courseRoutes.post("/cover-topics", async (req, res) => {
  try {
    const { teacherId, batch, courseId, days, sectionId, coveredTopic } = req.body;

    // Validate request body
    if (!teacherId || !batch || !courseId || !days || !sectionId || !coveredTopic) {
      return res.status(400).json({
        message: "Please provide all required fields.",
      });
    }

    // Save the covered topic to the database
    const newCoveredTopic = new RecentlycoveredTopics({
      teacherId,
      batch,
      courseId,
      days,
      sectionId,
      coveredTopic,
    });

    const savedCoveredTopic = await newCoveredTopic.save();

    res.status(201).json({
      message: "Covered topic updated successfully.",
      data: savedCoveredTopic,
    });
  } catch (error) {
    console.error("Error while updating the covered topics:", error.message);

    res.status(500).json({
      message: "Error while updating the covered topics.",
      error: error.message,
    });
  }
});

//route to get updated course outline
courseRoutes.get(
  "/get-cover-topics/:courseId/:teacherId/:sectionId/:days",
  async (req, res) => {
    try {
      const { courseId, teacherId, sectionId, days } = req.params; // Use req.params for route params

      // Validate request parameters
      if (!courseId || !teacherId || !sectionId || !days) {
        return res.status(400).json({
          message:
            "Missing required parameters: courseId, teacherId, and sectionId.",
        });
      }

      // Query the database
      const coverdTopics = await RecentlycoveredTopics.find({
        courseId,
        teacherId,
        sectionId,
        days,
      });

      if (!coverdTopics) {
        return res.status(404).json({
          status: 404,
          message:
            "No data found for the provided courseId, teacherId, and sectionId.",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Data retrieved successfully.",
        data: coverdTopics,
      });
    } catch (error) {
      console.error("Error while getting course outline:", error);
      res.status(500).json({
        message:
          "Internal server error occurred while fetching course outline.",
        error: error.message,
      });
    }
  }
);

export default courseRoutes;

//http://localhost:5000/course/get-cover-topics/wma-01/sir-bilal-001/7-to-9/MWF
