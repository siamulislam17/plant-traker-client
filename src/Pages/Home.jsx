import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { FaLeaf, FaCloud, FaHeart, FaWater } from "react-icons/fa";
import AuthContext from "../Authentication With FireBase/AuthContext";

// Local images
import plantImg1 from "../assets/linh-le-Ebwp2-6BG8E-unsplash.jpg";
import plantImg2 from "../assets/mockup-graphics-_mUVHhvBYZ0-unsplash.jpg";
import plantImg3 from "../assets/toa-heftiba-W1yjvf5idqA-unsplash.jpg";

// helper
const cx = (...c) => c.filter(Boolean).join(" ");

const slides = [
  {
    img: plantImg1,
    title: "Brighten Your Space",
    desc: "Indoor plants beautify rooms, purify air, and quietly lift your mood.",
  },
  {
    img: plantImg2,
    title: "Know Your Varieties",
    desc: "From hardy succulents to lush ferns—pick plants that match your lifestyle.",
  },
  {
    img: plantImg3,
    title: "Care That Clicks",
    desc: "Simple routines for watering, light, and soil keep leaves perky and proud.",
  },
];

// safe inline fallback image
const fallbackImg =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>
      <rect width='100%' height='100%' fill='#e5e7eb'/>
      <text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle' fill='#9ca3af' font-size='20'>No Image</text>
    </svg>`
  );

/* ----------------------------- Carousel Hook ----------------------------- */
/** A tiny, dependency-free carousel with:
 * - auto-rotate (pauses on hover or tab switch)
 * - fade transitions
 * - keyboard arrows + swipe
 * - reduced-motion aware
 */
function useCarousel({ length, delay = 4000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef(null);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  // auto-advance
  useEffect(() => {
    if (reducedMotion || paused || length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), delay);
    return () => clearInterval(id);
  }, [length, delay, paused, reducedMotion]);

  // pause on hover/focus
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const enter = () => setPaused(true);
    const leave = () => setPaused(false);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("focusin", enter);
    el.addEventListener("focusout", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("focusin", enter);
      el.removeEventListener("focusout", leave);
    };
  }, []);

  // pause when tab hidden
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + length) % length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [length]);

  // swipe
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    let deltaX = 0;

    const onStart = (e) => {
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      deltaX = 0;
    };
    const onMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      deltaX = x - startX;
    };
    const onEnd = () => {
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) setIndex((i) => (i + 1) % length);
        else setIndex((i) => (i - 1 + length) % length);
      }
      startX = 0;
      deltaX = 0;
    };

    el.addEventListener("touchstart", onStart);
    el.addEventListener("touchmove", onMove);
    el.addEventListener("touchend", onEnd);
    el.addEventListener("mousedown", onStart);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseup", onEnd);
    el.addEventListener("mouseleave", onEnd);

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("mousedown", onStart);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseup", onEnd);
      el.removeEventListener("mouseleave", onEnd);
    };
  }, [length]);

  return { index, setIndex, containerRef };
}

/* --------------------------------- Page --------------------------------- */

const Home = () => {
  const { darkMode } = useContext(AuthContext) || { darkMode: false };
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const { index, setIndex, containerRef } = useCarousel({
    length: slides.length,
    delay: 4000,
  });

  const bgPage = darkMode ? "bg-slate-900" : "bg-green-50";
  const cardBg = darkMode ? "bg-slate-800" : "bg-white";
  const bandBg = darkMode ? "bg-slate-800" : "bg-green-100";
  const textMuted = darkMode ? "text-gray-300" : "text-gray-600";
  const heading = darkMode ? "text-green-300" : "text-green-700";

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("https://plant-traker-server.vercel.app/plants");
        const data = await res.json();
        if (!alive) return;
        const latest = Array.isArray(data) ? data.slice(-6).reverse() : [];
        setPlants(latest);
      } catch (err) {
        console.error("Error fetching plants:", err);
        setPlants([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const benefits = useMemo(
    () => [
      [<FaLeaf className="text-green-400 text-4xl" />, "Improves Air Quality", "Plants absorb pollutants and release clean oxygen."],
      [<FaWater className="text-blue-400 text-4xl" />, "Prevents Soil Erosion", "Roots bind the soil and reduce erosion."],
      [<FaCloud className="text-gray-400 text-4xl" />, "Fights Climate Change", "Plants absorb CO₂ and help balance climate."],
      [<FaHeart className="text-rose-400 text-4xl" />, "Mental Health", "Greenery reduces stress and supports well-being."],
    ],
    []
  );

  return (
    <div className={cx(bgPage, "min-h-screen")}>
      {/* HERO with custom carousel */}
      <section className={cx("w-full px-4 md:px-6", bandBg, "pt-20 md:pt-24 pb-10 md:pb-16")}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Carousel */}
          <div className="order-2 md:order-1">
            <div
              ref={containerRef}
              className="relative h-[260px] sm:h-[320px] md:h-[420px] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10"
              aria-roledescription="carousel"
              aria-label="Featured plant highlights"
            >
              {slides.map((s, i) => (
                <figure
                  key={i}
                  aria-hidden={index !== i}
                  className={cx(
                    "absolute inset-0 transition-opacity duration-700 ease-out",
                    index === i ? "opacity-100" : "opacity-0"
                  )}
                >
                  <img src={s.img} alt={s.title} className="h-full w-full object-cover" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white drop-shadow">{s.title}</h3>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white/90 drop-shadow">{s.desc}</p>
                  </figcaption>
                </figure>
              ))}

              {/* Controls */}
              <button
                onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
                aria-label="Previous slide"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur hover:bg-black/40"
              >
                ‹
              </button>
              <button
                onClick={() => setIndex((i) => (i + 1) % slides.length)}
                aria-label="Next slide"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur hover:bg-black/40"
              >
                ›
              </button>

              {/* Dots */}
              <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={cx(
                      "pointer-events-auto h-2.5 w-2.5 rounded-full transition",
                      index === i ? "bg-white scale-110" : "bg-white/60 hover:bg-white/80"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 md:order-2 text-center md:text-left">
            <h1 className={cx("text-4xl md:text-5xl font-extrabold", heading)}>Grow. Track. Thrive.</h1>
            <p className={cx("mt-3 text-base md:text-lg", darkMode ? "text-gray-200" : "text-gray-700")}>
              Keep your leafy friends happy with schedules, notes, and reminders tailored to each plant.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3 md:justify-start">
              <Link
                to="/add-plant"
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Add Your First Plant
              </Link>
              <Link
                to="/plants"
                className={cx(
                  "rounded-xl px-4 py-2.5 text-sm font-semibold ring-1 transition-colors",
                  darkMode ? "text-gray-100 ring-gray-600 hover:bg-slate-700" : "text-emerald-700 ring-emerald-300 hover:bg-emerald-50"
                )}
              >
                Browse Plants
              </Link>
            </div>
          </div>
        </div>
      </section>

     {/* New Plants (supercharged) */}
    <section className="px-4 md:px-6 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className={cx("mb-2 text-center text-sm font-semibold uppercase tracking-wider", textMuted)}>
          Freshly added
        </h2>
        <h3 className={cx("text-center text-3xl font-bold mb-8", heading)}>🌿 New Plants</h3>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={cx("rounded-2xl p-4 shadow-lg", cardBg)}>
                <div className="h-40 w-full animate-pulse rounded-xl bg-gray-300/50" />
                <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-gray-300/50" />
                <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-300/40" />
                <div className="mt-1 h-3 w-1/3 animate-pulse rounded bg-gray-300/40" />
                <div className="mt-4 h-9 w-full animate-pulse rounded bg-gray-300/50" />
              </div>
            ))}
          </div>
        ) : plants.length === 0 ? (
          <p className={cx("text-center", textMuted)}>No plants yet. Add your first one!</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {plants.map((plant) => {
              // --- derive watering timing + progress ---
              const lastRaw = plant.lastWatered;
              const nextRaw = plant.nextWatering || plant.nextWateringDate;

              const last = lastRaw ? new Date(lastRaw) : null;
              const next = nextRaw ? new Date(nextRaw) : null;
              const now = new Date();

              const toMid = (d) => (d ? new Date(d.setHours(0, 0, 0, 0)).getTime() : NaN);
              const daysBetween = (a, b) => Math.round((toMid(b) - toMid(a)) / 86400000);

              let daysLeft = null;
              let progressPct = null;

              if (last && !isNaN(last) && next && !isNaN(next) && toMid(next) > toMid(last)) {
                const total = daysBetween(last, next);
                const elapsed = Math.max(0, Math.min(total, daysBetween(last, now)));
                daysLeft = Math.max(0, daysBetween(now, next));
                progressPct = Math.round((elapsed / total) * 100);
              } else if (next && !isNaN(next)) {
                daysLeft = Math.max(0, daysBetween(now, next));
                progressPct = null; // not enough info for progress
              }

              const status =
                daysLeft === null
                  ? { label: "Schedule unknown", cls: "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-zinc-200" }
                  : toMid(next) <= toMid(now)
                  ? { label: "Water today", cls: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300" }
                  : daysLeft <= 2
                  ? { label: `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`, cls: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300" }
                  : { label: `${daysLeft} days left`, cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300" };

              const carePill =
                plant.careLevel?.toLowerCase() === "easy"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                  : plant.careLevel?.toLowerCase() === "moderate"
                  ? "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300"
                  : "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-300";

              return (
                <article key={plant._id} className="group relative">
                  {/* gradient frame */}
                  <div className="rounded-2xl bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-sky-500/30 p-[1px] transition-transform group-hover:-translate-y-0.5">
                    <div
                      className={cx(
                        "relative flex h-full flex-col rounded-2xl p-4 shadow-lg ring-1 transition-shadow group-hover:shadow-2xl",
                        cardBg,
                        darkMode ? "ring-white/10" : "ring-black/5"
                      )}
                    >
                      {/* Top: image + overlay + category + fave */}
                      <div className="relative mb-4">
                        <img
                          src={plant.image || fallbackImg}
                          alt={plant.name}
                          className="h-40 w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                          onError={(e) => (e.currentTarget.src = fallbackImg)}
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        {plant.category && (
                          <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                            {plant.category}
                          </span>
                        )}
                        {/* fave button (stub) */}
                        <button
                          type="button"
                          aria-label="Save to favorites"
                          className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 text-rose-500 shadow hover:bg-white"
                          onClick={(e) => {
                            e.preventDefault();
                            // wire this up to your favorites later
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </button>
                      </div>

                      {/* Middle: title + pills */}
                      <div className="flex-grow">
                        <h4 className={cx("text-lg font-semibold leading-tight", darkMode ? "text-white" : "text-gray-800")}>
                          {plant.name}
                        </h4>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {plant.careLevel && (
                            <span className={cx("rounded-full px-2 py-0.5 text-xs font-medium", carePill)}>
                              {plant.careLevel}
                            </span>
                          )}
                          <span className={cx("rounded-full px-2 py-0.5 text-xs font-medium", status.cls)}>{status.label}</span>
                        </div>

                        {/* Meta rows */}
                        <div className="mt-3 space-y-1">
                          <p className={cx("text-sm", textMuted)}>
                            Watering Frequency:{" "}
                            <span className={darkMode ? "text-zinc-200" : "text-zinc-700"}>{plant.wateringFrequency || "—"}</span>
                          </p>
                          <p className={cx("text-sm", textMuted)}>
                            Next Watering:{" "}
                            <span className={darkMode ? "text-blue-300" : "text-blue-700"}>
                              {nextRaw || "—"}
                            </span>
                          </p>
                        </div>

                        {/* Progress bar (if we have last+next) */}
                        {progressPct !== null && (
                          <div className="mt-3">
                            <div className={cx("mb-1 flex items-center justify-between text-[11px]", textMuted)}>
                              <span>Progress to next watering</span>
                              <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>{progressPct}%</span>
                            </div>
                            <div className={cx("h-2 w-full overflow-hidden rounded-full", darkMode ? "bg-zinc-700" : "bg-zinc-200")}>
                              <div
                                className={cx(
                                  "h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-[width] duration-500"
                                )}
                                style={{ width: `${Math.max(0, Math.min(100, progressPct))}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom: action */}
                      <Link
                        to={`/plants/${plant._id}`}
                        className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>


      {/* Beginner's Guide (enhanced visuals) */}
    <section className={cx("relative overflow-hidden px-4 md:px-6 py-16 md:py-24", bandBg)}>
      {/* decorative glow blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl"></div>

      <div className="mx-auto max-w-6xl relative">
        <div className="text-center">
          <span
            className={cx(
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1",
              darkMode ? "bg-white/5 text-emerald-200 ring-white/10" : "bg-emerald-50 text-emerald-700 ring-emerald-200"
            )}
          >
            🌱 Beginner Friendly
            <span className="inline-block h-1 w-1 rounded-full bg-current"></span>
            5 quick wins
          </span>

          <h3 className={cx("mt-3 text-3xl md:text-4xl font-extrabold", darkMode ? "text-white" : "text-green-700")}>
            Beginner’s Guide to Plant Care
          </h3>
          <p className={cx("mx-auto mt-3 max-w-2xl", textMuted)}>
            New to plant care? Start with these essentials—fast wins that keep leaves happy and roots healthy.
          </p>
        </div>

        {/* tips grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              emoji: "🌿",
              title: "Start with Easy Plants",
              desc: "Choose beginner-friendly champs like snake plants, pothos, or peace lilies.",
              grad: "from-emerald-500 to-teal-500",
            },
            {
              emoji: "💧",
              title: "Don’t Overwater",
              desc: "Let the top 2–3 cm of soil dry before watering. Most plants prefer cycles, not swamps.",
              grad: "from-sky-500 to-cyan-500",
            },
            {
              emoji: "☀️",
              title: "Give Enough Light",
              desc: "Bright, indirect light beats harsh sun. East windows are your ally; sheer curtains help.",
              grad: "from-amber-500 to-orange-500",
            },
            {
              emoji: "🪴",
              title: "Drainage Matters",
              desc: "Use pots with holes and a saucer. Add a chunky mix for airy roots (bark/perlite).",
              grad: "from-lime-500 to-emerald-500",
            },
            {
              emoji: "🗓️",
              title: "Set a Routine",
              desc: "Track watering and feeding. A simple weekly check prevents mystery crispiness.",
              grad: "from-fuchsia-500 to-pink-500",
              wide: true,
            },
          ].map(({ emoji, title, desc, grad, wide }, idx) => (
            <article
              key={idx}
              className={cx(
                "group relative overflow-hidden rounded-2xl p-6 shadow-xl ring-1 transition-all",
                "hover:-translate-y-0.5 hover:shadow-2xl",
                cardBg,
                darkMode ? "ring-white/10" : "ring-black/5",
                wide ? "md:col-span-2" : ""
              )}
            >
              {/* gradient corner ribbon */}
              <div className={cx(
                "absolute -right-10 -top-10 h-32 w-32 rotate-45 bg-gradient-to-br opacity-20 transition-opacity",
                `from-0% ${grad} to-100%`,
                "group-hover:opacity-30"
              )} />

              {/* header row */}
              <div className="flex items-start gap-3">
                <div
                  className={cx(
                    "grid h-10 w-10 place-items-center rounded-xl text-lg font-bold text-white shadow-lg",
                    "bg-gradient-to-br",
                    grad
                  )}
                  aria-hidden="true"
                >
                  {emoji}
                </div>
                <div>
                  <h4 className={cx("text-lg md:text-xl font-semibold tracking-tight", darkMode ? "text-white" : "text-green-700")}>
                    {title}
                  </h4>
                  <p className={cx("mt-1 text-sm leading-relaxed", textMuted)}>{desc}</p>
                </div>
              </div>

              {/* subtle underline accent */}
              <div className={cx(
                "mt-4 h-px w-full bg-gradient-to-r",
                grad,
                "from-20% via-transparent to-transparent opacity-40"
              )} />

              {/* micro-cta */}
              <div className="mt-4">
                
              </div>
            </article>
          ))}
        </div>

        {/* bottom CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/add-plant"
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Add your first plant
          </Link>
          <Link
            to="/plants"
            className={cx(
              "rounded-xl px-4 py-2.5 text-sm font-semibold ring-1 transition-colors",
              darkMode ? "text-gray-100 ring-white/15 hover:bg-white/5" : "text-emerald-700 ring-emerald-300 hover:bg-emerald-50"
            )}
          >
            Browse all plants
          </Link>
        </div>
      </div>
    </section>


     {/* Benefits (gradient, lively) */}
    <section className={cx("relative px-4 md:px-6 py-14 md:py-20 overflow-hidden", bgPage)}>
      {/* soft background glows */}
      <div className="pointer-events-none absolute -top-24 left-0 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-teal-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl text-center">
        <h3 className={cx("text-3xl md:text-4xl font-extrabold mb-3", darkMode ? "text-white" : "text-green-700")}>
          Why Plant Trees?
        </h3>
        <p className={cx("mx-auto mb-10 max-w-2xl", textMuted)}>
          A little green goes a long way—for your air, soil, climate, and mind.
        </p>

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(([icon, title, desc], idx) => (
            <article key={idx} className="group relative">
              {/* gradient frame */}
              <div className="rounded-2xl bg-gradient-to-br from-emerald-500/25 via-teal-500/15 to-sky-500/25 p-[1px] transition-transform duration-200 group-hover:-translate-y-0.5">
                {/* inner card */}
                <div
                  className={cx(
                    "h-full rounded-2xl p-6 shadow-lg ring-1 transition-shadow duration-200 group-hover:shadow-2xl backdrop-blur",
                    cardBg,
                    darkMode ? "ring-white/10" : "ring-black/5"
                  )}
                >
                  {/* icon halo */}
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl text-white ">
                    <div className="scale-[1.05]">{icon}</div>
                  </div>

                  <h4 className={cx("text-xl font-semibold", darkMode ? "text-green-300" : "text-green-700")}>
                    {title}
                  </h4>
                  <p className={cx("mt-2 leading-relaxed", textMuted)}>{desc}</p>

                  {/* underline accent */}
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-emerald-500/50 via-transparent to-transparent" />
                  {/* subtle CTA (optional) */}
                  <div className="mt-4">
                    
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    </div>
  );
};

export default Home;
