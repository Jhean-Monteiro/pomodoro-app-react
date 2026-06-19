// estilos globais e layout
// createGlobalStyle injeta css global no <head>

import styled, { createGlobalStyle } from "styled-components";

// conceito: createGlobalStyle é o equivalente ao index.css,
// mas dentro do ecossistema de Styled Components.
export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #141210;
    font-family: 'Inter', system-ui, sans-serif;
    color: #f0ece8;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-font-smoothing: antialiased;
  }
`;

// container centralizado da aplicação
export const AppContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 380px;
`;

// título discreto no topo
export const AppTitle = styled.h1`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #4a4540;
`;
