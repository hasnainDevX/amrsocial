import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TextLoop from "./components/TextLoop";
import About from "./components/About";
import WhatWeDo from "./components/WhatWeDo";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Marquee from "./components/Marquee";
import ContactForm from "./components/ContactForm";
import InstagramFeed from "./components/InstagramFeed";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

// This file is a server component, so the page's HTML is pre-rendered for Google.
// Every component imported here must start with "use client" if it uses hooks, GSAP or onClick.
export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <TextLoop />
        <About />
        <WhatWeDo />
        <Process />
        <Testimonials />
        <Marquee />
        <ContactForm />
        <InstagramFeed />
      </main>

      <Footer />
      <CustomCursor />
    </>
  );
}