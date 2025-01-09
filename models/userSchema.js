// //models/userSchema.js

// import mongoose from "mongoose";

// // Define the user schema
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },

//   course: {
//     type: String,
//     required: true,
//   },

//   courseId:{
//     type: String,
//     required: true,
//   },

//   batch: {
//     type: String,
//     required: true,
//   },

//   days: {
//     type: String,
//     required: true,
//   },

//   email: {
//     type: String,
//     required: true,
//     unique: true, // Ensures the email is unique
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ["admin", "teacher", "student"], // Example roles for your LMS
//     required: true,
//   },
// },
//   { 
//     timestamps: true, // Automatically add createdAt and updatedAt fields
//   }
// );

// // Check if the model already exists; if not, create it with collection "userdata"
// // const User = mongoose.models.userinfoschema || mongoose.model("userinfoschema", userSchema);
// // export default User;

// // Check if the model already exists; if not, create it
// const User = mongoose.models.userinfo || mongoose.model("userinfo", userSchema);
// export default User;
// -----------------------------------------------------------------------------------


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      required: true,
    },

    // Only for students
    teacherId: {
      type: String,
      required: function() {
        return this.role === "student"; 
      }
    },

    userId: {
      type: String,
      required: true,
    },

    batch: {
      type: [String],
      required: true,
        validate:{
          validator: function (value){
            if(this.role ==="student") return value.length ===1
            if( this.role === "teacher") return value.length >=1
            return true; // For admin or other roles, no validation
          },
          message: "Invalid batch: Students must have 1 batch, teachers can have multiple.",
      }
    },
    
    course: {
      type: [String],
      required: true,
      validate:{
        validator: function (value){
          if(this.role ==="student"){ return value.length ===1}
          if( this.role === "teacher"){ return value.length >=1}
          return true; // For admin or other roles, no validation
        },
        message: "Invalid course : Students must have 1 course, teachers can have multiple.",
      }
    },
    
    courseId: {
      type: [String], 
      required: true, 
      validate: {
        validator: function (value) {
          if (this.role === "student") return value.length === 1
          if (this.role === "teacher") return value.length >= 1
          return true; // For admin or other roles, no validation
        },
        message: "Invalid course ID: Students must have 1 course ID, teachers can have multiple.",
       
      },
    },

    days: {
      type: [String],
      required: true,
        validate:{
          validator: function (value){
            if(this.role ==="student") return value.length ===1
            if( this.role === "teacher") return value.length >=1
            return true; // For admin or other roles, no validation
          },
          message: "Invalid batch: Students must have 1 batch, teachers can have multiple.",
      }
    },

    sectionId: {
      type: [String],
      required: true,
      validate:{
        validator: function (value){
          if(this.role ==="student") return value.length ===1
          if( this.role === "teacher") return value.length >=1
          return true; // For admin or other roles, no validation
        },
        message: "Invalid Section: Students must have 1 section, teachers can have multiple.",
    }
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.models.userinfo || mongoose.model("userinfo", userSchema);
export default User;
