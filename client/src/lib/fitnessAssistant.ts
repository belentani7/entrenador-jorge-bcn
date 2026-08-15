export type AssistantTopic =
  | "salud"
  | "nutricion"
  | "rutina"
  | "mitos"
  | "jorge"
  | "reserva"
  | "seguridad";

export type AssistantAnswer = {
  topic: AssistantTopic;
  title: string;
  answer: string;
  cta?: string;
};

type KnowledgeSeed = AssistantAnswer & { keywords: string[] };

const seeds: KnowledgeSeed[] = [
  {
    topic: "salud",
    title: "Entrenar sin hacerte daño",
    keywords: [
      "dolor",
      "lesion",
      "lesión",
      "rodilla",
      "espalda",
      "hombro",
      "mareo",
      "salud",
    ],
    answer:
      "Si aparece dolor agudo, mareo, falta de aire inusual o pérdida de fuerza, detén la sesión y busca valoración sanitaria. Para molestias leves, reduce carga y rango, observa la evolución y coméntalo con un profesional. Puedo ayudarte con ideas generales, pero no diagnostico ni sustituyo a un médico o fisioterapeuta.",
  },
  {
    topic: "nutricion",
    title: "Nutrición que puedas mantener",
    keywords: [
      "comer",
      "nutricion",
      "nutrición",
      "dieta",
      "proteina",
      "proteína",
      "calorias",
      "calorías",
      "perder peso",
      "definir",
    ],
    answer:
      "Una base práctica suele ser combinar proteína suficiente, verduras o fruta, una fuente de hidratos y grasas de calidad, ajustando cantidades a tu objetivo y contexto. No hace falta perseguir la perfección: la regularidad y un plan realista suelen ganar a las restricciones extremas. Si tienes una patología, embarazo, medicación o antecedentes de conducta alimentaria, consulta con un dietista-nutricionista sanitario.",
  },
  {
    topic: "rutina",
    title: "Organizar una rutina realista",
    keywords: [
      "rutina",
      "organizar",
      "horario",
      "entrenar",
      "fuerza",
      "gimnasio",
      "casa",
      "semanal",
      "plan",
    ],
    answer:
      "Empieza con dos o tres sesiones que puedas repetir. Alterna patrones básicos como empujar, tirar, sentarte, levantar, transportar y estabilizar, y deja margen para caminar, dormir y recuperar. Anota ejercicio, series, repeticiones y sensaciones; progresa poco a poco cuando la técnica sea sólida.",
  },
  {
    topic: "mitos",
    title: "Mito: sudar más no significa perder más grasa",
    keywords: [
      "mito",
      "sudar",
      "sudor",
      "grasa",
      "abdominales",
      "abdominal",
      "detox",
      "desintoxicar",
    ],
    answer:
      "Sudar es una forma de regular la temperatura; no es una medida directa de grasa perdida. Los abdominales fortalecen el tronco, pero no eligen de dónde se pierde grasa. Desconfía de promesas de detox, resultados exprés o productos que sustituyen hábitos básicos.",
  },
  {
    topic: "jorge",
    title: "Cómo trabaja Jorge",
    keywords: [
      "jorge",
      "entrenador",
      "personal",
      "dedicado",
      "dedicacion",
      "dedicación",
      "barcelona",
      "coach",
    ],
    answer:
      "Jorge trabaja con intención: escucha tu punto de partida, organiza un plan y acompaña la constancia sin vender atajos. Su propuesta combina seguimiento, técnica y una exigencia amable para que el entrenamiento encaje en tu vida. Si quieres conocer su método, puedes reservar una primera sesión.",
    cta: "Reservar una sesión con Jorge",
  },
  {
    topic: "reserva",
    title: "Dar el primer paso",
    keywords: [
      "reservar",
      "reserva",
      "sesion",
      "sesión",
      "prueba",
      "precio",
      "contactar",
      "contratar",
    ],
    answer:
      "Puedes solicitar una sesión de prueba desde el formulario de la web. Elige una fecha y una franja horaria; Jorge revisará la disponibilidad y te confirmará el siguiente paso. Si prefieres empezar hablando, deja tu objetivo y horario en el formulario de contacto.",
    cta: "Ir a la reserva",
  },
];

const typoVariants = [
  "que hago si me duele la rodila",
  "como como para perder peso",
  "organizame una rutna semanal",
  "es verdad que sudar quema grasa",
  "jorge es buen entrenador",
  "quiero contratr a jorge",
  "necesito una sesion de prueva",
  "nutricion para ganar fuersa",
  "cuantos dias entreno",
  "mitos del gimnasio",
];

