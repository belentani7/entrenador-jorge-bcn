import type { AssistantTopic } from "./fitnessAssistant";

export type ResolutionPlan = {
  objective: string;
  steps: string[];
  nextAction: string;
  closure: string;
  successCriteria: string;
  escalates: boolean;
};

export type ResolutionState = {
  topic?: AssistantTopic;
  turn: number;
  closed: boolean;
  handoff: boolean;
};

export const RESOLUTION_POLICY = {
  maxTurnsPerObjective: 4,
  maxStepsPerAnswer: 3,
  requireNextAction: true,
  requireClosure: true,
  neverDiagnose: true,
  escalateEmergency: true,
  handoffAfterLimit: true,
} as const;

export const advanceResolution = (
  state: ResolutionState,
  topic: AssistantTopic
): ResolutionState => {
  const continuing = state.topic === topic;
  const turn = continuing ? state.turn + 1 : 1;
  const closed =
    continuing && state.turn >= RESOLUTION_POLICY.maxTurnsPerObjective;
  return {
    topic,
    turn: Math.min(turn, RESOLUTION_POLICY.maxTurnsPerObjective),
    closed,
    handoff: closed,
  };
};

export const resolutionPlanFor = (
  topic:
    | "salud"
    | "nutricion"
    | "rutina"
    | "mitos"
    | "jorge"
    | "reserva"
    | "seguridad"
): ResolutionPlan => {
  switch (topic) {
    case "salud":
      return {
        objective: "Entrenar con seguridad y detectar cuándo parar.",
        steps: [
          "Detén la sesión ante dolor agudo, mareo o falta de aire inusual.",
          "Reduce carga y rango solo ante molestias leves y sin empeoramiento.",
          "Consulta a un profesional sanitario si persiste o limita tu vida.",
        ],
        nextAction: "Observa la evolución y anota qué movimiento lo provoca.",
        closure:
          "Si hay señales de alarma, el siguiente paso no es entrenar: es pedir ayuda.",
        successCriteria:
          "No hay señales de alarma y sabes cuándo pedir valoración sanitaria.",
        escalates: true,
      };
    case "nutricion":
      return {
        objective: "Construir una alimentación sostenible para tu objetivo.",
        steps: [
          "Incluye una fuente de proteína, vegetales o fruta y un hidrato en tus comidas.",
          "Ajusta cantidades a tu contexto sin perseguir restricciones extremas.",
          "Revisa energía, hambre y adherencia antes de cambiarlo todo.",
        ],
        nextAction:
          "Elige una comida habitual y hazla más completa esta semana.",
        closure:
          "La solución se consolida cuando puedes repetirla sin obsesionarte.",
        successCriteria:
          "Puedes repetir una comida equilibrada sin depender de restricciones extremas.",
        escalates: false,
      };
    case "rutina":
      return {
        objective: "Organizar una rutina que puedas repetir y progresar.",
        steps: [
          "Reserva dos o tres sesiones realistas en tu calendario.",
          "Combina patrones básicos y deja margen para caminar, dormir y recuperar.",
          "Registra series, repeticiones y sensaciones para progresar gradualmente.",
        ],
        nextAction:
          "Bloquea la primera sesión y prepara el material con antelación.",
        closure:
          "Una rutina resuelta es la que vuelve a ocurrir la próxima semana.",
        successCriteria:
          "Has bloqueado dos o tres sesiones realistas y puedes registrarlas.",
        escalates: false,
      };
    case "mitos":
      return {
        objective: "Separar una promesa fitness de una práctica útil.",
        steps: [
          "Comprueba si la afirmación promete resultados rápidos o localizados.",
          "Prioriza hábitos medibles: entrenamiento, descanso y alimentación suficiente.",
          "Desconfía de productos que sustituyen una evaluación profesional.",
        ],
        nextAction:
          "Cambia una promesa dudosa por un hábito que puedas medir siete días.",
        closure:
          "Si una respuesta promete demasiado, todavía no es una solución fiable.",
        successCriteria:
          "Has sustituido la promesa por un hábito medible durante siete días.",
        escalates: false,
      };
    case "jorge":
    case "reserva":
      return {
        objective: "Convertir tu objetivo en un primer paso acompañado.",
        steps: [
          "Define qué quieres mejorar y qué tiempo real tienes disponible.",
          "Elige una fecha o deja tu horario preferido en el formulario.",
          "Jorge revisará el contexto y confirmará el siguiente paso.",
        ],
        nextAction:
          "Ve a Reserva y cuéntale a Jorge dónde estás y qué quieres conseguir.",
        closure:
          "La conversación se cierra con una decisión concreta, no con una promesa vacía.",
        successCriteria:
          "Has elegido fecha, horario o un objetivo concreto para hablar con Jorge.",
        escalates: false,
      };
    case "seguridad":
      return {
        objective:
          "Priorizar la seguridad por encima de cualquier plan fitness.",
        steps: [
          "Aléjate del riesgo inmediato y no te quedes solo si estás en peligro.",
          "Llama al 112 o contacta con emergencias de tu zona.",
          "Busca apoyo de una persona cercana mientras llega ayuda.",
        ],
        nextAction:
          "Contacta ahora con emergencias o ayuda profesional inmediata.",
        closure:
          "No continúes esta conversación como si fuera una consulta de entrenamiento.",
        successCriteria:
          "La persona está conectada con ayuda inmediata y no sigue esperando al asistente.",
        escalates: true,
      };
  }
};
