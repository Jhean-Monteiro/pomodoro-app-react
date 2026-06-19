// COMPONENTE TIMER 
// responsável apenas pela exibição do relógio e progresso. 

import React from "react";
import type {Phase} from "../../types/pomodoro.types";
import {
  TimerWrapper,
  RingContainer,
  ProgressCircle,
  TimeDisplay,
  PhaseLabel,
  CycleCounter,
} from "./Timer.styles";

// Interface de props - tipagem das entradas do componente
// conceito: props tipadas garantem contrato entre pai e filho
interface TimerProps {
    timeFormatted: string; // ex: "24:59"
    phase: Phase;
    isRunning: boolean;
    progress: number; // 0-100
    cycles: number;
}

// constantes do anel SVG
const RADIUS = 110;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS // comprimento total do traço

export const Timer: React.FC<TimerProps> = ({
  timeFormatted,
  phase,
  isRunning,
  progress,
  cycles,
}) => {
    // calcula o deslocamento do traço (stroke-dashoffset) baseado no progresso
    // 0% progresso -> traço cheio (dashoffset = 0)
    // 100% progresso -> traço vazio (dashoffset = circunferência)
    const dashOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

    return (
        <TimerWrapper>
            <RingContainer>
                {/* SVG do anel de progresso */}
                <svg width="260" height="260" viewBox="0 0 260 260">
                {/* Trilha de fundo (cinza escuro) */}
                <circle
                    cx="130"
                    cy="130"
                    r={RADIUS}
                    fill="none"
                    stroke="#2a2622"
                    strokeWidth="10"
                />
                {/* arco de progresso colorido */}
                {/* rotate(-90deg) faz começar do topo em vez da direita */}
                <ProgressCircle
                    cx="130"
                    cy="130"
                    r={RADIUS}
                    fill="none"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={dashOffset}
                    transform="rotate(-90 130 130)"
                    $progress={progress}
                    $phase={phase}
                />
                </svg>

                {/* texto centralizado sobre o anel */}

                <TimeDisplay $isRunning={isRunning}>
                    {timeFormatted}
                    <PhaseLabel $phase={phase}>
                        {phase === "work" ? "foco" : "pausa"}
                    </PhaseLabel>
                </TimeDisplay>

            </RingContainer>

            {/* contador de ciclos completados */}
            <CycleCounter>
                {cycles === 0
                    ? "nenhum ciclo completo ainda"
                    : `${cycles} ciclo${cycles > 1 ? "s" : ""} completo${cycles > 1 ? "s" : ""}`
                }
            </CycleCounter>
        </TimerWrapper>
    )
}