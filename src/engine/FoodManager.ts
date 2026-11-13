import type { Coordinates } from "../types/coordinates";
import type { Snake } from "../types/snake";
import type { GridConfig } from "../types/GridConfiguration";

export class FoodManager {
  private gridWidth: number;
  private gridHeight: number;

  private food : Coordinates|null = null;

  constructor(config:GridConfig) {
    this.gridWidth = config.gridWidth;
    this.gridHeight = config.gridHeight;
  }

  
  public spawnFood(snake: Snake): Coordinates|null {
    const freeCells:Coordinates[] = [];
    
    // construcs free cells array;
    for (let y = 0; y < this.gridHeight; y++) {
      for(let x =0; x<this.gridWidth; x++) {
        const isHead : boolean = 
          snake.head.x === x && snake.head.y === y;
        const isBody: boolean = 
          snake.body.some(segment => segment.x === x && segment.y === y);
        if (!isHead && !isBody) freeCells.push({ x, y });
      }
  
    }
    
    if (freeCells.length === 0) {
      this.food = null;
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * freeCells.length);
    const selectedCell = freeCells[randomIndex];
    if (selectedCell===undefined) return null;

    this.food = {...selectedCell};
    return this.getFood();

  }

public getFood(): Coordinates | null {
  return this.food === null
    ? null
    : { ...this.food };
}

  public reset() {
    this.food = null;
  }



}