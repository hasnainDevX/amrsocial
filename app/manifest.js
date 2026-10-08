import { SITE } from "./lib/site";

// Lets phones "add to home screen" with the right name and colours
export default function manifest() {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ee",
    theme_color: "#faf6ee",
  };
}