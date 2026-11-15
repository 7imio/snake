import Button from '../generic/Button';
import Modal from '../generic/Modal';

interface PauseOverlayProps {
  onResume: () => void;
  onMenu: () => void;
}

const PauseOverlay: React.FC<PauseOverlayProps> = ({ onResume, onMenu }) => {
  return (
    <Modal>
      <div className="flex flex-col items-center justify-center gap-4">
        <p>Paused</p>
      </div>
      <Button onClick={onResume}>Resume Game</Button>
      <Button onClick={onMenu}>Menu</Button>
    </Modal>
  );
};

export default PauseOverlay;
