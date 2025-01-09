
import express from 'express';
import newCourse from "../models/courseSchema.js";
import verifyToken from "../middlewares/tokenVerification.js";


const courseRoutes = express.Router();

// route to create new course
courseRoutes.post("/create-course", async (req, res)=>{

    try{
        const { courseId, courseTitle, courseDescription, topics} = req.body;
   
        if(!courseId || !courseTitle || !courseDescription || !topics){
        return res
        .status(400)
        .json({message: "Please provide all required fields."});
        }

        const newCourseData = new newCourse({
            courseId,
            courseTitle,
            courseDescription,
            topics
        });

        const savedcourse = await newCourseData.save(); // Save the user to the database
        res.status(201).json({
            message: "Course created successfully",
            status: "201",
            course: savedcourse,
        }); 
    }
    catch(error){
        console.error("Error creating course:", error);
        res.status(500).json({message: "Error creating course", error: error.message});
    }

})

// route to get course outline by course id
courseRoutes.get("/course-outline/:courseId", async (req, res) => {
    try {

        // Find course data by courseId
        const courseData = await newCourse.findOne({ courseId: req.params.courseId });

        if (!courseData) {          //if course data doesnot exist         
            res.
             status(404)
             .json({
                message: "Course not found",
                status: "404"
            });
        }

        // If courseData exists
        res.status(200).json({
            message: "Course found",
            status: "200",
            course: courseData
        });

    } catch (error) {
        console.error("Error while getting course outline:", error);
        res.status(500).json({
            message: "Error while getting course outline",
            error: error.message
        });
    }
});

export default courseRoutes;