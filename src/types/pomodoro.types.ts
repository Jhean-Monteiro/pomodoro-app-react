// TIPOS - pomodoro.types.ts
// Define os tipos compartilhados entre todos os componentes

// modos de sessão disponíveis
export type SessionMode = "25/5" | "50/10";

// fases do ciclo pomodoro
export type Phase = "work" | "break";

// formato do estado global do pomodoro
export interface PomodoroState {
    mode: SessionMode; // qual ciclo o usuario escolheu
    phase: Phase; // trabalho ou pausa
    timeLeft: number; // segundos restantes
    isRunning: boolean; // timer ativo ou pausado
    cycles: number; // quantos ciclos completos
}