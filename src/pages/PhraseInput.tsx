import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PhraseInput() {
  const { state, addPhrase, nextPlayer } = useGame();
  const [phrase, setPhrase] = useState('');

  const currentPlayer = state.players[state.currentPlayerIndex];
  const totalPlayers = state.players.length;
  const currentPlayerNumber = state.currentPlayerIndex + 1;

  const handleSubmitPhrase = () => {
    if (phrase.trim()) {
      addPhrase(phrase.trim(), currentPlayer.id);
      setPhrase('');
      nextPlayer();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmitPhrase();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            ✍️ Escrevendo Frases
          </CardTitle>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-primary">
              {currentPlayer.name}
            </p>
            <p className="text-sm text-muted-foreground">
              Jogador {currentPlayerNumber} de {totalPlayers}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Progresso */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progresso</span>
              <span>{currentPlayerNumber}/{totalPlayers}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentPlayerNumber / totalPlayers) * 100}%` }}
              />
            </div>
          </div>

          {/* Input da frase */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Escreva uma frase criativa:
              </label>
              <Input
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua frase aqui..."
                maxLength={200}
                className="mt-2"
                autoFocus
              />
              <p className="text-xs text-muted-foreground mt-1">
                {phrase.length}/200 caracteres
              </p>
            </div>

            <Button
              onClick={handleSubmitPhrase}
              disabled={!phrase.trim()}
              className="w-full"
              size="lg"
            >
              Enviar Frase
            </Button>
          </div>

          {/* Dicas */}
          <div className="text-xs text-muted-foreground space-y-1 border-t pt-4">
            <p className="font-semibold">💡 Dicas para uma boa frase:</p>
            <ul className="space-y-1 ml-2">
              <li>• Seja criativo e original</li>
              <li>• Misture seu estilo com algo diferente</li>
              <li>• Não use expressões muito características suas</li>
              <li>• Divirta-se!</li>
            </ul>
          </div>

          {/* Lista de quem já enviou */}
          {state.currentRound && state.currentRound.phrases.length > 0 && (
            <div className="text-xs text-muted-foreground space-y-1 border-t pt-4">
              <p className="font-semibold">✅ Já enviaram ({state.currentRound.phrases.length}):</p>
              <div className="flex flex-wrap gap-1">
                {state.currentRound.phrases.map((phrase) => {
                  const author = state.players.find(p => p.id === phrase.authorId);
                  return (
                    <span key={phrase.id} className="bg-muted px-2 py-1 rounded text-xs">
                      {author?.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
