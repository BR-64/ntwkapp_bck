const mongoose = require('mongoose');
const Person = require('../models/Person');
const { asyncHandler } = require('../utils/asyncHandler');
const dum_ppl = require('../seed/dummy.js');

exports.getPeople = asyncHandler(async (req, res) => {
  const people = await Person.find().sort({ createdAt: -1 });

  res.json(people);
  // res.json(dum_ppl);
});

exports.getPersonById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const person = await Person.findById(req.params.id);
  if (!person) return res.status(404).json({ error: 'Person not found' });

  res.json(person);
});

exports.createPerson = asyncHandler(async (req, res) => {
  const person = await Person.create(req.body);
  res.status(201).json(person);
});
