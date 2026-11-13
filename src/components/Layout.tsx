import Grid from "./Grid";
import { useSelector, useDispatch } from "react-redux";
import { startGame, pauseGame, resumeGame, menu, GameState } from '../store/slices/gameSlice';
import type { RootState } from '../store/store';
import { useEffect, useState } from 'react';
import Modal from './generic/Modal';
import type { GridConfig } from '../types/GridConfiguration';

const GameOverOverlay: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Modal>
      <p>Game Over</p>
      <button className="border-1 border-solid rounded" onClick={() => dispatch(menu())}>
        Menu
      </button>
      <button className="border-1 border-solid rounded" onClick={() => dispatch(startGame())}>
        Restart Game
      </button>
    </Modal>
  );
};

const MenuOverlay: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Modal>
      <p>Menu</p>
      <button className="border-1 border-solid rounded" onClick={() => dispatch(startGame())}>
        Start Game
      </button>
    </Modal>
  );
};

const PauseOverlay: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Modal>
      <p>Paused</p>
      <button className="border-1 border-solid rounded" onClick={() => dispatch(resumeGame())}>
        Resume Game
      </button>
      <button className="border-1 border-solid rounded" onClick={() => dispatch(menu())}>
        Menu
      </button>
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

  const [fps, setFps] = useState<number>(0);
  const [tick, setTick] = useState<number>(0);

  const tickIntervalMs = 250;

  useEffect(() => {
    if (gameState !== GameState.Running) return;

    let frameId: number;
    let lastTime: number | null = null;
    let accumulator: number = 0;

    const frame = (timestamp: number): void => {
      if (lastTime === null) lastTime = timestamp; //initialize

      // check delta and set accumulator
      const deltatime = timestamp - lastTime;
      lastTime = timestamp;
      accumulator += deltatime;

      // if accumulator reach the tick interval, update tick
      while (accumulator >= tickIntervalMs) {
        setTick((prev) => prev + 1);
        accumulator -= tickIntervalMs;
      }

      // update fps display
      const displayedFps = Math.floor(1000 / deltatime);
      setFps(displayedFps);

      // loop for the next frame
      frameId = requestAnimationFrame(frame);
    };

    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [gameState]);

  return (
    <div className="layout w-full h-full">
      <p> FPS :{fps}</p>
      <p>Tick: {tick}</p>
      <div className="gap-2 flex flex-wrap p-2">
        <button className="border-1 border-solid rounded" onClick={() => dispatch(pauseGame())}>
          Pause Game
        </button>
        <button className="border-1 border-solid rounded" onClick={() => dispatch(menu())}>
          Menu
        </button>
      </div>

      {renderOverlay()}

      <Grid width={config.gridWidth} height={config.gridHeight} />
    </div>
  );
};

export default Layout;