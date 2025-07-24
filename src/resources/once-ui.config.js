import { home } from "./content";
// Temporairement désactivé pour éviter les problèmes de connexion
// import { Geist } from "next/font/google";
// import { Geist_Mono } from "next/font/google";

// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL = "https://creativfolio.com";

const routes = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/contact": true,
  "/confidentialite": true,
  "/cgu": true,
  "/blog/introduction" : true,
  "/blog/presentation" : true,
  "/work/simple-portfolio-builder" : true,
  "/work/quiz-maurice" : true,
  "/work/portfolioxample" :true,
  "/blog/quick-start" : true,
  "/blog/binaryblog" : true,
};

const display = {
  location: true,
  time: true,
  themeSwitcher: true
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
const protectedRoutes = {
  "/work/": true,
};

// Import and set font for each variant
// Temporairement désactivé pour éviter les problèmes de connexion
const heading = {
  variable: "--font-heading",
  style: { fontFamily: "system-ui, -apple-system, sans-serif" }
};

const body = {
  variable: "--font-body", 
  style: { fontFamily: "system-ui, -apple-system, sans-serif" }
};

const label = {
  variable: "--font-label",
  style: { fontFamily: "system-ui, -apple-system, sans-serif" }
};

const code = {
  variable: "--font-code",
  style: { fontFamily: "ui-monospace, SFMono-Regular, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace" }
};

const fonts = {
  heading,
  body,
  label,
  code,
};

// default customization applied to the HTML in the main layout.tsx
const style = {
  theme: "system", // dark | light | system
  neutral: "gray", // sand | gray | slate | custom
  brand: "cyan", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  accent: "red", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  solid: "contrast", // color | contrast
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "translucent", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100" // 90 | 95 | 100 | 105 | 110
};

const dataStyle = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false
  },
};

const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: true,
    opacity: 40,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

const mailchimp = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  }
};

// default schema data
const schema = {
  logo: "/favicon.png",
  type: "Localbusiness",
  name: "Création de mini‑apps, de sites web et de portfolios à Maurice",
  description: home.description || "Création de mini‑apps, de sites web et de portfolios à Maurice",
  email: "contact@creativfolio.com",
};

// social links
const sameAs = {
  linkedin: "https://www.linkedin.com/in/andriatsilavokevin/",
};

export { display, mailchimp, routes, protectedRoutes, baseURL, fonts, style, schema, sameAs, effects, dataStyle };
