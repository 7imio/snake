import Grid from "./Grid";
import { useSelector, useDispatch } from "react-redux";
import { startGame, pauseGame, resumeGame, menu } from "../store/slices/gameSlice"; 
import type { RootState } from "../store/store"
import { useEffect } from "react";
import Modal from "./generic/Modal";

const GameOverOverlay: React.FC = () => {
    const dispatch = useDispatch();
  return (
   <Modal>
     <p>Game Over</p>
     <button className="border-1 border-solid rounded" onClick={() => dispatch(menu())}>Menu</button>
     <button className="border-1 border-solid rounded" onClick={() => dispatch(startGame())}>Restart Game</button>
   </Modal>
  );
};

const MenuOverlay: React.FC = () => {
    const dispatch = useDispatch();
  return (
    <Modal>
      <p>Menu</p>
      <button className="border-1 border-solid rounded" onClick={() => dispatch(startGame())}>Start Game</button>
    </Modal>
  );
};

const PauseOverlay: React.FC = () => {
    const dispatch = useDispatch();
  return (
    <Modal>
      <p>Paused</p>
      <button className="border-1 border-solid rounded" onClick={() => dispatch(resumeGame())}>Resume Game</button>
      <button className="border-1 border-solid rounded" onClick={() => dispatch(menu())}>Menu</button>
    </Modal>
  );
};

const Layout:React.FC = () => {

  const {gameState} = useSelector((state: RootState) => state.game); 
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Game state changed:", gameState);
  }, [gameState]);

  const renderOverlay = () => {
  switch (gameState) {
    case "GAME_OVER":
      return <GameOverOverlay />;
    case "MENU":
      return <MenuOverlay />;
    case "PAUSED":
      return <PauseOverlay />;
    default:
      break;
  }
  }
  return (
    <div className="layout w-full h-full">
      <p>{gameState}</p>
      <div className = 'gap-2 flex flex-wrap P-2'>
        <button className="border-1 border-solid rounded" onClick={() => dispatch(pauseGame())}>Pause Game</button>
        <button className="border-1 border-solid rounded" onClick={() => dispatch(menu())}>Menu</button>
      </div>

      {renderOverlay()}

      <Grid width={30} height={20} />
    </div>
  );
};

export default Layout;