const { Router } = require('express');
const { createSubmission } = require('../controllers/submissionController');
const { authenticate } = require('../middleware/auth');

const router = Router();

router.post('/', authenticate, createSubmission);

module.exports = router;
