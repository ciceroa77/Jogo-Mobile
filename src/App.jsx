import React, { useState } from 'react';
import GameCanvas from './components/GameCanvas';
import ScoreBoard from './components/ScoreBoard';

function App() {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  // Função para atualizar a pontuação dos jogadores
  const handleScoreUpdate = (player, points) => {
    console.log(`Pontuação do Jogador ${player}: +${points}`);
    if (player === 1) {
      setPlayer1Score(player1Score + points);
    } else if (player === 2) {
      setPlayer2Score(player2Score + points);
    }
  };

  // Função para mover os jogadores com base nos botões
  function handleMove(direction, player) {
    if (player === 1) {
      window.movePlayer(direction, 0); // Jogador 1
    } else if (player === 2) {
      // Mapear as direções do Jogador 2 para ArrowUp, ArrowDown, etc.
      const directionMap = {
        w: 'ArrowUp',
        s: 'ArrowDown',
        a: 'ArrowLeft',
        d: 'ArrowRight',
      };
      window.movePlayer(directionMap[direction], 1); // Jogador 2
    }
  }

  return (
    <div className="app">
      <h1>Labirinto Multiplayer</h1>
      <ScoreBoard player1Score={player1Score} player2Score={player2Score} />
      <GameCanvas onScoreUpdate={handleScoreUpdate} />

      {/* Controles do Jogador 1 */}
      <div style={{ marginTop: '20px' }}>
        <h3>Jogador 1</h3>
        <button onClick={() => handleMove('w', 1)} style={buttonStyle}>⬆️</button>
        <button onClick={() => handleMove('s', 1)} style={buttonStyle}>⬇️</button>
        <button onClick={() => handleMove('a', 1)} style={buttonStyle}>⬅️</button>
        <button onClick={() => handleMove('d', 1)} style={buttonStyle}>➡️</button>
      </div>

      {/* Controles do Jogador 2 */}
      <div style={{ marginTop: '20px' }}>
        <h3>Jogador 2</h3>
        <button onClick={() => handleMove('w', 2)} style={buttonStyle}>⬆️</button>
        <button onClick={() => handleMove('s', 2)} style={buttonStyle}>⬇️</button>
        <button onClick={() => handleMove('a', 2)} style={buttonStyle}>⬅️</button>
        <button onClick={() => handleMove('d', 2)} style={buttonStyle}>➡️</button>
      </div>
    </div>
  );
}

// Estilo para os botões
const buttonStyle = {
  fontSize: '24px',
  margin: '5px',
  padding: '10px',
  cursor: 'pointer',
};

export default App;