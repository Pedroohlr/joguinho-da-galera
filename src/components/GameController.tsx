import { useGame } from '@/context/GameContext';
import PlayerSetup from '@/pages/PlayerSetup';
import PhraseInput from '@/pages/PhraseInput';
import GuessPhase from '@/pages/GuessPhase';
import Scoreboard from '@/pages/Scoreboard';

export default function GameController() {
  const { state } = useGame();

  switch (state.phase) {
    case 'setup':
      return <PlayerSetup />;
    case 'phrase-input':
      return <PhraseInput />;
    case 'guess-phase':
      return <GuessPhase />;
    case 'scoreboard':
      return <Scoreboard />;
    default:
      return <PlayerSetup />;
  }
}
