import { Play, SkipForward, Volume2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

const GENRES = [
  "Avant-Garde Jazz",
  "Ethiopian Funk",
  "Medieval Drone",
  "Brazilian Noise",
  "Post-Soviet Folk",
  "Doom Ambient",
  "Mongolian Throat",
  "Afro-Psychedelic",
  "Icelandic Math Rock",
  "Detroit Techno",
  "Appalachian Minimalism",
  "Lagos Highlife",
  "Korean Pansori",
  "Venezuelan Joropo",
  "Industrial Celtic",
];

const ARTISTS = [
  "The Void Ensemble",
  "Null & Void",
  "Random Walk Orchestra",
  "Static Ghosts",
  "Unnamed Collective",
  "Perpetual Uncertainty",
  "The Stochastic Choir",
  "Concrete Pastoral",
  "Interference Pattern",
  "White Noise Romantics",
  "Fractal Folk Band",
  "Error State Ensemble",
  "The Undefined",
  "Signal / Noise",
];

const TITLES = [
  "Glitch at 3AM",
  "Song for No One",
  "Feedback Loop #7",
  "Untitled (Take 23)",
  "The Algorithm Cannot Hear This",
  "Entropy in D Minor",
  "Unnamed Feeling",
  "Spontaneous Combustion Ballad",
  "Track 01 (Unlabelled)",
  "Noise as Comfort",
  "Do Not Recommend",
  "Frequency of Chance",
  "Accidental Harmony",
];

const DURATIONS = [
  "2:17",
  "4:03",
  "1:55",
  "6:28",
  "3:41",
  "5:12",
  "2:59",
  "7:44",
  "3:03",
];
const NOTES = ["C", "D", "E", "F", "G", "A", "B"];
const NOTE_MODIFIERS = ["", "m", "#"];

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomTrack() {
  return {
    genre: randomPick(GENRES),
    artist: randomPick(ARTISTS),
    title: randomPick(TITLES),
    duration: randomPick(DURATIONS),
    bpm: Math.floor(Math.random() * 100) + 60,
    key: randomPick(NOTES) + randomPick(NOTE_MODIFIERS),
    year: Math.floor(Math.random() * 30) + 1993,
  };
}

const BAR_HEIGHTS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  height: Math.random() * 0.7 + 0.2,
}));

type Track = ReturnType<typeof randomTrack>;

function VisualizerBars({
  playing,
  animKey,
}: { playing: boolean; animKey: number }) {
  return (
    <div className="relative h-24 bg-gradient-to-b from-muted/30 to-card flex items-end px-4 pb-3 gap-px overflow-hidden scanline">
      {BAR_HEIGHTS.map((bar) => (
        <motion.div
          key={`${animKey}-bar-${bar.id}`}
          className="flex-1 rounded-t-sm"
          style={{
            height: "100%",
            transformOrigin: "bottom",
            background: playing
              ? `oklch(${0.65 + (bar.id % 5) * 0.02} 0.18 ${190 + bar.id * 3})`
              : "oklch(0.30 0.02 280)",
          }}
          animate={
            playing
              ? {
                  scaleY: [
                    bar.height,
                    Math.max(0.05, bar.height - 0.4),
                    Math.min(1, bar.height + 0.3),
                    bar.height,
                  ],
                }
              : { scaleY: bar.height * 0.3 }
          }
          transition={{
            duration: 0.5 + (bar.id % 4) * 0.15,
            repeat: playing ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
            delay: bar.id * 0.01,
          }}
        />
      ))}
    </div>
  );
}

function TrackInfo({ track }: { track: Track }) {
  const tags = [
    track.genre,
    `${track.bpm} BPM`,
    `Key: ${track.key}`,
    String(track.year),
    track.duration,
  ];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${track.title}-${track.artist}`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="min-w-0">
            <h3 className="font-display font-bold text-xl text-foreground truncate">
              {track.title}
            </h3>
            <p className="font-body text-muted-foreground text-sm mt-0.5 truncate">
              {track.artist}
            </p>
          </div>
          <Volume2
            size={16}
            className="text-muted-foreground flex-shrink-0 mt-1"
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-muted/40 border border-border rounded text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function MusicSection() {
  const [track, setTrack] = useState<Track>(randomTrack);
  const [playing, setPlaying] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const playRandom = useCallback(() => {
    setTrack(randomTrack());
    setPlaying(true);
    setAnimKey((k) => k + 1);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }, 8000);
  }, []);

  const skip = useCallback(() => {
    setTrack(randomTrack());
    setAnimKey((k) => k + 1);
    if (playing) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }, 8000);
    }
  }, [playing]);

  return (
    <section id="music" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <p className="font-mono text-xs neon-text-magenta uppercase tracking-widest mb-2">
            {"// section_03"}
          </p>
          <h2
            className="font-display font-bold text-3xl md:text-4xl uppercase glitch-hover"
            data-glitch="Random Music"
          >
            Random Music Generator
          </h2>
          <p className="text-muted-foreground font-body mt-2 text-sm max-w-md">
            No playlist built from your history. No "Based on your listening."
            Just sound, completely unknown to you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="card-dark rounded-xl overflow-hidden border">
            <VisualizerBars playing={playing} animKey={animKey} />
            <div className="p-6">
              <TrackInfo track={track} />
              <div className="h-1 bg-muted rounded-full mb-6 overflow-hidden">
                {playing && (
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "oklch(var(--chart-1))" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 8, ease: "linear" }}
                  />
                )}
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={playRandom}
                  className="inline-flex items-center gap-2.5 px-8 py-3 font-mono text-sm uppercase tracking-widest border neon-border-magenta neon-text-magenta transition-smooth hover:bg-chart-2/10 hover:animate-glitch"
                  data-ocid="music-play-btn"
                >
                  <Play size={14} fill="currentColor" />
                  {playing ? "Now Playing..." : "Play Something Random"}
                </button>
                <button
                  type="button"
                  onClick={skip}
                  className="p-3 border border-border text-muted-foreground hover:neon-text transition-smooth rounded"
                  aria-label="Skip to next random track"
                  data-ocid="music-skip-btn"
                >
                  <SkipForward size={16} />
                </button>
              </div>
            </div>
          </div>
          <p className="text-center font-mono text-[10px] text-muted-foreground/40 mt-4 uppercase tracking-wider">
            Purely fictional tracks · No Spotify algorithm · No "Discover
            Weekly"
          </p>
        </div>
      </div>
    </section>
  );
}
