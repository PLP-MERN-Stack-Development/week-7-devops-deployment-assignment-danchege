const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  homeTeam: {
    type: String,
    required: true
  },
  awayTeam: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['UPCOMING', 'LIVE', 'FINISHED'],
    default: 'UPCOMING'
  },
  homeScore: {
    type: Number,
    default: 0
  },
  awayScore: {
    type: Number,
    default: 0
  },
  highlights: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Match', matchSchema);
