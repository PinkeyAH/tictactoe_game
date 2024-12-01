import { Player } from './Player';
import { Grid } from './Grid';

export class Game {
  private grid: Grid;
  private players: Player[];
  private currentPlayerIndex: number;
  private timer: NodeJS.Timeout | null;

  constructor(player1Name: string, player2Name: string) {
    this.grid = new Grid();
    this.players = [
      new Player(player1Name, 'X'),
      new Player(player2Name, 'O')
    ];
    this.currentPlayerIndex = 0;
    this.timer = null;
  }

  start(): void {
    console.log('Game started!');
    this.playTurn();
  }

  playTurn(): void {
    const currentPlayer = this.players[this.currentPlayerIndex];
    console.log(`It's ${currentPlayer.name}'s (${currentPlayer.symbol}) turn.`);
    this.grid.displayGrid();

    this.timer = setTimeout(() => {
      console.log(`${currentPlayer.name} ran out of time! Skipping their turn.`);
      this.nextTurn();
    }, 30000); // 30-second timer
  }

  makeMove(x: number, y: number): void {
    const currentPlayer = this.players[this.currentPlayerIndex];
    try {
      this.grid.makeMove(x, y, currentPlayer.symbol);
      if (this.grid.isWin(currentPlayer.symbol)) {
        this.endGame(`${currentPlayer.name} wins!`);
      } else if (this.grid.isFull()) {
        this.endGame('It\'s a draw!');
      } else {
        this.nextTurn();
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  specialMove(x1: number, y1: number, x2: number, y2: number): void {
    const currentPlayer = this.players[this.currentPlayerIndex];
    try {
      currentPlayer.useSpecialMove();
      this.grid.swapCells(x1, y1, x2, y2);
      console.log('Special move used: Swap!');
      this.nextTurn();
    } catch (err) {
      console.error(err.message);
    }
  }

  private nextTurn(): void {
    if (this.timer) clearTimeout(this.timer);
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    this.playTurn();
  }

  private endGame(message: string): void {
    console.log(message);
    this.grid.displayGrid();
    process.exit();
  }
}
