const Button: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
  return (
    <button
      className="border-solid rounded bg-neutral-700 text-amber-200 px-4 py-2 hover:bg-neutral-600 border-2 transition ease-in"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
