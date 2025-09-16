import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, Player, Phrase, GamePhase } from '@/types/game';

// Estado inicial
const initialState: GameState = {
  players: [],
  currentRound: null,
  phase: 'setup',
  currentPlayerIndex: 0,
};

// Actions
type GameAction =
  | { type: 'ADD_PLAYER'; payload: { name: string } }
  | { type: 'REMOVE_PLAYER'; payload: { playerId: string } }
  | { type: 'START_GAME' }
  | { type: 'ADD_PHRASE'; payload: { text: string; authorId: string } }
  | { type: 'NEXT_PLAYER' }
  | { type: 'START_GUESS_PHASE' }
  | { type: 'SET_GROUP_VOTE'; payload: { guessedAuthorId: string } }
  | { type: 'REVEAL_AUTHOR_AND_UPDATE_SCORE' }
  | { type: 'NEXT_PHRASE' }
  | { type: 'SHOW_SCOREBOARD' }
  | { type: 'NEW_ROUND' }
  | { type: 'RESET_GAME' };

// Reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_PLAYER': {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: action.payload.name,
        points: 5,
        lostPointsThisRound: false,
      };
      return {
        ...state,
        players: [...state.players, newPlayer],
      };
    }

    case 'REMOVE_PLAYER': {
      return {
        ...state,
        players: state.players.filter(p => p.id !== action.payload.playerId),
      };
    }

    case 'START_GAME': {
      return {
        ...state,
        phase: 'phrase-input',
        currentPlayerIndex: 0,
        currentRound: {
          id: Date.now().toString(),
          phrases: [],
          currentPhraseIndex: 0,
          phraseResults: [],
          isCompleted: false,
        },
        // Reset lost points flag
        players: state.players.map(p => ({ ...p, lostPointsThisRound: false })),
      };
    }

    case 'ADD_PHRASE': {
      if (!state.currentRound) return state;
      
      const newPhrase: Phrase = {
        id: Date.now().toString(),
        text: action.payload.text,
        authorId: action.payload.authorId,
        used: false,
      };

      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          phrases: [...state.currentRound.phrases, newPhrase],
        },
      };
    }

    case 'NEXT_PLAYER': {
      const nextIndex = state.currentPlayerIndex + 1;
      if (nextIndex >= state.players.length) {
        // Todos jogadores escreveram, sortear frases e ir para adivinhação
        const shuffledPhrases = state.currentRound!.phrases
          .map(phrase => ({ ...phrase, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ sort, ...phrase }) => phrase);

        return {
          ...state,
          phase: 'guess-phase',
          currentPlayerIndex: 0,
          currentRound: {
            ...state.currentRound!,
            phrases: shuffledPhrases,
            currentPhraseIndex: 0,
          },
        };
      }
      return {
        ...state,
        currentPlayerIndex: nextIndex,
      };
    }

    case 'START_GUESS_PHASE': {
      return {
        ...state,
        phase: 'guess-phase',
        currentPlayerIndex: 0,
      };
    }

    case 'SET_GROUP_VOTE': {
      if (!state.currentRound) return state;
      
      const currentPhrase = state.currentRound.phrases[state.currentRound.currentPhraseIndex];
      const newResult = {
        phraseId: currentPhrase.id,
        groupVote: action.payload.guessedAuthorId,
      };
      
      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          phraseResults: [...state.currentRound.phraseResults, newResult],
        },
      };
    }

    case 'REVEAL_AUTHOR_AND_UPDATE_SCORE': {
      if (!state.currentRound) return state;
      
      const currentPhrase = state.currentRound.phrases[state.currentRound.currentPhraseIndex];
      const currentResult = state.currentRound.phraseResults.find(r => r.phraseId === currentPhrase.id);
      
      if (!currentResult) return state;
      
      // Verificar se o grupo acertou
      const groupCorrect = currentResult.groupVote === currentPhrase.authorId;
      
      let updatedPlayers = state.players;
      if (groupCorrect) {
        // Se o grupo acertou, o autor perde 1 ponto
        updatedPlayers = state.players.map(player => {
          if (player.id === currentPhrase.authorId) {
            return {
              ...player,
              points: Math.max(0, player.points - 1),
              lostPointsThisRound: true,
            };
          }
          return player;
        });
      }

      return {
        ...state,
        players: updatedPlayers,
      };
    }

    case 'NEXT_PHRASE': {
      if (!state.currentRound) return state;
      
      const nextPhraseIndex = state.currentRound.currentPhraseIndex + 1;
      
      if (nextPhraseIndex >= state.currentRound.phrases.length) {
        // Todas as frases foram usadas, ir para o placar
        return {
          ...state,
          phase: 'scoreboard',
          currentRound: {
            ...state.currentRound,
            isCompleted: true,
          },
        };
      }
      
      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          currentPhraseIndex: nextPhraseIndex,
          // phraseResults mantém os resultados de todas as frases
        },
      };
    }

    case 'SHOW_SCOREBOARD': {
      return {
        ...state,
        phase: 'scoreboard',
      };
    }

    case 'NEW_ROUND': {
      return {
        ...state,
        phase: 'phrase-input',
        currentPlayerIndex: 0,
        currentRound: {
          id: Date.now().toString(),
          phrases: [],
          currentPhraseIndex: 0,
          phraseResults: [],
          isCompleted: false,
        },
        // Reset lost points flag
        players: state.players.map(p => ({ ...p, lostPointsThisRound: false })),
      };
    }

    case 'RESET_GAME': {
      return initialState;
    }

    default:
      return state;
  }
}

