import { useDispatch, useSelector } from 'react-redux';
import { pauseGame, menu } from '../../store/slices/gameSlice';
import Button from '../generic/Button';
import type { RootState } from '../../store/store';

export const HeaderLayout: React.FC = () => {
  const dispatch = useDispatch();

  const { score } = useSelector((state: RootState) => state.game);

  return (
    <div className="gap-2 flex justify-between p-2">
      <div className="flex-1">
        <Button onClick={() => dispatch(pauseGame())}>Pause Game</Button>
        <Button onClick={() => dispatch(menu())}>Menu</Button>
      </div>
      <div className="flex-1 pr-10 text-right text-white">
        <p>Score: {score}</p>
      </div>
    </div>
  );
};
