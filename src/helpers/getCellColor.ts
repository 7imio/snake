import type { ColorConfig } from '../types/game';
import type { Snake } from '../types/snake';
import { CellType } from './getCellType';

/**
 *
 * gets the color of a cell based on its coordinates, the snake's position, and the food's position.
 *
 * @param x
 * @param y
 * @param snake
 * @param food
 * @returns "hsl(i, j%, k%)" where i is the hue, j is the saturation, and k is the lightness
 */
export const getCellColor = (
  cellType: CellType,
  x: number,
  y: number,
  snake: Snake,
  colorConfig: ColorConfig,
): string => {
  const { snakeHeadColorHue, snakeBodyColorHue, foodColorHue } = colorConfig;

  switch (cellType) {
    case CellType.SnakeHead:
      return `hsl(${snakeHeadColorHue}, 100%, 60%)`; // Head color

    case CellType.SnakeBody: {
      let bodyColor = `hsl(${snakeHeadColorHue}, 0%, 0%)`; // Default body color
      const index = snake.body.findIndex((segment) => {
        return segment.x === x && segment.y === y;
      });
      if (index !== -1) {
        bodyColor = getBodySegmentColorBasedOnPosition(index, snake.body.length, snakeBodyColorHue);
      }
      return bodyColor;
    }
    case CellType.Food: {
      return `hsl(${foodColorHue}, 100%, 50%)`; // Food color
    }
    case CellType.Empty: {
      return `hsl(${snakeHeadColorHue}, 0%, 0%)`; // Empty cell color
    }
    default:
      return `hsl(0, 0%, 0%)`;
  }
};

const getBodySegmentColorBasedOnPosition = (segmentIndex: number, totalSegments: number, colorHue: number): string => {
  const hue = colorHue; // Green hue
  const sat = 100; // Full saturation

  const minLightness = 10; // Minimum lightness for the tail
  const maxLightness = 35; // Maximum lightness for the head

  const progress = totalSegments <= 1 ? 0 : segmentIndex / (totalSegments - 1);

  const lightness = Math.max(minLightness, maxLightness - progress * (maxLightness - minLightness)); // lightness varies from 10 to 35 based on position in the body
  return `hsl(${hue}, ${sat}%, ${lightness}%)`;
};