// Context
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  // Helper functions
  addPlayer: (name: string) => void;
  removePlayer: (playerId: string) => void;
  startGame: () => void;
  addPhrase: (text: string, authorId: string) => void;
  nextPlayer: () => void;
  setGroupVote: (guessedAuthorId: string) => void;
  revealAuthorAndUpdateScore: () => void;
  nextPhrase: () => void;
  showScoreboard: () => void;
  newRound: () => void;
  resetGame: () => void;
  getCurrentPhrase: () => Phrase | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const addPlayer = (name: string) => {
    dispatch({ type: 'ADD_PLAYER', payload: { name } });
  };

  const removePlayer = (playerId: string) => {
    dispatch({ type: 'REMOVE_PLAYER', payload: { playerId } });
  };

  const startGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  const addPhrase = (text: string, authorId: string) => {
    dispatch({ type: 'ADD_PHRASE', payload: { text, authorId } });
  };

  const nextPlayer = () => {
    dispatch({ type: 'NEXT_PLAYER' });
  };

  const setGroupVote = (guessedAuthorId: string) => {
    dispatch({ type: 'SET_GROUP_VOTE', payload: { guessedAuthorId } });
  };

  const revealAuthorAndUpdateScore = () => {
    dispatch({ type: 'REVEAL_AUTHOR_AND_UPDATE_SCORE' });
  };

  const nextPhrase = () => {
    dispatch({ type: 'NEXT_PHRASE' });
  };

  const showScoreboard = () => {
    dispatch({ type: 'SHOW_SCOREBOARD' });
  };

  const newRound = () => {
    dispatch({ type: 'NEW_ROUND' });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const getCurrentPhrase = (): Phrase | null => {
    if (!state.currentRound || state.currentRound.phrases.length === 0) {
      return null;
    }
    return state.currentRound.phrases[state.currentRound.currentPhraseIndex];
  };

  const value: GameContextType = {
    state,
    dispatch,
    addPlayer,
    removePlayer,
    startGame,
    addPhrase,
    nextPlayer,
    setGroupVote,
    revealAuthorAndUpdateScore,
    nextPhrase,
    showScoreboard,
    newRound,
    resetGame,
    getCurrentPhrase,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

// Hook
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
