"use client";

import { useState } from "react";

const LINKS = [
  ["Home", "#top"],
  ["About", "#about"],
  ["Process", "#process"],
  ["Testimonials", "#testimonials"],
  ["Contact", "#inquire"],
];

function ScallopedEdge({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-full h-[14px] ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 14px 0, white 13.5px, transparent 14px)",
        backgroundSize: "28px 14px",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  const go = (label) => {
    setActive(label);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white text-espresso">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-[clamp(1.25rem,5vw,4rem)] py-4 font-serif">
        <a
          href="#top"
          onClick={() => go("Home")}
          className="text-[clamp(1.8rem,3vw,2.4rem)] leading-none text-inherit no-underline"
        >
          Amr.socials
        </a>

        <button
          type="button"
          className="cursor-pointer border-0 bg-transparent text-[1.2rem] text-inherit md:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav
          id="site-menu"
          aria-label="Main"
          className={`absolute inset-x-0 top-full flex-col bg-white px-[clamp(1.25rem,5vw,4rem)] pb-6 pt-2 md:static md:flex md:flex-row md:items-center md:gap-9 md:bg-transparent md:p-0 ${
            open ? "flex" : "hidden"
          }`}
        >
          {LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`py-3 text-[1.5rem] text-inherit no-underline md:py-0 md:pb-0.5 md:text-[1.25rem] ${
                active === label
                  ? "underline decoration-1 underline-offset-[6px] md:border-b md:border-current md:no-underline"
                  : ""
              }`}
              aria-current={active === label ? "page" : undefined}
              onClick={() => go(label)}
            >
              {label}
            </a>
          ))}

          <ScallopedEdge className="md:hidden" />
        </nav>
      </div>

      <ScallopedEdge className={open ? "hidden md:block" : ""} />
    </header>
  );
}