import Grid from './Grid';
import { useSelector, useDispatch } from 'react-redux';
import { startGame, pauseGame, resumeGame, menu, GameState } from '../store/slices/gameSlice';
import type { RootState } from '../store/store';
import { useEffect } from 'react';
import Modal from './generic/Modal';
import type { GridConfig } from '../types/GridConfiguration';
import Button from './generic/Button';

const GameOverOverlay: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Modal>
      <p>Game Over</p>
      <Button onClick={() => dispatch(menu())}>Menu</Button>
      <Button onClick={() => dispatch(startGame())}>Restart Game</Button>
    </Modal>
  );
};

const MenuOverlay: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Modal>
      <p>Menu</p>
      <Button onClick={() => dispatch(startGame())}>Start Game</Button>
    </Modal>
  );
};

const PauseOverlay: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Modal>
      <p>Paused</p>
      <Button onClick={() => dispatch(resumeGame())}>Resume Game</Button>
      <Button onClick={() => dispatch(menu())}>Menu</Button>
    </Modal>
  );
};

const Layout: React.FC = () => {
  const { gameState } = useSelector((state: RootState) => state.game);

  const config: GridConfig = {
    gridWidth: 30,
    gridHeight: 20,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Game state changed:', gameState);
  }, [gameState]);

  const renderOverlay = () => {
    switch (gameState) {
      case GameState.GameOver:
        return <GameOverOverlay />;
      case GameState.Menu:
        return <MenuOverlay />;
      case GameState.Paused:
        return <PauseOverlay />;
      default:
        break;
    }
  };

  return (
    <div className="layout w-full h-full">
      <div className="gap-2 flex flex-wrap p-2">
        <Button onClick={() => dispatch(pauseGame())}>Pause Game</Button>
        <Button onClick={() => dispatch(menu())}>Menu</Button>
      </div>

      {renderOverlay()}

      <Grid width={config.gridWidth} height={config.gridHeight} />
    </div>
  );
};

export default Layout;
