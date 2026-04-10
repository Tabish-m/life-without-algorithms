import { RefreshCw, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Mechanical Puzzle Box",
    price: "€34.00",
    category: "Curiosities",
    emoji: "🧩",
    desc: "Twenty-three steps to open. No instructions included.",
  },
  {
    id: 2,
    name: "Blank Canvas Journal",
    price: "€12.50",
    category: "Stationery",
    emoji: "📓",
    desc: "No lines, no prompts. Just you and the void.",
  },
  {
    id: 3,
    name: "Vintage Film Roll (36 exp)",
    price: "€18.00",
    category: "Photography",
    emoji: "🎞️",
    desc: "ISO 400. Whatever you shoot, you shoot once.",
  },
  {
    id: 4,
    name: "Handmade Ceramic Mug",
    price: "€27.00",
    category: "Homeware",
    emoji: "☕",
    desc: "No two are alike. Yours is whatever ships.",
  },
  {
    id: 5,
    name: "Driftwood Desk Sculpture",
    price: "€55.00",
    category: "Art Objects",
    emoji: "🌿",
    desc: "Salvaged from an unnamed beach. Unknown origin.",
  },
  {
    id: 6,
    name: "Expired Map Collection",
    price: "€9.00",
    category: "Maps",
    emoji: "🗺️",
    desc: "Borders that no longer exist. Roads renamed.",
  },
  {
    id: 7,
    name: "Crystal Radio Kit",
    price: "€42.00",
    category: "Electronics",
    emoji: "📻",
    desc: "Receive AM signals with no power source. Pure physics.",
  },
  {
    id: 8,
    name: "Leather-bound Field Notes",
    price: "€22.00",
    category: "Stationery",
    emoji: "📋",
    desc: "Aged leather, blank pages, no cloud sync.",
  },
  {
    id: 9,
    name: "Mystery Seed Packet",
    price: "€5.00",
    category: "Garden",
    emoji: "🌱",
    desc: "Plant it. Wait. Discover what grows in three months.",
  },
  {
    id: 10,
    name: "Mechanical Pocket Watch",
    price: "€89.00",
    category: "Timepieces",
    emoji: "⌚",
    desc: "Wound by hand. Keeps imperfect time.",
  },
  {
    id: 11,
    name: "Handbound Sketchbook",
    price: "€31.00",
    category: "Art",
    emoji: "✏️",
    desc: "120 gsm cold press. Sixty unruled pages.",
  },
  {
    id: 12,
    name: "Wildflower Honey Jar",
    price: "€14.00",
    category: "Food",
    emoji: "🍯",
    desc: "Single origin. Season and flavour vary each batch.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function ProductCard({
  product,
  index,
}: { product: (typeof ALL_PRODUCTS)[0]; index: number }) {
  const [added, setAdded] = useState(false);
  const borderClass =
    index % 2 === 0 ? "neon-border-cyan" : "neon-border-magenta";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="card-dark rounded-lg p-5 border transition-smooth hover:bg-muted/20 group"
      data-ocid={`product-card-${product.id}`}
    >
      <div className="text-4xl mb-4" role="presentation">
        {product.emoji}
      </div>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-display font-semibold text-foreground text-sm leading-snug group-hover:neon-text-lime transition-smooth">
          {product.name}
        </h3>
        <span className="font-mono text-xs neon-text-lime font-bold flex-shrink-0">
          {product.price}
        </span>
      </div>
      <p className="font-body text-xs text-muted-foreground mb-4 leading-relaxed">
        {product.desc}
      </p>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-wider">
          {product.category}
        </span>
        <button
          type="button"
          onClick={() => {
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
          }}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest border transition-smooth ${
            added
              ? "neon-border-lime neon-text-lime bg-chart-3/10"
              : `${borderClass} neon-text hover:bg-accent/10`
          }`}
          data-ocid={`product-add-${product.id}`}
          aria-label={added ? "Added to cart" : `Add ${product.name} to cart`}
        >
          <ShoppingBag size={10} />
          {added ? "Added!" : "Take It"}
        </button>
      </div>
    </motion.div>
  );
}

export default function ShoppingSection() {
  const [products, setProducts] = useState(() =>
    shuffle(ALL_PRODUCTS).slice(0, 4),
  );
  const [key, setKey] = useState(0);

  const randomize = useCallback(() => {
    setProducts(shuffle(ALL_PRODUCTS).slice(0, 4));
    setKey((k) => k + 1);
  }, []);

  return (
    <section id="shopping" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div>
            <p className="font-mono text-xs neon-text-lime uppercase tracking-widest mb-2">
              {"// section_02"}
            </p>
            <h2
              className="font-display font-bold text-3xl md:text-4xl uppercase glitch-hover"
              data-glitch="Random Shopping"
            >
              Random Shopping
            </h2>
            <p className="text-muted-foreground font-body mt-2 text-sm max-w-md">
              No recommendations. No "Customers also bought." No dopamine loop.
              Just objects that exist.
            </p>
          </div>
          <button
            type="button"
            onClick={randomize}
            className="inline-flex items-center gap-2 px-6 py-2.5 font-mono text-xs uppercase tracking-widest border neon-border-lime neon-text-lime transition-smooth hover:bg-chart-3/10 flex-shrink-0"
            data-ocid="shop-randomize-btn"
          >
            <RefreshCw size={14} />
            Show Something Else
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="text-center font-mono text-[11px] text-muted-foreground/40 mt-8 uppercase tracking-wider">
          Zero personalisation · Zero tracking · Zero recommendations
        </p>
      </div>
    </section>
  );
}
