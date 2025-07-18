import express from 'express';
import { Request, Response } from 'express';
import Match, { IMatch } from '../models/Match';

interface CreateMatchBody {
  homeTeam: string;
  awayTeam: string;
  date: string;
  status: 'UPCOMING' | 'LIVE' | 'FINISHED';
}

interface UpdateMatchBody {
  homeScore?: number;
  awayScore?: number;
  status?: 'UPCOMING' | 'LIVE' | 'FINISHED';
}

const router = express.Router();

// Get all matches
router.get('/matches', async (req: Request, res: Response) => {
  try {
    const matches = await Match.find().sort({ date: -1 });
    res.json(matches);
  } catch (err: Error) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single match
router.get('/matches/:id', async (req: Request, res: Response) => {
  try {
    const match = await Match.findById(req.params.id);
    if (match) {
      res.json(match);
    } else {
      res.status(404).json({ message: 'Match not found' });
    }
  } catch (err: unknown) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'An error occurred' });
  }
});

// Add a new match
router.post('/matches', async (req: Request<{}, {}, CreateMatchBody>, res: Response) => {
  try {
    const newMatch = new Match({
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      date: new Date(req.body.date),
      status: req.body.status
    });
    
    const savedMatch = await newMatch.save();
    res.status(201).json(savedMatch);
  } catch (err: unknown) {
    res.status(400).json({ message: err instanceof Error ? err.message : 'Invalid request data' });
  }
});

// Update a match
router.put('/matches/:id', async (req: Request<{ id: string }, {}, UpdateMatchBody>, res: Response) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    if (req.body.homeScore !== undefined) match.homeScore = req.body.homeScore;
    if (req.body.awayScore !== undefined) match.awayScore = req.body.awayScore;
    if (req.body.status !== undefined) match.status = req.body.status;

    const updatedMatch = await match.save();
    res.json(updatedMatch);
  } catch (err: unknown) {
    res.status(400).json({ message: err instanceof Error ? err.message : 'Invalid update data' });
  }
});

// Delete a match
router.delete('/matches/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    
    await match.deleteOne();
    res.json({ message: 'Match deleted' });
  } catch (err: unknown) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'An error occurred' });
  }
});

export default router;
