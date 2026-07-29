import type { CellType } from '../types/cellType';

interface CellProps {
  type: CellType;
  coords: {
    x: number;
    y: number;
  };
}
const Cell: React.FC<CellProps> = ({ type, coords }) => {
  console.log();
  const getBackgroundColorClassName = () => {
    switch (type) {
      case 'head':
        return 'bg-[#32a852]';
      case 'body':
        return 'bg-[#84bf94]';
      case 'food':
        return 'bg-[#d47d70]';
      case 'empty':
      default:
        return 'bg-transparent';
    }
  };
  return (
    <div
      className={`size-10 text-xs flex flex-row justify-center items-center border rounded ${getBackgroundColorClassName()}`}
    >
      {coords.x} - {coords.y}
    </div>
  );
};

export default Cell;
