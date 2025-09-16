import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function GuessPhase() {
  const { 
    state, 
    setGroupVote,
    revealAuthorAndUpdateScore, 
    nextPhrase, 
    getCurrentPhrase
  } = useGame();
  
  const [localGroupVote, setLocalGroupVote] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentPhrase = getCurrentPhrase();

  const handleGroupVote = (guessedAuthorId: string) => {
    setLocalGroupVote(guessedAuthorId);
  };

  const handleConfirmVote = () => {
    if (localGroupVote) {
      setIsProcessing(true);
      setGroupVote(localGroupVote);
      revealAuthorAndUpdateScore();
      
      // Pequeno delay para dar sensação de processamento
      setTimeout(() => {
        nextPhrase(); // Vai direto para próxima frase ou placar
      }, 1000);
    }
  };

  const getAuthorName = (authorId: string) => {
    return state.players.find(p => p.id === authorId)?.name || 'Desconhecido';
  };

  if (!currentPhrase || !state.currentRound) {
    return <div>Carregando...</div>;
  }

  const currentPhraseNumber = state.currentRound.currentPhraseIndex + 1;
  const totalPhrases = state.currentRound.phrases.length;

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            🤔 Quem Disse?
          </CardTitle>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Frase {currentPhraseNumber} de {totalPhrases}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Progresso */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progresso da Rodada</span>
              <span>{currentPhraseNumber}/{totalPhrases}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentPhraseNumber / totalPhrases) * 100}%` }}
              />
            </div>
          </div>

          {/* Frase */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <blockquote className="text-lg font-medium text-center italic">
                "{currentPhrase.text}"
              </blockquote>
            </CardContent>
          </Card>

          {/* Fase de votação em grupo */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg">
                🗳️ Quem vocês acham que escreveu isso?
              </h3>
              <p className="text-sm text-muted-foreground">
                Discutam em grupo e escolham uma pessoa
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {state.players.map((player) => (
                <Button
                  key={player.id}
                  variant={localGroupVote === player.id ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleGroupVote(player.id)}
                  disabled={isProcessing}
                  className="w-full justify-center text-base py-4"
                >
                  {localGroupVote === player.id && "👆 "}{player.name}
                </Button>
              ))}
            </div>

            {localGroupVote && (
              <div className="space-y-3">
                <div className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLocalGroupVote(null)}
                    className="text-muted-foreground"
                  >
                    🔄 Mudar escolha
                  </Button>
                </div>
                
                <Button
                  onClick={handleConfirmVote}
                  disabled={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>⏳ Processando...</>
                  ) : (
                    <>✅ Confirmar: {getAuthorName(localGroupVote)}</>
                  )}
                </Button>
              </div>
            )}

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4">
                <div className="text-center text-sm text-blue-700">
                  <p className="font-medium mb-1">💡 Como funciona:</p>
                  <p>Se o grupo acertar → Autor perde 1 ponto</p>
                  <p>Se o grupo errar → Ninguém perde ponto</p>
                  <p className="text-xs mt-2 text-blue-600">
                    ⭐ O resultado será revelado no placar final!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
