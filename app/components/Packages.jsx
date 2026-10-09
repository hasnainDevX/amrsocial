"use client";

import { useId, useRef, useState } from "react";
import useReveal from "../hooks/usereveal";
import bgImage from "../assets/image.png"

const PACKAGES = [
  {
    id: "standard",
    number: "01",
    name: "Standard",
    price: "£300",
    features: [
      "Instagram management",
      "Content strategy",
      "Monthly content calendar",
      "Branding",
      "4–6 feed posts",
      "12 Reels",
      "Stories 3x/week",
      "Scripts",
      "Captions + CTAs",
      "Hashtag/SEO optimisation",
      "Content research + competitor research",
      "Basic monthly analytics report",
      "Monthly strategy check-in",
    ],
  },
  {
    id: "growth",
    number: "02",
    name: "Growth",
    price: "£500",
    features: [
      "6–8 feed posts",
      "12–15 Reels",
      "Stories 4–5x/week",
      "Stronger branding",
      "Targeted audience research",
      "Competitor/trend research",
      "Content pillars + recurring content series",
      "Profile optimisation",
      "Community management",
      "Monthly performance analysis",
      "Strategy call",
      "Content across IG + TikTok",
    ],
  },
  {
    id: "full-management",
    number: "03",
    name: "Full Social Media Management",
    price: "£750",
    features: [
      "10–12 carousel posts",
      "15–18 Reels",
      "Stories 5–7x/week",
      "Logo / color palette / mood board",
      "Brand/content direction",
      "Deeper audience + competitor research",
      "Offer/positioning refinement",
      "Monthly content strategy",
      "Trend monitoring",
      "Google research",
      "Conversion-focused content",
      "Community management",
      "Monthly analytics + strategy report",
      "2 strategy calls/month",
      "Content repurposing across all platforms",
    ],
  },
];

export default function Packages() {
  const rootRef = useRef(null);
  const id = useId();
  const [openPackage, setOpenPackage] = useState("growth");

  useReveal(rootRef, { minWidth: 768 });

  return (
    <section
      ref={rootRef}
      id="packages"
      aria-labelledby={`${id}-heading`}
      className="relative isolate overflow-hidden bg-espresso px-6 py-24 text-ivory md:py-32"
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage.src})`,
        }}
      />

         {/* Background overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-espresso/60"
      />


      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-espresso/75"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2
              id={`${id}-heading`}
              data-reveal="left"
              className="max-w-lg font-serif text-5xl leading-[1.05] md:text-7xl"
            >
              A little support.
              <br />
              <em className="italic">A lot of possibility.</em>
            </h2>

            <p className="mt-6 max-w-sm font-serif text-xl leading-snug text-ivory/85 md:text-2xl">
              Choose how we work together, from content planning to
              taking social media off your plate.
            </p>
          </div>

          <div data-reveal="up" className="min-w-0 lg:pt-32">
            {PACKAGES.map((pkg) => {
              const isOpen = openPackage === pkg.id;
              const triggerId = `${id}-${pkg.id}-trigger`;
              const panelId = `${id}-${pkg.id}-panel`;

              return (
                <div
                  key={pkg.id}
                  className="border-t border-ivory/40 last:border-b"
                >
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenPackage((current) =>
                          current === pkg.id ? null : pkg.id
                        )
                      }
                      className="group flex w-full cursor-pointer items-start gap-4 py-7 text-left text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory md:gap-6 md:py-8"
                    >
                      <span
                        aria-hidden="true"
                        className="pt-1 font-serif text-xl italic text-ivory/65 md:text-2xl"
                      >
                        {pkg.number}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-3xl leading-[1.1] md:text-4xl">
                          {pkg.name}
                        </span>

                        <span className="mt-3 block font-serif text-2xl leading-none">
                          {pkg.price}
                          <span className="ml-1 text-lg italic text-ivory/75">
                            / month
                          </span>
                        </span>
                      </span>

                      {/* Animated plus / minus */}
                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center transition-colors duration-300 group-hover:text-rose motion-reduce:transition-none">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-6 w-6"
                        >
                          <path
                            d="M5 12h14"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                          />

                          <path
                            d="M12 5v14"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            className={`origin-center transition-transform duration-300 ease-out motion-reduce:transition-none ${
                              isOpen ? "scale-y-0" : "scale-y-100"
                            }`}
                          />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  {/* Stays mounted so opening and closing both animate */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    aria-hidden={!isOpen}
                    ref={(node) => {
                      if (node) node.inert = !isOpen;
                    }}
                    className={`grid transition-[grid-template-rows] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div
                        className={`pb-9 transition-[opacity,transform] duration-[350ms] ease-out motion-reduce:transform-none motion-reduce:transition-none md:pb-10 ${
                          isOpen
                            ? "translate-y-0 opacity-100 delay-75"
                            : "-translate-y-2 opacity-0 delay-0"
                        }`}
                      >
                        <p className="mb-5 font-serif text-2xl italic">
                          What’s included
                        </p>

                        <ul className="m-0 grid list-none gap-3 p-0">
                          {pkg.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-3 font-serif text-xl leading-snug text-ivory/90"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[0.6em] h-px w-3 shrink-0 bg-ivory/60"
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Space around the link preserves its focus outline */}
                        <div className="px-1 pb-1 pt-8">
                          <a
                            href="#inquire"
                            aria-label={`Enquire about the ${pkg.name} package`}
                            className="group inline-flex items-center gap-3 rounded-full border border-ivory px-8 py-3 font-serif text-xl text-ivory no-underline transition-colors duration-300 hover:bg-ivory hover:text-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory motion-reduce:transition-none"
                          >
                            Let’s work together

                            <span
                              aria-hidden="true"
                              className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                            >
                              ↗
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}