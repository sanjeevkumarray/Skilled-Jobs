const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: [String],
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['full-time', 'part-time', 'remote', 'flexible'], required: true },
});

module.exports = mongoose.model('Job', JobSchema);