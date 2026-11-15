const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="modal-content bg-neutral-700 p-4 rounded gap-1 text-amber-100">{children}</div>
    </div>
  );
};

export default Modal;
