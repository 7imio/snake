import type { Coordinates } from './coordinates';
import type { Direction } from './direction';
import type { Snake } from './snake';

export interface Game {
  grid: {
    width: number;
    height: number;
  };
  direction: Direction;
  snake: Snake;
  food: Coordinates | null;
}
