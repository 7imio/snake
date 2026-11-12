import Cell from './Cell';

interface GridProps {
  height: number;
  width: number;
}

const Grid: React.FC<GridProps> = ({ height, width }) => {
  const cellCount = height * width;

  return (
    <div
      className="grid w-fit gap-0.5 p-px"
      style={{
        gridTemplateColumns: `repeat(${width}, max-content)`,
        gridTemplateRows: `repeat(${height}, max-content)`,
      }}
    >
      {Array.from({ length: cellCount }).map((_, index) => {
        const column = Math.floor(index / width);
        const row = index % width;

        return <Cell key={`${column}-${row}`} type="empty" coords={{ x: column, y: row }} />;
      })}
    </div>
  );
};

export default Grid;
