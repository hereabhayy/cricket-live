import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MatchCard.css';

const MatchCard = ({ match }) => {
  if (!match) return null;

  // Extract match data from API response - handle multiple possible structures
  const matchData = match.matchHeader || match.match || match;
  const matchInfo = match.matchInfo || match.match || {};
  const scoreCard = match.scoreCard || match.score || {};
  
  // Get team names from various possible locations
  const team1 = matchData?.team1?.name || 
                matchData?.team1?.teamName ||
                matchInfo?.team1?.name || 
                matchInfo?.team1?.teamName ||
                match?.team1?.name ||
                match?.team1?.teamName ||
                'Team A';
                
  const team2 = matchData?.team2?.name || 
                matchData?.team2?.teamName ||
                matchInfo?.team2?.name || 
                matchInfo?.team2?.teamName ||
                match?.team2?.name ||
                match?.team2?.teamName ||
                'Team B';
                
  const status = matchData?.status || 
                 matchData?.matchStatus ||
                 matchInfo?.status || 
                 matchInfo?.matchStatus ||
                 match?.status ||
                 match?.state ||
                 'Live';
                 
  const matchId = matchData?.matchId || 
                  matchInfo?.matchId || 
                  match?.id || 
                  match?.matchId ||
                  '';

  // Get scores if available - extract from nested structure
  const getScoreString = (scoreObj) => {
    if (!scoreObj) return '';
    if (typeof scoreObj === 'string') return scoreObj;
    
    // Try different score structures
    if (scoreObj.inngs1) {
      const { runs, wickets, overs } = scoreObj.inngs1;
      return `${runs}/${wickets} (${overs} ov)`;
    }
    
    if (scoreObj.runs && scoreObj.wickets !== undefined) {
      return `${scoreObj.runs}/${scoreObj.wickets}${scoreObj.overs ? ` (${scoreObj.overs} ov)` : ''}`;
    }
    
    if (scoreObj.score) {
      return scoreObj.score;
    }
    
    return '';
  };

  const team1Score = getScoreString(scoreCard?.team1Score || matchData?.team1Score || matchInfo?.team1Score);
  const team2Score = getScoreString(scoreCard?.team2Score || matchData?.team2Score || matchInfo?.team2Score);

  return (
    <Link to={`/match/${matchId}`} className="match-card-link">
      <div className="match-card">
        <div className="match-status">
          <span className={`status-badge ${status.toLowerCase().includes('live') ? 'live' : ''}`}>
            {status}
          </span>
        </div>
        <div className="match-teams">
          <div className="team">
            <div className="team-name">{team1}</div>
            {team1Score && <div className="team-score">{team1Score}</div>}
          </div>
          <div className="vs-divider">VS</div>
          <div className="team">
            <div className="team-name">{team2}</div>
            {team2Score && <div className="team-score">{team2Score}</div>}
          </div>
        </div>
        <div className="match-footer">
          <span className="match-type">{matchInfo?.matchType || 'ODI'}</span>
          <span className="view-details">View Details →</span>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
