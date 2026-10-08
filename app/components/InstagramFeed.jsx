"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const InstagramFeed = () => {
  const sectionRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "600px 0px",
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {shouldLoad && (
          <>
            <Script
              src="https://elfsightcdn.com/platform.js"
              strategy="afterInteractive"
            />

            <div
              className="elfsight-app-2b91033b-1449-4aab-afee-b53a0baeef84"
              data-elfsight-app-lazy
            />
          </>
        )}
      </div>
    </section>
  );
};

export default InstagramFeed;