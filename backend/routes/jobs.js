const express = require('express');
const Job = require('../models/Job');
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('No token, authorization denied');
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).send('Token is not valid');
  }
};

router.post('/', authMiddleware, async (req, res) => {
  const { title, description, skillsRequired, location, type } = req.body;
  try {
    let job = new Job({
      title,
      description,
      skillsRequired,
      employer: req.user,
      location,
      type,
    });
    await job.save();
    res.status(201).send('Job posted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer', 'name');
    res.json(jobs);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;