import { useEffect, useRef, useState } from "react";
import useReveal from "../hooks/usereveal";

const SERVICES = [
  {
    title: "Brand & Content Strategy",
    desc: "I get to know your brand, your founder and your audience, then look at what your market is loving and leaving right now. Your strategy is built from that, not from a template.",
    tags: "Brand & founder discovery · Audience research · Market insight · Content direction",
  },
  {
    title: "Social Media Management",
    desc: "Your content planned, written and published for you, with the consistency a growing page needs and the care your community deserves.",
    tags: "Content planning · Captions & copy · Scheduling · Community replies",
  },
  {
    title: "Growth Without Compromise",
    desc: "Reach that fits your values. No music, no revealing models, no trends that don't sit right. Just content your audience trusts and keeps coming back to.",
    tags: "Values-led content · Halal-friendly formats · Trend filtering · Steady growth",
  },
];

export default function WhatWeDo() {
  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState(0);

  useReveal(rootRef, { minWidth: 768 });

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="what-i-do"
      className="bg-espresso px-6 py-24 text-soft-grey selection:bg-soft-grey selection:text-espresso md:px-12 md:py-32"
    >
      {/* Heading (scrolls away normally) */}
      <p
        data-reveal="left"
        className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-ivory"
      >
        What I do
      </p>
      <h2
        data-reveal="left"
        className="mb-20 max-w-4xl font-serif text-5xl leading-[1.05] md:mb-28 md:text-7xl uppercase"
      >
        Here's how that shows up, <em className="">week to week.</em>
      </h2>

      <div className="grid md:grid-cols-2">
        {/* LEFT: pinned, swaps content (desktop only). Slides in from the left. */}
        <div data-reveal="left" className="hidden md:block">
          <div className="sticky top-[calc(50vh-150px)] h-[300px]">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                aria-hidden={i !== active}
                className={`absolute inset-0 pr-16 transition-all duration-500 ease-out motion-reduce:transition-none ${
                  i === active
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
                }`}
              >
                <div className="mb-5 font-serif text-6xl leading-none text-soft-grey/40">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="max-w-lg text-lg leading-relaxed text-soft-grey/90 md:text-xl">
                  {s.desc}
                </p>
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-white md:text-base">
                  {s.tags}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: normal scrolling list. Each row slides in from the right. */}
        <ul className="border-soft-grey/20 pb-[5vh] md:pb-[10vh] md:border-l">
          {SERVICES.map((s, i) => (
            <li
              key={s.title}
              ref={(el) => (itemRefs.current[i] = el)}
              data-reveal="right"
              className="border-b border-soft-grey/20 py-10 first:pt-0 md:flex md:h-40 md:items-center md:py-0 md:first:pt-0"
            >
              <div className="md:px-12">
                <h3
                  className={`font-serif text-4xl leading-none transition-colors duration-500 motion-reduce:transition-none md:text-6xl ${
                    i === active ? "text-soft-grey" : "text-soft-grey/35"
                  }`}
                >
                  {s.title}
                </h3>

                {/* mobile: description under each title */}
                <p className="mt-4 text-lg leading-relaxed text-soft-grey/90 md:hidden">
                  {s.desc}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-soft-grey/60 md:hidden">
                  {s.tags}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
        <a
          href="#testimonials"
          className="inline-block rounded-full bg-none px-10 py-3 font-serif text-xl text-espresso no-underline transition-colors duration-200 bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9c6468] border"
        >
          See What My Clients Say
        </a>
      </div>
      </div>
    </section>
  );
}