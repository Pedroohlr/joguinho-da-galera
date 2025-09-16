export interface Player {
  id: string;
  name: string;
  points: number;
  lostPointsThisRound: boolean;
}

export interface Phrase {
  id: string;
  text: string;
  authorId: string;
  used: boolean;
}

export interface PhraseResult {
  phraseId: string;
  groupVote: string; // ID do jogador que o grupo escolheu
}

export interface Round {
  id: string;
  phrases: Phrase[];
  currentPhraseIndex: number;
  phraseResults: PhraseResult[]; // Resultados de cada frase
  isCompleted: boolean;
}

export type GamePhase = 
  | 'setup' 
  | 'phrase-input' 
  | 'guess-phase' 
  | 'scoreboard';

export interface GameState {
  players: Player[];
  currentRound: Round | null;
  phase: GamePhase;
  currentPlayerIndex: number; // Para fase de escrita de frases
}
