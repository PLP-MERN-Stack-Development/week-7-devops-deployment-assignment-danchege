const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// Get all matches
router.get('/matches', async (req, res) => {
  try {
    const matches = await Match.find().sort({ date: -1 });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single match
router.get('/matches/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (match) {
      res.json(match);
    } else {
      res.status(404).json({ message: 'Match not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new match
router.post('/matches', async (req, res) => {
  const match = new Match({
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    date: req.body.date,
    status: req.body.status
  });

  try {
    const newMatch = await match.save();
    res.status(201).json(newMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a match
router.patch('/matches/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (match) {
      match.homeScore = req.body.homeScore || match.homeScore;
      match.awayScore = req.body.awayScore || match.awayScore;
      match.status = req.body.status || match.status;
      
      const updatedMatch = await match.save();
      res.json(updatedMatch);
    } else {
      res.status(404).json({ message: 'Match not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
