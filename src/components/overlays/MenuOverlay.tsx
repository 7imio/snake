import Button from '../generic/Button';
import Modal from '../generic/Modal';

interface MenuOverlayProps {
  onStart: () => void;
  onResume: () => void;
  isStarted: boolean;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ onStart, onResume, isStarted }) => {
  return (
    <Modal title="Menu">
      <div className="modal-actions">
        <Button variant="primary" onClick={onStart}>
          {isStarted ? 'Restart Game' : 'Start Game'}
        </Button>

        <Button variant="secondary" onClick={onResume}>
          Resume Game
        </Button>
      </div>
    </Modal>
  );
};

export default MenuOverlay;