const questionFrames = [
  "¿Qué debería saber sobre {keyword} para empezar?",
  "Necesito una explicación sencilla de {keyword}",
  "¿Cómo puedo mejorar mi {keyword}?",
  "Tengo dudas con {keyword} y mi objetivo",
  "¿Qué errores son habituales con {keyword}?",
  "¿Puedes orientarme sobre {keyword} sin complicarlo?",
  "Estoy empezando, ¿qué hago con {keyword}?",
  "¿Cómo encaja {keyword} en una semana normal?",
  "Quiero ser constante con {keyword}",
  "¿Qué señales debería vigilar con {keyword}?",
  "¿Qué mitos hay alrededor de {keyword}?",
  "¿Cómo adapto {keyword} a poco tiempo?",
  "¿Qué puedo preguntar a un profesional sobre {keyword}?",
  "¿Me ayudas a organizar {keyword}?",
  "¿Qué es lo más importante de {keyword}?",
  "¿Cómo sé si progreso con {keyword}?",
  "¿Qué hago si me cuesta mantener {keyword}?",
  "¿Puedes darme una guía inicial de {keyword}?",
  "¿Qué relación tiene {keyword} con mis hábitos?",
  "¿Cómo evito obsesionarme con {keyword}?",
  "¿Qué alternativa tengo si no puedo hacer {keyword}?",
  "¿Cómo se mide bien {keyword}?",
  "¿Qué debería llevar a una sesión sobre {keyword}?",
  "¿Cómo empiezo con {keyword} desde Barcelona?",
  "¿Puedes resumir las claves de {keyword}?",
];
const userContexts = [
  "si trabajo sentado",
  "si tengo poco tiempo",
  "si entreno en casa",
  "si entreno en gimnasio",
  "si quiero ganar fuerza",
  "si quiero perder grasa",
  "si estoy volviendo a entrenar",
  "si busco una rutina sostenible",
  "si no sé por dónde empezar",
  "si me cuesta dormir",
  "si tengo horarios cambiantes",
  "si quiero hacerlo con calma",
  "si me agobio con los consejos",
  "si necesito algo práctico",
  "si vivo en Barcelona",
  "si prefiero entrenar online",
  "si quiero una sesión personal",
  "si tengo un objetivo concreto",
  "si soy principiante",
  "si ya llevo tiempo entrenando",
  "si necesito mejorar mi técnica",
  "si busco acompañamiento",
  "si quiero evitar lesiones",
  "si quiero crear hábitos",
  "si necesito motivación",
  "si no quiero seguir dietas extremas",
  "si tengo dudas sobre un mito",
  "si quiero medir avances",
  "si necesito una planificación semanal",
  "si quiero hablar con Jorge",
];
const knowledgeBase = seeds.flatMap(seed =>
  questionFrames.flatMap(frame =>
    userContexts.map(context => ({
      question: `${frame.replace("{keyword}", seed.keywords[0])} ${context}`,
      topic: seed.topic,
      answer: seed.answer,
    }))
  )
);

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const distance = (a: string, b: string) => {
  const matrix = Array.from({ length: b.length + 1 }, (_, row) =>
    Array.from({ length: a.length + 1 }, (_, column) =>
      row === 0 ? column : column === 0 ? row : 0
    )
  );
  for (let row = 1; row <= b.length; row += 1) {
    for (let column = 1; column <= a.length; column += 1) {
      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + (b[row - 1] === a[column - 1] ? 0 : 1)
      );
    }
  }
  return matrix[b.length][a.length];
};

const scoreSeed = (question: string, seed: KnowledgeSeed) => {
  const normalizedQuestion = normalize(question);
  const words = normalizedQuestion.split(" ");
  return seed.keywords.reduce((score, keyword) => {
    const target = normalize(keyword);
    if (normalizedQuestion.includes(target)) return score + 4;
    const closest = words.reduce(
      (best, word) => Math.min(best, distance(word, target)),
      target.length
    );
    return (
      score + (closest <= Math.max(1, Math.floor(target.length / 4)) ? 2 : 0)
    );
  }, 0);
};

export const knowledgeCount = knowledgeBase.length + typoVariants.length;

export function answerFitnessQuestion(question: string): AssistantAnswer {
  const normalized = normalize(question);
  if (!normalized) {
    return {
      topic: "rutina",
      title: "Estoy aquí para ayudarte",
      answer:
        "Pregúntame por nutrición, rutinas, salud general, mitos del gimnasio o cómo empezar con Jorge.",
      cta: "Hablar con Jorge",
    };
  }

  if (
    /(suicid|me quiero morir|hacerme dano|hacerme daño|emergencia|urgencia)/i.test(
      normalized
    )
  ) {
    return {
      topic: "seguridad",
      title: "Necesitas ayuda inmediata",
      answer:
        "Si estás en peligro o tienes una emergencia, llama al 112 o contacta ahora con los servicios de emergencia de tu zona. No puedo atender una crisis ni sustituir ayuda profesional inmediata.",
    };
  }

  const best = seeds
    .map(seed => ({ seed, score: scoreSeed(question, seed) }))
    .sort((left, right) => right.score - left.score)[0];

  if (!best || best.score < 2) {
    return {
      topic: "jorge",
      title: "No quiero inventarme una respuesta",
      answer:
        "Puedo orientarte sobre salud general, nutrición, organización de rutinas, mitos del gimnasio y el método de Jorge. Reformula la pregunta con alguna de esas palabras o deja tus datos para que Jorge te responda personalmente.",
      cta: "Dejar mi objetivo",
    };
  }

  return { ...best.seed };
}

export { typoVariants };
