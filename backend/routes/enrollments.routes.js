const express = require('express');
const router = express.Router();

const enrollController = require('../controllers/enrollments.controller');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roles');

// Only students can enroll in courses
router.post(
  '/enroll',
  authMiddleware,
  roleMiddleware(['student']),
  enrollController.enrollCourse
);

// Students can view own enrollments
router.get(
  '/my',
  authMiddleware,
  roleMiddleware(['student']),
  enrollController.getStudentEnrollments
);

module.exports = router;
