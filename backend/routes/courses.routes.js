const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses.controller');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roles');

// Only tutors can create courses
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['tutor']),
  coursesController.createCourse
);

// Anyone can browse courses
router.get('/', coursesController.getCourses);

// Tutor sees own courses
router.get('/my', authMiddleware, roleMiddleware(['tutor']), coursesController.getTutorCourses);

module.exports = router;
