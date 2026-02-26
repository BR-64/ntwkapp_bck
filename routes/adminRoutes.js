const { Router } = require('express');
const {
  getSubmissions,
  getSubmissionById,
  approveSubmission,
  rejectSubmission,
} = require('../controllers/adminController');

const router = Router();

router.get('/submissions', getSubmissions);
router.get('/submissions/:id', getSubmissionById);
router.patch('/submissions/:id/approve', approveSubmission);
router.patch('/submissions/:id/reject', rejectSubmission);

module.exports = router;
