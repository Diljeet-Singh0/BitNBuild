const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  previewVideoUrl: { type: String },
  price: { type: Number, default: 0 },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ratings: [{ type: Number }],
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
