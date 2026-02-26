const Submission = require('../models/Submission');
const User = require('../models/User');
const { asyncHandler } = require('../utils/asyncHandler');

exports.createSubmission = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('name email');
  const submittedBy = user ? (user.name || user.email) : '';

  const submission = await Submission.create({ ...req.body, submittedBy });
  res.status(201).json(submission);
});
