import { RotateCcw, Shuffle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

type Phase = "idle" | "choosing" | "result";

const CHOICES = [
  { label: "Door A", symbol: "▲" },
  { label: "Door B", symbol: "◆" },
  { label: "Door C", symbol: "●" },
];

const OUTCOMES = [
  {
    title: "You found a letter",
    desc: "It's addressed to someone who died 40 years ago. You're compelled to deliver it.",
    emoji: "✉️",
    mood: "mysterious",
    color: "oklch(0.70 0.15 200)",
  },
  {
    title: "A phone rings",
    desc: "It's an antique rotary. On the line: silence, then laughter from a stranger.",
    emoji: "📞",
    mood: "unsettling",
    color: "oklch(0.65 0.22 320)",
  },
  {
    title: "A window opens",
    desc: "You see a city you've never been to but feel you've lived in before.",
    emoji: "🪟",
    mood: "wistful",
    color: "oklch(0.75 0.18 130)",
  },
  {
    title: "Nothing happens",
    desc: "For 47 seconds, nothing. Then a smell you can't identify. Then it's gone.",
    emoji: "🌫️",
    mood: "disorienting",
    color: "oklch(0.65 0.12 290)",
  },
  {
    title: "A coin appears",
    desc: "Heads is a stranger's first name. Tails is the last thing they said.",
    emoji: "🪙",
    mood: "chance",
    color: "oklch(0.70 0.15 200)",
  },
  {
    title: "A door within a door",
    desc: "Smaller each time. You eventually find one the size of a keyhole.",
    emoji: "🚪",
    mood: "recursive",
    color: "oklch(0.65 0.22 320)",
  },
  {
    title: "A map with no names",
    desc: "You recognise the shape of one coastline as your own handwriting.",
    emoji: "🗺️",
    mood: "surreal",
    color: "oklch(0.75 0.18 130)",
  },
  {
    title: "The lights flicker",
    desc: "In darkness you see 12 seconds into someone else's Tuesday.",
    emoji: "💡",
    mood: "temporal",
    color: "oklch(0.65 0.12 290)",
  },
  {
    title: "A sound you cannot source",
    desc: "Everyone hears it differently. No two descriptions agree.",
    emoji: "🔊",
    mood: "ambiguous",
    color: "oklch(0.70 0.15 200)",
  },
];

function randomOutcome() {
  return OUTCOMES[Math.floor(Math.random() * OUTCOMES.length)];
}

export default function DecisionSection() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [selected, setSelected] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<(typeof OUTCOMES)[0] | null>(null);
  const [round, setRound] = useState(1);

  const choose = useCallback((idx: number) => {
    setSelected(idx);
    setPhase("choosing");
    setTimeout(() => {
      setOutcome(randomOutcome());
      setPhase("result");
    }, 1200);
  }, []);

  const reset = useCallback(() => {
    setPhase("idle");
    setSelected(null);
    setOutcome(null);
    setRound((r) => r + 1);
  }, []);

  return (
    <section id="decision" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <p className="font-mono text-xs neon-text uppercase tracking-widest mb-2">
            {"// section_04"}
          </p>
          <h2
            className="font-display font-bold text-3xl md:text-4xl uppercase glitch-hover"
            data-glitch="Decision Simulator"
          >
            Decision Simulator
          </h2>
          <p className="text-muted-foreground font-body mt-2 text-sm max-w-md">
            No data about you. No predicted preference. Choose blind. Whatever
            happens, happens.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="card-dark rounded-xl p-8 border min-h-[320px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {phase === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full text-center"
                >
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                    Round {round}
                  </p>
                  <p className="font-display text-lg text-foreground mb-8">
                    Three doors.{" "}
                    <span className="neon-text">Blind choice.</span> No hints.
                  </p>
                  <div className="flex justify-center gap-4">
                    {CHOICES.map((c, i) => (
                      <button
                        key={c.label}
                        type="button"
                        onClick={() => choose(i)}
                        className="w-24 h-28 border border-border rounded-lg flex flex-col items-center justify-center gap-2 font-mono text-muted-foreground hover:neon-text hover:neon-border-cyan transition-smooth text-xl hover:scale-105"
                        data-ocid={`decision-choice-${i}`}
                        aria-label={`Choose ${c.label}`}
                      >
                        <span className="text-2xl">{c.symbol}</span>
                        <span className="text-[10px] uppercase tracking-widest">
                          {c.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {phase === "choosing" && (
                <motion.div
                  key="choosing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 0.6,
                      ease: "linear",
                    }}
                    className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                    {selected !== null
                      ? `Choosing ${CHOICES[selected].label}...`
                      : "Choosing..."}
                  </p>
                </motion.div>
              )}

              {phase === "result" && outcome && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full text-center"
                >
                  <div className="text-5xl mb-4">{outcome.emoji}</div>
                  <h3
                    className="font-display font-bold text-xl mb-3"
                    style={{
                      color: outcome.color,
                      textShadow: `0 0 12px ${outcome.color}60`,
                    }}
                  >
                    {outcome.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-2 leading-relaxed max-w-xs mx-auto">
                    {outcome.desc}
                  </p>
                  <span
                    className="inline-block font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded border mb-8"
                    style={{
                      color: outcome.color,
                      borderColor: `${outcome.color}40`,
                    }}
                  >
                    {outcome.mood}
                  </span>
                  <br />
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-6 py-2.5 font-mono text-xs uppercase tracking-widest border border-border text-muted-foreground hover:neon-text hover:neon-border-cyan transition-smooth"
                    data-ocid="decision-reset-btn"
                  >
                    <RotateCcw size={12} />
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <Shuffle size={12} className="text-muted-foreground/40" />
            <p className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-wider">
              Outcome determined entirely by random — not your data, not your
              history
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
