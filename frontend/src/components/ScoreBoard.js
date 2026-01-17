import React from 'react';
import '../styles/ScoreBoard.css';

const ScoreBoard = ({ matchData }) => {
  if (!matchData) {
    return (
      <div className="scoreboard-container">
        <div className="loading">Loading match details...</div>
      </div>
    );
  }

  const matchHeader = matchData.matchHeader || {};
  const matchInfo = matchData.matchInfo || {};
  const scoreCard = matchData.scoreCard || {};
  const team1 = matchData?.team1 || matchHeader?.team1 || matchInfo?.team1 || {};
  const team2 = matchData?.team2 || matchHeader?.team2 || matchInfo?.team2 || {};

  // Helper function to extract score from nested structure
  const getScoreDetails = (scoreObj) => {
    if (!scoreObj) return null;
    if (typeof scoreObj === 'string') return { runs: scoreObj, overs: '' };
    if (scoreObj.inngs1) {
      const { runs, wickets, overs } = scoreObj.inngs1;
      return { runs: `${runs}/${wickets}`, overs: `${overs} overs` };
    }
    return null;
  };

  const team1ScoreDetails = getScoreDetails(scoreCard?.team1Score);
  const team2ScoreDetails = getScoreDetails(scoreCard?.team2Score);

  // Get current over and batsman info if available
  const getCurrentOverInfo = () => {
    const overSummary = matchData.overSummary || matchData.overs || {};
    if (overSummary && overSummary.recentOvers && overSummary.recentOvers.length > 0) {
      const lastOver = overSummary.recentOvers[overSummary.recentOvers.length - 1];
      return {
        over: lastOver.overNum || '',
        runs: lastOver.runs || 0,
        wickets: lastOver.wickets || 0
      };
    }
    return null;
  };

  const currentOver = getCurrentOverInfo();

  // Get batsman on strike
  const getBatsmanInfo = (teamScore) => {
    if (teamScore && teamScore.batsmanStriker) {
      return {
        name: teamScore.batsmanStriker.batName || '',
        runs: teamScore.batsmanStriker.runs || 0,
        balls: teamScore.batsmanStriker.balls || 0,
        fours: teamScore.batsmanStriker.fours || 0,
        sixes: teamScore.batsmanStriker.sixes || 0
      };
    }
    return null;
  };

  const team1Batsman = getBatsmanInfo(scoreCard?.team1Score);
  const team2Batsman = getBatsmanInfo(scoreCard?.team2Score);

  return (
    <div className="scoreboard-container">
      <div className="scoreboard-header">
        <h2 className="match-title">
          {team1?.name || 'Team A'} vs {team2?.name || 'Team B'}
        </h2>
        <div className="match-status-badge">
          {matchHeader?.status || matchInfo?.status || 'Live'}
        </div>
      </div>

      {currentOver && (
        <div className="current-over-info">
          <span className="over-label">Current Over:</span>
          <span className="over-details">
            {currentOver.over} - {currentOver.runs}/{currentOver.wickets}
          </span>
        </div>
      )}

      <div className="scoreboard-content">
        <div className="team-score-section">
          <div className="team-score-card">
            <h3 className="team-name">{team1?.name || 'Team A'}</h3>
            {team1ScoreDetails && (
              <div className="score-details">
                <div className="runs">{team1ScoreDetails.runs}</div>
                {team1ScoreDetails.overs && (
                  <div className="overs">({team1ScoreDetails.overs})</div>
                )}
              </div>
            )}
          </div>

          <div className="team-score-card">
            <h3 className="team-name">{team2?.name || 'Team B'}</h3>
            {team2ScoreDetails && (
              <div className="score-details">
                <div className="runs">{team2ScoreDetails.runs}</div>
                {team2ScoreDetails.overs && (
                  <div className="overs">({team2ScoreDetails.overs})</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="match-info">
          <div className="info-item">
            <span className="info-label">Venue:</span>
            <span className="info-value">{matchInfo?.venue || 'TBD'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Date:</span>
            <span className="info-value">
              {matchInfo?.startDate || matchHeader?.matchStartTimestamp || 'TBD'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Match Type:</span>
            <span className="info-value">{matchInfo?.matchType || 'ODI'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
