import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/cricket';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLiveScores = async () => {
  try {
    const response = await api.get('/live-scores');
    return response.data;
  } catch (error) {
    console.error('Error fetching live scores:', error);
    // Log detailed error information
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    }
    throw error;
  }
};

export const getMatchDetails = async (matchId) => {
  try {
    const response = await api.get(`/match/${matchId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw error;
  }
};

export default api;
