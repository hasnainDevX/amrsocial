import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll reveals for everything inside `ref` marked with data-reveal="<type>".
 *   up (default)  rises from below        down   drops in from above
 *   left          slides in from the left  right  slides in from the right
 *   scale         grows from 85%           fade   opacity only
 *   wipe          uncovers left to right (no fade)
 * Use fade or wipe on anything that already has a CSS rotate/translate (the tilted cards),
 * so GSAP never fights those transforms.
 * Items entering together are staggered. Each plays once. Skipped for reduced-motion users.
 * Optional second argument: useReveal(ref, { minWidth: 768 }) turns it off below 768px (phones).
 */
const TYPES = {
  up: { from: { y: 60 }, to: { y: 0 } },
  down: { from: { y: -60 }, to: { y: 0 } },
  left: { from: { x: -110 }, to: { x: 0 } },
  right: { from: { x: 110 }, to: { x: 0 } },
  scale: { from: { scale: 0.85 }, to: { scale: 1 } },
  fade: { from: {}, to: {} },
  wipe: { from: { clipPath: "inset(0 100% 0 0)" }, to: { clipPath: "inset(0 0% 0 0)" }, noFade: true },
};
const spec = (el) => TYPES[el.dataset.reveal] || TYPES.up;

export default function useReveal(ref, { minWidth = 0 } = {}) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    // minWidth (px): below this screen width nothing is hidden or animated, e.g. { minWidth: 768 } = desktop only
    if (minWidth && !window.matchMedia(`(min-width: ${minWidth}px)`).matches) return undefined;

    const items = Array.from(root.querySelectorAll("[data-reveal]"));
    if (!items.length) return undefined;

    // things sliding in from the sides must not create a horizontal scrollbar
    const prevOverflow = root.style.overflowX;
    root.style.overflowX = "clip";

    const ctx = gsap.context(() => {
      // hidden before first paint, so there's no flash of visible content
      items.forEach((el) => {
        const { from, noFade } = spec(el);
        gsap.set(el, { ...(noFade ? {} : { opacity: 0 }), ...from });
      });

      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          batch.forEach((el, i) => {
            const { to, noFade } = spec(el);
            gsap.to(el, {
              ...(noFade ? {} : { opacity: 1 }),
              ...to,
              duration: 1.1,
              ease: "power4.out",
              delay: i * 0.14,
              onComplete: () => gsap.set(el, { clearProps: "transform,clipPath" }),
            });
          }),
      });
    }, root);

    return () => {
      ctx.revert();
      root.style.overflowX = prevOverflow;
    };
  }, [ref, minWidth]);
}