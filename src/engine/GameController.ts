import { InputController } from '../input/InputController';
import { KeyboardInput } from '../input/keyboardInput';
import type { GameSnapshot, OnGameUpdate } from '../types/game';
import type { GridConfig } from '../types/GridConfiguration';
import { FoodManager } from './FoodManager';
import { GameLoop } from './GameLoop';
import { SnakeEngine, TickEvent } from './SnakeEngine';

export interface GameControllerConfig extends GridConfig {
  tickInterval: number;
}

export class GameController {
  private snakeEngine: SnakeEngine;
  private foodManager: FoodManager;
  private inputController: InputController;
  private keyboardInput: KeyboardInput;
  private gameLoop: GameLoop;

  private onGameUpdate?: OnGameUpdate | null = null;

  constructor(config: GameControllerConfig) {
    this.inputController = new InputController();
    this.snakeEngine = new SnakeEngine(config, this.inputController);
    this.foodManager = new FoodManager(config);
    this.gameLoop = new GameLoop(config.tickInterval, () => this.update());
    this.keyboardInput = new KeyboardInput();
  }

  public start = () => {
    this.reset();
    this.snakeEngine.start();
    this.foodManager.spawnFood(this.snakeEngine.getSnake());
    this.gameLoop.start();
    this.keyboardInput.attach(this.inputController);
  };
  public pause() {
    this.inputController.pause();
    this.gameLoop.stop();
    this.keyboardInput.detach();
  }
  public resume() {
    this.inputController.resume();
    this.gameLoop.start();
    this.keyboardInput.attach(this.inputController);
  }
  public reset() {
    this.gameLoop.stop();
    this.inputController.reset();
    this.snakeEngine.reset();
    this.foodManager.reset();
    this.keyboardInput.detach();
    this.gameLoop.setTickInterval(this.gameLoop.getInitialTickInterval());
  }

  public updateTickInterval(tickIntervalMs: number) {
    this.gameLoop.setTickInterval(tickIntervalMs);
  }

  public update() {
    const food = this.foodManager.getFood();
    if (food === null) return;
    const tickEvent: TickEvent = this.snakeEngine.tick(food);

    switch (tickEvent) {
      case TickEvent.AteFood: {
        this.foodManager.spawnFood(this.snakeEngine.getSnake());
        const newTickInterval = this.gameLoop.getInitialTickInterval() - this.snakeEngine.getFoodEaten() * 5;
        this.updateTickInterval(Math.max(50, newTickInterval));
        break;
      }
      case TickEvent.Died:
        this.stop();
        break;
      default:
        break;
    }
    const snapshot = this.getSnapshot();

    this.onGameUpdate?.(snapshot, tickEvent);
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
      isRunning: this.gameLoop.isRunning(),
    };
  }

  public stop() {
    this.gameLoop.stop();
    this.keyboardInput.detach();
    this.inputController.pause();
  }

  public getFPS(): number {
    const fps = this.gameLoop.getFPS();
    return fps;
  }

  public setOnGameUpdate(callback: OnGameUpdate | null) {
    this.onGameUpdate = callback;
  }
}
