import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import {
  answerFitnessQuestion,
  type AssistantAnswer,
} from "@/lib/fitnessAssistant";
import {
  advanceResolution,
  RESOLUTION_POLICY,
  type ResolutionState,
} from "@/lib/resolutionPolicy";

const avatarUrl =
  "https://jorgefit-zvv3n2zn.manus.space/manus-storage/jorge-ai-mascot_736cc655.png";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  answer?: AssistantAnswer;
};

const quickQuestions = [
  "¿Cómo organizo mi rutina?",
  "¿Qué como para ganar fuerza?",
  "¿Sudar quema más grasa?",
];

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messageId, setMessageId] = useState(1);
  const [resolutionState, setResolutionState] = useState<ResolutionState>({
    turn: 0,
    closed: false,
    handoff: false,
  });
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "assistant",
      text: "Soy el asistente de Jorge. Pregúntame por rutinas, nutrición, salud general, mitos o cómo empezar.",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = (value = input) => {
    const cleanValue = value.trim();
    if (!cleanValue) return;
    const answer = answerFitnessQuestion(cleanValue);
    const nextResolution = advanceResolution(resolutionState, answer.topic);
    setResolutionState(nextResolution);
    const resolvedAnswer =
      nextResolution.handoff && answer.resolution
        ? {
            ...answer,
            title: "Objetivo listo para el siguiente paso",
            answer: `${answer.resolution.closure} Si quieres profundizar, deja tu objetivo para que Jorge continúe contigo.`,
            cta: "Hablar con Jorge",
          }
        : answer;
    const nextId = messageId + 1;
    setMessages(current => [
      ...current,
      { id: messageId, role: "user", text: cleanValue },
      {
        id: nextId,
        role: "assistant",
        text: resolvedAnswer.answer,
        answer: resolvedAnswer,
      },
    ]);
    setMessageId(nextId + 1);
    setInput("");
  };

  return (
    <div className={`assistant-widget ${open ? "assistant-open" : ""}`}>
      {open && (
        <section
          className="assistant-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Asistente fitness de Jorge"
        >
          <header className="assistant-header">
            <div className="assistant-identity">
              <div className="assistant-avatar-wrap">
                <img
                  src={avatarUrl}
                  alt="Asistente fitness de Jorge"
                  className="assistant-avatar"
                />
                <span className="assistant-online" aria-hidden="true" />
              </div>
              <div>
                <strong>Jorge IA</strong>
                <span>
                  <Sparkles size={12} /> Responde al momento
                </span>
              </div>
            </div>
            <button
              className="assistant-close"
              onClick={() => setOpen(false)}
              aria-label="Cerrar asistente"
            >
              <X size={18} />
            </button>
          </header>

          <div className="assistant-messages" aria-live="polite">
            {messages.map(message => (
              <div
                key={message.id}
                className={`assistant-message ${message.role}`}
              >
                {message.role === "assistant" && <Bot size={15} />}
                <div>
                  <p>{message.text}</p>
                  {message.answer?.resolution && (
                    <div
                      className="assistant-resolution"
                      aria-label="Plan resolutivo"
                    >
                      <strong>Plan resolutivo</strong>
                      <span>{message.answer.resolution.objective}</span>
                      <ol>
                        {message.answer.resolution.steps
                          .slice(0, RESOLUTION_POLICY.maxStepsPerAnswer)
                          .map(step => (
                            <li key={step}>{step}</li>
                          ))}
                      </ol>
                      <span>
                        <b>Siguiente paso:</b>{" "}
                        {message.answer.resolution.nextAction}
                      </span>
                      <small>{message.answer.resolution.closure}</small>
                      <small>
                        Éxito cuando:{" "}
                        {message.answer.resolution.successCriteria}
                      </small>
                    </div>
                  )}
                  {message.answer?.cta && (
                    <a
                      href="#reserva"
                      onClick={() => setOpen(false)}
                      className="assistant-cta"
                    >
                      {message.answer.cta} <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="assistant-quick-actions">
            {quickQuestions.map(question => (
              <button key={question} onClick={() => sendMessage(question)}>
                {question}
              </button>
            ))}
          </div>

          <form
            className="assistant-form"
            onSubmit={event => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={event => setInput(event.target.value)}
              required
              maxLength={500}
              placeholder="Escribe tu pregunta…"
              aria-label="Escribe tu pregunta al asistente"
            />
            <button type="submit" aria-label="Enviar pregunta">
              <Send size={17} />
            </button>
          </form>
          <p className="assistant-disclaimer">
            Orientación general, no diagnóstico médico. Objetivo{" "}
            {resolutionState.turn}/{RESOLUTION_POLICY.maxTurnsPerObjective}; se
            cierra o escala cuando corresponde.
          </p>
        </section>
      )}

      {!open && <div className="assistant-hint">¿Te ayudo a empezar?</div>}
      <button
        className="assistant-launcher"
        onClick={() => setOpen(current => !current)}
        aria-label={open ? "Cerrar asistente IA" : "Abrir asistente IA"}
        aria-expanded={open}
      >
        <span className="assistant-launcher-avatar">
          <img src={avatarUrl} alt="" />
        </span>
        <span className="assistant-launcher-copy">
          <strong>Jorge IA</strong>
          <small>Tu compañero fitness</small>
        </span>
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
}
