import type { Coordinates } from './coordinates';
import type { Snake } from './snake';

export interface Game {
  grid: {
    width: number;
    height: number;
  };
  snake: Snake;
  food: Coordinates | null;
}
