import type { InputDirection } from '../input/inputs';
import type { Coordinates } from './coordinates';

export interface Snake {
  head: Coordinates;
  body: Coordinates[];
  isAlive: boolean;
  currentDirection?: InputDirection; // optional property to track the current direction of the snake
}
