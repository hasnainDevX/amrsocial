"use client";

import { useRef } from "react";
import useReveal from "../hooks/usereveal";
import image from "../assets/packagesbg.png";

const TESTIMONIALS = [
  {
    quote:
      "It was truly an exceptional experience working with you. Your working style was really comfortable for me, and your hard work is visible in the account. I liked your consistency and seriousness, and the way you owned your work.",
    name: "Aatika Asad",
    role: "Fashion Designer",
    image: image,
    position: "35% center",
  },
  {
    quote:
      "I implemented the content direction, reel ideas, carousels, and everything you gave me, and I started getting inbound leads that eventually led to two offers I closed. … I already knew you were good at what you do, but seeing the actual results made me appreciate your expertise even more.",
    name: "Client",
    role: "Content Strategy Client",
    image: image,
    position: "75% center",
  },
];

const bite = (at) =>
  `radial-gradient(circle at ${at}, transparent var(--r), black calc(var(--r) + 1px))`;

const SCALLOP = [
  "linear-gradient(black 0 0) center / calc(100% - var(--r) * 2) calc(100% - var(--r) * 2) no-repeat",
  `${bite("50% 0")} top / var(--p) var(--r) repeat-x`,
  `${bite("50% 100%")} bottom / var(--p) var(--r) repeat-x`,
  `${bite("0 50%")} left / var(--r) var(--p) repeat-y`,
  `${bite("100% 50%")} right / var(--r) var(--p) repeat-y`,
].join(", ");

const scallopStyle = {
  "--r": "12px",
  "--p": "28px",
  WebkitMask: SCALLOP,
  mask: SCALLOP,
};

export default function Testimonials() {
  const rootRef = useRef(null);

  useReveal(rootRef, { minWidth: 768 });

  return (
    <section
      ref={rootRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-white px-6 py-24 text-espresso md:py-32"
    >
      <h2
        id="testimonials-heading"
        data-reveal="left"
        className="mx-auto max-w-3xl text-center font-serif text-5xl leading-[1.05] md:text-7xl"
      >
        Kind <em className="italic">words</em>
      </h2>

      <div className="mx-auto mt-16 grid max-w-6xl auto-rows-fr items-stretch gap-8 md:mt-20 md:grid-cols-2 md:gap-10">
        {TESTIMONIALS.map((testimonial) => (
          <div key={testimonial.name} className="flex min-w-0">
            <figure
              data-reveal="wipe"
              style={scallopStyle}
              className="relative isolate m-0 flex h-full w-full flex-col overflow-hidden bg-espresso px-8 py-12 text-ivory md:p-10 lg:p-12"
            >
              {/* Background image clipped to the scalloped card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url("${
                    typeof testimonial.image === "string"
                      ? testimonial.image
                      : testimonial.image.src
                  }")`,
                  backgroundPosition: testimonial.position,
                }}
              />

              {/* Espresso overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-espresso/90"
              />

              <span
                aria-hidden="true"
                className="font-serif text-8xl italic leading-[0.6] text-ivory/40"
              >
                “
              </span>

              <blockquote className="mt-6 font-serif text-2xl leading-snug lg:text-3xl">
                {testimonial.quote}
              </blockquote>

              <figcaption className="mt-auto pt-8 font-serif text-xl">
                <span className="italic">{testimonial.name}</span>
                <span className="mt-1 block text-lg text-ivory/75">
                  {testimonial.role}
                </span>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}
