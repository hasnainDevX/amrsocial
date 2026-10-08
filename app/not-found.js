import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

// Fine vertical lines, the same motif as the rest of the site
const GRID = "repeating-linear-gradient(90deg, black 0 1px, transparent 1px 76px)";
const grid = { WebkitMask: GRID, mask: GRID };

export default function NotFound() {
  return (
    <main className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-ivory px-6 py-24 text-center text-espresso">
      <div
        aria-hidden="true"
        style={grid}
        className="pointer-events-none absolute inset-0 -z-10 bg-espresso/[0.12]"
      />

      <div>
        <p aria-hidden="true" className="font-serif text-8xl leading-none md:text-[10rem]">
          404
        </p>

        <h1 className="mt-6 font-serif text-3xl leading-tight md:text-5xl">
          This page has <em className="">wandered off.</em>
        </h1>

        <p className="mx-auto mt-5 max-w-md font-serif text-xl leading-relaxed text-espresso/70">
          The link may be broken, or the page may have moved. Let's get you back.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-3 border border-espresso px-10 py-3.5 font-serif text-lg tracking-wide text-espresso no-underline transition-colors duration-300 hover:bg-espresso hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso"
        >
          Back to home
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}