import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Dumbbell,
  Flame,
  MapPin,
  Menu,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import AssistantWidget from "@/components/AssistantWidget";

gsap.registerPlugin(ScrollTrigger);

const heroImage =
  "https://jorgefit-zvv3n2zn.manus.space/manus-storage/jorge-hero-body-only_6847b003.png";
const storyImage =
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85";

const minBookingDate = new Date(
  Date.now() - new Date().getTimezoneOffset() * 60_000
)
  .toISOString()
  .slice(0, 10);

type BookingTime = "07:00" | "09:00" | "13:30" | "18:00" | "19:30";

type PublicProcedureResponse<T> = {
  result?: { data?: { json?: T; error?: { message?: string } } };
  error?: { message?: string };
};

async function postPublicProcedure<T>(
  path: string,
  input: unknown
): Promise<T> {
  const response = await fetch(`/api/trpc/${path}?batch=1`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ 0: { json: input } }),
  });
  const payload = (await response.json()) as PublicProcedureResponse<T>[];
  const first = payload[0];
  const data = first?.result?.data?.json;
  const message =
    first?.error?.message ??
    first?.result?.data?.error?.message ??
    "No se pudo completar la solicitud.";
  if (!response.ok || data === undefined) throw new Error(message);
  return data;
}

const services = [
  {
    icon: Dumbbell,
    title: "Entrenamiento personal",
    text: "Sesiones 1:1 diseñadas para ganar fuerza, movilidad y confianza con un plan que encaja en tu vida.",
    price: "Desde 45 € / sesión",
  },
  {
    icon: Zap,
    title: "Entrenamiento online",
    text: "Programación semanal, seguimiento cercano y ajustes reales para progresar estés donde estés.",
    price: "Desde 79 € / mes",
  },
  {
    icon: Flame,
    title: "Nutrición práctica",
    text: "Hábitos sostenibles, platos sencillos y una estrategia que no depende de la perfección.",
    price: "Desde 59 € / plan",
  },
  {
    icon: Users,
    title: "Planes grupales",
    text: "La energía de entrenar acompañado, con grupos reducidos y atención a cada nivel.",
    price: "Desde 25 € / sesión",
  },
];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "",
    preferredTime: "",
  });
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "" as "" | BookingTime,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach(el => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".parallax").forEach(el => {
        gsap.to(el, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: el, scrub: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach(el => {
        const value = Number(el.dataset.value || 0);
        const counter = { value: 0 };
        gsap.to(counter, {
          value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(counter.value).toString();
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const submitLead = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !lead.name ||
      !lead.email ||
      !lead.phone ||
      !lead.goal ||
      !lead.preferredTime
    )
      return toast.error(
        "Completa todos los campos para que Jorge pueda contactarte."
      );
    setLeadSubmitting(true);
    void postPublicProcedure<{
      ownerNotified: boolean;
    }>("leads.create", lead)
      .then(result => {
        if (result.ownerNotified) {
          toast.success(
            "Gracias. Jorge ha recibido tu consulta y te escribirá pronto."
          );
        } else {
          toast.warning(
            "Tu consulta se ha guardado, pero el aviso automático a Jorge no está disponible. La respuesta podría demorarse."
          );
        }
        setLead({
          name: "",
          email: "",
          phone: "",
          goal: "",
          preferredTime: "",
        });
      })
      .catch(error =>
        toast.error(
          error instanceof Error
            ? error.message
            : "No se pudo enviar el formulario. Inténtalo de nuevo."
        )
      )
      .finally(() => setLeadSubmitting(false));
  };

  const submitBooking = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !booking.name ||
      !booking.email ||
      !booking.phone ||
      !booking.date ||
      !booking.time
    )
      return toast.error("Elige una fecha y una hora para reservar.");
    const bookingPayload = {
      ...booking,
      time: booking.time as BookingTime,
    };
    setBookingSubmitting(true);
    void postPublicProcedure<{
      success: true;
      ownerNotified: boolean;
    }>("bookings.create", bookingPayload)
      .then(result => {
        toast.success(
          result.ownerNotified
            ? "Solicitud recibida. Jorge ha sido notificado y confirmará tu sesión."
            : "Tu solicitud se ha guardado, pero el aviso automático a Jorge no está disponible. La respuesta podría demorarse."
        );
        setBooking({ name: "", email: "", phone: "", date: "", time: "" });
      })
      .catch(error =>
        toast.error(
          error instanceof Error
            ? error.message
            : "Ese horario no está disponible."
        )
      )
      .finally(() => setBookingSubmitting(false));
  };

  return (
    <div ref={root} className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Jorge · Entrenador personal",
            description:
              "Entrenamiento personal, online y nutrición en Barcelona.",
            areaServed: "Barcelona",
            priceRange: "€€",
          }),
        }}
      />
      <header className="sticky-nav">
        <a href="#inicio" className="brand">
          <span className="brand-mark">J</span>
          <span>
            JORGE<span className="brand-dot">.</span>
          </span>
        </a>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          {["Historia", "Servicios", "Método", "Reserva"].map(
            item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace("ó", "o")}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            )
          )}
        </nav>
        <a className="nav-cta" href="#reserva">
          Reserva tu sesión <ArrowRight size={16} />
        </a>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section id="inicio" className="hero-section">
          <div className="hero-media">
            <img
              src={heroImage}
              alt="Hombre adulto entrenando con ropa deportiva en un gimnasio"
            />
            <div className="hero-overlay" />
          </div>
          <div className="hero-content container">
            <div className="hero-copy">
              <p className="eyebrow orange-text">
                <span className="eyebrow-line" /> Entrenador personal en
                Barcelona
              </p>
              <h1>
                Tu mejor versión
                <br />
                <span>no se improvisa.</span>
              </h1>
              <p className="hero-lede">
                Entrenamiento con intención. Disciplina con propósito.
                Resultados que se quedan contigo.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#reserva">
                  Empieza hoy <ArrowRight size={18} />
                </a>
                <a className="text-link" href="#historia">
                  Conoce mi método <ArrowDown size={16} />
                </a>
              </div>
            </div>
            <div className="hero-note">
              <span className="hero-note-dot" /> Disponible en Barcelona y
              online
            </div>
          </div>
          <div className="scroll-cue">
            <span>Scroll para descubrir</span>
            <ArrowDown size={16} />
          </div>
          <div
            className="hero-method-stamp"
            aria-label="Método Jorge Performance"
          >
            <span>J</span>
            <small>
              MÉTODO
              <br />
              01 / 04
            </small>
          </div>
        </section>

        <section className="proof-strip">
          <div className="container proof-grid">
            <div>
              <strong className="stat-number" data-value="1">
                0
              </strong>
              <span>método personalizado</span>
            </div>
            <div>
              <strong className="stat-number" data-value="4">
                0
              </strong>
              <span>fases de progreso</span>
            </div>
            <div>
              <strong className="stat-number" data-value="0">
                0
              </strong>
              <span>promesas vacías</span>
            </div>
          </div>
        </section>

        <section
          className="signature-rail"
          aria-label="Pilares del método Jorge"
        >
          <div className="signature-rail-track">
            {[
              "DISCIPLINA",
              "TÉCNICA",
              "CONSTANCIA",
              "PROGRESO",
              "DISCIPLINA",
              "TÉCNICA",
              "CONSTANCIA",
              "PROGRESO",
            ].map((item, index) => (
              <span key={`${item}-${index}`}>
                <i /> {item}
              </span>
            ))}
          </div>
        </section>

        <section id="historia" className="story-section section-pad">
          <div className="container story-grid">
            <div className="story-visual reveal">
              <div className="image-frame">
                <img
                  className="parallax"
                  src={storyImage}
                  alt="Entrenador guiando una sesión de fuerza"
                />
              </div>
              <div className="floating-card">
                <Sparkles size={17} />
                <span>
                  Más que entrenar.
                  <br />
                  <b>Aprender a cuidarte.</b>
                </span>
              </div>
            </div>
            <div className="story-copy reveal">
              <p className="eyebrow orange-text">
                La historia detrás del método
              </p>
              <h2>
                La dedicación es un músculo.
                <br />
                <em>Se entrena.</em>
              </h2>
              <p>
                Jorge empezó entrenando para entender su propio cuerpo. Con el
                tiempo entendió algo más importante: la transformación no ocurre
                cuando lo das todo un día, sino cuando aprendes a volver al día
                siguiente.
              </p>
              <p>
                Por eso su método une ciencia, escucha y una exigencia amable.
                Cada plan comienza donde estás y avanza hacia lo que quieres
                conseguir.
              </p>
              <a className="text-link orange-link" href="#servicios">
                Descubre el método <ArrowRight size={17} />
              </a>
              <a className="story-cta-card" href="#reserva">
                <span>
                  <b>Tu siguiente sesión empieza aquí.</b>
                  <small>
                    Cuéntale a Jorge dónde estás y qué quieres conseguir.
                  </small>
                </span>
                <ArrowUpRight size={19} />
              </a>
            </div>
          </div>
        </section>

        <section id="servicios" className="services-section section-pad">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow orange-text">Entrena con dirección</p>
                <h2>
                  Un plan. <em>Tu ritmo.</em>
                  <br />
                  Resultados medibles.
                </h2>
              </div>
              <p>
                Elige la forma de acompañamiento que mejor encaja contigo. La
                metodología es la misma: objetivos claros, seguimiento constante
                y progreso real.
              </p>
            </div>
            <div className="services-grid">
              {services.map(({ icon: Icon, title, text, price }, index) => (
                <article className="service-card reveal" key={title}>
                  <span className="service-index">0{index + 1}</span>
                  <Icon className="service-icon" size={28} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <strong>{price}</strong>
                  <a href="#reserva" aria-label={`Reservar ${title}`}>
                    <ArrowUpRight size={19} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="metodo" className="transform-section section-pad">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow orange-text">Progreso con sentido</p>
                <h2>
                  Un proceso claro.
                  <br />
                  <em>Avances que medimos.</em>
                </h2>
              </div>
              <p>
                Cada plan parte de tu punto de inicio. Revisamos cómo te mueves,
                qué puedes sostener y qué señales indican que estás avanzando.
              </p>
            </div>
            <div className="progress-principles reveal">
              <article>
                <span>01</span>
                <h3>Un punto de partida real</h3>
                <p>Definimos objetivos y adaptamos el plan a tu experiencia, tiempo y contexto.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Práctica con intención</h3>
                <p>Trabajamos técnica, fuerza y hábitos con una carga que puedas mantener.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Revisión y ajustes</h3>
                <p>Revisamos sensaciones y progreso para decidir juntos el siguiente paso.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="quote-section">
          <div className="container quote-inner reveal">
            <p className="quote-mark">“</p>
            <blockquote>
              La constancia no es hacerlo perfecto.
              <br />
              <span>Es no dejar de volver.</span>
            </blockquote>
            <p className="quote-byline">— Filosofía Jorge Performance</p>
          </div>
        </section>

        <section id="reserva" className="booking-section section-pad">
          <div className="container booking-grid">
            <div className="booking-copy reveal">
              <p className="eyebrow orange-text">Tu primer paso</p>
              <h2>
                Reserva una sesión
                <br />
                <em>sin compromiso.</em>
              </h2>
              <p>
                Cuéntame dónde estás y qué quieres conseguir. En esta primera
                sesión veremos si mi forma de trabajar encaja contigo.
              </p>
              <div className="booking-points">
                <span>
                  <Check size={17} /> 30 minutos de valoración
                </span>
                <span>
                  <Check size={17} /> Plan inicial personalizado
                </span>
                <span>
                  <Check size={17} /> Sin permanencia
                </span>
              </div>
            </div>
            <form className="booking-form reveal" onSubmit={submitBooking}>
              <div className="form-title">
                <CalendarDays />
                <div>
                  <span>Sesión de prueba</span>
                  <b>Elige tu momento</b>
                </div>
              </div>
              <label>
                Nombre
                <input
                  required
                  value={booking.name}
                  onChange={e =>
                    setBooking({ ...booking, name: e.target.value })
                  }
                  placeholder="Tu nombre"
                />
              </label>
              <label>
                Email
                <input
                  required
                  type="email"
                  value={booking.email}
                  onChange={e =>
                    setBooking({ ...booking, email: e.target.value })
                  }
                  placeholder="tu@email.com"
                />
              </label>
              <div className="form-row">
                <label>
                  Fecha
                  <input
                    required
                    min={minBookingDate}
                    type="date"
                    value={booking.date}
                    onChange={e =>
                      setBooking({ ...booking, date: e.target.value })
                    }
                  />
                </label>
                <label>
                  Hora
                  <select
                    required
                    value={booking.time}
                    onChange={e =>
                      setBooking({
                        ...booking,
                        time: e.target.value as "" | BookingTime,
                      })
                    }
                  >
                    <option value="">Selecciona</option>
                    <option value="07:00">07:00</option>
                    <option value="09:00">09:00</option>
                    <option value="13:30">13:30</option>
                    <option value="18:00">18:00</option>
                    <option value="19:30">19:30</option>
                  </select>
                </label>
              </div>
              <label>
                Teléfono
                <input
                  required
                  value={booking.phone}
                  onChange={e =>
                    setBooking({ ...booking, phone: e.target.value })
                  }
                  placeholder="+34…"
                />
              </label>
              <button
                className="button button-primary full-button"
                type="submit"
                disabled={bookingSubmitting}
              >
                {bookingSubmitting ? "Enviando…" : "Solicitar mi sesión"}
                <ArrowRight size={18} />
              </button>
              <small>
                Al enviar aceptas que Jorge contacte contigo para confirmar
                disponibilidad.
              </small>
            </form>
          </div>
        </section>

        <section className="lead-section section-pad">
          <div className="container lead-grid">
            <div className="lead-copy reveal">
              <p className="eyebrow orange-text">¿Todavía tienes dudas?</p>
              <h2>
                Empieza con una
                <br />
                <em>conversación.</em>
              </h2>
              <p>
                Déjame tu objetivo y te responderé personalmente con el
                siguiente paso más útil para ti.
              </p>
              <div className="lead-badge">
                <Clock3 size={18} /> Respuesta habitual en menos de 24 h
              </div>
            </div>
            <form className="lead-form reveal" onSubmit={submitLead}>
              <label>
                Nombre
                <input
                  required
                  value={lead.name}
                  onChange={e => setLead({ ...lead, name: e.target.value })}
                  placeholder="Tu nombre"
                />
              </label>
              <label>
                Email
                <input
                  required
                  type="email"
                  value={lead.email}
                  onChange={e => setLead({ ...lead, email: e.target.value })}
                  placeholder="tu@email.com"
                />
              </label>
              <div className="form-row">
                <label>
                  Teléfono
                  <input
                    required
                    value={lead.phone}
                    onChange={e => setLead({ ...lead, phone: e.target.value })}
                    placeholder="+34…"
                  />
                </label>
                <label>
                  ¿Qué buscas?
                  <input
                    required
                    value={lead.goal}
                    onChange={e => setLead({ ...lead, goal: e.target.value })}
                    placeholder="Ganar fuerza"
                  />
                </label>
              </div>
              <label>
                Horario preferido
                <select
                  required
                  value={lead.preferredTime}
                  onChange={e =>
                    setLead({ ...lead, preferredTime: e.target.value })
                  }
                >
                  <option value="">Selecciona una franja</option>
                  <option>Mañanas</option>
                  <option>Mediodía</option>
                  <option>Tardes</option>
                  <option>Flexible</option>
                </select>
              </label>
              <button
                className="button button-outline full-button"
                type="submit"
                disabled={leadSubmitting}
              >
                {leadSubmitting ? "Enviando…" : "Quiero hablar con Jorge"}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </section>

        <section className="location-section">
          <div className="container location-grid">
            <div className="location-copy reveal">
              <p className="eyebrow orange-text">Entrena en Barcelona</p>
              <h2>
                Tu ciudad.
                <br />
                <em>Tu momento.</em>
              </h2>
              <p>
                Sesiones presenciales en Barcelona y acompañamiento online para
                que el lugar nunca sea una excusa.
              </p>
              <div className="location-detail">
                <MapPin size={19} />
                <span>
                  Barcelona, Cataluña
                  <br />
                  <small>Zona Eixample · Sants · Gràcia</small>
                </span>
              </div>
              <a className="text-link orange-link" href="#reserva">
                Quiero empezar <ArrowRight size={17} />
              </a>
            </div>
            <div className="map-card reveal">
              <div className="map-fallback">
                <div className="map-grid-lines" />
                <span className="map-pin">
                  <MapPin size={22} />
                </span>
                <span className="map-label">Barcelona</span>
                <a
                  href="https://www.google.com/maps/search/Barcelona"
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir ubicación en Google Maps <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <a href="#inicio" className="brand">
            <span className="brand-mark">J</span>
            <span>
              JORGE<span className="brand-dot">.</span>
            </span>
          </a>
          <span>Entrenamiento con intención · Barcelona</span>
          <span
            className="quiet-signature"
            role="note"
            aria-label="Créditos de desarrollo"
          >
            belentani.eu · Pedro Belentani · noiacore.com
          </span>
        </div>
      </footer>
      <AssistantWidget />
    </div>
  );
}
