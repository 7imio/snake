import type { CellType } from '../types/cellType';
import type { Coordinates } from '../types/coordinates';

interface CellProps {
  type: CellType;
  coords?: Coordinates;
}
const Cell: React.FC<CellProps> = ({ type }) => {
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
      className={`size-6 text-xs flex flex-row justify-center items-center border rounded ${getBackgroundColorClassName()}`}
    />
  );
};

export default Cell;
