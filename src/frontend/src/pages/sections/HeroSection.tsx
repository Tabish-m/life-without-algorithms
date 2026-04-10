import { motion } from "motion/react";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = [
      "oklch(0.70 0.15 200)",
      "oklch(0.65 0.22 320)",
      "oklch(0.75 0.18 130)",
      "oklch(0.65 0.12 290)",
    ];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "oklch(0.09 0.02 280)" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url(/assets/generated/hero-bg.dim_1600x900.jpg)",
        }}
        role="presentation"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.09 0.04 280 / 0.92) 0%, oklch(0.09 0.02 280 / 0.7) 50%, oklch(0.09 0.04 290 / 0.90) 100%)",
        }}
        role="presentation"
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        role="img"
        aria-label="Animated particle background"
      />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          className="font-mono text-xs tracking-[0.4em] uppercase neon-text mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {"[ No personalization. No filter bubble. ]"}
        </motion.p>

        <motion.h1
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-none mb-6 glitch-hover"
          data-glitch="Life Without Algorithms"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          data-ocid="hero-title"
        >
          <span className="text-foreground">Life Without</span>
          <br />
          <span className="neon-text-magenta">Algorithms</span>
        </motion.h1>

        <motion.p
          className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
        >
          What if nothing was tailored for you?
          <br className="hidden md:block" />
          Reclaim randomness. Discover the unpredictable.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <a
            href="#random-feed"
            className="inline-flex items-center px-8 py-3 font-mono text-sm uppercase tracking-widest border neon-border-cyan neon-text transition-smooth hover:bg-accent/10 hover:animate-glitch"
            data-ocid="hero-cta-primary"
          >
            Start Your Adventure
          </a>
          <a
            href="#insight"
            className="inline-flex items-center px-8 py-3 font-mono text-sm uppercase tracking-widest text-muted-foreground border border-border transition-smooth hover:text-foreground hover:border-muted-foreground"
            data-ocid="hero-cta-secondary"
          >
            Why This Matters
          </a>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
          role="presentation"
        >
          <div className="w-px h-12 mx-auto bg-gradient-to-b from-transparent to-accent/60" />
        </motion.div>
      </div>
    </section>
  );
}
