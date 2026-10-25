export type TimerStatus = "idle" | "running" | "paused" | "finished";
export interface TimerState { status: TimerStatus; elapsedMs: number; startedAt?: number; }

export function startTimer(state: TimerState, now: number): TimerState {
  if (state.status === "finished") return state;
  return { status: "running", elapsedMs: state.elapsedMs, startedAt: now };
}

export function pauseTimer(state: TimerState, now: number): TimerState {
  if (state.status !== "running" || state.startedAt === undefined) return state;
  return { status: "paused", elapsedMs: state.elapsedMs + Math.max(0, now - state.startedAt) };
}

export function finishTimer(state: TimerState, now: number): { state: TimerState; actualMinutes: number } {
  const paused = pauseTimer(state, now);
  const finished: TimerState = { status: "finished", elapsedMs: paused.elapsedMs };
  return { state: finished, actualMinutes: Math.round(finished.elapsedMs / 60_000) };
}

export function elapsedMsAt(state: TimerState, now: number): number {
  return state.status === "running" && state.startedAt !== undefined
    ? state.elapsedMs + Math.max(0, now - state.startedAt)
    : state.elapsedMs;
}
