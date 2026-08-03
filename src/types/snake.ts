import type { Coordinates } from './coordinates';

export interface Snake {
  head: Coordinates;
  body: Coordinates[];
}
