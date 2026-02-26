const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: '' },
    name_th: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, lowercase: true, default: '' },
    tags: [{ label: { type: String } }],
    network: { type: String, trim: true, default: '' },
    project: { type: String, trim: true, default: '' },
    project_th: { type: String, trim: true, default: '' },
    position: { type: String, trim: true, default: '' },
    position_th: { type: String, trim: true, default: '' },
    country: { type: String, trim: true, default: '' },
    note: { type: String, trim: true, default: '' },
    submittedBy: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('Submission', submissionSchema);
