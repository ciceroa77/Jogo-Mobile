import React, { useEffect, useRef, useState } from 'react';

// Labirinto maior (15x15) com design detalhado
const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], // Jogadores começam aqui
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], // Saída na última coluna
];

const GameCanvas = ({ onScoreUpdate }) => {
  const canvasRef = useRef(null);
  const [players, setPlayers] = useState([
    { x: 1, y: 1, score: 0 }, // Jogador 1 começa em (1, 1)
    { x: 1, y: 1, score: 0 }, // Jogador 2 começa em (1, 1)
  ]);
  const [currentLevel, setCurrentLevel] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawMaze = () => {
      for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
          if (maze[row][col] === 1) {
            ctx.fillStyle = 'black';
            ctx.fillRect(col * 40, row * 40, 10, 40); // Paredes verticais mais finas
            ctx.fillRect(col * 40, row * 40, 40, 10); // Paredes horizontais mais finas
          }
        }
      }
    };

    const drawPlayers = () => {
      players.forEach((player, index) => {
        ctx.fillStyle = index === 0 ? 'blue' : 'red';
        ctx.fillRect(player.x * 40 + 10, player.y * 40 + 10, 20, 20); // Jogadores menores
      });
    };

    const checkCollision = (x, y) => maze[y][x] === 1;

    const updatePlayer = (playerIndex, direction) => {
      let player = players[playerIndex];
      if (direction === 'w' || direction === 'ArrowUp') {
        if (player.y > 0 && !checkCollision(player.x, player.y - 1)) player.y--;
      } else if (direction === 's' || direction === 'ArrowDown') {
        if (player.y < maze.length - 1 && !checkCollision(player.x, player.y + 1)) player.y++;
      } else if (direction === 'a' || direction === 'ArrowLeft') {
        if (player.x > 0 && !checkCollision(player.x - 1, player.y)) player.x--;
      } else if (direction === 'd' || direction === 'ArrowRight') {
        if (player.x < maze[0].length - 1 && !checkCollision(player.x + 1, player.y)) player.x++;
      } else if (checkCollision(player.x, player.y)) {
        console.log(`Jogador ${playerIndex + 1} bateu na parede!`);
        onScoreUpdate(playerIndex + 1, -10); // Penalidade por bater nas paredes
        player.x = 1; // Reiniciar posição
        player.y = 1;
      }

      // Verificar se o jogador chegou à saída
      if (player.x === 14 && player.y === 13) {
        console.log(`Jogador ${playerIndex + 1} saiu do labirinto!`);
        onScoreUpdate(playerIndex + 1, playerIndex === 0 ? 100 : 50); // Marcar pontuação
        player.x = 1; // Retornar ao início
        player.y = 1;
      }

      setPlayers([...players]);
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMaze();
      drawPlayers();
    };

    gameLoop();

    // Função pública para mover os jogadores
    window.movePlayer = (direction, playerIndex) => {
      updatePlayer(playerIndex, direction);
    };
  }, [players, currentLevel, onScoreUpdate]);

  return <canvas ref={canvasRef} width="600" height="600" />; // Canvas maior
};

export default GameCanvas;