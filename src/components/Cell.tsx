import type { CellType } from '../helpers/getCellType';

interface CellProps {
  color?: string;
  type?: CellType;
}
const Cell: React.FC<CellProps> = ({ color, type }) => {
  return (
    <div
      className={`size-6 text-xs flex flex-row justify-center items-center border rounded border-gray-500 ${type}`}
      style={{ backgroundColor: color }}
    />
  );
};

export default Cell;
