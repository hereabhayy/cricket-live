import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMatchDetails } from '../services/api';
import ScoreBoard from '../components/ScoreBoard';
import '../styles/MatchDetail.css';

const MatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMatchDetails();
    // Auto-refresh every 15 seconds
    const interval = setInterval(fetchMatchDetails, 15000);
    return () => clearInterval(interval);
  }, [id]);

  const fetchMatchDetails = async () => {
    try {
      setLoading(true);
      const data = await getMatchDetails(id);
      setMatchData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching match details:', err);
      setError('Failed to load match details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !matchData) {
    return (
      <div className="match-detail-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading match details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="match-detail-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <div className="action-buttons">
            <button onClick={fetchMatchDetails} className="retry-button">
              Retry
            </button>
            <button onClick={() => navigate('/')} className="back-button">
              ← Back to Matches
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="match-detail-container">
      <div className="match-detail-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Matches
        </button>
        <button onClick={fetchMatchDetails} className="refresh-button" disabled={loading}>
          {loading ? 'Refreshing...' : '🔄 Refresh'}
        </button>
      </div>

      <ScoreBoard matchData={matchData} />

      {matchData && (
        <div className="match-additional-info">
          <h3>Match Information</h3>
          <div className="info-grid">
            <div className="info-card">
              <h4>Series</h4>
              <p>{matchData.matchInfo?.seriesName || 'N/A'}</p>
            </div>
            <div className="info-card">
              <h4>Format</h4>
              <p>{matchData.matchInfo?.matchType || 'ODI'}</p>
            </div>
            <div className="info-card">
              <h4>Venue</h4>
              <p>{matchData.matchInfo?.venue || 'TBD'}</p>
            </div>
            <div className="info-card">
              <h4>Date</h4>
              <p>
                {matchData.matchInfo?.startDate || 
                 matchData.matchHeader?.matchStartTimestamp || 
                 'TBD'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDetail;
