import type { Coordinates } from '../types/coordinates';
import type { Snake } from '../types/snake';
import Cell from './Cell';

interface GridProps {
  height: number;
  width: number;
  snake: Snake;
  food: Coordinates | null;
}

const Grid: React.FC<GridProps> = ({ height, width, snake, food }) => {
  const cellCount = height * width;

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div
        className="grid w-fit gap-0 p-1"
        style={{
          gridTemplateColumns: `repeat(${width}, max-content)`,
          gridTemplateRows: `repeat(${height}, max-content)`,
        }}
      >
        {Array.from({ length: cellCount }).map((_, index) => {
          const x = index % width;
          const y = Math.floor(index / width);

          const isHead = snake.head.x === x && snake.head.y === y;

          const isBody = snake.body.some((segment) => segment.x === x && segment.y === y);

          const isFood = food !== null && food.x === x && food.y === y;

          const cellColor = isHead ? 'lightgreen' : isBody ? 'green' : isFood ? 'red' : 'transparent';

          return <Cell key={`${x}-${y}`} color={cellColor} />;
        })}
      </div>
    </div>
  );
};

export default Grid;
