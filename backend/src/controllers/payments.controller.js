// src/controllers/payments.controller.js
const Razorpay = require("razorpay");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payments/create-order
exports.createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const options = {
      amount: course.price * 100, // in paise
      currency: "INR",
      receipt: `rcpt_${courseId}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// POST /api/payments/verify
exports.verifyPayment = async (req, res) => {
  try {
    const { courseId, paymentDetails } = req.body;

    // TODO: You can verify signature for security
    // For simplicity, we assume payment is valid

    // Enroll student
    const enrollment = new Enrollment({
      student: req.user.userId,
      course: courseId,
    });
    await enrollment.save();

    // Add student to course (optional)
    const course = await Course.findById(courseId);
    course.enrolledStudents.push(req.user.userId);
    await course.save();

    res.json({ message: "Payment successful and enrolled", enrollment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment verification failed" });
  }
};
