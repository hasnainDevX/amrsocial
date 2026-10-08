"use client"
import { useRef, useState } from "react";
import useReveal from "../hooks/usereveal";

// Placeholder process copy. Swap in Shiza's own wording.
const STEPS = [
  {
    title: "We start with a conversation",
    text: "You tell me about your brand, your story and who you want to reach. I listen first, so the plan sounds like you.",
    tilt: "md:-rotate-3 md:translate-y-8",
  },
  {
    title: "I shape your direction",
    text: "I look at what your audience loves right now and build a content plan around it, true to your values.",
    tilt: "md:rotate-0",
  },
  {
    title: "I show up for you",
    text: "Your content goes out steadily and beautifully, with regular check-ins so you always know what is happening.",
    tilt: "md:rotate-3 md:translate-y-8",
  },
];

// Vertical stripes: 28px bands with 28px gaps. Change both numbers to resize them.
const STRIPE = "repeating-linear-gradient(90deg, black 0 28px, transparent 28px 56px)";
const stripes = { WebkitMask: STRIPE, mask: STRIPE };

// One side of the card. The back is identical to the front (same colours, same content).
function Face({ n, title, text, back }) {
  return (
    <div
      aria-hidden={back || undefined}
      className={`absolute inset-0 isolate flex flex-col overflow-hidden rounded-[1.75rem] border border-espresso p-8 [-webkit-backface-visibility:hidden] [backface-visibility:hidden] md:p-10 ${
        back ? "bg-ivory text-espresso [transform:rotateY(180deg)]" : "bg-ivory text-espresso"
      }`}
    >
      <span
        aria-hidden="true"
        style={stripes}
        className="pointer-events-none absolute inset-0 -z-10 bg-espresso/[0.06]"
      />
      <span className="font-serif text-7xl italic leading-none md:text-8xl">{n}</span>
      {back ? (
        <div className="mt-auto pt-10 font-serif text-3xl italic leading-tight md:text-4xl">{title}</div>
      ) : (
        <h3 className="mt-auto pt-10 font-serif text-3xl italic leading-tight md:text-4xl">{title}</h3>
      )}
      <p className="mt-3 font-serif text-xl leading-snug">{text}</p>
    </div>
  );
}

function FlipCard({ n, title, text, tilt, reveal }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <li
      data-reveal={reveal}
      // mouse: flips while hovering. Touch and pen: tap to flip, tap again to flip back.
      onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
      onPointerUp={(e) => e.pointerType !== "mouse" && setFlipped((f) => !f)}
      className={`relative aspect-[4/5] cursor-pointer [perspective:1200px] md:aspect-[3/4] ${tilt}`}
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] motion-reduce:transition-none ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <Face n={n} title={title} text={text} />
        <Face n={n} title={title} text={text} back />
      </div>
    </li>
  );
}

export default function Process() {
  const rootRef = useRef(null);
  // appearing animations only from 768px up (Tailwind md); the flip works on every screen size
  useReveal(rootRef, { minWidth: 768 });

  return (
    <section ref={rootRef} id="process" className="bg-white px-6 py-24 text-espresso md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 data-reveal="left" className="font-serif text-5xl leading-[1.05] md:text-7xl">
          How we'll work <em className="italic">together</em>
        </h2>
      </div>

      <ol className="mx-auto mt-16 grid max-w-6xl list-none gap-8 p-0 md:mt-20 md:grid-cols-3 md:gap-10 md:pb-8">
        {STEPS.map((s, i) => (
          <FlipCard
            key={s.title}
            n={i + 1}
            title={s.title}
            text={s.text}
            tilt={s.tilt}
            // tilted cards uncover left to right; the straight middle card rises from below
            reveal={i === 1 ? "up" : "wipe"}
          />
        ))}
      </ol>

      <div className="mt-10 text-center md:mt-16">
        <a
          data-reveal="scale"
          href="#inquire"
          className="inline-block rounded-full border border-espresso bg-white px-10 py-3 font-serif text-xl text-espresso no-underline transition-colors duration-200 hover:bg-espresso hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso"
        >
          I'm ready to Book!
        </a>
      </div>
    </section>
  );
}