// controllers/courses.controller.js
const Course = require("../models/Course.js");

// Tutor creates a course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ error: "Title, description, and price are required" });
    }

    const courseData = {
      title,
      description,
      price: parseFloat(price),
      tutor: req.user.userId, // ✅ link course to tutor
    };

    // Handle uploaded files
    if (req.files) {
      if (req.files.video && req.files.video.length > 0) {
        courseData.videoFile = req.files.video[0].filename;
      }
      if (req.files.pdf && req.files.pdf.length > 0) {
        courseData.pdfFile = req.files.pdf[0].filename;
      }
    }

    const course = await Course.create(courseData);
    res.status(201).json({ message: "Course created successfully", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Anyone can browse courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("tutor", "name email");
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Tutor sees only their own courses
exports.getTutorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ tutor: req.user.userId });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("tutor", "name email")
      .populate("reviews.user", "name"); // 🔥 populate user field inside reviews

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
// controllers/courses.controller.js
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("reviews.user", "name"); // populate review user
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { comment } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const review = { user: req.user.userId, comment };
    course.reviews.push(review);
    await course.save();

    // populate new review user
    await course.populate("reviews.user", "name");

    res.json(course.reviews[course.reviews.length - 1]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

