const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Student enrolls in a course
exports.enrollCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.userId;

    if (!courseId) return res.status(400).json({ error: 'Course ID is required' });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // check if already enrolled
    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) return res.status(400).json({ error: 'Already enrolled' });

    const enrollment = new Enrollment({ student: studentId, course: courseId });
    await enrollment.save();

    res.status(201).json({ message: 'Enrolled successfully', enrollment });
  } catch (err) {
    next(err);
  }
};

// Student views own enrollments
exports.getStudentEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.userId }).populate('course');
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};
