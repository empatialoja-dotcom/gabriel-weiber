export enum GamePhase {
  SETUP = 'SETUP',
  CARD_PASS = 'CARD_PASS',
  TIMER = 'TIMER',
  REVEAL = 'REVEAL'
}

export interface Player {
  id: string;
  name: string;
  isImpostor: boolean;
}

export interface GameSettings {
  players: string[];
  durationMinutes: number;
  selectedCategories: string[];
}

export interface RoundData {
  category: string;
  word: string;
  hint: string;
  impostorName: string;
}

export interface CategoryData {
  id: string;
  label: string;
  items: { word: string; hint: string }[];
}

export enum CardState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  FINISHED = 'FINISHED' // Player has seen card and closed it
}