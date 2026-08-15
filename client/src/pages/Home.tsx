import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Dumbbell,
  Flame,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import AssistantWidget from "@/components/AssistantWidget";

gsap.registerPlugin(ScrollTrigger);

const heroImage =
  "https://jorgefit-zvv3n2zn.manus.space/manus-storage/jorge-hero-body-only_6847b003.png";
const storyImage =
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85";
const gallery = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=85",
];

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
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [comparison, setComparison] = useState(58);
  const [mediaConsent, setMediaConsent] = useState(false);
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
    time: "",
  });
  const leadMutation = trpc.leads.create.useMutation();
  const bookingMutation = trpc.bookings.create.useMutation();

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
    leadMutation.mutate(lead, {
      onSuccess: () => {
        toast.success(
          "Gracias. Jorge recibirá tus datos y te escribirá muy pronto."
        );
        setLead({
          name: "",
          email: "",
          phone: "",
          goal: "",
          preferredTime: "",
        });
      },
      onError: () =>
        toast.error("No se pudo enviar el formulario. Inténtalo de nuevo."),
    });
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
    bookingMutation.mutate(booking, {
      onSuccess: () => {
        toast.success(
          "Solicitud recibida. Jorge ha sido notificado y confirmará tu sesión."
        );
        setBooking({ name: "", email: "", phone: "", date: "", time: "" });
      },
      onError: error =>
        toast.error(error.message || "Ese horario no está disponible."),
    });
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
            telephone: "+34 600 000 000",
            email: "hola@jorgeperformance.es",
            url: "https://jorgeperformance.es",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Barcelona",
              addressCountry: "ES",
            },
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
          {["Historia", "Servicios", "Transformaciones", "Reserva"].map(
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
          aria-label="Abrir menú"
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
              <strong className="stat-number" data-value="320">
                0
              </strong>
              <span>personas acompañadas</span>
            </div>
            <div>
              <strong className="stat-number" data-value="8">
                0
              </strong>
              <span>años creando hábitos</span>
            </div>
            <div>
              <strong className="stat-number" data-value="94">
                0
              </strong>
              <span>% de constancia tras 90 días</span>
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

        <section
          id="transformaciones"
          className="transform-section section-pad"
        >
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow orange-text">El cambio se nota</p>
                <h2>
                  Transformaciones
                  <br />
                  <em>que cuentan historias.</em>
                </h2>
              </div>
              <p>
                La imagen es solo una parte. Celebramos más energía, más fuerza,
                mejor descanso y la confianza de cumplir lo que te prometiste.
              </p>
            </div>
            <div className="comparison-wrap reveal">
              <div className="comparison-image after-image">
                <img
                  src={gallery[galleryIndex]}
                  alt="Persona entrenando en gimnasio"
                />
              </div>
              <div
                className="comparison-image before-image"
                style={{ width: `${comparison}%` }}
              >
                <img
                  src={gallery[(galleryIndex + 1) % gallery.length]}
                  alt="Proceso de entrenamiento y cambio físico"
                />
              </div>
              <span className="comparison-label before-label">Sesión</span>
              <span className="comparison-label after-label">Trabajo real</span>
              <div
                className="comparison-handle"
                style={{ left: `${comparison}%` }}
              >
                <span />
              </div>
              <input
                aria-label="Comparar proceso y progreso"
                className="comparison-range"
                type="range"
                min="10"
                max="90"
                value={comparison}
                onChange={e => setComparison(Number(e.target.value))}
                disabled={!mediaConsent}
              />
            </div>
            <label className="media-consent">
              <input
                type="checkbox"
                checked={mediaConsent}
                onChange={e => setMediaConsent(e.target.checked)}
              />{" "}
              Activar la comparación visual. Las imágenes reales de clientes
              solo se publicarán con autorización expresa.
            </label>
            <div className="gallery-controls">
              <button
                onClick={() =>
                  setGalleryIndex(
                    (galleryIndex + gallery.length - 1) % gallery.length
                  )
                }
                aria-label="Imagen anterior"
              >
                <ChevronLeft />
              </button>
              <span>
                {String(galleryIndex + 1).padStart(2, "0")} /{" "}
                {String(gallery.length).padStart(2, "0")}
              </span>
              <button
                onClick={() =>
                  setGalleryIndex((galleryIndex + 1) % gallery.length)
                }
                aria-label="Imagen siguiente"
              >
                <ChevronRight />
              </button>
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
              <div className="contact-mini">
                <a href="tel:+34600000000">
                  <Phone size={16} /> +34 600 000 000
                </a>
                <a href="mailto:hola@jorgeperformance.es">
                  <Mail size={16} /> hola@jorgeperformance.es
                </a>
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
                    value={booking.time}
                    onChange={e =>
                      setBooking({ ...booking, time: e.target.value })
                    }
                  >
                    <option value="">Selecciona</option>
                    <option>07:00</option>
                    <option>09:00</option>
                    <option>13:30</option>
                    <option>18:00</option>
                    <option>19:30</option>
                  </select>
                </label>
              </div>
              <label>
                Teléfono
                <input
                  value={booking.phone}
                  onChange={e =>
                    setBooking({ ...booking, phone: e.target.value })
                  }
                  placeholder="+34 600 000 000"
                />
              </label>
              <button
                className="button button-primary full-button"
                type="submit"
                disabled={bookingMutation.isPending}
              >
                {bookingMutation.isPending
                  ? "Enviando…"
                  : "Solicitar mi sesión"}
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
                  value={lead.name}
                  onChange={e => setLead({ ...lead, name: e.target.value })}
                  placeholder="Tu nombre"
                />
              </label>
              <label>
                Email
                <input
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
                    value={lead.phone}
                    onChange={e => setLead({ ...lead, phone: e.target.value })}
                    placeholder="+34…"
                  />
                </label>
                <label>
                  ¿Qué buscas?
                  <input
                    value={lead.goal}
                    onChange={e => setLead({ ...lead, goal: e.target.value })}
                    placeholder="Ganar fuerza"
                  />
                </label>
              </div>
              <label>
                Horario preferido
                <select
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
                disabled={leadMutation.isPending}
              >
                {leadMutation.isPending
                  ? "Enviando…"
                  : "Quiero hablar con Jorge"}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </section>

        <section className="testimonials-section section-pad">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow orange-text">Prueba social con rigor</p>
                <h2>
                  Historias reales.
                  <br />
                  <em>Sin atajos.</em>
                </h2>
              </div>
              <div className="testimonial-controls">
                <button
                  onClick={() => setTestimonialIndex(0)}
                  aria-label="Historia anterior"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={() => setTestimonialIndex(1)}
                  aria-label="Historia siguiente"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
            <div className="testimonial-card reveal">
              <div className="stars">
                CASO {String(testimonialIndex + 1).padStart(2, "0")}
              </div>
              <blockquote>
                {testimonialIndex === 0
                  ? "El primer caso real aparecerá aquí cuando Jorge disponga de una historia autorizada y verificable."
                  : "Este espacio está preparado para una segunda historia real, con cita y fotografía aprobadas por la persona."}
              </blockquote>
              <div>
                <strong>Contenido pendiente de autorización</strong>
                <span>
                  No se publican testimonios, fotos ni valoraciones inventadas.
                </span>
              </div>
            </div>
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
          <div className="footer-social">
            <a href="#inicio" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="mailto:hola@jorgeperformance.es" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
      <AssistantWidget />
    </div>
  );
}
