// models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ linked to User model
      required: true,
    },
    videoFile: {
      type: String, // saved filename
    },
    pdfFile: {
      type: String, // saved filename
    },
    reviews: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: { type: String, required: true },
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
