import { useRef } from "react";
import useReveal from "../hooks/usereveal";

const TESTIMONIALS = [
  {
    quote:
      "It was truly an exceptional experience working with you. Your working style was really comfortable for me, and your hard work is visible in the account. I liked your consistency and seriousness, and the way you owned your work.",
    name: "Aatika Asad",
    role: "Fashion Designer",
  },
];

const bite = (at) => `radial-gradient(circle at ${at}, transparent var(--r), black calc(var(--r) + 1px))`;
const SCALLOP = [
  "linear-gradient(black 0 0) center / calc(100% - var(--r) * 2) calc(100% - var(--r) * 2) no-repeat",
  `${bite("50% 0")} top / var(--p) var(--r) repeat-x`,
  `${bite("50% 100%")} bottom / var(--p) var(--r) repeat-x`,
  `${bite("0 50%")} left / var(--r) var(--p) repeat-y`,
  `${bite("100% 50%")} right / var(--r) var(--p) repeat-y`,
].join(", ");
const scallopStyle = { "--r": "12px", "--p": "28px", WebkitMask: SCALLOP, mask: SCALLOP };

export default function Testimonials() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <section ref={rootRef} id="testimonials" className="bg-white px-6 py-24 text-espresso md:py-32">
      <h2
        data-reveal="left"
        className="mx-auto max-w-3xl text-center font-serif text-5xl leading-[1.05] md:text-7xl"
      >
        Kind <em className="italic">words</em>
      </h2>

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:mt-20 md:gap-10 md:pb-8 text-white">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={i}
            data-reveal="wipe"
            style={scallopStyle}
            className={`flex flex-col bg-espresso p-12 md:p-16 ${
              i % 2 ? "md:translate-y-8" : ""
            }`}
          >
            <span aria-hidden="true" className="font-serif text-8xl italic leading-[0.6] text-white/30">
              “
            </span>
            <blockquote className="mt-6 font-serif text-2xl leading-snug md:text-3xl">{t.quote}</blockquote>
            <figcaption className="mt-8 font-serif text-xl">
              <span className="italic">{t.name}</span>
              <span className="block text-lg text-white/70">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}