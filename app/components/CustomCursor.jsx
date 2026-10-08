import { useEffect, useRef } from "react";

/**
 * Amr.socials – sticker-style arrow cursor
 * A chunky arrow (deep-red fill, espresso line, soft-grey outer outline) that
 * follows the mouse exactly, tilts a little as you move, grows over links
 * and buttons, and squishes when you click. The soft-grey outline keeps it
 * visible on both light and dark sections.
 *
 * Usage: render <CustomCursor /> once, e.g. in App.jsx.
 * Only runs on devices with a real mouse (hidden on touch screens).
 * Add data-cursor to any element that should trigger the "grow" state.
 */

const HOVER_SELECTOR = 'a, button, [role="button"], summary, label[for], [data-cursor]';
const TEXT_SELECTOR = "input, textarea, select";

// Arrow shape. The tip sits at (4, 4) inside a 32 x 32 box.
const ARROW = "M4 4 L4 25 L9.5 19.8 L13.2 28 L17.6 26 L13.9 17.9 L21.5 17.9 Z";

export default function CustomCursor() {
  const posRef = useRef(null);
  const tiltRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = posRef.current;
    const tilt = tiltRef.current;

    // hide the native cursor (keep it for form fields)
    const style = document.createElement("style");
    style.textContent = `
      html.has-custom-cursor, html.has-custom-cursor * { cursor: none !important; }
      html.has-custom-cursor input, html.has-custom-cursor textarea,
      html.has-custom-cursor select { cursor: text !important; }
    `;
    document.head.appendChild(style);
    document.documentElement.classList.add("has-custom-cursor");

    let x = -100, y = -100;
    let lastX = -100;
    let rot = 0;
    let visible = false;
    let raf = 0;

    const setVisible = (v) => {
      if (visible === v) return;
      visible = v;
      pos.style.opacity = v ? "1" : "0";
    };

    const loop = () => {
      pos.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      if (!reduce) {
        const vx = x - lastX; // horizontal speed this frame
        lastX = x;
        const target = Math.max(-18, Math.min(18, vx * 0.6));
        rot += (target - rot) * 0.2;
        tilt.style.rotate = `${rot}deg`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      if (!visible) lastX = e.clientX;
      x = e.clientX;
      y = e.clientY;
      setVisible(!e.target.closest?.(TEXT_SELECTOR));
      tilt.dataset.hover = e.target.closest?.(HOVER_SELECTOR) ? "true" : "false";
    };
    const onDown = () => (tilt.dataset.down = "true");
    const onUp = () => (tilt.dataset.down = "false");
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
      style.remove();
    };
  }, []);

  return (
    <div
      ref={posRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 transition-opacity duration-200"
    >
      {/* offset so the arrow tip (4,4) sits exactly on the pointer */}
      <div
        ref={tiltRef}
        data-hover="false"
        data-down="false"
        style={{ transformOrigin: "4px 4px" }}
        className="-ml-1 -mt-1 h-8 w-8 transition-[scale] duration-200 ease-out data-[hover=true]:scale-[1.3] data-[down=true]:scale-90"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-full w-full overflow-visible drop-shadow-[0_2px_0_rgba(40,27,17,0.25)]"
        >
          {/* outer soft-grey outline */}
          <path
            d={ARROW}
            className="fill-soft-grey stroke-soft-grey"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* espresso line + deep-red fill */}
          <path
            d={ARROW}
            className="fill-deep-red stroke-espresso"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}