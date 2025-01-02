import express from "express";
import mongoose from "./connection/dbconnection.js";
import router from "./Routes/routes.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
dotenv.config(); // Load .env file

const app = express();
const port = 5000;
// app.use(middleware);
app.use(cors());            // Enable CORS for all routes

app.use(express.json());    // This will allow us to handle JSON bodies



// for mongo db connection
mongoose.connection.on("error", (err) => {
  console.log("Error in connection", err);
});

mongoose.connection.on("open", () => {
  console.log("MongoDB is connected successfully");
});



// main page message
app.get("/", (req, res) => {
  res.send("CMS for S.M.I.T (Gulshan Campus)");
});



// app routes

app.use("/api", router);    // Mount the user routes to the /api endpoint






app.listen(port, () => {
  console.log("Server is running on port:", port);
});
