import { RefreshCw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

const ALL_POSTS = [
  {
    id: 1,
    type: "image",
    title: "Spontaneous Art Crawl",
    body: "Wandered into three galleries I'd never heard of. No map, no plan.",
    tag: "Urban Exploration",
    time: "3 hours ago",
    color: "oklch(0.65 0.22 320)",
  },
  {
    id: 2,
    type: "text",
    title: "Lost in Thought — an Unplanned Journey",
    body: "Took a wrong turn and ended up somewhere extraordinary.",
    tag: "Philosophy",
    time: "1 hour ago",
    color: "oklch(0.70 0.15 200)",
  },
  {
    id: 3,
    type: "video",
    title: "Analogue Sound Experiment",
    body: "An improvised session with instruments I'd never touched before.",
    tag: "Music",
    time: "5 hours ago",
    color: "oklch(0.75 0.18 130)",
  },
  {
    id: 4,
    type: "text",
    title: "The Library at 3AM",
    body: "Borrowed seven books at random. Read the first page of each.",
    tag: "Literature",
    time: "12 minutes ago",
    color: "oklch(0.65 0.12 290)",
  },
  {
    id: 5,
    type: "image",
    title: "Street Food Roulette",
    body: "Ordered whatever the person in front of me ordered. Zero regrets.",
    tag: "Food",
    time: "2 days ago",
    color: "oklch(0.70 0.15 200)",
  },
  {
    id: 6,
    type: "text",
    title: "Rain Walk, No Umbrella",
    body: "Deliberately forgot my umbrella. Saw the city in a completely new way.",
    tag: "Mindfulness",
    time: "Yesterday",
    color: "oklch(0.65 0.22 320)",
  },
  {
    id: 7,
    type: "video",
    title: "Talking to Strangers",
    body: "Asked five people what their happiest memory is. Extraordinary answers.",
    tag: "Human Stories",
    time: "6 hours ago",
    color: "oklch(0.75 0.18 130)",
  },
  {
    id: 8,
    type: "image",
    title: "Found Object Sculpture",
    body: "Assembled whatever I found within 100 metres into something beautiful.",
    tag: "Art",
    time: "Just now",
    color: "oklch(0.65 0.12 290)",
  },
  {
    id: 9,
    type: "text",
    title: "The Obsolete Radio",
    body: "Found a radio at a garage sale. The static between stations is the point.",
    tag: "Technology",
    time: "4 hours ago",
    color: "oklch(0.70 0.15 200)",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function PostCard({
  post,
  index,
}: { post: (typeof ALL_POSTS)[0]; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="card-dark rounded-lg p-5 hover:border-border/60 transition-smooth cursor-default group"
      data-ocid={`feed-post-${post.id}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 animate-pulse"
          style={{ background: post.color, boxShadow: `0 0 6px ${post.color}` }}
          role="presentation"
        />
        <span
          className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border"
          style={{ color: post.color, borderColor: `${post.color}40` }}
        >
          {post.tag}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground ml-auto">
          {post.time}
        </span>
      </div>

      <h3 className="font-display font-semibold text-foreground text-base mb-2 group-hover:neon-text transition-smooth leading-snug">
        {post.title}
      </h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        {post.body}
      </p>

      <div className="mt-4 flex items-center gap-4 text-muted-foreground/50">
        <span className="font-mono text-[10px] uppercase tracking-wider">
          {post.type}
        </span>
        <div className="flex-1 h-px bg-border/40" />
        <span className="font-mono text-[10px]">No recommendations</span>
      </div>
    </motion.article>
  );
}

export default function RandomFeedSection() {
  const [posts, setPosts] = useState(() => shuffle(ALL_POSTS).slice(0, 6));
  const [key, setKey] = useState(0);

  const reshuffle = useCallback(() => {
    setPosts(shuffle(ALL_POSTS).slice(0, 6));
    setKey((k) => k + 1);
  }, []);

  return (
    <section id="random-feed" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div>
            <p className="font-mono text-xs neon-text uppercase tracking-widest mb-2">
              {"// section_01"}
            </p>
            <h2
              className="font-display font-bold text-3xl md:text-4xl uppercase glitch-hover"
              data-glitch="Random Feed"
            >
              Random Feed
            </h2>
            <p className="text-muted-foreground font-body mt-2 text-sm max-w-md">
              No algorithm decides what you see. No likes, no engagement scores,
              no filter bubble. Just chaos.
            </p>
          </div>
          <button
            type="button"
            onClick={reshuffle}
            className="inline-flex items-center gap-2 px-6 py-2.5 font-mono text-xs uppercase tracking-widest border neon-border-cyan neon-text transition-smooth hover:bg-accent/10 flex-shrink-0"
            data-ocid="feed-reshuffle-btn"
          >
            <RefreshCw size={14} />
            Reshuffle
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
