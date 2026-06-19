// estilos do timer
// styled components no typescript: cada "Componente estilizado" é um componennte react que carrega seu próprio CSS.
// conceito: styled.div`Css` cria um componente com estilo isolado

import styled, {keyframes, css} from "styled-components";
import type {Phase} from "../../types/pomodoro.types"

// Animação de pulso quando o timer está rodando
// conceito: keyframes define animações CSS reutilizaveis
const pulse = keyframes`
    0%, 100% {opacity: 1;}
    50% {opacity: 0.6; }
`;

// props tipadas para receber dados do componente pai
// conceito: interface + prefixo evita que props vazem para o DOM
interface RingProps {
    $progress: number; // 0-100
    $phase: Phase;
}

interface TimeTextProps {
    $isRunning: boolean;
}

// container principal do timer
export const TimerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
`;

export const RingContainer = styled.div`
  position: relative;
  width: 260px;
  height: 260px;
`;


// O SVG em si (não precisa de styled, mas o círculo de progresso som)
export const ProgressCircle = styled.circle<RingProps>`
    /* Transição suave do progresso */
    transition: stroke-dashoffset 0.8s ease;

    /* Cor muda entre fase de trabalho (vermelho) e pausa (verde) */
    stroke: ${({ $phase }) => ($phase === "work" ? "#e85d4a" : "#4caf7d")};
`

// texto do tempo posicionado sobre o anel
export const TimeDisplay = styled.div<TimeTextProps>`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* Fonte monoespaçada para que os números não "pulem" */
  font-family: "JetBrains Mono", "Courier New", monospace;
  font-size: 3.5rem;
  font-weight: 700;
  color: #f0ece8;
  letter-spacing: -0.02em;

  /* Pulsa quando rodando */
  ${({ $isRunning }) =>
    $isRunning &&
    css`
      animation: ${pulse} 2s ease-in-out infinite;
    `}
`;

// label "FOCO" ou "PAUSA" abaixo do tempo
export const PhaseLabel = styled.span<{ $phase: Phase }>`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ $phase }) => ($phase === "work" ? "#e85d4a" : "#4caf7d")};
  margin-top: 0.25rem;
`;

// contador de ciclos completados
export const CycleCounter = styled.p`
  font-size: 0.8rem;
  color: #7a7570;
  letter-spacing: 0.05em;
`;
