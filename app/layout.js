import Script from "next/script";
import { Instrument_Serif } from "next/font/google";
import { SITE } from "./lib/site";
import "./globals.css";

// Loads only regular + italic, served from your own domain (no request to Google at runtime)
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "social media management",
    "social media strategy",
    "content strategy",
    "Muslim brands",
    "Muslim creators",
    "halal social media",
    "values-led marketing",
  ],
  creator: SITE.credit.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: "Values-led social media strategy and management, built around your brand and your audience.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: "Values-led social media strategy and management, built around your brand and your audience.",
  },
  formatDetection: { telephone: false },
  // TODO: after adding the site to Google Search Console, paste the verification code here
  // verification: { google: "your-code" },
};

export const viewport = { themeColor: "#faf6ee" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  url: SITE.url,
  description: "Social media strategy and management for Muslim brands and creators.",
  email: SITE.email,
  sameAs: SITE.socials,
  serviceType: ["Social media management", "Content strategy", "Social media strategy"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={serif.variable}>
      <body className="bg-white font-serif text-espresso antialiased">
        {children}

        {/* structured data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Instagram feed widget script: loads after the page is interactive, never blocks it */}
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}