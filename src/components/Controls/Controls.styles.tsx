// Estilos dos controles

import styled from "styled-components";;


// props tipadas com $ para não vazar no DOM
interface ModeButtonProps {
    $active: boolean;
}

// linha de seleção de modo (25/5 ou 50/10)
export const ModeSelector = styled.div`
    display: flex;
    gap: 0.5rem;
    background: #1a1714;
    border-radius: 999px;
    padding: 0.25rem;
`;


// Botão de modo - muda visual quando ativo
export const ModeButton = styled.button<ModeButtonProps>`
padding: 0.4rem 1.2rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;

  /* props tipadas controlam variantes visuais */
  background: ${({ $active }) => ($active ? "#e85d4a" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#7a7570")};

  &:hover:not([disabled]) {
    color: ${({ $active }) => ($active ? "#fff" : "#c0bab5")};
  }
`;

// container dos botões de ação (play/pause e reset)
export const ActionRow = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

// Botão primário grande (play/pause)
export const PlayButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  background: #e85d4a;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, background 0.15s ease;
  box-shadow: 0 4px 20px rgba(232, 93, 74, 0.4);

  &:hover {
    transform: scale(1.07);
    background: #d44e3c;
  }

  &:active {
    transform: scale(0.96);
  }
`;

// botão secundário menor (reset)
export const ResetButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #2a2622;
  background: transparent;
  color: #7a7570;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover {
    border-color: #7a7570;
    color: #c0bab5;
  }
`;
