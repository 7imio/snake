import type { Coordinates } from './coordinates';
import type { Snake } from './snake';
import type { GridConfig } from './GridConfiguration';

export interface Game {
  grid: GridConfig;
  snake: Snake;
  food: Coordinates | null;
}
