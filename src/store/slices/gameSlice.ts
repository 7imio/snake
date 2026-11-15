import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ColorConfig } from '../../types/game';

export enum GameState {
  Menu = 'MENU',
  Running = 'RUNNING',
  Paused = 'PAUSED',
  GameOver = 'GAME_OVER',
}

export type GameRedux = {
  score: number;
  gameState: GameState;
  colors: ColorConfig;
};

const initialState: GameRedux = {
  score: 0,
  gameState: GameState.Menu,
  colors: {
    snakeHeadColorHue: 120, // Default green hue for snake head
    snakeBodyColorHue: 120, // Default green hue for snake body
    foodColorHue: 0, // Default red hue for food
  },
};

const initialColorState: ColorConfig = {
  snakeHeadColorHue: 120, // Default green hue for snake head
  snakeBodyColorHue: 120, // Default green hue for snake body
  foodColorHue: 0, // Default red hue for food
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
    resetGame(state) {
      return { ...initialState, colors: { ...state.colors } };
    },
    setScore(state, action: PayloadAction<number>) {
      state.score = action.payload;
    },
    setColors(state, action: PayloadAction<Partial<ColorConfig>>) {
      Object.assign(state.colors, action.payload);
    },
    reinitializeColors(state) {
      state.colors = { ...initialColorState };
    },
  },
});

export const { startGame, pauseGame, resumeGame, endGame, resetGame, setScore, menu, setColors } = gameSlice.actions;

export default gameSlice.reducer;
