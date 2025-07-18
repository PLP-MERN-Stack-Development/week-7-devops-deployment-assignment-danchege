import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Match from './components/Match';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({
    homeTeam: '',
    awayTeam: '',
    date: new Date().toISOString()
  });

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/matches');
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const handleAddMatch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMatch),
      });
      if (response.ok) {
        setNewMatch({
          homeTeam: '',
          awayTeam: '',
          date: new Date().toISOString()
        });
        fetchMatches();
      }
    } catch (error) {
      console.error('Error adding match:', error);
    }
  };

  const handleUpdateScore = async (matchId) => {
    try {
      const updatedMatch = await fetch(`http://localhost:5000/api/matches/${matchId}`);
      if (updatedMatch.ok) {
        fetchMatches();
      }
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h1" variant="h4" align="center" color="primary" gutterBottom>
            Football Updates
          </Typography>
          
          <form onSubmit={handleAddMatch}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Home Team"
                  value={newMatch.homeTeam}
                  onChange={(e) => setNewMatch({ ...newMatch, homeTeam: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Away Team"
                  value={newMatch.awayTeam}
                  onChange={(e) => setNewMatch({ ...newMatch, awayTeam: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Add Match
                </Button>
              </Grid>
            </Grid>
          </form>

          <Grid container spacing={2} sx={{ mt: 4 }}>
            {matches.map((match) => (
              <Grid item xs={12} sm={6} md={4} key={match._id}>
                <Match match={match} onUpdateScore={handleUpdateScore} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
