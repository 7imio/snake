import Button from '../generic/Button';
import Modal from '../generic/Modal';

interface MenuOverlayProps {
  onStart: () => void;
  onResume: () => void;
  isStarted: boolean;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ onStart, onResume, isStarted }) => {
  return (
    <Modal>
      <div className="flex flex-col items-center justify-center gap-4">
        <p>Menu</p>
      </div>
      <Button onClick={onStart}>{isStarted ? 'Restart Game' : 'Start Game'}</Button>
      <Button onClick={onResume}>Resume game</Button>
    </Modal>
  );
};

export default MenuOverlay;
