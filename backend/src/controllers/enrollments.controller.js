const Enrollment = require('../models/Enrollment.js');
const Course = require('../models/Course.js');

exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    if (course.enrolledStudents.includes(req.user.userId))
      return res.status(400).json({ error: "Already enrolled" });

    course.enrolledStudents.push(req.user.userId);
    await course.save();
    res.json({ message: "Enrolled successfully", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};