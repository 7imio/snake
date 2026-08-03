import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type GameState = {
  score: number;
  isRunning: boolean;
  isPaused: boolean;
  speed: number;
};

const initialState: GameState = {
  score: 0,
  isRunning: false,
  isPaused: false,
  speed: 1,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.isRunning = true;
      state.isPaused = false;
      state.score = 0;
    },
    pauseGame(state) {
      if (state.isRunning) {
        state.isPaused = true;
      }
    },
    resumeGame(state) {
      if (state.isRunning) {
        state.isPaused = false;
      }
    },
    endGame(state) {
      state.isRunning = false;
      state.isPaused = false;
    },
    resetGame() {
      return initialState;
    },
    incrementScore(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },
    setSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload;
    },
  },
});

export const { startGame, pauseGame, resumeGame, endGame, resetGame, incrementScore, setSpeed } = gameSlice.actions;

export default gameSlice.reducer;
