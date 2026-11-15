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
    <Modal>
      <div className="flex flex-col items-center justify-center gap-4">
        <p>Game Over</p>
      </div>
      <Button onClick={() => dispatch(menu())}>Menu</Button>
      <Button onClick={onRestart}>Restart Game</Button>
    </Modal>
  );
};

export default GameOverOverlay;
