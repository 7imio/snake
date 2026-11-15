import { getCellColor } from '../helpers/getCellColor';
import { getCellType } from '../helpers/getCellType';
import { useAppSelector } from '../store/hooks';
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

  const { colors } = useAppSelector((state) => state.game);
  const { snakeHeadColorHue, snakeBodyColorHue, foodColorHue } = colors;

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

          const cellType = getCellType(x, y, snake, food);
          const cellColor = getCellColor(cellType, x, y, snake, { snakeHeadColorHue, snakeBodyColorHue, foodColorHue });

          return <Cell key={`${x}-${y}`} color={cellColor} type={cellType} />;
        })}
      </div>
    </div>
  );
};

export default Grid;
