import { InputDirection } from './inputs';

export class InputController {
  private currentDirection: InputDirection | null = null;
  private directionBuffer: InputDirection[] = []; // only store 2 next directions at most (maxBufferSize)
  private readonly maxBufferSize: number = 2; // only store 2 next directions at most
  private active: boolean = false;

  /**
   * Initializes a new game with a starting direction.
   */
  public start(initialDirection: InputDirection): void {
    this.currentDirection = initialDirection;
    this.clearBuffer();
    this.active = true;
  }

  public getCurrentDirection(): InputDirection | null {
    return this.currentDirection;
  }
  public getDirectionBuffer(): InputDirection[] {
    const bufferCopy = [...this.directionBuffer];
    return bufferCopy;
  }
  public isActive(): boolean {
    return this.active;
  }

  /**
   * Adds a valid direction to the input buffer.
   * Returns true if the direction was accepted.
   */
  public addDirectionToBuffer(direction: InputDirection): boolean {
    if (!this.active || this.currentDirection === null) return false;
    if (this.isBufferFull()) return false;

    // Use the last queued direction, or the current direction
    // if the buffer is empty.

    const referenceDirection = this.directionBuffer[this.directionBuffer.length - 1] ?? this.currentDirection;
    // Prevent duplicate directions and 180-degree turns.
    if (this.isSameDirection(referenceDirection, direction)) return false;
    if (this.isOppositeDirection(referenceDirection, direction)) return false;

    this.directionBuffer.push(direction);
    return true;
  }

  public consumeNextDirection(): InputDirection | null {
    // listen the first and set the last at the previous direction buffer
    if (!this.active) return null;
    const nextDirection = this.directionBuffer.shift();

    if (nextDirection !== undefined) {
      this.currentDirection = nextDirection;
    }
    return this.currentDirection;
  }

  private isOppositeDirection(direction1: InputDirection, direction2: InputDirection): boolean {
    return (
      (direction1 === InputDirection.Up && direction2 === InputDirection.Down) ||
      (direction1 === InputDirection.Down && direction2 === InputDirection.Up) ||
      (direction1 === InputDirection.Left && direction2 === InputDirection.Right) ||
      (direction1 === InputDirection.Right && direction2 === InputDirection.Left)
    );
  }
  private isBufferFull(): boolean {
    return this.directionBuffer.length >= this.maxBufferSize;
  }

  private isSameDirection(direction1: InputDirection, direction2: InputDirection): boolean {
    return direction1 === direction2;
  }

  public clearBuffer(): void {
    this.directionBuffer = [];
  }
  public pause(): void {
    this.active = false;
    this.clearBuffer();
  }
  public resume(): void {
    if (this.currentDirection === null) return;
    this.active = true;
  }
  public reset(): void {
    this.active = false;
    this.currentDirection = null;
    this.clearBuffer();
  }
}
