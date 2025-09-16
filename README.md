# 🎯 Quem Disse? - Jogo Multiplayer Local

Um jogo divertido e interativo onde os jogadores adivinham quem escreveu cada frase. Perfeito para festas, encontros familiares ou momentos de diversão entre amigos!

> **🎮 Jogue agora:** Abra no navegador e comece a se divertir!

## 🎮 Como Jogar

### Regras Básicas:
1. **Configuração**: Cada jogador digita seu nome (mínimo 2, máximo 8 jogadores)
2. **Pontuação**: Todos começam com 5 pontos
3. **Objetivo**: Seja o último jogador com pontos!

### Fluxo do Jogo:

#### 📝 **Fase 1 - Escrita de Frases**
- Cada jogador escreve uma frase criativa e original
- Dica: Misture seu estilo com algo diferente para confundir!

#### 🤔 **Fase 2 - Adivinhação**
- Uma frase é sorteada e exibida (sem revelar o autor)
- Todos os jogadores votam em quem acham que escreveu
- **Se TODOS acertarem**: O autor perde 1 ponto
- **Se nem todos acertarem**: Ninguém perde ponto

#### 📊 **Placar**
- Veja a pontuação atualizada
- Destaque para quem perdeu pontos na rodada
- Continue com nova rodada ou reinicie o jogo

### 🏆 Vitória
O último jogador com pontos restantes vence!

## 🚀 Características Técnicas

- ⚡ **Vite** - Build tool ultra-rápido
- ⚛️ **React 19** - Framework moderno com Hooks
- 📝 **TypeScript** - Tipagem estática para melhor desenvolvimento
- 🎨 **TailwindCSS** - Estilização moderna e responsiva
- 🧩 **shadcn/ui** - Componentes de interface elegantes
- 📱 **Mobile-First** - Otimizado para dispositivos móveis
- 🎭 **Context API** - Gerenciamento de estado robusto

## 📦 Instalação e Execução

```bash
# Clone ou baixe o projeto
git clone [seu-repositorio]
cd quem-disse

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Abra no navegador
# O jogo estará rodando em http://localhost:5173
```

### 🚀 Deploy
```bash
# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   └── index.tsx          # Página principal do jogo
├── components/
│   ├── ui/                # Componentes shadcn/ui
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── table.tsx
│   └── GameController.tsx # Controlador principal do jogo
├── context/
│   └── GameContext.tsx    # Context API para estado do jogo
├── pages/
│   ├── PlayerSetup.tsx    # Tela de configuração de jogadores
│   ├── PhraseInput.tsx    # Tela de escrita de frases
│   ├── GuessPhase.tsx     # Tela de adivinhação
│   └── Scoreboard.tsx     # Tela de placar
├── types/
│   └── game.ts            # Tipagens TypeScript
├── hooks/
│   └── useSeo.ts          # Hook para SEO
├── lib/
│   └── utils.ts           # Utilitários
├── main.tsx               # Ponto de entrada
└── index.css              # Estilos globais com Tailwind
```

## 🎯 Funcionalidades Implementadas

### ✅ Gerenciamento de Jogadores
- Adicionar/remover jogadores (2-8 players)
- Validação de nomes únicos
- Interface intuitiva para configuração

### ✅ Sistema de Pontuação
- Cada jogador inicia com 5 pontos
- Perda de pontos baseada nas regras do jogo
- Ranking dinâmico e atualização em tempo real

### ✅ Fases do Jogo
- **Escrita de Frases**: Interface individual para cada jogador
- **Adivinhação**: Votação interativa com feedback visual
- **Placar**: Tabela completa com estatísticas da rodada

### ✅ Interface Mobile-First
- Layout responsivo otimizado para celular
- Prevenção de zoom indesejado
- Navegação fluida entre telas

### ✅ Estado Persistente
- Context API para gerenciar estado global
- Transições suaves entre fases
- Controle robusto do fluxo do jogo

## 💡 Dicas de Estratégia

### Para Jogadores:
- **Seja criativo**: Misture seu estilo com algo diferente
- **Pense nos outros**: O que eles esperariam que você escrevesse?
- **Varie o tom**: Alterne entre sério, engraçado, filosófico
- **Use referências**: Mas não muito óbvias

### Para o Grupo:
- **Revezem o celular**: Passem o dispositivo durante a escrita
- **Discutam**: Conversem sobre as frases após a revelação
- **Sejam criativos**: Inventem variações das regras
- **Divirtam-se**: O objetivo é rir e se conhecer melhor!

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção

# Preview
npm run preview      # Visualiza build de produção

# Linting
npm run lint         # Executa ESLint
```

## 🎨 Personalização

### Cores e Tema
Edite `src/index.css` para personalizar as cores do tema:
- Variáveis CSS para modo claro e escuro
- Sistema de cores baseado em OKLCH
- Totalmente customizável via CSS custom properties

### Regras do Jogo
Modifique `src/context/GameContext.tsx` para:
- Alterar pontuação inicial dos jogadores
- Modificar condições de vitória/derrota
- Adicionar novas mecânicas de jogo

## 📱 Deploy Rápido

### Vercel (1-Click Deploy)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

### Manual
```bash
npm run build
# Copie a pasta 'dist' para seu servidor web
```

## 🔧 Tecnologias Utilizadas

- **⚛️ React 19** - Framework JavaScript moderno
- **📝 TypeScript** - Tipagem estática
- **⚡ Vite** - Build tool ultra-rápido
- **🎨 TailwindCSS** - Estilização utility-first
- **🧩 shadcn/ui** - Componentes de interface
- **🏗️ Context API** - Gerenciamento de estado

## 📄 Licença

MIT License - sinta-se livre para usar, modificar e distribuir!

---

**🎯 Desenvolvido para diversão e momentos especiais entre amigos! 🎉**
