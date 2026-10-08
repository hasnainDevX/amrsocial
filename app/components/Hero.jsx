"use client";

import { useEffect, useRef } from "react";
import useReveal from "../hooks/usereveal";

export default function Hero() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);

  useReveal(rootRef);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative grid min-h-[calc(100svh-4.5rem)] place-items-center overflow-hidden bg-[#2c2a29] text-center text-white"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        aria-hidden="true"
      >
        {/* the video lives in /public, so the path starts with a slash */}
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative max-w-[52rem] px-[clamp(1.25rem,5vw,4rem)] py-16">
        <h1
          data-reveal="left"
          className="text-balance text-[clamp(2.4rem,6vw,4.6rem)] font-normal italic leading-[1.08]"
        >
          Content with creativity.{" "}
          <span className="box-decoration-clone rounded-sm bg-ivory px-2 text-espresso">
            Social
          </span>{" "}
          with strategy.
        </h1>

        <p
          data-reveal="right"
          className="mx-auto mt-6 max-w-[34rem] text-sm md:text-base leading-[1.4] text-white/[0.92]"
        >
          Your brand deserves to be seen. Strategic social media for brands and
          creators, built around your values and your audience.
        </p>

        <a
          data-reveal="scale"
          href="#inquire"
          className="mt-8 inline-block rounded-full hover:bg-ivory px-10 py-3 text-xl text-white hover:text-espresso no-underline transition-colors duration-200 border focus-visible:outline-white focus-visible:outline-offset-3 font-serif"
        >
          Start an Inquiry
        </a>
      </div>
    </section>
  );
}