import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function GuessPhase() {
  const { 
    state, 
    revealAuthorAndUpdateScore, 
    nextPhrase, 
    getCurrentPhrase
  } = useGame();
  
  const [showResult, setShowResult] = useState(false);
  const [groupVote, setGroupVote] = useState<string | null>(null);

  const currentPhrase = getCurrentPhrase();

  const handleGroupVote = (guessedAuthorId: string) => {
    setGroupVote(guessedAuthorId);
    // Simular que todos votaram na mesma pessoa (voto em grupo)
    revealAuthorAndUpdateScore();
    setShowResult(true);
  };

  const handleNextPhrase = () => {
    setShowResult(false);
    setGroupVote(null);
    nextPhrase();
  };

  const getAuthorName = (authorId: string) => {
    return state.players.find(p => p.id === authorId)?.name || 'Desconhecido';
  };

  const isCorrectGuess = () => {
    return groupVote === currentPhrase?.authorId;
  };

  if (!currentPhrase || !state.currentRound) {
    return <div>Carregando...</div>;
  }

  const currentPhraseNumber = state.currentRound.currentPhraseIndex + 1;
  const totalPhrases = state.currentRound.phrases.length;
  const groupGuessedCorrectly = isCorrectGuess();

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

          {!showResult ? (
            // Fase de votação em grupo
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
                    variant={groupVote === player.id ? "default" : "outline"}
                    size="lg"
                    onClick={() => handleGroupVote(player.id)}
                    disabled={showResult}
                    className="w-full justify-center text-base py-4"
                  >
                    {groupVote === player.id && "👆 "}{player.name}
                  </Button>
                ))}
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <div className="text-center text-sm text-blue-700">
                    <p className="font-medium mb-1">💡 Como funciona:</p>
                    <p>Se o grupo acertar → Autor perde 1 ponto</p>
                    <p>Se o grupo errar → Ninguém perde ponto</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Resultado
            <div className="space-y-6">
              {/* Revelação do autor */}
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="pt-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">A frase foi escrita por:</p>
                  <p className="text-2xl font-bold text-primary">
                    {getAuthorName(currentPhrase.authorId)}
                  </p>
                </CardContent>
              </Card>

              {/* Resultado do voto em grupo */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-center">Resultado do voto:</h4>
                <Card className={`${groupGuessedCorrectly ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'}`}>
                  <CardContent className="pt-4 text-center">
                    <div className={`${groupGuessedCorrectly ? 'text-green-800' : 'text-red-800'}`}>
                      <p className="font-medium">
                        {groupGuessedCorrectly ? '✅ Grupo acertou!' : '❌ Grupo errou!'}
                      </p>
                      <p className="text-sm mt-1">
                        Vocês votaram em: <strong>{getAuthorName(groupVote!)}</strong>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Resultado da pontuação */}
              <Card className={groupGuessedCorrectly ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"}>
                <CardContent className="pt-6 text-center">
                  {groupGuessedCorrectly ? (
                    <div className="space-y-2">
                      <p className="text-red-700 font-medium">
                        🎯 Grupo acertou!
                      </p>
                      <p className="text-sm text-red-600">
                        {getAuthorName(currentPhrase.authorId)} perde 1 ponto
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-blue-700 font-medium">
                        😅 Grupo errou
                      </p>
                      <p className="text-sm text-blue-600">
                        Ninguém perde pontos
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Botão continuar */}
              <Button
                onClick={handleNextPhrase}
                className="w-full"
                size="lg"
              >
                {currentPhraseNumber < totalPhrases ? 'Próxima Frase' : 'Ver Placar'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
