import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Kevin Mickael",
  lastName: "",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "IT Support Engineer · Software Engineer",
  avatar: "/images/avatar.jpeg",
  email: "example@gmail.com",
  location: "Indian/Mauritius", // Identifiant IANA correct pour la timezone
  locationLabel: "Madagascar/Maurice", // Affichage utilisateur
  languages: ["Français", "Anglais"], // optionnel : Laisser vide si vous ne souhaitez pas afficher de langues
};

const newsletter = {
  display: true,
  title: <>Abonnez-vous à la newsletter de {person.firstName}</>,
  description: (
    <>
      J'écris occasionnellement sur le design, la technologie, et je partage des réflexions sur l'intersection entre créativité et ingénierie.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/once-ui-system/nextjs-starter",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/company/once-ui/",
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@once_ui",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Accueil",
  title: `Portfolio de ${person.name}`,
  description: `Site portfolio présentant mon travail en tant que ${person.role}`,
  headline: <>Créer des ponts entre design et code</>,
  featured: {
    display: true,
    title: <>Projet récent : <strong className="ml-4">Once UI</strong></>,
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      Je suis {person.name}, un développeur web passionné par la création d'expériences utilisateurs intuitives.<br /> Après le travail, je développe mes propres projets.
    </>
  ),
};

const about = {
  path: "/about",
  label: "À propos",
  title: `À propos – ${person.name}`,
  description: `Rencontrez ${person.name}, ${person.role} basé à ${person.locationLabel}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Basé à Madagascar et à Maurice, Kevin Mickael est un spécialiste IT support et développement logiciel, toujours curieux et passionné par l'innovation. Il conçoit des solutions aux problèmes techniques et crée des applications web et mobiles sur des bases solides, pour des projets utiles et à impact positif.
      </>
    ),
  },
  work: {
    display: true, // mettre sur false pour masquer cette section
    title: "Expérience professionnelle",
    experiences: [
      {
        company: "Nations Unies pour le développement international",
        timeframe: "2024 - Présent",
        role: "eHealth IT Assistant",
        achievements: [
          <>Contribution au développement et à l'amélioration de l'interface utilisateur (UI/UX) du système de laboratoire <a href="https://openelis-global.org/" target="_blank" rel="noopener noreferrer">OpenELIS</a>, adapté et déployé à Maurice, avec ReactJS, en réponse aux besoins exprimés par les utilisateurs.</>,
          <>Support technique et assistance aux utilisateurs du système eHealth, avec des retours et recommandations sur la structure et l'ergonomie du système pour améliorer l'expérience globale.</>,
        ],
        images: [],
      },
      {
        company: "Attitude Hotels",
        timeframe: "2023 - 2024",
        role: "Technicien IT Support",
        achievements: [
          <>Assistance technique aux collaborateurs concernant les équipements informatiques, incluant ordinateurs, imprimantes et périphériques associés.</>,
          <>Diagnostic et résolution des problèmes liés aux logiciels de réservation, aux systèmes de point de vente (POS), et autres outils hôteliers.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // mettre sur false pour masquer cette section
    title: "Études",
    institutions: [
      {
        name: "Ecole Supérieure de Management et D'Informatique Appliquée",
        description: <>Études en informatique.</>,
      },
    ],
  },
  technical: {
    display: true, // mettre sur false pour masquer cette section
    title: "Compétences techniques",
    skills: [
      {
        title: "Excel",
        description: <>Capable de prototyper dans Figma avec Once UI à une vitesse impressionnante.</>,
        images: [],
        link: undefined,
      },
      {
        title: "React avec le framework Next.js",
        description: <>Développement d’applications web e-commerce avec React (framework Next.js), backend Go et PostgreSQL.</>,
        images: [
          {
            src: "/images/projects/homecraftle.png",
            alt: "Image projet",
            width: 16,
            height: 9,
          },
        ],
        link: {
          url: "https://craftle.pages.dev",
          label: "Visiter",
          icon: "arrowUpRightFromSquare"
        },
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Blog",
  description: "Retrouvez mes articles et réflexions sur le design, le développement et la technologie.",
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Projets",
  title: "Projets",
  description: "Découvrez mes projets et réalisations.",
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Galerie",
  title: "Galerie",
  description: "Une sélection de mes images et créations.",
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
