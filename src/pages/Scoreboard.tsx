import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Scoreboard() {
  const { state, newRound, resetGame } = useGame();

  // Ordenar jogadores por pontuação (maior para menor)
  const sortedPlayers = [...state.players].sort((a, b) => b.points - a.points);

  const totalRounds = state.currentRound ? 
    Math.floor((state.currentRound.phrases.length) / state.players.length) + 1 : 1;

  const playersWithLostPoints = state.players.filter(p => p.lostPointsThisRound);

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            🏆 Placar
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Rodada {totalRounds} concluída
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Resumo da Rodada */}
          {state.currentRound && (
            <div className="space-y-4">
              <h3 className="font-semibold text-center">📖 Resumo da Rodada</h3>
              <div className="space-y-3">
                {state.currentRound.phrases.map((phrase, index) => {
                  const author = state.players.find(p => p.id === phrase.authorId);
                  const result = state.currentRound?.phraseResults.find(r => r.phraseId === phrase.id);
                  const groupVote = result?.groupVote;
                  const wasCorrect = groupVote === phrase.authorId;
                  const votedPlayer = state.players.find(p => p.id === groupVote);
                  
                  return (
                    <Card key={phrase.id} className={`${wasCorrect ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} text-sm`}>
                      <CardContent className="pt-3 pb-3">
                        <div className="space-y-2">
                          <p className="italic">"{phrase.text}"</p>
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-medium">
                              Por: {author?.name}
                            </span>
                            <span className={`px-2 py-1 rounded ${wasCorrect ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                              {wasCorrect ? `😔 -1 ponto` : `😊 Salvou-se`}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Grupo votou em: <strong>{votedPlayer?.name || 'Ninguém'}</strong>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Placar */}
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Jogador</TableHead>
                  <TableHead className="text-center">Pontos</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPlayers.map((player, index) => {
                  const isWinner = index === 0 && player.points > 0;
                  const isEliminated = player.points === 0;
                  const lostPointsThisRound = player.lostPointsThisRound;
                  
                  return (
                    <TableRow 
                      key={player.id}
                      className={
                        isWinner ? 'bg-yellow-50 border-yellow-200' :
                        isEliminated ? 'bg-red-50 border-red-200' :
                        lostPointsThisRound ? 'bg-orange-50 border-orange-200' :
                        ''
                      }
                    >
                      <TableCell className="text-center font-medium">
                        {index + 1}
                        {isWinner && '🥇'}
                      </TableCell>
                      <TableCell className="font-medium">
                        {player.name}
                        {isEliminated && ' 💀'}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {player.points}
                      </TableCell>
                      <TableCell className="text-center text-xs">
                        {isEliminated ? (
                          <span className="text-red-600 font-medium">Eliminado</span>
                        ) : lostPointsThisRound ? (
                          <span className="text-orange-600">-1 ponto</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Resumo da rodada */}
          {playersWithLostPoints.length > 0 && (
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="pt-4">
                <h4 className="font-semibold text-sm text-orange-800 mb-2">
                  📉 Perderam pontos nesta rodada:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {playersWithLostPoints.map(player => (
                    <span 
                      key={player.id}
                      className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-xs font-medium"
                    >
                      {player.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <p className="text-2xl font-bold text-primary">{totalRounds}</p>
                <p className="text-xs text-muted-foreground">Rodadas</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <p className="text-2xl font-bold text-primary">
                  {state.players.filter(p => p.points > 0).length}
                </p>
                <p className="text-xs text-muted-foreground">Jogadores Ativos</p>
              </CardContent>
            </Card>
          </div>

          {/* Ações */}
          <div className="space-y-3">
            {/* Verificar se há vencedor ou se o jogo deve continuar */}
            {sortedPlayers[0]?.points > 0 ? (
              <>
                <Button
                  onClick={newRound}
                  className="w-full"
                  size="lg"
                >
                  🎮 Nova Rodada
                </Button>
                
                <Button
                  onClick={resetGame}
                  variant="outline"
                  className="w-full"
                >
                  🔄 Reiniciar Jogo
                </Button>
              </>
            ) : (
              <>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-4 text-center">
                    <p className="text-green-800 font-bold text-lg">
                      🎉 Jogo Finalizado!
                    </p>
                    <p className="text-green-700 text-sm mt-1">
                      Todos os jogadores foram eliminados ou há um vencedor claro
                    </p>
                  </CardContent>
                </Card>
                
                <Button
                  onClick={resetGame}
                  className="w-full"
                  size="lg"
                >
                  🔄 Novo Jogo
                </Button>
              </>
            )}
          </div>

          {/* Regras lembrete */}
          <div className="text-xs text-muted-foreground space-y-1 border-t pt-4">
            <p className="font-semibold">💡 Lembrete:</p>
            <ul className="space-y-1 ml-2">
              <li>• Se todos acertarem quem escreveu → autor perde 1 ponto</li>
              <li>• Se nem todos acertarem → ninguém perde ponto</li>
              <li>• Jogador com 0 pontos é eliminado</li>
              <li>• O último com pontos vence!</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
