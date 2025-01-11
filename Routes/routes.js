import express from "express";
// import User from "../models/userSchema.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/tokenVerification.js";
import dotenv from "dotenv";
import { token } from "morgan";
dotenv.config(); // Load .env file

const router = express.Router();

// Route to create a new user
router.post("/create-user", async (req, res) => {
  try {
    // const { name, course, courseId, batch, days, email, password, role } = req.body;


    // const { name, email, password, role course, courseId, batch, days,   } =
    //   req.body;

    const {name,email,password,role,teacherId,userId,batch,course,courseId,days,sectionId} = req.body;

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
    res.status(201).json({
      message: "User created successfully",
      status: "201",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

// signup feild
// router.post("/signup", async (req,res)=>{
//   try{
//     const {email, password, role} = req.body;
//     const hashPaswoord = bcrypt.hashSync(password, 10)
//     const newUser = new User({
//       email,
//       password: hashPaswoord,
//       role
//     })
//     const savedUser = await newUser.save()
//     const recentlySavedUser = savedUser.toObject();  // Convert the document to a plain JavaScript object

//     // Generating token
//     var token = jwt.sign(recentlySavedUser, process.env.JWT_SECRET);
//     // console.log(token);

//     res
//       .status(201)
//       .json({
//         message: "User created successfully",
//         status: "201",
//         user: {savedUser, token}
//       });
//   }

//   catch(error){
//     console.error("Error creating user:", error);
//     res
//       .status(500)
//       .json({ message: "Error creating user", error: error.message });
//   }
// })

// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteUser = await User.findByIdAndDelete(id);
//     res
//       .status(404)
//       .json({
//         message: "User deleted successfully",
//         status: "404",
//         user: deleteUser,
//       });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res
//       .status(500)
//       .json({ message: "Error deleting user", error: error.message });
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateUSer = await User.findByIdAndUpdate(id, req.body);
//     res
//       .status(200)
//       .json({
//         message: "User updated successfully",
//         status: "200",
//         updateUSer,
//       });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res
//       .status(500)
//       .json({ message: "Error updating user", error: error.message });
//   }
// });

// Route to login a user
router.post("/login", async (req, res) => {
  try {
    const { email: currentUserEmail, password: currentUserPassword } = req.body;

    // Validate input
    if (!currentUserEmail || !currentUserPassword) {
      return res
        .status(400)
        .json({ message: "Both Email and password are required", status: 400 });
    }

    // Find the user in the database
    const user = await User.findOne({ email: currentUserEmail }).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      currentUserPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password", status: 401 });
    }

    // Generating token
    var token = jwt.sign(user, process.env.JWT_SECRET);
    // console.log(token);

    return res.status(200).json({
      message: "User login successfully!",
      status: 200,
      user: { user, token },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({
      message: "Error logging in user",
      status: 500,
      error: error.message,
    });
  }
});

// Route to get current user info
router.get("/currentUserInfo", verifyToken, async (req, res) => {
  // router.get("/currentUserInfo", async (req, res) => {

  try {
    // console.log(req.user.email);

    const currentUser = await User.findById(req.user._id);
    console.log(currentUser);

    res.status(200).json({
      message: "Current user data",
      status: "200",
      users: currentUser,
    });
  } catch (error) {
    console.error("Not FOUND", error);
    res
      .status(500)
      .json({ message: "Error getting users", error: error.message });
  }
});

//Route to get All Users data
router.get("/get-users", async (req, res) => {
  try {
    const allUserData = await User.find();
    res
      .status(200)
      .json({ message: "All users data", status: "200", users: allUserData });
  } catch (error) {
    console.error("Error getting users:", error);
    res
      .status(500)
      .json({ message: "Error getting users", error: error.message });
  }
});

export default router;
