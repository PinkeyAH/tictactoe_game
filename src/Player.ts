export class Player {
    constructor(public name: string, public symbol: string, public specialMoves: number = 3) {}
  
    useSpecialMove(): void {
      if (this.specialMoves <= 0) throw new Error(`${this.name} has no special moves left.`);
      this.specialMoves -= 1;
    }
  }
  