import { describe, expect, it } from "vitest";
import { answerFitnessQuestion, knowledgeCount } from "./fitnessAssistant";

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
  });
});
