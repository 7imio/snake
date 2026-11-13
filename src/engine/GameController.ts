import { InputController } from "../input/InputController";
import type { GridConfig } from "../types/GridConfiguration";
import { FoodManager } from "./FoodManager";
import { GameLoop } from "./GameLoop";
import { SnakeEngine } from "./SnakeEngine";

export class GameController {
  private snakeEngine: SnakeEngine
  private foodManager: FoodManager
  private inputController: InputController
  private gameLoop : GameLoop

  constructor(config: GridConfig, gameLoop: GameLoop) {
    this.inputController = new InputController();
    this.snakeEngine = new SnakeEngine(config, this.inputController);
    this.foodManager = new FoodManager(config);
    this.gameLoop = gameLoop;
  }
}