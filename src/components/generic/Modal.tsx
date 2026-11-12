const Modal : React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
      <div className="modal-content bg-white p-4 rounded">{children}</div>
    </div>
  );
};

export default Modal;