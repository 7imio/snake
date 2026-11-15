import Grid from '../Grid';
import { useSelector, useDispatch } from 'react-redux';
import { GameState, endGame, menu, resumeGame, setScore, startGame } from '../../store/slices/gameSlice';
import type { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import type { GridConfig } from '../../types/GridConfiguration';
import { GameController } from '../../engine/GameController';
import GameOverOverlay from '../overlays/GameOverOverlay';
import MenuOverlay from '../overlays/MenuOverlay';
import PauseOverlay from '../overlays/PauseOverlay';
import { HeaderLayout } from './HeaderLayout';
import { TickEvent } from '../../engine/SnakeEngine';
import type { GameSnapshot } from '../../types/game';

const config: GridConfig = {
  gridWidth: 30,
  gridHeight: 20,
};

const gameController = new GameController({ ...config, tickInterval: 250 });

const Layout: React.FC = () => {
  const { gameState } = useSelector((state: RootState) => state.game);

  const [snapshot, setSnapshot] = useState<GameSnapshot>(() => gameController.getSnapshot());

  const dispatch = useDispatch();

  useEffect(() => {
    gameController.setOnGameUpdate((snapshot: GameSnapshot, tickEvent?: TickEvent) => {
      // Handle game update logic here
      setSnapshot(snapshot);
      if (tickEvent === TickEvent.Died) {
        dispatch(endGame());
      }
      if (tickEvent === TickEvent.AteFood) {
        // handle score updates or other logic here
        dispatch(setScore(snapshot.score));
      }
    });
    return () => gameController.setOnGameUpdate(null);
  }, [dispatch]);

  useEffect(() => {
    console.log('Game state changed:', gameState);
    switch (gameState) {
      case GameState.Menu:
      case GameState.GameOver:
      case GameState.Paused:
        gameController.pause();
        break;
      case GameState.Running:
        gameController.resume();
        break;
      default:
        break;
    }
  }, [gameState]);

  const renderOverlay = () => {
    switch (gameState) {
      case GameState.GameOver:
        return (
          <GameOverOverlay
            onRestart={() => {
              dispatch(startGame());
              gameController.start();
            }}
          />
        );
      case GameState.Menu:
        return (
          <MenuOverlay
            onStart={() => {
              dispatch(startGame());
              gameController.start();
            }}
            onResume={() => {
              dispatch(resumeGame());
            }}
            isStarted={snapshot.isRunning}
          />
        );
      case GameState.Paused:
        return (
          <PauseOverlay
            onResume={() => {
              dispatch(resumeGame());
            }}
            onMenu={() => {
              dispatch(menu());
            }}
          />
        );
      default:
        break;
    }
  };

  return (
    <div className="layout w-full h-full">
      <HeaderLayout />
      {renderOverlay()}
      <Grid width={config.gridWidth} height={config.gridHeight} snake={snapshot.snake} food={snapshot.food} />
    </div>
  );
};

export default Layout;
