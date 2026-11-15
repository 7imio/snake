import type { Coordinates } from '../types/coordinates';
import type { Snake } from '../types/snake';

export enum CellType {
  Empty = 'background',
  SnakeHead = 'snake-head',
  SnakeBody = 'snake-body',
  Food = 'food',
}
export const getCellType = (x: number, y: number, snake: Snake, food: Coordinates | null): CellType => {
  const isHead = snake.head.x === x && snake.head.y === y;
  const isBody = snake.body.some((segment) => segment.x === x && segment.y === y);
  const isFood = food !== null && food.x === x && food.y === y;
  return isHead ? CellType.SnakeHead : isBody ? CellType.SnakeBody : isFood ? CellType.Food : CellType.Empty;
};
