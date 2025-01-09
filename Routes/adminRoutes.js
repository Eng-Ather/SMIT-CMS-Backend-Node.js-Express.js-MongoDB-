import express from "express";
import sendResponse from "../helpers/sendResponse.js";
const adminRoutes = express.Router();

adminRoutes.get("/getallteachers", (req, res) => {
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
