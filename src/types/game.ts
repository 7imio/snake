import type { Coordinates } from './coordinates';
import type { Snake } from './snake';
import type { GridConfig } from './GridConfiguration';
import type { TickEvent } from '../engine/SnakeEngine';

export interface Game {
  grid: GridConfig;
  snake: Snake;
  food: Coordinates | null;
}

export type GameSnapshot = {
  snake: Snake;
  food: Coordinates | null;
  score: number;
  isRunning: boolean;
};

export type OnGameUpdate = (snapshot: GameSnapshot, event?: TickEvent) => void;
