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
        const row = Math.floor(index / width);
        const column = index % width;

        return <Cell key={`${row}-${column}`} type="empty" coords={{ x: row + 1, y: column + 1 }} />;
      })}
    </div>
  );
};

export default Grid;
