import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScrollToTop } from "@/routes/ScrollToTop";
import { ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { useAuth } from "@/providers/AuthProvider";
import { Logo } from "@/components/ui/Logo";
import { SiteFooter } from "./SiteFooter";
import { ScrollRevealController } from "@/components/common/ScrollEnhancements";
import { Preloader } from "./cine/Preloader";

const NAV = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2.5">
      <Logo size="md" />
      <span className="font-display text-xl font-extrabold tracking-[-0.02em] text-[#F3EFE3]">
        Dolancer<span className="text-primary">.</span>
      </span>
    </Link>
  );
}

/**
 * The public shell.
 *
 * A signed-in visitor keeps the marketing site rather than being bounced out of it,
 * because people do come back to re-read the money and verification pages after
 * they have joined. The primary action just changes to point at their dashboard.
 */
export function MarketingLayout() {
  const [open, setOpen] = useState(false);
  const { session } = useAuth();
  const currentOutlet = useOutlet();
  const reduce = useReducedMotion();
  const [spy, setSpy] = useState("01 / Start");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") {
      setSpy(
        pathname.startsWith("/how-it-works")
          ? "How it works"
          : pathname.startsWith("/about")
            ? "About"
            : pathname.startsWith("/contact")
              ? "Contact"
              : pathname.startsWith("/legal")
                ? "Legal"
                : "Dolancer"
      );
      return;
    }
    const pairs: [string, string][] = [
      ["offers", "02 / Formats"],
      ["workflow", "03 / Process"],
      ["safety", "04 / Safety"],
    ];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const found = pairs.find(([id]) => id === entry.target.id);
          setSpy(found ? found[1] : "01 / Start");
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    pairs.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [currentOutlet, pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open ]);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-rail]").forEach((el) => {
      el.scrollLeft = 0;
    });
  }, [currentOutlet]);

  return (
    <div className="fresh-site flex min-h-dvh flex-col bg-canvas relative">
      <Preloader />
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:border-line-card focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-extrabold"
      >
        Skip to content
      </a>

      <header data-site-nav className={cn("sticky top-0", open ? "z-[70]" : "z-30")}>
        <div className="border-b border-white/15 bg-[#0A1912]">
          <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-5 px-4 md:px-8">
            <Wordmark />

            <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Main">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2 text-sm font-bold",
                      isActive ? "bg-[#F3EFE3] text-[#0A1912]" : "text-white/65"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <span aria-live="polite" className="ml-1 hidden font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 xl:inline">
              {spy}
            </span>

            <div className="ml-auto hidden items-center gap-5 md:flex">
              {session ? (
                <Link to="/dashboard" className="inline-flex items-center gap-2 bg-[#F3EFE3] px-4 py-2.5 text-sm font-extrabold text-[#0A1912]">
                  Go to dashboard
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : (
                <>
                  <Link to="/sign-in" className="text-sm font-bold text-white/75">
                    Sign in
                  </Link>
                  <Link to="/sign-up" className="bg-primary px-5 py-2.5 text-sm font-extrabold text-white active:scale-[0.98]">
                    Start earning
                  </Link>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="ml-auto grid h-10 w-10 place-items-center border border-white/25 text-[#F3EFE3] md:hidden"
            >
              <span className="relative block h-3.5 w-4" aria-hidden="true">
                <span className={cn("absolute left-0 h-[2px] w-full bg-current", open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-current", open && "opacity-0")} />
                <span className={cn("absolute left-0 h-[2px] w-full bg-current", open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#0A1912] px-6 pb-8 pt-28 md:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {[
                { to: "#offers", label: "Explore opportunities", n: "01", anchor: true },
                ...NAV.map((item, i) => ({ ...item, n: `0${i + 2}`, anchor: false })),
              ].map((item, i) => (
                <span key={item.to + item.label} className="block overflow-hidden border-b border-white/15">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: "104%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.55, delay: 0.08 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.anchor ? (
                      <a
                        href={item.to}
                        onClick={(e) => {
                          e.preventDefault();
                          setOpen(false);
                          document
                            .getElementById("offers")
                            ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
                        }}
                        className="flex items-baseline gap-4 py-4"
                      >
                        <span className="font-mono text-xs text-[#7FE3A6]">{item.n}</span>
                        <span className="font-display text-4xl font-extrabold tracking-tight text-white">
                          {item.label}
                        </span>
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 py-4"
                      >
                        <span className="font-mono text-xs text-[#7FE3A6]">{item.n}</span>
                        <span className="font-display text-4xl font-extrabold tracking-tight text-white">
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </motion.span>
                </span>
              ))}
            </nav>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-auto flex gap-3"
            >
              <Link to="/sign-in" onClick={() => setOpen(false)} className="flex-1 border border-white/25 px-4 py-3.5 text-center text-sm font-extrabold text-white">
                Sign in
              </Link>
              <Link to="/sign-up" onClick={() => setOpen(false)} className="flex-1 bg-primary px-4 py-3.5 text-center text-sm font-extrabold text-white">
                Start earning
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main id="main" className="fresh-main flex-1">
        {currentOutlet}
      </main>

      <SiteFooter />
      <ScrollRevealController />
    </div>
  );
}
