const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    name_th: { type: String, trim: true, default: '' },
    project: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, lowercase: true, default: '' },
    tags: [
      {
        label: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('People', personSchema);
