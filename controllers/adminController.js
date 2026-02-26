const mongoose = require('mongoose');
const Submission = require('../models/Submission');
const Person = require('../models/Person');
const { asyncHandler } = require('../utils/asyncHandler');

// GET /api/admin/submissions — list all pending submissions
exports.getSubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find({ status: 'pending' }).sort({ created_at: -1 });
  res.json(submissions);
});

// GET /api/admin/submissions/:id — single submission
exports.getSubmissionById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  const submission = await Submission.findById(req.params.id);
  if (!submission) return res.status(404).json({ message: 'Submission not found' });
  res.json(submission);
});

// PATCH /api/admin/submissions/:id/approve — approve: create Person, mark approved
exports.approveSubmission = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  const submission = await Submission.findById(req.params.id);
  if (!submission) return res.status(404).json({ message: 'Submission not found' });

  const personData = { ...req.body };
  if (!personData.name) personData.name = submission.name;

  await Person.create(personData);
  submission.status = 'approved';
  await submission.save();

  res.json({ message: 'Approved and added to People' });
});

// PATCH /api/admin/submissions/:id/reject — reject: mark rejected
exports.rejectSubmission = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  const submission = await Submission.findByIdAndUpdate(
    req.params.id,
    { status: 'rejected' },
    { new: true }
  );
  if (!submission) return res.status(404).json({ message: 'Submission not found' });
  res.json({ message: 'Rejected' });
});
