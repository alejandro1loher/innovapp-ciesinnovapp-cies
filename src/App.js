import { useState, useEffect, useRef, useCallback } from "react";

// ─── CONFIG ────────────────────────────────────────────────────────────────────
// ¡TU NUEVA API OFICIAL DE GOOGLE! Cero límites.
const GOOGLE_API =
  "https://script.google.com/macros/s/AKfycbxu9-Ppelp8eYq47sVlL8kCb6dkMYS_Xp8O3HCjzyEACorFmaZTK8zmeqiFNUE6ui4glQ/exec";

const USERS = [
  {
    id: 1,
    name: "Vicente López",
    dept: "Dirección General",
    pin: "1001",
    isAdmin: false,
  },
  {
    id: 2,
    name: "Derek Lara",
    dept: "Dirección Vivienda",
    pin: "1002",
    isAdmin: false,
  },
  {
    id: 3,
    name: "Alejandro López",
    dept: "Gerencia de Producto",
    pin: "1415",
    isAdmin: true,
  },
  {
    id: 4,
    name: "Benjamin Lugo",
    dept: "Marketing",
    pin: "1004",
    isAdmin: false,
  },
  {
    id: 5,
    name: "Aaron Alvarado",
    dept: "Ventas",
    pin: "1005",
    isAdmin: false,
  },
  {
    id: 6,
    name: "Elizabeth Aceves",
    dept: "Arquitectura",
    pin: "1006",
    isAdmin: false,
  },
  {
    id: 7,
    name: "Aldrin Farias",
    dept: "Arquitectura",
    pin: "1007",
    isAdmin: false,
  },
  {
    id: 8,
    name: "Miguel Reséndiz",
    dept: "Normativa y Proyectos",
    pin: "1008",
    isAdmin: false,
  },
  {
    id: 9,
    name: "Irving Escobedo",
    dept: "Gerencia de Proyectos",
    pin: "1009",
    isAdmin: false,
  },
  {
    id: 10,
    name: "Tariacuri Montelongo",
    dept: "Mejora Continua",
    pin: "1010",
    isAdmin: false,
  },
  {
    id: 11,
    name: "Isabel Rodríguez",
    dept: "PMO",
    pin: "1011",
    isAdmin: false,
  },
  {
    id: 12,
    name: "Luis Osorio",
    dept: "Estrategias Corporativas",
    pin: "1013",
    isAdmin: false,
  },
  {
    id: 13,
    name: "Miembro Invitado",
    dept: "Invitado",
    pin: "1012",
    isAdmin: false,
  },
];

const SLIDES = [
  {
    icon: "🌱",
    h: "La innovación nace de quien se atreve a ver diferente.",
    s: "Cada idea que registras construye el futuro de CIES.",
  },
  {
    icon: "🚀",
    h: "No copiamos a la competencia, definimos el estándar.",
    s: "Ser el referente en desarrollo inmobiliario de alto valor.",
  },
  {
    icon: "💡",
    h: "Un buen plan ejecutado hoy supera al plan perfecto ejecutado mañana.",
    s: "Tus ideas tienen el poder de transformar proyectos reales.",
  },
  {
    icon: "🌲",
    h: "Los grandes bosques crecen de una sola semilla.",
    s: "Registra tu idea hoy. El cambio empieza contigo.",
  },
  {
    icon: "⚡",
    h: "Al final, ganan los que se atreven.",
    s: "El Comité de Innovación CIES está listo para escucharte.",
  },
];

const AFECTA_OPTS = [
  "Cliente / Comprador",
  "Equipo de Ventas",
  "Arquitectura / Diseño",
  "Costos del proyecto",
  "Tiempos de entrega",
  "Imagen / Percepción de marca",
  "Procesos internos",
  "Postventa / Garantías",
];
const VIABILIDAD_OPTS = [
  "Sí, sin modificaciones",
  "Sí, con ajustes menores",
  "Requiere análisis más profundo",
  "No es viable en este proyecto",
];
const DEMANDA_OPTS = [
  "Sí, feedback directo de clientes",
  "Sí, lo hace la competencia",
  "Sin datos aún, se necesita validar",
];
const DECISION_OPTS = ["APROBAR", "PAUSAR", "DESCARTAR"];

const ESTATUS_COLORS = {
  Nueva: "#6B7280",
  "En revisión": "#1877F2",
  Aprobada: "#4ADE80",
  Pausada: "#FF8C00",
  Descartada: "#EF4444",
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().split("T")[0];
const dayLabel = () => {
  const D = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const M = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const d = new Date();
  return `${D[d.getDay()]} ${d.getDate()} de ${M[d.getMonth()]}`;
};
const initials = (n) =>
  n
    .split(" ")
    .slice(0, 2)
    .map((x) => x[0])
    .join("")
    .toUpperCase();
const genFolio = () => "CIES-" + Date.now().toString().slice(-6);

// ─── CAROUSEL ─────────────────────────────────────────────────────────────────
function Carousel() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [key, setKey] = useState(0);
  const timer = useRef(null);
  const advance = useCallback((next, d = 1) => {
    setDir(d);
    setIdx(next);
    setKey((k) => k + 1);
  }, []);
  useEffect(() => {
    timer.current = setInterval(() => {
      setIdx((p) => {
        const n = (p + 1) % SLIDES.length;
        advance(n, 1);
        return p;
      });
    }, 4200);
    return () => clearInterval(timer.current);
  }, [advance]);
  const s = SLIDES[idx];
  return (
    <div style={C.wrap}>
      <div style={C.glow} />
      <div
        key={key}
        style={{ ...C.inner, animationName: dir > 0 ? "slideInR" : "slideInL" }}
      >
        <span style={C.icon}>{s.icon}</span>
        <p style={C.h}>{s.h}</p>
        <p style={C.sub}>{s.s}</p>
      </div>
      <div style={C.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => advance(i, i > idx ? 1 : -1)}
            style={{ ...C.dot, ...(i === idx ? C.dotOn : {}) }}
          />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("home");
  const [modal, setModal] = useState(null);
  const [reviewTarget, setReviewTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const fire = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3600);
  };

  if (screen === "login")
    return (
      <Shell>
        <LoginScreen
          onLogin={(u) => {
            setUser(u);
            setScreen("app");
          }}
        />
      </Shell>
    );

  return (
    <Shell>
      {modal === "newFicha" && (
        <NewFichaScreen
          user={user}
          onBack={() => setModal(null)}
          onSuccess={() => {
            setModal(null);
            fire("✅ Ficha registrada correctamente");
            setTab("home");
          }}
          onError={(e) => fire(`❌ ${e}`, "err")}
        />
      )}
      {modal === "adminReview" && reviewTarget && (
        <AdminPart2Screen
          ficha={reviewTarget}
          user={user}
          onBack={() => {
            setModal(null);
            setReviewTarget(null);
          }}
          onSuccess={() => {
            setModal(null);
            setReviewTarget(null);
            fire("✅ Sesión de equipo guardada");
          }}
          onError={(e) => fire(`❌ ${e}`, "err")}
        />
      )}
      {!modal && (
        <>
          {tab === "home" && (
            <HomeScreen user={user} onNew={() => setModal("newFicha")} />
          )}
          {tab === "fichas" && (
            <FichasScreen
              user={user}
              onNew={() => setModal("newFicha")}
              onReview={(f) => {
                setReviewTarget(f);
                setModal("adminReview");
              }}
            />
          )}
          {tab === "ranking" && <RankingScreen user={user} />}
          {tab === "profile" && (
            <ProfileScreen
              user={user}
              onLogout={() => {
                setUser(null);
                setScreen("login");
                setTab("home");
              }}
            />
          )}
          <BottomNav tab={tab} setTab={setTab} />
        </>
      )}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div
      style={{
        maxWidth: 430,
        margin: "0 auto",
        minHeight: "100vh",
        background: "#000000",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Nunito',ui-rounded,sans-serif",
      }}
    >
      <style>{GCSS}</style>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════════════════════
function LoginScreen({ onLogin }) {
  const [sid, setSid] = useState("");
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [shake, setShake] = useState(false);
  const sel = USERS.find((u) => u.id === Number(sid));

  const digit = (d) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => {
        if (sel?.pin === next) onLogin(sel);
        else {
          setShake(true);
          setErr("PIN incorrecto");
          setTimeout(() => {
            setShake(false);
            setPin("");
            setErr("");
          }, 700);
        }
      }, 150);
    }
  };

  return (
    <div style={L.page}>
      <div style={L.top}>
        {/* Logo CIES Circular */}
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto 13px",
            border: "2px solid rgba(74,222,128,0.3)",
            boxShadow: "0 0 20px rgba(74,222,128,0.15)",
          }}
        >
          <img
            src="/logo-cies.png"
            alt="CIES"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              backgroundColor: "#000",
            }}
          />
        </div>

        <h1 style={L.h1}>Portal de Innovación</h1>
        <p style={L.sub}>
          Comité de Innovación ·{" "}
          <span style={{ color: "#4ADE80" }}>Grupo CIES</span>
        </p>
      </div>
      <div style={L.card}>
        <label style={L.lbl}>¿Quién eres?</label>
        <select
          style={L.sel}
          value={sid}
          onChange={(e) => {
            setSid(e.target.value);
            setPin("");
            setErr("");
          }}
        >
          <option value="">— Selecciona tu nombre —</option>
          {USERS.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} · {u.dept}
            </option>
          ))}
        </select>
        {sel && (
          <div className={shake ? "shake" : ""}>
            <label style={{ ...L.lbl, marginTop: 18 }}>PIN de acceso</label>
            <div style={L.dots}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{ ...L.dot, ...(i < pin.length ? L.dotOn : {}) }}
                />
              ))}
            </div>
            {err && <p style={L.err}>{err}</p>}
            <div style={L.pad}>
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
                (d, i) => (
                  <button
                    key={i}
                    style={{
                      ...L.key,
                      ...(d === "" ? { visibility: "hidden" } : {}),
                    }}
                    onPointerDown={() =>
                      d === "⌫" ? setPin((p) => p.slice(0, -1)) : digit(d)
                    }
                  >
                    {d}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
      <p style={L.foot}>Acceso exclusivo · 13 miembros · Grupo CIES</p>
    </div>
  );
}

