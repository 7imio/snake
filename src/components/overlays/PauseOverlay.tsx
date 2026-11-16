import Button from '../generic/Button';
import Modal from '../generic/Modal';

interface PauseOverlayProps {
  onResume: () => void;
  onMenu: () => void;
}

const PauseOverlay: React.FC<PauseOverlayProps> = ({ onResume, onMenu }) => {
  return (
    <Modal title="PAUSED">
      <div className="modal-actions">
        <Button variant="primary" onClick={onResume}>
          Resume Game
        </Button>

        <Button variant="secondary" onClick={onMenu}>
          Back to Menu
        </Button>
      </div>
    </Modal>
  );
};

export default PauseOverlay;
