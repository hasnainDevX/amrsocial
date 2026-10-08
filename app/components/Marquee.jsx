import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ITEMS = ["Social media", "Content strategy", "Brand storytelling", "Values-led growth"];

export default function Marquee({ items = ITEMS, duration = 30, reverse = false }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const root = rootRef.current;
    const ctx = gsap.context(() => {
      // Two identical groups sit side by side; sliding each one by its own width loops seamlessly.
      const tween = gsap.fromTo(
        "[data-group]",
        { xPercent: reverse ? -100 : 0 },
        { xPercent: reverse ? 0 : -100, duration, ease: "none", repeat: -1 }
      );

      const pause = () => tween.pause();
      const play = () => tween.play();
      root.addEventListener("pointerenter", pause);
      root.addEventListener("pointerleave", play);
      return () => {
        root.removeEventListener("pointerenter", pause);
        root.removeEventListener("pointerleave", play);
      };
    }, rootRef);

    return () => ctx.revert();
  }, [duration, reverse]);

  // Each group repeats the list so one group is always wider than the screen
  const group = (hidden) => (
    <div data-group aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {[0, 1, 2].map((rep) =>
        items.map((item) => (
          <span key={`${rep}-${item}`} className="flex items-center whitespace-nowrap">
            <span className="px-6 font-serif text-4xl italic md:px-10 md:text-6xl">{item}</span>
            <span aria-hidden="true" className="font-serif text-2xl md:text-4xl">✦</span>
          </span>
        ))
      )}
    </div>
  );

  return (
    <div
      ref={rootRef}
      role="marquee"
      aria-label={items.join(", ")}
      className="flex select-none overflow-hidden border-y border-espresso/15 bg-white py-6 text-espresso md:py-8"
    >
      {group(false)}
      {group(true)}
    </div>
  );
}