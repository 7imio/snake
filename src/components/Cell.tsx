interface CellProps {
  color?: string;
}
const Cell: React.FC<CellProps> = ({ color }) => {
  return (
    <div
      className={`size-6 text-xs flex flex-row justify-center items-center border rounded *:border-gray-300`}
      style={{ backgroundColor: color }}
    />
  );
};

export default Cell;
