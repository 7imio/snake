import { useDispatch } from 'react-redux';
import { menu } from '../../store/slices/gameSlice';
import Button from '../generic/Button';
import Modal from '../generic/Modal';

interface GameOverOverlayProps {
  onRestart: () => void;
}

const GameOverOverlay: React.FC<GameOverOverlayProps> = ({ onRestart }) => {
  const dispatch = useDispatch();

  return (
    <Modal title="Game Over">
      <div className="modal-actions">
        <Button variant="primary" onClick={() => dispatch(menu())}>
          Menu
        </Button>
        <Button variant="secondary" onClick={onRestart}>
          Restart Game
        </Button>
      </div>
    </Modal>
  );
};

export default GameOverOverlay;
