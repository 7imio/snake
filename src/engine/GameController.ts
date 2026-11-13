import { InputController } from '../input/InputController';
import type { Coordinates } from '../types/coordinates';
import type { GridConfig } from '../types/GridConfiguration';
import type { Snake } from '../types/snake';
import { FoodManager } from './FoodManager';
import { GameLoop } from './GameLoop';
import { SnakeEngine, TickEvent } from './SnakeEngine';

export type GameSnapshot = {
  snake: Snake;
  food: Coordinates | null;
  score: number;
};

export interface GameControllerConfig extends GridConfig {
  tickInterval: number;
}

export class GameController {
  private snakeEngine: SnakeEngine;
  private foodManager: FoodManager;
  private inputController: InputController;
  private gameLoop: GameLoop;

  constructor(config: GameControllerConfig) {
    this.inputController = new InputController();
    this.snakeEngine = new SnakeEngine(config, this.inputController);
    this.foodManager = new FoodManager(config);
    this.gameLoop = new GameLoop(config.tickInterval, () => this.update());
  }

  public start() {
    this.gameLoop.stop();

    this.snakeEngine.start();
    this.foodManager.spawnFood(this.snakeEngine.getSnake());
    this.gameLoop.start();
  }
  public pause() {
    this.inputController.pause();
    this.gameLoop.stop();
  }
  public resume() {
    this.inputController.resume();
    this.gameLoop.start();
  }
  public reset() {
    this.inputController.reset();
    this.snakeEngine.reset();
    this.foodManager.reset();
  }

  public update() {
    const food = this.foodManager.getFood();
    if (food === null) return;
    const tickEvent: TickEvent = this.snakeEngine.tick(food);

    switch (tickEvent) {
      case TickEvent.AteFood:
        this.foodManager.spawnFood(this.snakeEngine.getSnake());
        break;
      case TickEvent.Died:
        this.gameLoop.stop();
        break;
      default:
        break;
    }
  }

  /**
   * gets a snapshot of the current game state, including the snake's position, food position, and score.
   * @returns
   */
  public getSnapshot(): GameSnapshot {
    return {
      snake: this.snakeEngine.getSnake(),
      food: this.foodManager.getFood(),
      score: this.snakeEngine.getFoodEaten(),
    };
  }
  public stop() {}

  public getFPS(): number {
    const fps = this.gameLoop.getFPS();
    return fps;
  }
}
