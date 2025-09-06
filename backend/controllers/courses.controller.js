const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// Tutor creates a course
exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, previewVideoUrl, price } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const course = new Course({
      title,
      description,
      previewVideoUrl,
      price,
      tutor: req.user.userId
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

// Anyone can browse courses
// courses.controller.js
exports.getCourses = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" }; // case-insensitive search
    }
    const courses = await Course.find(query);
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Tutor sees own courses
exports.getTutorCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ tutor: req.user.userId });
    res.json(courses);
  } catch (err) {
    next(err);
  }
};
