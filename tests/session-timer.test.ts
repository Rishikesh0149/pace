import { describe, expect, it } from "vitest";
import { finishTimer, pauseTimer, startTimer, type TimerState } from "../lib/session-timer";

const idle: TimerState = { status: "idle", elapsedMs: 0 };

describe("session timer", () => {
  it("starts with a timestamp and accumulates elapsed time on pause", () => {
    const running = startTimer(idle, 1_000);
    expect(running).toEqual({ status: "running", elapsedMs: 0, startedAt: 1_000 });
    expect(pauseTimer(running, 6_500)).toEqual({ status: "paused", elapsedMs: 5_500 });
  });

  it("resumes a paused timer without losing the previous elapsed time", () => {
    const paused = { status: "paused" as const, elapsedMs: 5_500 };
    const running = startTimer(paused, 10_000);
    expect(running).toEqual({ status: "running", elapsedMs: 5_500, startedAt: 10_000 });
    expect(pauseTimer(running, 12_250)).toEqual({ status: "paused", elapsedMs: 7_750 });
  });

  it("finishes with elapsed minutes rounded to the nearest minute", () => {
    const running = startTimer(idle, 0);
    const result = finishTimer(running, 91_000);
    expect(result.state).toEqual({ status: "finished", elapsedMs: 91_000 });
    expect(result.actualMinutes).toBe(2);
  });
});
