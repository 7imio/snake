import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export enum GameState {
  Menu = 'MENU',
  Running = 'RUNNING',
  Paused = 'PAUSED',
  GameOver = 'GAME_OVER',
}

export type GameRedux = {
  score: number;
  gameState: GameState;
};

const initialState: GameRedux = {
  score: 0,
  gameState: GameState.Menu,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.gameState = GameState.Running;
      state.score = 0;
    },
    pauseGame(state) {
      if (state.gameState !== GameState.Running) return;
      state.gameState = GameState.Paused;
    },
    resumeGame(state) {
      if (state.gameState !== GameState.Paused && state.gameState !== GameState.Menu) return;
      state.gameState = GameState.Running;
    },
    endGame(state) {
      state.gameState = GameState.GameOver;
    },
    menu(state) {
      state.gameState = GameState.Menu;
    },
    resetGame() {
      return initialState;
    },
    setScore(state, action: PayloadAction<number>) {
      state.score = action.payload;
    },
  },
});

export const { startGame, pauseGame, resumeGame, endGame, resetGame, setScore, menu } = gameSlice.actions;

export default gameSlice.reducer;
