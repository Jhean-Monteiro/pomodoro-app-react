//componente controls - Controls.tsx
// botões de modo, play/pause e reset

import React from "react";
import type { SessionMode } from "../../types/pomodoro.types";
import {
  ModeSelector,
  ModeButton,
  ActionRow,
  PlayButton,
  ResetButton,
} from "./Controls.styles";


// Modos disponíveis
const MODES: SessionMode[] = ["25/5", "50/10"];

interface ControlsProps {
    mode:SessionMode;
    isRunning: boolean;
    onToggle: () => void;
    onReset: () => void;
    onChangeMode: (mode: SessionMode) => void;
}


const Controls: React.FC<ControlsProps> = ({
    mode,
    isRunning,
    onToggle,
    onReset,
    onChangeMode,
}) => {
    return (
        <>
            {/* Seletor de modo de sessão */}
            <ModeSelector role="group" aria-label="Modo de sessão">
                {/* Conceito: .map() transforma array em elementos JSX */}
                {MODES.map((m) => (
                    <ModeButton
                        key={m}
                        $active={mode === m}
                        onClick={() => onChangeMode(m)}
                        aria-pressed={mode === m} // acessibilidade
                    >
                        {m}
                    </ModeButton>
                ))}
            </ModeSelector>

            {/* botões de ação */}
            <ActionRow>
                {/* reset */}
                <ResetButton onClick={onReset} aria-label="Reiniciar timer">↺</ResetButton>

                {/* play / pause - icone muda com isRunning */}

                <PlayButton onClick={onToggle} aria-label={isRunning ? "Pausar" : "Iniciar"}>
                    {isRunning ? "⏸" : "▶"}
                </PlayButton>

                {/* espaço vazio espelhado para centralizar o play */}
                <div style={{width: 44}} aria-hidden="true" />
            </ActionRow>
        </>
    )
}

export default Controls;