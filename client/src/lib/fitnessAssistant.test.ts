import { describe, expect, it } from "vitest";
import { answerFitnessQuestion, knowledgeCount } from "./fitnessAssistant";
import {
  advanceResolution,
  RESOLUTION_POLICY,
  type ResolutionState,
} from "./resolutionPolicy";

describe("fitness assistant", () => {
  it("covers a broad local knowledge set", () => {
    expect(knowledgeCount).toBeGreaterThanOrEqual(1000);
  });

  it("understands common spelling mistakes", () => {
    expect(answerFitnessQuestion("que hago si me duele la rodila").topic).toBe(
      "salud"
    );
    expect(answerFitnessQuestion("organizame una rutna semanal").topic).toBe(
      "rutina"
    );
  });

  it("responds with a booking CTA when asked about Jorge", () => {
    const answer = answerFitnessQuestion("quiero contratr a jorge");
    expect(answer.topic).toBe("jorge");
    expect(answer.cta).toContain("Jorge");
  });

  it("uses an emergency boundary instead of improvising advice", () => {
    const answer = answerFitnessQuestion("tengo una emergencia");
    expect(answer.topic).toBe("seguridad");
    expect(answer.answer).toContain("112");
    expect(answer.resolution?.escalates).toBe(true);
  });

  it("closes a repeated objective and hands off after the configured limit", () => {
    let state: ResolutionState = { turn: 0, closed: false, handoff: false };
    for (
      let turn = 0;
      turn < RESOLUTION_POLICY.maxTurnsPerObjective;
      turn += 1
    ) {
      state = advanceResolution(state, "rutina");
    }
    expect(state.turn).toBe(RESOLUTION_POLICY.maxTurnsPerObjective);
    expect(state.closed).toBe(false);
    expect(state.handoff).toBe(false);

    state = advanceResolution(state, "rutina");
    expect(state.closed).toBe(true);
    expect(state.handoff).toBe(true);
    expect(state.turn).toBe(RESOLUTION_POLICY.maxTurnsPerObjective);
  });

  it("returns a bounded resolution plan for every normal topic", () => {
    const topics = [
      "rutina",
      "nutricion",
      "mitos",
      "jorge",
      "reserva",
    ] as const;
    for (const topic of topics) {
      const answer = answerFitnessQuestion(topic);
      expect(answer.resolution?.objective).toBeTruthy();
      expect(answer.resolution?.steps.length).toBeLessThanOrEqual(
        RESOLUTION_POLICY.maxStepsPerAnswer
      );
      expect(answer.resolution?.nextAction).toBeTruthy();
      expect(answer.resolution?.closure).toBeTruthy();
    }
  });
});
