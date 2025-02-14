import React from 'react';

const ScoreBoard = ({ player1Score, player2Score }) => {
  return (
    <div className="score-board">
      <p>Pontuação:</p>
      <p>Jogador 1: {player1Score}</p>
      <p>Jogador 2: {player2Score}</p>
    </div>
  );
};

export default ScoreBoard;