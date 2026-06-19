// componente raiz - App.tsx
// orquestra filhos e conecta hook aos componentes
// conceito: "lifting state up" - o estado fica no ancestral comum

import React from "react";
import { GlobalStyle, AppContainer, AppTitle } from "./App.styles";
import {Timer} from "./components/Timer/Timer";
import Controls from "./components/Controls/Controls";
import { usePomodoro } from "./hooks/usePomodoro"; // Hook customizado

const App: React.FC = () => {
  // desestrutura tudo que o hook expões
  // conceito: custom hook - lógica reutilizável extraída do componente
  const {state, toggle, reset, changeMode, formatTime, progress} = usePomodoro();

  // atualiza o titulo da aba com o tempo atual
  // conceito: useEffect com side-effect no DOM externo
  React.useEffect(() => {
    const phase = state.phase === "work" ? "🍅 Foco" : "☕ Pausa";
    document.title = `${formatTime(state.timeLeft)} - ${phase}`;
  }, [state.timeLeft, state.phase]);

  return (
    <>
      {/* estilos globais injetados uma vez na árvore */}
      <GlobalStyle />

      <AppContainer>
        <AppTitle>pomodoro</AppTitle>

        {/* componente burro - só exibe, não decide nada */}
        <Timer
          timeFormatted={formatTime(state.timeLeft)}
          phase={state.phase}
          isRunning={state.isRunning}
          progress={progress}
          cycles={state.cycles}
        />

        {/* controles recebem callbacks do hook via props */}
        <Controls
          mode={state.mode}
          isRunning={state.isRunning}
          onToggle={toggle}
          onReset={reset}
          onChangeMode={changeMode}
        />
      </AppContainer>
    </>
  );
}

export default App;