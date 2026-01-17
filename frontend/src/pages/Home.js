import React, { useState, useEffect, useMemo } from 'react';
import { getLiveScores } from '../services/api';
import MatchCard from '../components/MatchCard';
import '../styles/Home.css';

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'live', 'upcoming', 'completed'
  const [matchTypeFilter, setMatchTypeFilter] = useState('all'); // 'all', 'ODI', 'T20', 'TEST'

  useEffect(() => {
    fetchLiveScores();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchLiveScores, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLiveScores = async () => {
    try {
      setLoading(true);
      const data = await getLiveScores();
      
      // Handle Cricbuzz API response structure
      let matchesArray = [];
      
      if (Array.isArray(data)) {
        // Direct array of matches
        matchesArray = data;
      } else if (data.matches && Array.isArray(data.matches)) {
        // Object with matches array
        matchesArray = data.matches;
      } else if (data.typeMatches && Array.isArray(data.typeMatches)) {
        // Cricbuzz API structure: typeMatches -> seriesMatches -> matches
        data.typeMatches.forEach((typeMatch) => {
          if (typeMatch.seriesMatches) {
            // Handle both array and object cases
            const seriesMatchesList = Array.isArray(typeMatch.seriesMatches) 
              ? typeMatch.seriesMatches 
              : [typeMatch.seriesMatches];
            
            seriesMatchesList.forEach((seriesMatch) => {
              if (seriesMatch.seriesAdWrapper) {
                const wrapper = seriesMatch.seriesAdWrapper;
                
                // Check for matches array
                if (wrapper.matches) {
                  if (Array.isArray(wrapper.matches)) {
                    matchesArray = matchesArray.concat(wrapper.matches);
                  } else if (wrapper.matches.match) {
                    matchesArray.push(wrapper.matches.match);
                  }
                }
                
                // Check for direct match
                if (wrapper.match) {
                  matchesArray.push(wrapper.match);
                }
              }
              
              // Also check for direct match in seriesMatch
              if (seriesMatch.match) {
                matchesArray.push(seriesMatch.match);
              }
            });
          }
        });
      } else if (data.matchHeader || data.matchInfo) {
        // Single match object
        matchesArray = [data];
      }
      
      setMatches(matchesArray);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching live scores:', err);
      setError('Failed to load live scores. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter matches based on status and type - MUST be before early returns
  const filteredMatches = useMemo(() => {
    return matches.filter(match => {
      const matchData = match.matchHeader || match.match || match;
      const matchInfo = match.matchInfo || match.match || {};
      const status = (matchData?.status || matchInfo?.status || match?.status || '').toLowerCase();
      const matchType = (matchInfo?.matchType || matchData?.matchType || '').toUpperCase();
      
      // Status filter
      let statusMatch = true;
      if (filter === 'live') {
        statusMatch = status.includes('live') || status.includes('in progress');
      } else if (filter === 'upcoming') {
        statusMatch = status.includes('upcoming') || status.includes('scheduled') || status.includes('not started');
      } else if (filter === 'completed') {
        statusMatch = status.includes('completed') || status.includes('finished') || status.includes('result');
      }
      
      // Match type filter
      let typeMatch = true;
      if (matchTypeFilter !== 'all') {
        typeMatch = matchType === matchTypeFilter.toUpperCase();
      }
      
      return statusMatch && typeMatch;
    });
  }, [matches, filter, matchTypeFilter]);

  if (loading && matches.length === 0) {
    return (
      <div className="home-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading live matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={fetchLiveScores} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Live Cricket Matches</h1>
        <button onClick={fetchLiveScores} className="refresh-button" disabled={loading}>
          {loading ? 'Refreshing...' : '🔄 Refresh'}
        </button>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="filter-group">
          <label>Status:</label>
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'live' ? 'active' : ''} 
              onClick={() => setFilter('live')}
            >
              🔴 Live
            </button>
            <button 
              className={filter === 'upcoming' ? 'active' : ''} 
              onClick={() => setFilter('upcoming')}
            >
              ⏰ Upcoming
            </button>
            <button 
              className={filter === 'completed' ? 'active' : ''} 
              onClick={() => setFilter('completed')}
            >
              ✅ Completed
            </button>
          </div>
        </div>
        
        <div className="filter-group">
          <label>Format:</label>
          <div className="filter-buttons">
            <button 
              className={matchTypeFilter === 'all' ? 'active' : ''} 
              onClick={() => setMatchTypeFilter('all')}
            >
              All
            </button>
            <button 
              className={matchTypeFilter === 'T20' ? 'active' : ''} 
              onClick={() => setMatchTypeFilter('T20')}
            >
              T20
            </button>
            <button 
              className={matchTypeFilter === 'ODI' ? 'active' : ''} 
              onClick={() => setMatchTypeFilter('ODI')}
            >
              ODI
            </button>
            <button 
              className={matchTypeFilter === 'TEST' ? 'active' : ''} 
              onClick={() => setMatchTypeFilter('TEST')}
            >
              Test
            </button>
          </div>
        </div>
      </div>

      {loading && matches.length === 0 ? (
        <div className="no-matches">
          <div className="spinner"></div>
          <p>Loading matches...</p>
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="no-matches">
          <p>No matches found for selected filters.</p>
          <button onClick={() => { setFilter('all'); setMatchTypeFilter('all'); }} className="clear-filters">
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="matches-count">
            Showing {filteredMatches.length} of {matches.length} matches
          </div>
          <div className="matches-grid">
            {filteredMatches.map((match, index) => {
              const matchId = match?.matchHeader?.matchId || 
                            match?.matchInfo?.matchId || 
                            match?.id || 
                            index;
              return <MatchCard key={matchId} match={match} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
