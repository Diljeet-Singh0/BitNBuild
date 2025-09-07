const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const authMiddleware = require("../middleware/auth");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
router.post("/create-order", authMiddleware, async (req, res) => {
  const { amount, courseId } = req.body;
  try {
    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `receipt_${courseId}_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment creation failed" });
  }
});

module.exports = router;
