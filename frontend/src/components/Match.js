import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { format } from 'date-fns';

const Match = ({ match, onUpdateScore }) => {
  const statusColor = {
    UPCOMING: 'info',
    LIVE: 'warning',
    FINISHED: 'success'
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {match.homeTeam} vs {match.awayTeam}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {format(new Date(match.date), 'MMM d, yyyy HH:mm')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5">
            {match.homeScore} - {match.awayScore}
          </Typography>
          <Typography variant="body2" color={statusColor[match.status]}>
            {match.status}
          </Typography>
        </Box>
        {match.status === 'LIVE' && (
          <Button
            variant="contained"
            onClick={() => onUpdateScore(match._id)}
          >
            Update Score
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Match;
