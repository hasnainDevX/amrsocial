import { useEffect, useRef } from "react";

const SEGMENTS = [
  {
    t: "I'm Shiza, and Amr.socials is where I help brands and creators grow online without giving up what they believe in. ",
  },
  {
    t: "I don't start with a competitor spreadsheet or an account audit. I start with you: ",
  },
  { t: "your brand, your story, your audience", em: true },
  { t: ", then what they love and what they scroll past right now. " },
  {
    t: "Growth shouldn't cost you your values. No music, no revealing models, no trends that don't sit right. ",
  },
  { t: "Just honest, well-made content that people trust.", em: true },
];

const WORDS = SEGMENTS.flatMap((seg) =>
  seg.t
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => ({ w, em: !!seg.em })),
);

export default function About() {
  const textRef = useRef(null);
  const wordRefs = useRef([]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const n = WORDS.length;
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = textRef.current;
      if (!el) return;

      let p = 1;
      if (!reduce) {
        const vh = window.innerHeight;
        const r = el.getBoundingClientRect();
        // 0 when the text enters at 85% of the screen, 1 when its bottom hits 50%
        p = Math.min(
          1,
          Math.max(0, (vh * 0.85 - r.top) / (vh * 0.35 + r.height)),
        );
      }

      wordRefs.current.forEach((span, i) => {
        if (!span) return;
        const local = Math.min(1, Math.max(0, p * n - i));
        span.style.opacity = String(0.28 + local * 0.72);
      });
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
      id="about"
      className="px-6 py-20 text-espresso selection:bg-ivory-deep md:px-12 md:py-28"
    >
      <p className="mb-8 text-sm font-medium uppercase tracking-[0.2em] text-espresso text-center">
        About Amr.socials
      </p>

      <p
        ref={textRef}
        className="max-w-5xl font-serif text-4xl leading-[1.15] md:text-6xl lg:text-7xl mx-auto text-center"
      >
        {WORDS.map((item, i) => (
          <span
            key={i}
            ref={(el) => (wordRefs.current[i] = el)}
            style={{ opacity: 0.28 }}
            className={`inline-block transition-opacity duration-150 ease-out motion-reduce:transition-none ${
              item.em ? "italic" : ""
            }`}
          >
            {item.w}&nbsp;
          </span>
        ))}
      </p>

      <div className="mt-10 text-center">
        <a
          href="#process"
          className="inline-block rounded-full bg-none px-10 py-3 font-serif text-xl text-espresso no-underline transition-colors duration-200 bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9c6468] border"
        >
          See My Process
        </a>
      </div>
    </section>
  );
}
