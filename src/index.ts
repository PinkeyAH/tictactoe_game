import { Game } from './Game';

const game = new Game('Player1', 'Player2');
game.start();

// Example moves for demonstration
setTimeout(() => game.makeMove(0, 0), 5000);
setTimeout(() => game.specialMove(0, 0, 1, 1), 10000);
setTimeout(() => game.makeMove(0, 1), 15000);
