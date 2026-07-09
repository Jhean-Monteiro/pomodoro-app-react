// hook customizado = usePomodoro.ts
// encapsula toda a lógica do timer, separada da UI.
// conceito: custom hooks isolam lógica reutilizavel

import { useState, useEffect, useCallback, useRef } from "react";
import type { PomodoroState, SessionMode, Phase } from "../types/pomodoro.types";

// duração em segundos para cada modo e fase
const DURATIONS: Record<SessionMode, Record<Phase, number>> = {
    "25/5": {work: 25 * 60, break: 5 * 60},
    "50/10": {work: 50 * 60, break: 10 * 60},
};

export function usePomodoro() {
    // Estado inicial: modo 25/5, fase de trabalho, timer parado
    const [state, setState] = useState<PomodoroState>({
        mode: "25/5",
        phase: "work",
        timeLeft: DURATIONS["25/5"].work,
        isRunning: false,
        cycles: 0,
    });

    // useRef para guardar o ID do interval sem re-render
    // conceitos: useRef persiste valores entre renders sem causar re-render

    const intervalRef = useRef<ReturnType<typeof setInterval>| null>(null); 

    // limpa o innterval quando o componene desmonta
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        };
    }, [])

    // useEffect que reage a mudanças em isRunning
    // Conceito: useEffect com dependências só roda quando elas mudam
    useEffect(() => {
        if (state.isRunning) {
            intervalRef.current = setInterval(() => {
                setState((prev) => {
                    if (prev.timeLeft <= 1) {
                        // timer chegou a zero - troca de fase
                        const nextPhase: Phase = prev.phase === "work" ? "break" : "work";
                        const nextCycles = nextPhase === "work" ? prev.cycles + 1 : prev.cycles;

                        return {
                            ...prev,
                            phase: nextPhase,
                            timeLeft: DURATIONS[prev.mode][nextPhase],
                            isRunning: true, // continua automaticamente ao trocar de fase
                            cycles: nextCycles,
                        };

                    }
                    return {...prev, timeLeft: prev.timeLeft - 1};
                });
            }, 1000)
        } else {
            // para o interval quando isRunning vira false
            if (intervalRef.current) clearInterval(intervalRef.current)
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [state.isRunning]);

    // useCallback memoriza funções para evitar re-renders desnecessários
    // conceito: useCallback só recria a função se as dependencias mudarem
    const toggle = useCallback(() => {
        setState((prev) => ({...prev, isRunning: !prev.isRunning}))
    }, [])

    const reset = useCallback(() => {
        setState((prev) => ({
            ...prev,
            phase: "work",
            timeLeft: DURATIONS[prev.mode].work,
            isRunning: false,
        }));
    }, []);

    const changeMode = useCallback((mode: SessionMode) => {
        setState({
            mode,
            phase: "work",
            timeLeft: DURATIONS[mode].work,
            isRunning: false,
            cycles: 0,
        });
    }, [])

    // formata segundos em MM:SS para exibição
    const formatTime = (seconds: number): string => {
        const m = Math.floor(seconds/60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // porcentagem de progresso da fase atual (para a barra/anel)
    const totalDuration = DURATIONS[state.mode][state.phase];
    const progress = ((totalDuration - state.timeLeft) / totalDuration) * 100;

    return {
        state, toggle, reset, changeMode, formatTime, progress
    }
}