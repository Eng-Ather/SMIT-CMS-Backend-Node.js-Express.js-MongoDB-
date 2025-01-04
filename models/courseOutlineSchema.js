
import mongoose from "mongoose";

const courseOutlineSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  modules: [{
    moduleName: { type: String, required: true },
    topics: [{ type: String, required: true }]
  }],
  updatedAt: { type: Date, default: Date.now },
});

const CourseOutline = mongoose.model('CourseOutline', courseOutlineSchema);
module.exports = CourseOutline;
// The courseOutlineSchema.js file defines the schema for the course outline model. The schema includes the courseId, modules, and topics fields. The modules field is an array of objects, each containing a moduleName and an array of topics. The updatedAt field is automatically updated whenever the document is modified.