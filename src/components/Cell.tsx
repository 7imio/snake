import { CellType } from '../helpers/getCellType';

interface CellProps {
  color?: string;
  type?: CellType;
  headDirection?: string;
}
const Cell: React.FC<CellProps> = ({ color, type, headDirection }) => {
  const classNameType = type === CellType.SnakeHead ? `${type} ${type}-${headDirection}` : type;

  return <div className={`cell ${classNameType ?? ''}`} style={{ backgroundColor: color }} />;
};

export default Cell;
