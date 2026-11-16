interface ModalProps {
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ children, title }) => {
  return (
    <div className="modal-backdrop">
      <section className="modal-panel" role="dialog" aria-modal="true" aria-label={title ?? 'Game menu'}>
        <p className="modal-kicker">SNAKKIDY SNEKKY SNEK</p>

        {title && <h2 className="modal-title">{title}</h2>}

        {children}
      </section>
    </div>
  );
};

export default Modal;