// ─── Design Thinking steps ────────────────────────────────────────────────────
const DT_STEPS = [
  {
    num: "1",
    name: "EMPATIZAR",
    icon: "👥",
    color: "#4ADE80",
    tagline: "Entender al cliente.",
    desc: "¿Qué siente, qué necesita, qué le molesta?",
    quien: "Individual · Parte 1",
    campos: "Preguntas 1, 2, 3 — observación, contexto, a quién afecta",
    cies: "Tú observas desde tu área. Nadie conoce mejor el problema que quien lo vive todos los días.",
  },
  {
    num: "2",
    name: "DEFINIR",
    icon: "🎯",
    color: "#1877F2",
    tagline: "Acotar el problema real.",
    desc: "No el síntoma — la raíz.",
    quien: "Individual · Parte 1",
    campos: "Pregunta 4 — consecuencia de no actuar",
    cies: "Definir qué pasa si no hacemos nada obliga a ir a la raíz del problema, no al síntoma.",
  },
  {
    num: "3",
    name: "IDEAR",
    icon: "💡",
    color: "#FBBF24",
    tagline: "Generar ideas sin filtros.",
    desc: "Cantidad antes que perfección.",
    quien: "Individual → Comité",
    campos: "Preguntas 5 y 6 — solución inicial + qué necesitas",
    cies: "Tu propuesta es el punto de partida. En sesión, el comité construye sobre tu idea — no la descarta.",
  },
  {
    num: "4",
    name: "PROTOTIPAR",
    icon: "🔧",
    color: "#FF8C00",
    tagline: "Hacer algo tangible.",
    desc: "Rápido, barato, imperfecto.",
    quien: "Comité · Parte 2",
    campos: "Preguntas 7, 8, 9 — viabilidad técnica, demanda, costo-beneficio",
    cies: "El comité valida si es viable, si hay demanda real y si el beneficio justifica la inversión.",
  },
  {
    num: "5",
    name: "DECIDIR",
    icon: "⚡",
    color: "#A78BFA",
    tagline: "Ejecutar con claridad.",
    desc: "Decidir, asignar, medir.",
    quien: "Comité · Parte 2",
    campos: "Preguntas 10 y 11 — decisión + plan de acción con KPIs",
    cies: "APROBAR, PAUSAR o DESCARTAR. Las aprobadas tienen responsable, fecha y métrica de éxito.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════════════════════════
function HomeScreen({ user, onNew }) {
  const [dtOpen, setDtOpen] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [myCount, setMyCount] = useState(null);
  const [myRecent, setMyRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // ── 1. Contador global
        const countRes = await fetch(GOOGLE_API + "?action=count");
        const countData = await countRes.json();
        const total = Number(countData?.rows ?? 0);
        if (!cancelled) setTotalCount(total);

        // ── 2. Fichas del usuario
        const allRes = await fetch(GOOGLE_API);
        const allData = await allRes.json();
        const rows = Array.isArray(allData) ? allData : [];
        const mine = rows.filter((f) => f.nombre === user.name);
        if (!cancelled) {
          setMyCount(mine.length);
          setMyRecent([...mine].reverse().slice(0, 3));
        }
      } catch (e) {
        if (!cancelled) {
          setTotalCount(0);
          setMyCount(0);
          setMyRecent([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user.name]);

  return (
    <div style={H.scr}>
      <div style={H.hdr}>
        <div>
          <p style={H.date}>{dayLabel()}</p>
          <h1 style={H.h1}>Hola, {user.name.split(" ")[0]} 👋</h1>
          <p style={H.sub}>¿Listo para innovar hoy?</p>
        </div>
        <div style={H.av}>{initials(user.name)}</div>
      </div>

      <div style={H.scroll}>
        <Carousel />

        {/* ── Stats cards ── */}
        <div style={H.grid3}>
          {[
            { icon: "🌲", val: "13", lbl: "Miembros", c: "#F9FAFB" },
            {
              icon: "📊",
              val: loading ? "…" : String(totalCount ?? 0),
              lbl: "Total fichas",
              c: "#1877F2",
              b: "rgba(24,119,242,0.15)",
            },
            {
              icon: "📋",
              val: loading ? "…" : String(myCount ?? 0),
              lbl: "Mis fichas",
              c: "#4ADE80",
              b: "rgba(74,222,128,0.15)",
            },
          ].map((x) => (
            <div
              key={x.lbl}
              style={{
                ...H.sc,
                ...(x.b ? { border: `1px solid ${x.b}` } : {}),
              }}
            >
              <span style={{ fontSize: 20 }}>{x.icon}</span>
              <p style={{ ...H.sn, color: x.c }}>{x.val}</p>
              <p style={H.sl}>{x.lbl}</p>
            </div>
          ))}
        </div>

        {/* ── Design Thinking ── */}
        <div style={H.dtHeader}>
          <div style={H.dtHeaderLeft}>
            <span style={H.dtHeaderIcon}>🧠</span>
            <div>
              <p style={H.dtHeaderTitle}>Design Thinking</p>
              <p style={H.dtHeaderSub}>Tu ficha cubre todo el proceso</p>
            </div>
          </div>
        </div>

        <div style={H.dtInsight}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: 12, color: "#D1D5DB", lineHeight: 1.55 }}>
            <strong style={{ color: "#F9FAFB" }}>
              Tu ficha YA está haciendo Design Thinking sin decirlo.
            </strong>{" "}
            Parte 1 la llenas tú desde tu área. Parte 2 la completa el comité en
            sesión. Juntos cubren las 5 etapas.
          </p>
        </div>

        <div style={H.dtStrip}>
          {DT_STEPS.map((s, i) => (
            <button
              key={s.num}
              style={{ ...H.dtPill, ...(dtOpen === i ? H.dtPillOpen : {}) }}
              onClick={() => setDtOpen(dtOpen === i ? null : i)}
            >
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              <span style={{ ...H.dtPillNum, color: s.color }}>{s.num}</span>
              <span style={H.dtPillName}>{s.name}</span>
            </button>
          ))}
        </div>

        {dtOpen !== null && (
          <div
            style={{ ...H.dtCard, borderColor: DT_STEPS[dtOpen].color + "44" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  ...H.dtCardNum,
                  background: DT_STEPS[dtOpen].color + "22",
                  color: DT_STEPS[dtOpen].color,
                  borderColor: DT_STEPS[dtOpen].color + "44",
                }}
              >
                {DT_STEPS[dtOpen].num}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ ...H.dtCardTitle, color: DT_STEPS[dtOpen].color }}>
                  {DT_STEPS[dtOpen].name}
                </p>
                <p style={H.dtCardTagline}>{DT_STEPS[dtOpen].tagline}</p>
              </div>
            </div>
            <p style={H.dtCardDesc}>{DT_STEPS[dtOpen].desc}</p>
            <div style={H.dtMapRow}>
              <div style={H.dtMapCell}>
                <p style={{ ...H.dtMapLabel, color: DT_STEPS[dtOpen].color }}>
                  QUIÉN
                </p>
                <p style={H.dtMapVal}>{DT_STEPS[dtOpen].quien}</p>
              </div>
              <div
                style={{
                  width: 1,
                  background: "rgba(255,255,255,0.08)",
                  flexShrink: 0,
                }}
              />
              <div style={{ ...H.dtMapCell, flex: 2 }}>
                <p style={{ ...H.dtMapLabel, color: DT_STEPS[dtOpen].color }}>
                  QUÉ CAMPO DE LA FICHA
                </p>
                <p style={H.dtMapVal}>{DT_STEPS[dtOpen].campos}</p>
              </div>
            </div>
            <div
              style={{
                ...H.dtCardCies,
                borderLeftColor: DT_STEPS[dtOpen].color,
                marginTop: 10,
              }}
            >
              <p style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.55 }}>
                {DT_STEPS[dtOpen].cies}
              </p>
            </div>
          </div>
        )}

        <div style={H.dtFlow}>
          {DT_STEPS.map((s, i) => (
            <div
              key={s.num}
              style={{
                display: "flex",
                alignItems: "center",
                flex: i < 4 ? 1 : "unset",
              }}
            >
              <div
                style={{
                  ...H.dtFlowNode,
                  borderColor: s.color + "77",
                  background: s.color + "14",
                }}
              >
                <span style={{ fontSize: 13 }}>{s.icon}</span>
              </div>
              {i < 4 && (
                <div
                  style={{
                    ...H.dtFlowLine,
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <p style={H.dtFlowCaption}>
          "En este comité: la mejor idea gana. Construimos sobre las ideas del
          otro — no las descartamos."
        </p>

        {/* ── Mis ideas recientes ── */}
        <div style={H.riHeader}>
          <p style={H.secT}>💬 Mis ideas recientes</p>
          {!loading && myCount > 0 && (
            <span style={H.riCount}>
              {myCount} {myCount === 1 ? "ficha" : "fichas"}
            </span>
          )}
        </div>

        {loading && (
          <div style={H.riEmpty}>
            <p style={{ color: "#4B5563", fontSize: 13 }}>⏳ Cargando...</p>
          </div>
        )}

        {!loading && myRecent.length === 0 && (
          <div style={H.riEmpty}>
            <span style={{ fontSize: 28 }}>🌱</span>
            <p
              style={{
                color: "#6B7280",
                fontSize: 13,
                marginTop: 8,
                textAlign: "center",
              }}
            >
              Aún no tienes fichas registradas.
              <br />
              ¡Tu primera idea puede cambiar CIES!
            </p>
            <button style={H.riCta} onClick={onNew}>
              + Registrar mi primera idea
            </button>
          </div>
        )}

        {!loading &&
          myRecent.map((f, i) => {
            const ec = ESTATUS_COLORS[f.estatus] || "#6B7280";
            return (
              <div key={f.folio || i} style={H.riCard}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <p style={H.riTitle}>
                    {(f.p1_solucion || f.p1_observacion || "Sin título").slice(
                      0,
                      58
                    )}
                    …
                  </p>
                  <span
                    style={{
                      ...H.riEstatus,
                      background: ec + "18",
                      color: ec,
                      borderColor: ec + "33",
                    }}
                  >
                    {f.estatus || "Nueva"}
                  </span>
                </div>
                <p style={H.riDesc}>{(f.p1_observacion || "").slice(0, 80)}…</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 7,
                  }}
                >
                  <span style={H.riFolio}>{f.folio}</span>
                  <span style={H.riDate}>{f.fecha}</span>
                </div>
              </div>
            );
          })}

        <div style={{ height: 24 }} />
      </div>

      <button style={H.fab} onClick={onNew}>
        <span style={{ fontSize: 18 }}>+</span>
        <span>Registrar Nueva Idea</span>
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NEW FICHA — PARTE 1
// ═══════════════════════════════════════════════════════════════════════════════
function NewFichaScreen({ user, onBack, onSuccess, onError }) {
  const STEPS = 4;
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState({
    p1_observacion: "",
    p1_donde_proyecto: "",
    p1_donde_proceso: "",
    p1_afecta: [],
    p1_afecta_otro: "",
    p1_consecuencia: "",
    p1_solucion: "",
    p1_necesita: "",
    p1_presupuesto: "",
    p1_tiempo: "",
    p1_areas: "",
  });

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const toggleAfecta = (a) =>
    set(
      "p1_afecta",
      f.p1_afecta.includes(a)
        ? f.p1_afecta.filter((x) => x !== a)
        : [...f.p1_afecta, a]
    );

  const canNext =
    step === 1
      ? f.p1_observacion.trim().length >= 10
      : step === 2
      ? (f.p1_donde_proyecto.trim() || f.p1_donde_proceso.trim()) &&
        f.p1_afecta.length > 0
      : step === 3
      ? f.p1_consecuencia.trim().length >= 5
      : f.p1_solucion.trim().length >= 5;

  // ── POST a GOOGLE APPS SCRIPT ───────────────────────────────────────────────
  const submit = async () => {
    setBusy(true);
    const fol = genFolio();

    const payload = {
      data: {
        folio: fol,
        fecha: today(),
        nombre: user.name,
        departamento: user.dept,
        p1_observacion: f.p1_observacion.trim(),
        p1_donde: [f.p1_donde_proyecto, f.p1_donde_proceso]
          .filter(Boolean)
          .join(" / "),
        p1_afecta: [
          ...f.p1_afecta,
          f.p1_afecta_otro ? `Otro: ${f.p1_afecta_otro}` : "",
        ]
          .filter(Boolean)
          .join(", "),
        p1_consecuencia: f.p1_consecuencia.trim(),
        p1_solucion: f.p1_solucion.trim(),
        p1_necesita: f.p1_necesita.trim(),
        p1_presupuesto: f.p1_presupuesto.trim(),
        p1_tiempo: f.p1_tiempo.trim(),
        p1_areas: f.p1_areas.trim(),
        p2_viabilidad: "",
        p2_viabilidad_notas: "",
        p2_demanda: "",
        p2_demanda_contexto: "",
        p2_costo: "",
        p2_beneficio: "",
        p2_indicador: "",
        p2_decision: "",
        p2_decision_razon: "",
        p2_responsable: "",
        p2_fecha_arranque: "",
        p2_fecha_revision: "",
        p2_kpi: "",
        p2_areas_impl: "",
        p2_fecha_sesion: "",
        p2_integrantes: "",
        estatus: "Nueva",
      },
    };

    try {
      // Usamos no-cors para evitar bloqueos de seguridad de Google
      await fetch(GOOGLE_API, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
      // Como el modo es no-cors, asumimos que llegó si no hubo error de red
      setTimeout(() => onSuccess(), 800);
    } catch (e) {
      onError("Sin conexión. Verifica tu red e intenta de nuevo.");
      setBusy(false);
    }
  };

  const stepTitles = ["Empatizar", "Definir", "Idear", "Idear + Recursos"];
  const stepIcons = ["👥", "🎯", "💡", "🔧"];
  const stepDT = ["DT Etapa 1", "DT Etapa 2", "DT Etapa 3", "DT Etapa 3"];
  const stepColors = ["#4ADE80", "#1877F2", "#FBBF24", "#FF8C00"];

  const fieldsDone = [
    f.p1_observacion.trim().length >= 10,
    f.p1_donde_proyecto.trim().length > 0 ||
      f.p1_donde_proceso.trim().length > 0,
    f.p1_afecta.length > 0,
    f.p1_consecuencia.trim().length >= 5,
    f.p1_solucion.trim().length >= 5,
    f.p1_necesita.trim().length > 0,
    f.p1_presupuesto.trim().length > 0,
    f.p1_tiempo.trim().length > 0,
    f.p1_areas.trim().length > 0,
  ].filter(Boolean).length;
  const fieldPct = Math.round((fieldsDone / 9) * 100);

  return (
    <div style={FF.scr}>
      <div style={FF.hdr}>
        <button style={FF.back} onClick={onBack}>
          ‹ Cancelar
        </button>
        <div style={{ textAlign: "center" }}>
          <p style={FF.stepLbl}>
            {stepDT[step - 1]} · {stepTitles[step - 1]}
          </p>
          <p style={FF.htitle}>
            Ficha de Innovación · Paso {step}/{STEPS}
          </p>
        </div>
        <div style={{ width: 72 }} />
      </div>

      {/* Progress */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          padding: "10px 18px 8px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: stepColors[step - 1],
            }}
          >
            {stepIcons[step - 1]} {stepTitles[step - 1]}
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: fieldsDone === 9 ? "#4ADE80" : "#9CA3AF",
            }}
          >
            {fieldPct}% completado
          </span>
        </div>
        <div
          style={{
            height: 6,
            background: "rgba(255,255,255,0.07)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${fieldPct}%`,
              background: `linear-gradient(90deg,${stepColors[step - 1]},${
                stepColors[Math.min(step, 3)]
              })`,
              borderRadius: 3,
              transition: "width .4s ease",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: 4,
            marginTop: 7,
            alignItems: "center",
          }}
        >
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                flex: s < 4 ? 1 : "unset",
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  fontWeight: 800,
                  flexShrink: 0,
                  background:
                    s < step
                      ? "#4ADE8022"
                      : s === step
                      ? stepColors[s - 1] + "33"
                      : "rgba(255,255,255,0.04)",
                  border: `1.5px solid ${
                    s < step
                      ? "#4ADE80"
                      : s === step
                      ? stepColors[s - 1]
                      : "rgba(255,255,255,0.1)"
                  }`,
                  color:
                    s < step
                      ? "#4ADE80"
                      : s === step
                      ? stepColors[s - 1]
                      : "#4B5563",
                  transition: "all .3s",
                }}
              >
                {s < step ? "✓" : s}
              </div>
              {s < 4 && (
                <div
                  style={{
                    flex: 1,
                    height: 1.5,
                    background:
                      s < step ? "#4ADE8044" : "rgba(255,255,255,0.06)",
                    marginLeft: 2,
                    marginRight: 2,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={FF.scroll}>
        <Hero icon={stepIcons[step - 1]} t={stepTitles[step - 1]} />

        {step === 1 && (
          <Blk
            q="1"
            title="¿Qué observaste o qué problema identificaste?"
            hint="Describe la situación. No necesitas la solución todavía."
          >
            <textarea
              style={{ ...FF.inp, ...FF.ta }}
              rows={5}
              placeholder="Describe con detalle lo que viste o sentiste que algo podía mejorar..."
              value={f.p1_observacion}
              onChange={(e) => set("p1_observacion", e.target.value)}
              maxLength={800}
            />
            <p style={FF.cc}>{f.p1_observacion.length}/800</p>
          </Blk>
        )}

        {step === 2 && (
          <>
            <Blk
              q="2"
              title="¿Dónde ocurre?"
              hint="Señala el contexto: proyecto, área, proceso, etapa."
            >
              <input
                style={FF.inp}
                placeholder="Proyecto / Desarrollo..."
                value={f.p1_donde_proyecto}
                onChange={(e) => set("p1_donde_proyecto", e.target.value)}
                maxLength={120}
              />
              <input
                style={{ ...FF.inp, marginTop: 8 }}
                placeholder="Área o proceso específico..."
                value={f.p1_donde_proceso}
                onChange={(e) => set("p1_donde_proceso", e.target.value)}
                maxLength={120}
              />
            </Blk>
            <Blk
              q="3"
              title="¿A quién afecta?"
              hint="Marca todo lo que aplique."
            >
              <div style={FF.chips}>
                {AFECTA_OPTS.map((a) => (
                  <button
                    key={a}
                    style={{
                      ...FF.chip,
                      ...(f.p1_afecta.includes(a) ? FF.chipOn : {}),
                    }}
                    onClick={() => toggleAfecta(a)}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <input
                style={{ ...FF.inp, marginTop: 10 }}
                placeholder="Otro (especifica)..."
                value={f.p1_afecta_otro}
                onChange={(e) => set("p1_afecta_otro", e.target.value)}
                maxLength={80}
              />
            </Blk>
          </>
        )}

        {step === 3 && (
          <Blk
            q="4"
            title="¿Qué pasaría si no hacemos nada al respecto?"
            hint="Pérdida de ventas, costo mayor, cliente insatisfecho..."
          >
            <textarea
              style={{ ...FF.inp, ...FF.ta }}
              rows={4}
              placeholder="Describe las consecuencias de ignorar este problema..."
              value={f.p1_consecuencia}
              onChange={(e) => set("p1_consecuencia", e.target.value)}
              maxLength={600}
            />
            <p style={FF.cc}>{f.p1_consecuencia.length}/600</p>
          </Blk>
        )}

        {step === 4 && (
          <>
            <Blk
              q="5"
              title="¿Tienes alguna idea de solución?"
              hint="No necesita ser perfecta. Una dirección, un concepto, un ejemplo sirve."
            >
              <textarea
                style={{ ...FF.inp, ...FF.ta }}
                rows={4}
                placeholder="Describe tu propuesta o punto de partida..."
                value={f.p1_solucion}
                onChange={(e) => set("p1_solucion", e.target.value)}
                maxLength={600}
              />
            </Blk>
            <Blk
              q="6"
              title="¿Qué necesitarías para desarrollarla?"
              hint="Sé honesto sobre lo que no puedes resolver solo."
            >
              <textarea
                style={{ ...FF.inp, minHeight: 70, lineHeight: 1.5 }}
                rows={3}
                placeholder="Recursos, información, apoyo de otras áreas..."
                value={f.p1_necesita}
                onChange={(e) => set("p1_necesita", e.target.value)}
                maxLength={400}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  marginTop: 10,
                }}
              >
                <div>
                  <p style={FF.miniLbl}>💰 Presupuesto estimado</p>
                  <input
                    style={FF.inp}
                    placeholder="Ej: $50,000 MXN"
                    value={f.p1_presupuesto}
                    onChange={(e) => set("p1_presupuesto", e.target.value)}
                    maxLength={60}
                  />
                </div>
                <div>
                  <p style={FF.miniLbl}>⏱️ Tiempo estimado</p>
                  <input
                    style={FF.inp}
                    placeholder="Ej: 6 semanas"
                    value={f.p1_tiempo}
                    onChange={(e) => set("p1_tiempo", e.target.value)}
                    maxLength={60}
                  />
                </div>
              </div>
              <p style={{ ...FF.miniLbl, marginTop: 10 }}>
                🏢 Áreas que necesitas involucrar
              </p>
              <input
                style={FF.inp}
                placeholder="Ej: TI, Marketing, Arquitectura..."
                value={f.p1_areas}
                onChange={(e) => set("p1_areas", e.target.value)}
                maxLength={200}
              />
            </Blk>
            <div style={FF.prev}>
              <p style={FF.prevT}>📋 Resumen de tu ficha</p>
              {[
                ["Miembro", `${user.name} · ${user.dept}`],
                [
                  "Problema",
                  f.p1_observacion.slice(0, 80) +
                    (f.p1_observacion.length > 80 ? "…" : ""),
                ],
                [
                  "Dónde",
                  [f.p1_donde_proyecto, f.p1_donde_proceso]
                    .filter(Boolean)
                    .join(" / ") || "—",
                ],
                [
                  "Afecta",
                  f.p1_afecta.slice(0, 2).join(", ") +
                    (f.p1_afecta.length > 2
                      ? `, +${f.p1_afecta.length - 2}`
                      : ""),
                ],
                [
                  "Impacto",
                  f.p1_consecuencia.slice(0, 60) +
                    (f.p1_consecuencia.length > 60 ? "…" : ""),
                ],
                [
                  "Solución",
                  f.p1_solucion.slice(0, 60) +
                    (f.p1_solucion.length > 60 ? "…" : ""),
                ],
                ["Fecha", today()],
              ].map(([l, v]) => (
                <div key={l} style={FF.prevR}>
                  <span style={FF.prevL}>{l}</span>
                  <span style={FF.prevV}>{v || "—"}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ height: 20 }} />
      </div>

      <div style={FF.foot}>
        {step > 1 && (
          <button style={FF.bBack} onClick={() => setStep((s) => s - 1)}>
            ← Anterior
          </button>
        )}
        {step < STEPS ? (
          <button
            style={{ ...FF.bNext, opacity: canNext ? 1 : 0.4 }}
            disabled={!canNext}
            onClick={() => setStep((s) => s + 1)}
          >
            Siguiente →
          </button>
        ) : (
          <button
            style={{ ...FF.bSub, opacity: canNext && !busy ? 1 : 0.5 }}
            disabled={!canNext || busy}
            onClick={submit}
          >
            {busy ? "⏳ Guardando..." : "🚀 Publicar Ficha"}
          </button>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN PARTE 2
// ═══════════════════════════════════════════════════════════════════════════════
function AdminPart2Screen({ ficha, user, onBack, onSuccess, onError }) {
  const [busy, setBusy] = useState(false);
  const [p2, setP2] = useState({
    p2_viabilidad: ficha.p2_viabilidad || "",
    p2_viabilidad_notas: ficha.p2_viabilidad_notas || "",
    p2_demanda: ficha.p2_demanda || "",
    p2_demanda_contexto: ficha.p2_demanda_contexto || "",
    p2_costo: ficha.p2_costo || "",
    p2_beneficio: ficha.p2_beneficio || "",
    p2_indicador: ficha.p2_indicador || "",
    p2_decision: ficha.p2_decision || "",
    p2_decision_razon: ficha.p2_decision_razon || "",
    p2_responsable: ficha.p2_responsable || "",
    p2_fecha_arranque: ficha.p2_fecha_arranque || "",
    p2_fecha_revision: ficha.p2_fecha_revision || "",
    p2_kpi: ficha.p2_kpi || "",
    p2_areas_impl: ficha.p2_areas_impl || "",
    p2_fecha_sesion: ficha.p2_fecha_sesion || today(),
    p2_integrantes: ficha.p2_integrantes || "",
    estatus: ficha.estatus || "Nueva",
  });
  const s = (k, v) => setP2((p) => ({ ...p, [k]: v }));

  // ── UPDATE a GOOGLE APPS SCRIPT ────────────────────────────────────────────
  const submit = async () => {
    setBusy(true);
    const statusMap = {
      APROBAR: "Aprobada",
      PAUSAR: "Pausada",
      DESCARTAR: "Descartada",
    };
    const newEstatus = statusMap[p2.p2_decision] || p2.estatus;

    // Al incluir el "folio", Google Apps Script sabe que debe actualizar y no crear uno nuevo
    const payload = {
      data: { ...p2, estatus: newEstatus, folio: ficha.folio },
    };

    try {
      await fetch(GOOGLE_API, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
      setTimeout(() => onSuccess(), 800);
    } catch (e) {
      onError("Sin conexión.");
      setBusy(false);
    }
  };

  return (
    <div style={FF.scr}>
      <div style={FF.hdr}>
        <button style={FF.back} onClick={onBack}>
          ‹ Volver
        </button>
        <div style={{ textAlign: "center" }}>
          <p style={FF.stepLbl}>⚡ Admin · Sesión de Equipo</p>
          <p style={FF.htitle}>Parte 2 — Análisis</p>
        </div>
        <div style={{ width: 72 }} />
      </div>

      <div style={A2.summaryBar}>
        <div style={A2.summaryDot} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={A2.summaryTitle}>
            {ficha.nombre} · {ficha.folio}
          </p>
          <p style={A2.summaryDesc}>
            {(ficha.p1_observacion || "").slice(0, 70)}...
          </p>
        </div>
        <span
          style={{
            ...A2.estatusChip,
            background: (ESTATUS_COLORS[ficha.estatus] || "#6B7280") + "22",
            color: ESTATUS_COLORS[ficha.estatus] || "#6B7280",
            borderColor: (ESTATUS_COLORS[ficha.estatus] || "#6B7280") + "44",
          }}
        >
          {ficha.estatus}
        </span>
      </div>

      <div style={FF.scroll}>
        <Section2
          num="7"
          title="¿Es viable técnicamente?"
          area="Arquitectura · Normativa · Proyectos"
        >
          <RadioGroup
            options={VIABILIDAD_OPTS}
            value={p2.p2_viabilidad}
            onChange={(v) => s("p2_viabilidad", v)}
            color="#4ADE80"
          />
          <textarea
            style={{ ...FF.inp, ...FF.ta, marginTop: 10 }}
            rows={3}
            placeholder="Notas técnicas del equipo..."
            value={p2.p2_viabilidad_notas}
            onChange={(e) => s("p2_viabilidad_notas", e.target.value)}
          />
        </Section2>

        <Section2
          num="8"
          title="¿Hay demanda real en el mercado?"
          area="Marketing · Ventas"
        >
          <RadioGroup
            options={DEMANDA_OPTS}
            value={p2.p2_demanda}
            onChange={(v) => s("p2_demanda", v)}
            color="#1877F2"
          />
          <textarea
            style={{ ...FF.inp, ...FF.ta, marginTop: 10 }}
            rows={3}
            placeholder="Contexto de mercado / referencia competitiva..."
            value={p2.p2_demanda_contexto}
            onChange={(e) => s("p2_demanda_contexto", e.target.value)}
          />
        </Section2>

        <Section2
          num="9"
          title="¿Qué cuesta vs. qué ganamos?"
          area="Análisis de impacto · Todo el Comité"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div>
              <p style={FF.miniLbl}>Costo / Inversión estimada</p>
              <input
                style={FF.inp}
                placeholder="Ej: $200,000 MXN"
                value={p2.p2_costo}
                onChange={(e) => s("p2_costo", e.target.value)}
                maxLength={100}
              />
            </div>
            <div>
              <p style={FF.miniLbl}>Beneficio esperado</p>
              <input
                style={FF.inp}
                placeholder="Ej: +15% ventas"
                value={p2.p2_beneficio}
                onChange={(e) => s("p2_beneficio", e.target.value)}
                maxLength={100}
              />
            </div>
          </div>
          <p style={FF.miniLbl}>Indicador para medir el resultado</p>
          <input
            style={FF.inp}
            placeholder="Ej: NPS, tiempo de entrega, tasa de conversión..."
            value={p2.p2_indicador}
            onChange={(e) => s("p2_indicador", e.target.value)}
            maxLength={200}
          />
        </Section2>

        <Section2
          num="10"
          title="Decisión del Comité"
          area="Acuerdo formal de la sesión"
        >
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            {DECISION_OPTS.map((d) => {
              const dc =
                d === "APROBAR"
                  ? "#4ADE80"
                  : d === "PAUSAR"
                  ? "#FF8C00"
                  : "#EF4444";
              return (
                <button
                  key={d}
                  style={{
                    flex: 1,
                    background:
                      p2.p2_decision === d
                        ? dc + "22"
                        : "rgba(255,255,255,0.04)",
                    border: `1.5px solid ${
                      p2.p2_decision === d ? dc : dc + "44"
                    }`,
                    borderRadius: 12,
                    padding: "12px 6px",
                    color: p2.p2_decision === d ? dc : "#6B7280",
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "all .15s",
                  }}
                  onClick={() => s("p2_decision", d)}
                >
                  {d === "APROBAR"
                    ? "✓ " + d
                    : d === "PAUSAR"
                    ? "⏸ " + d
                    : "✗ " + d}
                </button>
              );
            })}
          </div>
          <textarea
            style={{ ...FF.inp, ...FF.ta }}
            rows={3}
            placeholder="Argumento / Razón de la decisión..."
            value={p2.p2_decision_razon}
            onChange={(e) => s("p2_decision_razon", e.target.value)}
          />
        </Section2>

        {p2.p2_decision === "APROBAR" && (
          <Section2
            num="11"
            title="Plan de acción — ¿Quién, cuándo y cómo medimos?"
            area="Plan de acción mínimo"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <div>
                <p style={FF.miniLbl}>Responsable líder</p>
                <input
                  style={FF.inp}
                  placeholder="Nombre..."
                  value={p2.p2_responsable}
                  onChange={(e) => s("p2_responsable", e.target.value)}
                  maxLength={80}
                />
              </div>
              <div>
                <p style={FF.miniLbl}>Fecha de arranque</p>
                <input
                  style={FF.inp}
                  type="date"
                  value={p2.p2_fecha_arranque}
                  onChange={(e) => s("p2_fecha_arranque", e.target.value)}
                />
              </div>
              <div>
                <p style={FF.miniLbl}>Fecha de revisión</p>
                <input
                  style={FF.inp}
                  type="date"
                  value={p2.p2_fecha_revision}
                  onChange={(e) => s("p2_fecha_revision", e.target.value)}
                />
              </div>
              <div>
                <p style={FF.miniLbl}>KPI / Cómo medimos</p>
                <input
                  style={FF.inp}
                  placeholder="Métrica clave..."
                  value={p2.p2_kpi}
                  onChange={(e) => s("p2_kpi", e.target.value)}
                  maxLength={100}
                />
              </div>
            </div>
            <p style={FF.miniLbl}>Áreas involucradas en implementación</p>
            <input
              style={FF.inp}
              placeholder="Ej: TI, Ventas, Arquitectura..."
              value={p2.p2_areas_impl}
              onChange={(e) => s("p2_areas_impl", e.target.value)}
              maxLength={200}
            />
          </Section2>
        )}

        <Section2 num="📝" title="Registro de sesión" area="">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div>
              <p style={FF.miniLbl}>Fecha de sesión</p>
              <input
                style={FF.inp}
                type="date"
                value={p2.p2_fecha_sesion}
                onChange={(e) => s("p2_fecha_sesion", e.target.value)}
              />
            </div>
            <div>
              <p style={FF.miniLbl}>Validó</p>
              <input
                style={{ ...FF.inp, opacity: 0.6 }}
                value={user.name}
                readOnly
              />
            </div>
          </div>
          <p style={FF.miniLbl}>Integrantes presentes</p>
          <textarea
            style={{ ...FF.inp, minHeight: 60, lineHeight: 1.5 }}
            rows={2}
            placeholder="Nombres de los asistentes a la sesión..."
            value={p2.p2_integrantes}
            onChange={(e) => s("p2_integrantes", e.target.value)}
          />
        </Section2>

        <div style={{ height: 20 }} />
      </div>

      <div style={FF.foot}>
        <button style={FF.bBack} onClick={onBack}>
          ← Cancelar
        </button>
        <button
          style={{ ...FF.bSub, opacity: !busy ? 1 : 0.5 }}
          disabled={busy}
          onClick={submit}
        >
          {busy ? "⏳ Guardando..." : "💾 Guardar Sesión de Equipo"}
        </button>
      </div>
    </div>
  );
}

function Section2({ num, title, area, children }) {
  return (
    <div style={A2.section}>
      <div style={A2.secHeader}>
        <div style={A2.secNum}>{num}</div>
        <div>
          <p style={A2.secTitle}>{title}</p>
          {area && <p style={A2.secArea}>{area}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function RadioGroup({ options, value, onChange, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {options.map((o) => (
        <button
          key={o}
          style={{
            background: value === o ? color + "14" : "rgba(255,255,255,0.03)",
            border: `1.5px solid ${value === o ? color : color + "30"}`,
            borderRadius: 11,
            padding: "10px 13px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            textAlign: "left",
          }}
          onClick={() => onChange(o)}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: `2px solid ${value === o ? color : "#374151"}`,
              background: value === o ? color : "transparent",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: value === o ? 700 : 500,
              color: value === o ? color : "#9CA3AF",
            }}
          >
            {o}
          </span>
        </button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FICHAS
// ═══════════════════════════════════════════════════════════════════════════════
function FichasScreen({ user, onNew, onReview }) {
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Todas");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(GOOGLE_API);
      const data = await res.json();
      setFichas(Array.isArray(data) ? data : []);
    } catch {
      setFichas([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const visible = user.isAdmin
    ? fichas
    : fichas.filter((f) => f.nombre === user.name);
  const filterOpts = [
    "Todas",
    "Nueva",
    "En revisión",
    "Aprobada",
    "Pausada",
    "Descartada",
  ];
  const shown =
    filter === "Todas" ? visible : visible.filter((f) => f.estatus === filter);

  return (
    <div style={FK.scr}>
      <div style={FK.hdr}>
        <div>
          <p style={FK.hsub}>
            {user.isAdmin ? "Vista administrador" : "Mis fichas"}
          </p>
          <h1 style={FK.h1}>
            {user.isAdmin ? "Todas las Fichas" : "Mis Ideas"}
          </h1>
        </div>
        <div style={FK.badge}>{shown.length}</div>
      </div>
      <div style={FK.filters}>
        {filterOpts.map((o) => (
          <button
            key={o}
            style={{ ...FK.chip, ...(filter === o ? FK.chipOn : {}) }}
            onClick={() => setFilter(o)}
          >
            {o}
          </button>
        ))}
      </div>
      <div style={FK.scroll}>
        {loading && (
          <p
            style={{ color: "#4B5563", textAlign: "center", padding: "40px 0" }}
          >
            ⏳ Cargando fichas...
          </p>
        )}
        {!loading && shown.length === 0 && (
          <div style={FK.empty}>
            <p style={{ fontSize: 36 }}>🌱</p>
            <p style={{ color: "#6B7280", marginTop: 8 }}>
              Aún no hay fichas{" "}
              {filter !== "Todas" ? `con estatus "${filter}"` : "registradas"}.
            </p>
          </div>
        )}
        {!loading &&
          shown.map((f, i) => (
            <div key={f.folio || i} style={FK.card}>
              <div style={FK.cardTop}>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        ...FK.estatusTag,
                        background:
                          (ESTATUS_COLORS[f.estatus] || "#6B7280") + "22",
                        color: ESTATUS_COLORS[f.estatus] || "#6B7280",
                        borderColor:
                          (ESTATUS_COLORS[f.estatus] || "#6B7280") + "44",
                      }}
                    >
                      {f.estatus || "Nueva"}
                    </span>
                    {f.folio && <span style={FK.folio}>{f.folio}</span>}
                  </div>
                  <p style={FK.cardTitle}>
                    {(f.p1_solucion || f.p1_observacion || "Sin título").slice(
                      0,
                      70
                    )}
                    ...
                  </p>
                  <p style={FK.cardMeta}>
                    {f.nombre} · {f.departamento} · {f.fecha}
                  </p>
                </div>
              </div>
              <p style={FK.cardDesc}>
                {(f.p1_observacion || "").slice(0, 120)}...
              </p>
              {f.p1_afecta && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 5,
                    marginTop: 8,
                  }}
                >
                  {f.p1_afecta
                    .split(",")
                    .slice(0, 3)
                    .map((a) => (
                      <span key={a} style={FK.affectPill}>
                        {a.trim()}
                      </span>
                    ))}
                </div>
              )}
              {user.isAdmin && (
                <button style={FK.reviewBtn} onClick={() => onReview(f)}>
                  {f.p2_decision
                    ? "✏️ Editar Sesión de Equipo"
                    : "⚡ Completar Parte 2 — Sesión de Equipo"}
                </button>
              )}
            </div>
          ))}
        <div style={{ height: 24 }} />
      </div>
      <button style={H.fab} onClick={onNew}>
        <span style={{ fontSize: 18 }}>+</span>
        <span>Registrar Nueva Idea</span>
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// RANKING
// ═══════════════════════════════════════════════════════════════════════════════
function RankingScreen({ user }) {
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(GOOGLE_API);
        const data = await res.json();
        setFichas(Array.isArray(data) ? data : []);
      } catch {
        setFichas([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const board = USERS.map((u) => {
    const mine = fichas.filter((f) => f.nombre === u.name);
    const aprobadas = mine.filter((f) => f.estatus === "Aprobada").length;
    const score = mine.length * 10 + aprobadas * 20;
    return { ...u, total: mine.length, aprobadas, score };
  }).sort((a, b) => b.score - a.score || b.total - a.total);

  const myRank = board.findIndex((u) => u.id === user.id) + 1;

  return (
    <div style={RK.scr}>
      <div style={RK.hdr}>
        <div>
          <p style={RK.hsub}>Tabla de posiciones · datos en vivo</p>
          <h1 style={RK.h1}>Leaderboard 🏆</h1>
        </div>
        <div style={RK.myRankBadge}>#{myRank}</div>
      </div>
      <div style={RK.scroll}>
        <div style={RK.note}>
          🔒 Privacidad: solo se muestra el conteo de fichas, no el contenido de
          las ideas.
          <br />⚡ +10 pts por ficha registrada · +20 pts por ficha aprobada
        </div>
        {loading && (
          <p
            style={{ color: "#4B5563", textAlign: "center", padding: "32px 0" }}
          >
            ⏳ Cargando datos...
          </p>
        )}
        {!loading &&
          board.map((u, i) => {
            const isMe = u.id === user.id;
            const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "";
            const pct =
              board[0].score > 0 ? (u.score / board[0].score) * 100 : 0;
            return (
              <div
                key={u.id}
                style={{ ...RK.card, ...(isMe ? RK.cardMe : {}) }}
              >
                <div style={RK.barBg}>
                  <div style={{ ...RK.bar, width: `${pct}%` }} />
                </div>
                <span style={RK.medal}>{medal || `#${i + 1}`}</span>
                <div
                  style={{
                    ...RK.av,
                    background: isMe
                      ? "linear-gradient(135deg,#1877F2,#0D5BD1)"
                      : "rgba(255,255,255,0.07)",
                  }}
                >
                  {initials(u.name)}
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      ...RK.name,
                      ...(isMe ? { color: "#4ADE80" } : {}),
                    }}
                  >
                    {u.name}
                    {isMe ? " (tú)" : ""}
                  </p>
                  <p style={RK.dept}>{u.dept}</p>
                  <div style={RK.pillRow}>
                    <span style={RK.pill}>
                      {u.total} {u.total === 1 ? "ficha" : "fichas"}
                    </span>
                    {u.aprobadas > 0 && (
                      <span
                        style={{
                          ...RK.pill,
                          background: "rgba(74,222,128,0.12)",
                          color: "#4ADE80",
                          borderColor: "rgba(74,222,128,0.2)",
                        }}
                      >
                        {u.aprobadas} aprobada{u.aprobadas !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={RK.score}>{u.score}</p>
                  <p style={RK.slbl}>pts</p>
                </div>
              </div>
            );
          })}
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROFILE
// ═══════════════════════════════════════════════════════════════════════════════
function ProfileScreen({ user, onLogout }) {
  return (
    <div style={PR.scr}>
      <div style={PR.hdr}>
        <p style={PR.hsub}>Mi cuenta</p>
        <h1 style={PR.h1}>Perfil</h1>
      </div>
      <div style={PR.scroll}>
        <div style={PR.card}>
          <div style={PR.avLg}>{initials(user.name)}</div>
          <h2 style={PR.name}>{user.name}</h2>
          <p style={PR.dept}>{user.dept}</p>
          {user.isAdmin && (
            <div style={PR.badge}>⚡ Super Admin · Gerente de Producto</div>
          )}
        </div>
        <div style={PR.info}>
          {[
            ["Organización", "Grupo CIES"],
            ["Comité", "Innovación de Producto"],
            ["Rol", user.isAdmin ? "Administrador" : "Miembro"],
          ].map(([l, v]) => (
            <div key={l} style={PR.row}>
              <span style={PR.rl}>{l}</span>
              <span style={PR.rv}>{v}</span>
            </div>
          ))}
        </div>
        <button style={PR.logout} onClick={onLogout}>
          Cerrar sesión
        </button>
        <p style={PR.ver}>Innovation App CIES · v3.2 · grupocies.mx</p>
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED COMPONENTS + NAV
// ═══════════════════════════════════════════════════════════════════════════════
function BottomNav({ tab, setTab }) {
  const items = [
    ["home", "⊞", "Inicio"],
    ["fichas", "📋", "Fichas"],
    ["ranking", "🏆", "Ranking"],
    ["profile", "◯", "Perfil"],
  ];
  return (
    <nav style={NV.wrap}>
      {items.map(([id, ic, lb]) => (
        <button
          key={id}
          style={{ ...NV.btn, ...(tab === id ? NV.on : {}) }}
          onClick={() => setTab(id)}
        >
          <span style={{ fontSize: 20 }}>{ic}</span>
          <span style={{ fontSize: 10, marginTop: 2, fontWeight: 700 }}>
            {lb}
          </span>
        </button>
      ))}
    </nav>
  );
}

function Toast({ msg, type }) {
  const bg =
    type === "err"
      ? "linear-gradient(135deg,#7F1D1D,#991B1B)"
      : "linear-gradient(135deg,#065F46,#047857)";
  return <div style={{ ...TV.w, background: bg }}>{msg}</div>;
}

function Hero({ icon, t }) {
  return (
    <div style={{ textAlign: "center", padding: "20px 0 14px" }}>
      <span style={{ fontSize: 36, display: "block", marginBottom: 8 }}>
        {icon}
      </span>
      <h2
        style={{
          fontSize: 20,
          fontWeight: 900,
          color: "#F9FAFB",
          marginBottom: 3,
        }}
      >
        {t}
      </h2>
    </div>
  );
}

function Blk({ q, title, hint, children }) {
  return (
    <div style={FF.blk}>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "flex-start",
          marginBottom: 10,
        }}
      >
        <div style={FF.qBadge}>{q}</div>
        <div>
          <p style={FF.blkT}>{title}</p>
          {hint && <p style={FF.blkH}>{hint}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════════
const GCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
  body{background:#000000;color:#F9FAFB;font-family:'Nunito',ui-rounded,sans-serif;}
  input,textarea,select,button{font-family:inherit;}
  textarea{resize:none;}
  ::-webkit-scrollbar{display:none;}
  select option{background:#111;color:#F9FAFB;}
  .shake{animation:shk .5s ease;}
  @keyframes shk{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
  @keyframes slideInR{from{opacity:0;transform:translateX(34px)}to{opacity:1;transform:translateX(0)}}
  @keyframes slideInL{from{opacity:0;transform:translateX(-34px)}to{opacity:1;transform:translateX(0)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  input[type=date]::-webkit-calendar-picker-indicator{filter:invert(0.5);}
`;

const C = {
  wrap: {
    position: "relative",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(74,222,128,0.13)",
    borderRadius: 20,
    padding: "17px 17px 11px",
    marginBottom: 13,
    overflow: "hidden",
    minHeight: 132,
  },
  glow: {
    position: "absolute",
    top: -50,
    left: -50,
    width: 180,
    height: 180,
    background:
      "radial-gradient(circle,rgba(74,222,128,0.07) 0%,transparent 70%)",
    pointerEvents: "none",
  },
  inner: {
    animationDuration: "0.36s",
    animationTimingFunction: "cubic-bezier(.22,1,.36,1)",
    animationFillMode: "forwards",
    minHeight: 84,
  },
  icon: { fontSize: 24, display: "block", marginBottom: 6 },
  h: {
    fontSize: 13,
    fontWeight: 800,
    color: "#F9FAFB",
    lineHeight: 1.45,
    marginBottom: 4,
  },
  sub: { fontSize: 12, color: "#6B7280", lineHeight: 1.5 },
  dots: { display: "flex", gap: 5, marginTop: 9 },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.18)",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "all .25s",
  },
  dotOn: { width: 18, background: "#4ADE80", borderRadius: 3 },
};

const L = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 20px",
  },
  top: { textAlign: "center", marginBottom: 26 },
  ring: {
    width: 68,
    height: 68,
    borderRadius: "50%",
    background: "rgba(74,222,128,0.09)",
    border: "1.5px solid rgba(74,222,128,0.27)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 13px",
  },
  h1: {
    fontSize: 26,
    fontWeight: 900,
    color: "#F9FAFB",
    letterSpacing: "-0.3px",
  },
  sub: { fontSize: 13, color: "#6B7280", marginTop: 3 },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 22,
    padding: 22,
    width: "100%",
    maxWidth: 380,
  },
  lbl: {
    fontSize: 11,
    fontWeight: 700,
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: "1px",
    display: "block",
    marginBottom: 7,
  },
  sel: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 13,
    padding: "12px 15px",
    fontSize: 15,
    color: "#F9FAFB",
    outline: "none",
    appearance: "none",
    cursor: "pointer",
  },
  dots: {
    display: "flex",
    justifyContent: "center",
    gap: 13,
    margin: "14px 0 6px",
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.11)",
    border: "1.5px solid rgba(255,255,255,0.18)",
    transition: "all .15s",
  },
  dotOn: {
    background: "#1877F2",
    borderColor: "#1877F2",
    boxShadow: "0 0 9px rgba(24,119,242,0.5)",
  },
  err: { textAlign: "center", color: "#F87171", fontSize: 13, marginBottom: 7 },
  pad: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 7,
    marginTop: 10,
  },
  key: {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 13,
    padding: "14px",
    fontSize: 21,
    fontWeight: 600,
    color: "#F9FAFB",
    cursor: "pointer",
    transition: "background .1s",
    userSelect: "none",
  },
  foot: {
    position: "absolute",
    bottom: 22,
    fontSize: 11,
    color: "#374151",
    textAlign: "center",
  },
};

const H = {
  scr: { display: "flex", flexDirection: "column", height: "100vh" },
  hdr: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "52px 20px 13px",
    background: "rgba(0,0,0,0.65)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  date: { fontSize: 12, color: "#4ADE80", fontWeight: 700, marginBottom: 2 },
  h1: { fontSize: 21, fontWeight: 900, color: "#F9FAFB" },
  sub: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  av: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#1877F2,#0D5BD1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 14,
    color: "white",
    flexShrink: 0,
  },
  scroll: { flex: 1, overflowY: "auto", padding: "13px 20px 100px" },
  grid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 9,
    marginBottom: 13,
  },
  sc: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 17,
    padding: "13px 8px",
    textAlign: "center",
  },
  sn: { fontSize: 19, fontWeight: 900, margin: "5px 0 2px" },
  sl: { fontSize: 10, color: "#6B7280" },
  secT: {
    fontSize: 12,
    fontWeight: 700,
    color: "#4B5563",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: 9,
  },
  fab: {
    position: "fixed",
    bottom: 73,
    left: "50%",
    transform: "translateX(-50%)",
    background: "linear-gradient(135deg,#FF8C00,#D97706)",
    color: "white",
    border: "none",
    borderRadius: 28,
    padding: "13px 26px",
    fontSize: 15,
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    gap: 7,
    boxShadow: "0 4px 22px rgba(255,140,0,0.38)",
    cursor: "pointer",
    zIndex: 50,
    whiteSpace: "nowrap",
  },
  dtHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 4,
  },
  dtHeaderLeft: { display: "flex", alignItems: "center", gap: 9 },
  dtHeaderIcon: { fontSize: 22 },
  dtHeaderTitle: { fontSize: 15, fontWeight: 800, color: "#F9FAFB" },
  dtHeaderSub: { fontSize: 11, color: "#6B7280" },
  dtStrip: {
    display: "flex",
    gap: 6,
    overflowX: "auto",
    paddingBottom: 4,
    marginBottom: 10,
  },
  dtPill: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: "10px 8px",
    cursor: "pointer",
    transition: "all .2s",
    minWidth: 62,
  },
  dtPillOpen: { background: "rgba(255,255,255,0.08)" },
  dtPillNum: { fontSize: 16, fontWeight: 900, color: "#F9FAFB" },
  dtPillName: {
    fontSize: 9,
    fontWeight: 700,
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    textAlign: "center",
  },
  dtCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1.5px solid",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  dtCardNum: {
    minWidth: 36,
    height: 36,
    borderRadius: "50%",
    border: "1.5px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    fontWeight: 900,
    flexShrink: 0,
  },
  dtCardTitle: { fontSize: 15, fontWeight: 900, letterSpacing: "0.5px" },
  dtCardTagline: { fontSize: 12, color: "#D1D5DB", marginTop: 1 },
  dtCardDesc: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 12,
    lineHeight: 1.5,
  },
  dtCardCies: {
    background: "rgba(255,255,255,0.03)",
    borderLeft: "3px solid",
    borderRadius: 8,
    padding: "10px 12px",
  },
  dtInsight: {
    background: "rgba(74,222,128,0.06)",
    border: "1px solid rgba(74,222,128,0.18)",
    borderRadius: 15,
    padding: "11px 13px",
    marginBottom: 11,
    display: "flex",
    gap: 9,
    alignItems: "flex-start",
  },
  dtMapRow: {
    display: "flex",
    background: "rgba(255,255,255,0.03)",
    borderRadius: 10,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.07)",
  },
  dtMapCell: { flex: 1, padding: "9px 11px" },
  dtMapLabel: {
    fontSize: 9,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: 3,
  },
  dtMapVal: {
    fontSize: 12,
    color: "#D1D5DB",
    fontWeight: 600,
    lineHeight: 1.4,
  },
  dtFlow: {
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 4,
  },
  dtFlowNode: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: "1.5px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  dtFlowLine: { flex: 1, height: 2, borderRadius: 1 },
  dtFlowCaption: {
    fontSize: 11,
    color: "#4B5563",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 4,
    lineHeight: 1.5,
  },
  riHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 9,
  },
  riCount: {
    background: "rgba(74,222,128,0.12)",
    border: "1px solid rgba(74,222,128,0.22)",
    color: "#4ADE80",
    fontSize: 12,
    fontWeight: 800,
    borderRadius: 10,
    padding: "3px 10px",
  },
  riEmpty: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 18,
    padding: "24px 16px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    marginBottom: 12,
  },
  riCta: {
    marginTop: 12,
    background:
      "linear-gradient(135deg,rgba(255,140,0,0.18),rgba(255,140,0,0.08))",
    border: "1px solid rgba(255,140,0,0.3)",
    borderRadius: 12,
    padding: "10px 20px",
    color: "#FF8C00",
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
  },
  riCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: "13px 14px",
    marginBottom: 9,
  },
  riTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#F9FAFB",
    lineHeight: 1.35,
    flex: 1,
  },
  riDesc: { fontSize: 12, color: "#6B7280", lineHeight: 1.5 },
  riEstatus: {
    flexShrink: 0,
    border: "1px solid",
    borderRadius: 8,
    padding: "3px 8px",
    fontSize: 10,
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  riFolio: {
    fontSize: 10,
    color: "#374151",
    fontWeight: 700,
    background: "rgba(255,255,255,0.05)",
    borderRadius: 6,
    padding: "2px 7px",
  },
  riDate: { fontSize: 10, color: "#4B5563" },
};

const FF = {
  scr: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "#000000",
  },
  hdr: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "52px 16px 13px",
    background: "rgba(0,0,0,0.82)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  back: {
    background: "none",
    border: "none",
    color: "#1877F2",
    fontSize: 16,
    cursor: "pointer",
    fontWeight: 700,
    padding: 0,
  },
  stepLbl: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  htitle: { fontSize: 17, fontWeight: 800, color: "#F9FAFB" },
  scroll: { flex: 1, overflowY: "auto", padding: "4px 20px" },
  blk: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 15,
    marginBottom: 11,
  },
  blkT: { fontSize: 14, fontWeight: 800, color: "#F9FAFB", lineHeight: 1.3 },
  blkH: { fontSize: 12, color: "#6B7280", marginTop: 3, lineHeight: 1.4 },
  qBadge: {
    minWidth: 26,
    height: 26,
    borderRadius: "50%",
    background: "rgba(24,119,242,0.2)",
    border: "1px solid rgba(24,119,242,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 900,
    color: "#60A5FA",
    flexShrink: 0,
  },
  inp: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 13,
    padding: "11px 13px",
    fontSize: 14,
    color: "#F9FAFB",
    outline: "none",
  },
  ta: { minHeight: 100, lineHeight: 1.6, paddingTop: 11 },
  cc: { fontSize: 11, color: "#4B5563", textAlign: "right", marginTop: 5 },
  chips: { display: "flex", flexWrap: "wrap", gap: 7 },
  chip: {
    background: "rgba(255,255,255,0.04)",
    border: "1.5px solid rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: "7px 12px",
    fontSize: 12,
    fontWeight: 600,
    color: "#9CA3AF",
    cursor: "pointer",
  },
  chipOn: {
    background: "rgba(24,119,242,0.15)",
    border: "1.5px solid #1877F2",
    color: "#60A5FA",
  },
  miniLbl: {
    fontSize: 11,
    fontWeight: 700,
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: 5,
  },
  prev: {
    background: "rgba(74,222,128,0.05)",
    border: "1px solid rgba(74,222,128,0.18)",
    borderRadius: 17,
    padding: 14,
    marginBottom: 11,
  },
  prevT: {
    fontSize: 12,
    fontWeight: 700,
    color: "#4ADE80",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  prevR: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "6px 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  prevL: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: 600,
    flexShrink: 0,
    marginRight: 10,
  },
  prevV: {
    fontSize: 12,
    color: "#D1D5DB",
    fontWeight: 600,
    textAlign: "right",
    maxWidth: "65%",
  },
  foot: {
    background: "rgba(0,0,0,0.92)",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "11px 20px",
    paddingBottom: "max(11px,env(safe-area-inset-bottom))",
    display: "flex",
    gap: 9,
  },
  bBack: {
    background: "rgba(255,255,255,0.07)",
    border: "none",
    borderRadius: 15,
    padding: "13px 18px",
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
  bNext: {
    flex: 1,
    background: "linear-gradient(135deg,#1877F2,#1565C0)",
    border: "none",
    borderRadius: 15,
    padding: "13px",
    color: "white",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
  },
  bSub: {
    flex: 1,
    background: "linear-gradient(135deg,#FF8C00,#D97706)",
    border: "none",
    borderRadius: 15,
    padding: "13px",
    color: "white",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
};

const A2 = {
  summaryBar: {
    background: "rgba(255,140,0,0.07)",
    borderBottom: "1px solid rgba(255,140,0,0.15)",
    padding: "10px 18px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#FF8C00",
    flexShrink: 0,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#F9FAFB",
    marginBottom: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  summaryDesc: {
    fontSize: 11,
    color: "#6B7280",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  estatusChip: {
    flexShrink: 0,
    border: "1px solid",
    borderRadius: 8,
    padding: "3px 8px",
    fontSize: 11,
    fontWeight: 700,
  },
  section: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 18,
    padding: 15,
    marginBottom: 11,
  },
  secHeader: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    marginBottom: 12,
  },
  secNum: {
    minWidth: 28,
    height: 28,
    borderRadius: "50%",
    background: "rgba(255,140,0,0.18)",
    border: "1px solid rgba(255,140,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 900,
    color: "#FF8C00",
    flexShrink: 0,
  },
  secTitle: {
    fontSize: 14,
    fontWeight: 800,
    color: "#F9FAFB",
    lineHeight: 1.3,
  },
  secArea: { fontSize: 11, color: "#6B7280", marginTop: 2 },
};

const FK = {
  scr: { display: "flex", flexDirection: "column", height: "100vh" },
  hdr: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "52px 20px 13px",
    background: "rgba(0,0,0,0.65)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  hsub: { fontSize: 12, color: "#4ADE80", fontWeight: 700, marginBottom: 2 },
  h1: { fontSize: 21, fontWeight: 900, color: "#F9FAFB" },
  badge: {
    background: "rgba(24,119,242,0.18)",
    color: "#60A5FA",
    fontWeight: 800,
    fontSize: 16,
    borderRadius: 12,
    padding: "5px 14px",
  },
  filters: {
    display: "flex",
    gap: 7,
    padding: "10px 20px",
    overflowX: "auto",
    background: "rgba(0,0,0,0.4)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  chip: {
    flexShrink: 0,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: "6px 12px",
    fontSize: 12,
    fontWeight: 600,
    color: "#6B7280",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  chipOn: {
    background: "rgba(24,119,242,0.18)",
    border: "1px solid #1877F2",
    color: "#60A5FA",
  },
  scroll: { flex: 1, overflowY: "auto", padding: "12px 20px 100px" },
  empty: {
    background: "rgba(255,255,255,0.03)",
    borderRadius: 18,
    padding: "32px 20px",
    textAlign: "center",
    marginTop: 12,
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 15,
    marginBottom: 11,
  },
  cardTop: { display: "flex", gap: 10, alignItems: "flex-start" },
  cardTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#F9FAFB",
    lineHeight: 1.3,
    marginBottom: 3,
  },
  cardMeta: { fontSize: 11, color: "#6B7280" },
  cardDesc: { fontSize: 13, color: "#9CA3AF", lineHeight: 1.5, marginTop: 8 },
  estatusTag: {
    flexShrink: 0,
    border: "1px solid",
    borderRadius: 8,
    padding: "3px 8px",
    fontSize: 11,
    fontWeight: 700,
  },
  folio: { fontSize: 11, color: "#4B5563", fontWeight: 600 },
  affectPill: {
    background: "rgba(24,119,242,0.1)",
    border: "1px solid rgba(24,119,242,0.2)",
    borderRadius: 8,
    padding: "3px 8px",
    fontSize: 11,
    color: "#60A5FA",
    fontWeight: 600,
  },
  reviewBtn: {
    width: "100%",
    marginTop: 12,
    background:
      "linear-gradient(135deg,rgba(255,140,0,0.15),rgba(255,140,0,0.08))",
    border: "1px solid rgba(255,140,0,0.3)",
    borderRadius: 12,
    padding: "10px",
    color: "#FF8C00",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },
};

const RK = {
  scr: { display: "flex", flexDirection: "column", height: "100vh" },
  hdr: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "52px 20px 13px",
    background: "rgba(0,0,0,0.65)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  hsub: { fontSize: 12, color: "#4ADE80", fontWeight: 700, marginBottom: 2 },
  h1: { fontSize: 21, fontWeight: 900, color: "#F9FAFB" },
  myRankBadge: {
    background: "rgba(255,200,50,0.15)",
    color: "#FCD34D",
    fontWeight: 800,
    fontSize: 16,
    borderRadius: 12,
    padding: "5px 14px",
    border: "1px solid rgba(255,200,50,0.2)",
  },
  scroll: { flex: 1, overflowY: "auto", padding: "12px 20px 90px" },
  note: {
    background: "rgba(24,119,242,0.08)",
    border: "1px solid rgba(24,119,242,0.18)",
    borderRadius: 13,
    padding: "10px 13px",
    fontSize: 12,
    color: "#93C5FD",
    marginBottom: 13,
    lineHeight: 1.6,
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 17,
    padding: "13px 14px",
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    gap: 11,
    position: "relative",
    overflow: "hidden",
  },
  cardMe: {
    border: "1.5px solid rgba(74,222,128,0.38)",
    background: "rgba(74,222,128,0.04)",
  },
  barBg: { position: "absolute", inset: 0, pointerEvents: "none" },
  bar: {
    height: "100%",
    background: "linear-gradient(90deg,rgba(24,119,242,0.18),transparent)",
    transition: "width .6s ease",
  },
  medal: { fontSize: 19, width: 27, textAlign: "center", flexShrink: 0 },
  av: {
    width: 37,
    height: 37,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 12,
    color: "white",
    flexShrink: 0,
  },
  name: { fontSize: 13, fontWeight: 700, color: "#F9FAFB" },
  dept: { fontSize: 11, color: "#6B7280" },
  pillRow: { display: "flex", gap: 5, marginTop: 4 },
  pill: {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: "2px 7px",
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: 600,
  },
  score: { fontSize: 22, fontWeight: 900, color: "#F9FAFB" },
  slbl: { fontSize: 10, color: "#6B7280" },
};

const PR = {
  scr: { display: "flex", flexDirection: "column", height: "100vh" },
  hdr: {
    padding: "52px 20px 13px",
    background: "rgba(0,0,0,0.65)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  hsub: { fontSize: 12, color: "#4ADE80", fontWeight: 700, marginBottom: 2 },
  h1: { fontSize: 21, fontWeight: 900, color: "#F9FAFB" },
  scroll: { flex: 1, overflowY: "auto", padding: "18px 20px 90px" },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 22,
    padding: 22,
    textAlign: "center",
    marginBottom: 13,
  },
  avLg: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#1877F2,#0D5BD1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: 900,
    color: "white",
    margin: "0 auto 13px",
  },
  name: { fontSize: 19, fontWeight: 900, color: "#F9FAFB", marginBottom: 3 },
  dept: { fontSize: 13, color: "#6B7280" },
  badge: {
    display: "inline-block",
    background: "rgba(255,140,0,0.14)",
    border: "1px solid rgba(255,140,0,0.28)",
    color: "#FF8C00",
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 18,
    padding: "4px 13px",
    marginTop: 9,
  },
  info: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 19,
    overflow: "hidden",
    marginBottom: 13,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "13px 15px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  rl: { fontSize: 13, color: "#6B7280", fontWeight: 600 },
  rv: { fontSize: 13, color: "#D1D5DB", fontWeight: 700 },
  logout: {
    width: "100%",
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.22)",
    borderRadius: 15,
    padding: "13px",
    color: "#F87171",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
  ver: { textAlign: "center", fontSize: 11, color: "#374151", marginTop: 13 },
};

const NV = {
  wrap: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 430,
    background: "rgba(0,0,0,0.9)",
    backdropFilter: "blur(24px)",
    borderTop: "1px solid rgba(255,255,255,0.07)",
    display: "flex",
    paddingBottom: "env(safe-area-inset-bottom)",
    zIndex: 100,
  },
  btn: {
    flex: 1,
    background: "none",
    border: "none",
    color: "#4B5563",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "9px 0",
  },
  on: { color: "#4ADE80" },
};

const TV = {
  w: {
    position: "fixed",
    bottom: 88,
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    padding: "12px 22px",
    borderRadius: 19,
    fontWeight: 700,
    fontSize: 14,
    zIndex: 300,
    boxShadow: "0 8px 28px rgba(0,0,0,0.4)",
    whiteSpace: "nowrap",
    animation: "fadeUp .3s ease forwards",
    maxWidth: "92vw",
    textAlign: "center",
  },
};
