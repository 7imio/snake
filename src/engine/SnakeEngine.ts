import type { InputController } from '../input/InputController';
import { InputDirection } from '../input/inputDirections';
import type { Coordinates } from '../types/coordinates';
import type { Snake } from '../types/snake';
import type { GridConfig } from '../types/GridConfiguration';

export enum TickEvent {
  Idle = 'IDLE',
  Moved = 'MOVED',
  AteFood = 'ATE_FOOD',
  Died = 'DIED',
}

export class SnakeEngine {
  private inputController: InputController; // get the buffer for directions

  private gridWidth: number;
  private gridHeight: number;

  private snake: Snake = { head: { x: 0, y: 0 }, body: [], isAlive: true };

  private initialSegmentsCount: number = 3;
  private segmentsCount: number = this.initialSegmentsCount;

  constructor(config: GridConfig, inputController: InputController, initialSegmentsCount?: number) {
    this.gridWidth = config.gridWidth;
    this.gridHeight = config.gridHeight;
    this.inputController = inputController;
    if (initialSegmentsCount !== undefined) {
      this.initialSegmentsCount = initialSegmentsCount;
      this.segmentsCount = this.initialSegmentsCount;
    }
    this.initializeSnake();
  }

  private initializeSnake = () => {
    const snakeHead: Coordinates = { x: Math.floor(this.gridWidth / 2), y: Math.floor(this.gridHeight / 2) };
    this.snake = {
      head: snakeHead,
      body: Array.from({ length: this.segmentsCount - 1 }, (_, i) => ({
        x: snakeHead.x - (i + 1),
        y: snakeHead.y,
      })),
      isAlive: true,
    };
  };

  public getSnake() {
    const snake = {
      head: { ...this.snake.head },
      body: this.snake.body.map((segment) => ({ ...segment })),
      isAlive: this.snake.isAlive,
    }; // deep copy of the snake
    return snake;
  }

  public start() {
    this.reset();
    this.inputController.start(InputDirection.Right);
  }

  public tick(food: Coordinates): TickEvent {
    if (!this.snake.isAlive) {
      return TickEvent.Idle;
    }

    // Get the next direction.
    const direction = this.inputController.consumeNextDirection();

    if (direction === null) {
      return TickEvent.Idle;
    }

    // Calculate the next head position.
    const nextHeadPosition = this.getNextHeadPosition(direction);

    // Determine whether food will be eaten.
    const eatsFood = this.isFoodCollision(nextHeadPosition, food);

    // Determine whether the tail will move this tick.
    const currentLength = this.snake.body.length + 1;

    const willGrow = this.segmentsCount + (eatsFood ? 1 : 0) > currentLength;

    // Check collisions before changing the snake's state.
    if (this.isWallCollision(nextHeadPosition) || this.isSelfCollision(nextHeadPosition, willGrow)) {
      this.die();
      return TickEvent.Died;
    }

    // Apply growth only after validating the movement.
    if (eatsFood) {
      this.growSnake();
    }

    // Move the snake.
    this.updateSnakeHeadAndBody(nextHeadPosition);

    return eatsFood ? TickEvent.AteFood : TickEvent.Moved;
  }

  public getNextHeadPosition(direction: InputDirection): Coordinates {
    switch (direction) {
      case InputDirection.Up:
        return { x: this.snake.head.x, y: this.snake.head.y - 1 };
      case InputDirection.Down:
        return { x: this.snake.head.x, y: this.snake.head.y + 1 };
      case InputDirection.Left:
        return { x: this.snake.head.x - 1, y: this.snake.head.y };
      case InputDirection.Right:
        return { x: this.snake.head.x + 1, y: this.snake.head.y };
      default:
        return { ...this.snake.head };
    }
  }

  private updateSnakeHeadAndBody(nextHeadPosition: Coordinates) {
    this.snake.body.unshift({ ...this.snake.head });
    if (this.snake.body.length > this.segmentsCount - 1) {
      this.snake.body.pop();
    }
    this.snake.head = nextHeadPosition;
  }

  private growSnake() {
    this.segmentsCount++;
  }

  private isWallCollision = (head: Coordinates): boolean =>
    head.x < 0 || head.x >= this.gridWidth || head.y < 0 || head.y >= this.gridHeight;

  private isSelfCollision(head: Coordinates, willGrow: boolean): boolean {
    // If the snake grows, the tail stays in place.
    // Otherwise, the tail moves and its current cell is free.
    const bodyToCheck = willGrow ? this.snake.body : this.snake.body.slice(0, -1);

    return bodyToCheck.some((segment) => segment.x === head.x && segment.y === head.y);
  }

  private isFoodCollision = (head: Coordinates, food: Coordinates): boolean => head.x === food.x && head.y === food.y;

  public reset() {
    this.segmentsCount = this.initialSegmentsCount;
    this.initializeSnake();
    this.inputController.reset();
  }

  private die() {
    this.snake.isAlive = false;
    this.inputController.pause();
    //game over
  }
}
