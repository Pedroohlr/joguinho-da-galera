import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PlayerSetup() {
  const { state, addPlayer, removePlayer, startGame } = useGame();
  const [playerName, setPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (playerName.trim() && state.players.length < 8) {
      addPlayer(playerName.trim());
      setPlayerName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  const canStartGame = state.players.length >= 2;

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            🎯 Quem Disse?
          </CardTitle>
          <p className="text-muted-foreground">
            Adicione os jogadores para começar
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Adicionar jogador */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nome do jogador"
                maxLength={20}
                className="flex-1"
              />
              <Button 
                onClick={handleAddPlayer}
                disabled={!playerName.trim() || state.players.length >= 8}
                size="sm"
              >
                Adicionar
              </Button>
            </div>
            
            {state.players.length >= 8 && (
              <p className="text-sm text-yellow-600">
                Máximo de 8 jogadores permitido
              </p>
            )}
          </div>

          {/* Lista de jogadores */}
          {state.players.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">
                Jogadores ({state.players.length})
              </h3>
              <div className="space-y-2">
                {state.players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-md"
                  >
                    <span className="font-medium">{player.name}</span>
                    <Button
                      onClick={() => removePlayer(player.id)}
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botão iniciar */}
          <div className="space-y-3">
            {!canStartGame && (
              <p className="text-sm text-muted-foreground text-center">
                Adicione pelo menos 2 jogadores para começar
              </p>
            )}
            
            <Button
              onClick={startGame}
              disabled={!canStartGame}
              className="w-full"
              size="lg"
            >
              Iniciar Jogo
            </Button>
          </div>

          {/* Regras rápidas */}
          <div className="text-xs text-muted-foreground space-y-1 border-t pt-4">
            <p className="font-semibold">Regras rápidas:</p>
            <ul className="space-y-1 ml-2">
              <li>• Cada jogador começa com 5 pontos</li>
              <li>• Todos escrevem uma frase</li>
              <li>• Adivinhem quem escreveu cada frase</li>
              <li>• Se todos acertarem, o autor perde 1 ponto</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
