import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import useReveal from "../hooks/usereveal";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Vertical lines: 1px lines every 76px. Change the 76px for wider or narrower spacing.
const GRID =
  "repeating-linear-gradient(90deg, black 0 1px, transparent 1px 76px)";
const grid = { WebkitMask: GRID, mask: GRID };

const field =
  "w-full rounded-lg border border-espresso/30 bg-white px-4 py-3 font-serif text-xl text-espresso placeholder:text-espresso/40 transition-colors duration-200 focus:border-espresso focus:outline-none focus:ring-2 focus:ring-[#c99a9c]/50";

function Field({ id, label, required, reveal, children }) {
  return (
    <div data-reveal={reveal}>
      <label htmlFor={id} className="mb-2 block font-serif text-xl">
        {label}
        {required && (
          <span className="ml-2 text-base text-espresso/50">(required)</span>
        )}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const rootRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  // animations only from 768px up (Tailwind md); phones see the form with no motion
  useReveal(rootRef, { minWidth: 768 });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    // spam trap: bots fill the hidden field, people never see it
    if (new FormData(form).get("_gotcha")) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, {
        publicKey: PUBLIC_KEY,
      });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      ref={rootRef}
      id="inquire"
      className="relative isolate overflow-hidden bg-ivory px-6 py-24 text-espresso md:py-32"
    >
      {/* line background, behind everything */}
      <div
        aria-hidden="true"
        style={grid}
        className="pointer-events-none absolute inset-0 -z-10 bg-espresso/[0.12]"
      />

      <div className="mx-auto max-w-2xl">
        <h2
          data-reveal="left"
          className="text-center font-serif text-5xl leading-[1.05] md:text-7xl uppercase"
        >
          Start an <em className="text-black">inquiry</em>
        </h2>
        <p
          data-reveal="right"
          className="mx-auto mt-6 max-w-md text-center font-serif text-xl leading-snug text-espresso/70 md:text-2xl"
        >
          Tell me a little about your brand and what you're hoping for. I'll
          reply by email.
        </p>

        <form onSubmit={onSubmit} className="mt-14 space-y-7">
          {/* spam trap: real visitors never see or fill this */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          {/* fields slide in from alternating sides */}
          <Field id="name" label="Name" required reveal="left">
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className={field}
            />
          </Field>

          <Field id="email" label="Email" required reveal="right">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={field}
            />
          </Field>

          <Field id="brand" label="Brand or Instagram handle" reveal="left">
            <input
              id="brand"
              name="brand"
              type="text"
              placeholder="@yourbrand"
              className={field}
            />
          </Field>

          <Field id="interest" label="What are you looking for?" reveal="right">
            <select
              id="interest"
              name="interest"
              defaultValue=""
              className={`${field} appearance-none`}
            >
              <option value="" disabled>
                Choose one
              </option>
              <option>Social media management</option>
              <option>Content strategy</option>
              <option>Not sure yet</option>
            </select>
          </Field>

          <Field id="message" label="Your message" required reveal="left">
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className={`${field} resize-y`}
            />
          </Field>

          <div className="flex flex-wrap items-center gap-5 pt-2">
            <button
              data-reveal="scale"
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-espresso px-10 py-3.5 font-serif text-xl text-[#faf6ee] transition-colors duration-200 hover:bg-[#9c6468] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9c6468] disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send inquiry"}
            </button>

            <p
              role="status"
              aria-live="polite"
              className="font-serif text-lg text-[#9c6468]"
            >
              {status === "sent" &&
                "Thank you. Your inquiry is in and I'll be in touch soon."}
              {status === "error" &&
                "That didn't send. Please try again or email me directly."}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}