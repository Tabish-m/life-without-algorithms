import { Brain, Eye, Scale, Zap } from "lucide-react";
import { motion } from "motion/react";
import type { ElementType } from "react";

interface InsightCard {
  icon: ElementType;
  color: string;
  title: string;
  body: string;
}

const CARDS: InsightCard[] = [
  {
    icon: Brain,
    color: "oklch(0.70 0.15 200)",
    title: "Attention as Currency",
    body: "Every feed is optimised to keep you scrolling — not for your benefit, but to maximise time on platform. Algorithms are designed to hijack your focus.",
  },
  {
    icon: Eye,
    color: "oklch(0.65 0.22 320)",
    title: "The Echo Chamber Effect",
    body: "When systems show you only what you've already liked, they quietly narrow the world. You stop encountering ideas that challenge or expand you.",
  },
  {
    icon: Zap,
    color: "oklch(0.75 0.18 130)",
    title: "Serendipity Is Dying",
    body: "Discovery used to mean wandering into the unknown. Now it means a system pre-approves what you might like. The unexpected has become a rarity.",
  },
  {
    icon: Scale,
    color: "oklch(0.65 0.12 290)",
    title: "But There Is a Balance",
    body: "Algorithms also help doctors spot cancer, translate languages, and connect people across continents. The question is who holds the dial — and in whose interest.",
  },
];

const STATS = [
  { value: "3.1B", label: "people use algorithmic feeds daily" },
  { value: "87%", label: "of TikTok watch time is algorithm-driven" },
  { value: "26 min", label: "average daily scroll from recommendations" },
  { value: "0", label: "times you chose what the algorithm showed you" },
];

const STAT_COLORS = [
  "oklch(0.70 0.15 200)",
  "oklch(0.65 0.22 320)",
  "oklch(0.75 0.18 130)",
  "oklch(0.65 0.12 290)",
];

export default function InsightSection() {
  return (
    <section id="insight" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="font-mono text-xs neon-text-magenta uppercase tracking-widest mb-4">
            {"// section_05"}
          </p>
          <motion.h2
            className="font-display font-bold text-3xl md:text-5xl uppercase leading-tight mb-6 glitch-hover"
            data-glitch="Algorithms Shape Reality"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {"Algorithms Shape "}
            <span className="neon-text-magenta">Reality</span>
          </motion.h2>
          <p className="font-body text-muted-foreground leading-relaxed text-base max-w-xl mx-auto">
            We live inside invisible systems that decide what we read, hear,
            buy, and believe. This site is not anti-technology. It is a reminder
            that{" "}
            <span className="neon-text font-medium">
              awareness is the first act of freedom
            </span>
            .
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.value}
              className="card-dark rounded-lg p-5 text-center border"
            >
              <div
                className="font-display font-bold text-2xl md:text-3xl mb-2"
                style={{ color: STAT_COLORS[i] }}
              >
                {s.value}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-dark rounded-lg p-6 border group hover:border-border/60 transition-smooth"
                data-ocid={`insight-card-${i}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded border flex items-center justify-center flex-shrink-0 transition-smooth group-hover:scale-105"
                    style={{
                      borderColor: `${card.color}40`,
                      background: `${card.color}12`,
                    }}
                  >
                    <Icon size={18} style={{ color: card.color }} />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="font-display font-semibold text-base mb-2 leading-snug"
                      style={{ color: card.color }}
                    >
                      {card.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="font-display text-lg text-foreground mb-2">
            Ready to embrace the unpredictable?
          </p>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Start with something small. Browse without a purpose. Let chance
            decide.
          </p>
          <a
            href="#hero"
            className="inline-flex items-center px-8 py-3 font-mono text-sm uppercase tracking-widest border neon-border-cyan neon-text transition-smooth hover:bg-accent/10"
            data-ocid="insight-cta"
          >
            Back to the Top — Roll the Dice
          </a>
        </motion.div>
      </div>
    </section>
  );
}
