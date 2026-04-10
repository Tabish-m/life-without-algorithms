import type { ReactNode } from "react";

const NAV_LINKS = [
  { label: "Random Feed", href: "#random-feed" },
  { label: "Shopping", href: "#shopping" },
  { label: "Music", href: "#music" },
  { label: "Decision", href: "#decision" },
  { label: "Insight", href: "#insight" },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#hero"
            className="font-display font-bold text-lg tracking-widest uppercase neon-text-magenta glitch-hover"
            data-glitch="Life Without Algorithms"
            data-ocid="nav-logo"
          >
            Life Without Algorithms
          </a>

          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:neon-text transition-smooth"
                data-ocid={`nav-link-${link.href.replace("#", "")}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Open navigation"
            onClick={() => {
              const el = document.getElementById("mobile-nav");
              el?.classList.toggle("hidden");
            }}
            data-ocid="nav-mobile-toggle"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <rect y="3" width="20" height="2" rx="1" />
              <rect y="9" width="20" height="2" rx="1" />
              <rect y="15" width="20" height="2" rx="1" />
            </svg>
          </button>
        </div>

        <div
          id="mobile-nav"
          className="hidden md:hidden border-t border-border bg-card px-6 py-4"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:neon-text transition-smooth"
              onClick={() =>
                document.getElementById("mobile-nav")?.classList.add("hidden")
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1">
            Escape the Echo Chamber
          </p>
          <p className="font-mono text-xs text-muted-foreground/60">
            {`© ${new Date().getFullYear()}. Built with love using `}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-text hover:underline transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
