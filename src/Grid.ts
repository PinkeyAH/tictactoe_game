type Cell = string | null;

export class Grid {
  private grid: Cell[][];

  constructor() {
    this.grid = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));
  }

  displayGrid(): void {
    const numberedGrid = this.grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => cell || 3 * rowIndex + colIndex + 1)
    );
  
    console.log(numberedGrid.map(row => `| ${row.join(' | ')} |`).join('\n'));
  }
  

  makeMove(x: number, y: number, symbol: string): void {
    if (this.grid[x][y]) throw new Error('Cell already occupied!');
    this.grid[x][y] = symbol;
  }

  swapCells(x1: number, y1: number, x2: number, y2: number): void {
    [this.grid[x1][y1], this.grid[x2][y2]] = [this.grid[x2][y2], this.grid[x1][y1]];
  }

  isWin(symbol: string): boolean {
    const winPatterns = [
      // Rows
      ...this.grid,
      // Columns
      [0, 1, 2].map(i => [this.grid[0][i], this.grid[1][i], this.grid[2][i]]),
      // Diagonals
      [[this.grid[0][0], this.grid[1][1], this.grid[2][2]]],
      [[this.grid[0][2], this.grid[1][1], this.grid[2][0]]],
    ];

    return winPatterns.some(pattern =>
      pattern.every(cell => cell === symbol)
    );
  }

  isFull(): boolean {
    return this.grid.flat().every(cell => cell !== null);
  }
}


