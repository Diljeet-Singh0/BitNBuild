const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Import controllers and middleware
const {
  createCourse,
  getCourses,
  getTutorCourses,
  getCourseById,
  addReview,
} = require("../controllers/courses.controller");

const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/roles");

// Ensure upload folder exists
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/**
 * ROUTES
 */

// Create a course (tutor only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["tutor"]),
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  createCourse
);

// Browse all courses
router.get("/", getCourses);

// Get one course with reviews
router.get("/:id", getCourseById);

// Add a review
router.post("/:id/reviews", authMiddleware, addReview);

// Tutor's own courses
router.get("/my", authMiddleware, roleMiddleware(["tutor"]), getTutorCourses);

module.exports = router;
