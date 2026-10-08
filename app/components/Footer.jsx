"use client"
import { useState, useEffect } from "react";
import image1 from "../assets/result1.jpeg";
import image2 from "../assets/result2.jpeg";
import image3 from "../assets/result3.jpeg";
import image4 from "../assets/result4.jpeg";

const LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/amr.socials" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61595156090769",
  },
  { label: "Pinterest", href: "https://pin.it/2fln66TIi" },
  { label: "Email", href: "mailto:shizaa.marketing@gmail.com" },
];

// Four arch-shaped frames. The two outer ones sit lower, so the row curves like a gentle skyline.
const ARCHES = [
  { src: image1, offset: "mt-6 md:mt-12" },
  { src: image2, offset: "" },
  { src: image3, offset: "" },
  { src: image4, offset: "mt-6 md:mt-12" },
];

const CREDIT_URL = "https://hasnainwebstudio.com";

// Fine vertical lines every 76px, the same motif as the inquiry form
const GRID =
  "repeating-linear-gradient(90deg, black 0 1px, transparent 1px 76px)";
const grid = { WebkitMask: GRID, mask: GRID };

const link =
  "transition-colors duration-200 hover:text-[#c99a9c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#faf6ee]";

export default function Footer({ href = "#inquire" }) {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="relative isolate overflow-hidden bg-espresso px-6 pb-10 pt-24 font-serif text-[#faf6ee] md:pt-32">
      {/* fine vertical lines */}
      <div
        aria-hidden="true"
        style={grid}
        className="pointer-events-none absolute inset-0 -z-10 bg-[#faf6ee]/[0.05]"
      />
      {/* thin inset frame, like stationery */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 -z-10 border border-[#faf6ee]/15 md:inset-6"
      />

      {/* arched photos */}
      <div className="mx-auto flex max-w-3xl items-start justify-center gap-3 md:gap-6">
        {ARCHES.map((a, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={`w-1/4 max-w-[9rem] ${a.offset}`}
          >
            <div className="aspect-[3/4] overflow-hidden rounded-t-[999px] border border-[#c99a9c]/60 p-1">
              <img
                src={a.src}
                alt=""
                loading="lazy"
                className="h-full w-full rounded-t-[999px] object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* call to action */}
      <div className="mx-auto mt-16 max-w-2xl text-center md:mt-20">
        <span aria-hidden="true" className="text-[#c99a9c]">
          ✦
        </span>

        <h2 className="mt-5 text-4xl leading-[1.1] md:text-6xl">
          Start with <em className="italic">a few quick questions.</em>
        </h2>

        <p className="mx-auto mt-6 max-w-md text-xl leading-relaxed text-[#faf6ee]/75">
          Tell me about your brand and your goals, and I'll shape a plan that
          actually feels like you.
        </p>

        <a
          href={href}
          className="mt-10 inline-flex items-center gap-3 border border-[#faf6ee]/60 px-10 py-3.5 text-lg tracking-wide text-[#faf6ee] no-underline transition-colors duration-300 hover:bg-[#faf6ee] hover:text-[#2c2a29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#faf6ee]"
        >
          Start an Inquiry
          <span aria-hidden="true">→</span>
        </a>
      </div>

      {/* divider */}
      <div
        aria-hidden="true"
        className="mx-auto my-16 flex max-w-xs items-center gap-4 text-[#c99a9c] md:my-20"
      >
        <span className="h-px flex-1 bg-current opacity-50" />
        ✦
        <span className="h-px flex-1 bg-current opacity-50" />
      </div>

      {/* brand */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[clamp(3rem,9vw,6.5rem)] italic leading-none tracking-wide">
          Amr.socials
        </p>
        <p className="mx-auto mt-5 max-w-md text-xl italic leading-relaxed text-[#faf6ee]/70">
          Social media strategy for brands and creators who grow with their
          values intact.
        </p>

        <nav
          aria-label="Connect"
          className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm uppercase tracking-[0.2em]"
        >
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={link}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      {/* credits */}
      <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-[#faf6ee]/15 pt-6 text-base italic text-[#faf6ee]/55">
        <span>© {year} Amr.socials</span>
        <span>
          Website designed by{" "}
          <a
            href={CREDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline decoration-[#c99a9c]/60 underline-offset-4 ${link}`}
          >
            Hasnain Webstudio
          </a>
        </span>
        <a href="#top" className={link}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
