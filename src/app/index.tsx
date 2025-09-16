import useSeo from "@/hooks/useSeo"
import { GameProvider } from "@/context/GameContext"
import GameController from "@/components/GameController"

export default function HomePage() {
  useSeo({
    title: "Quem Disse? - Jogo Multiplayer",
    description: "Jogo multiplayer local onde os jogadores adivinham quem escreveu cada frase",
    image: "https://via.placeholder.com/150",
    icon: "https://via.placeholder.com/150",  
  })
  
  return (
    <GameProvider>
      <GameController />
    </GameProvider>
  )
}
