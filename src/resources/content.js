import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Kevin Mickael",
  lastName: "",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Web Developer · IT Support Engineer · Software Engineer",
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
        {person.name} est un développeur web basé à Madagascar/Maurice, passionné par la transformation de défis complexes en solutions design simples et élégantes. Son travail couvre les interfaces numériques, les expériences interactives et la convergence entre design et technologie.
      </>
    ),
  },
  work: {
    display: true, // mettre sur false pour masquer cette section
    title: "Expérience professionnelle",
    experiences: [
      {
        company: "FLY",
        timeframe: "2022 - Présent",
        role: "Ingénieur design senior",
        achievements: [
          <>Refonte de l'UI/UX de la plateforme FLY, entraînant une augmentation de 20% de l'engagement utilisateur et des temps de chargement 30% plus rapides.</>,
          <>Intégration d'outils IA dans les workflows de design, permettant aux designers d'itérer 50% plus rapidement.</>,
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Projet Once UI",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Creativ3",
        timeframe: "2018 - 2022",
        role: "Lead Designer",
        achievements: [
          <>Développement d'un design system unifiant la marque sur plusieurs plateformes, améliorant la cohérence graphique de 40%.</>,
          <>Direction d'une équipe pluridisciplinaire pour lancer une nouvelle gamme de produits, contribuant à une augmentation de 15% du chiffre d'affaires global.</>,
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
        title: "Figma",
        description: <>Capable de prototyper dans Figma avec Once UI à une vitesse impressionnante.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Image projet",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Image projet",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Développement d'applications nouvelle génération avec Next.js + Once UI + Supabase.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Image projet",
            width: 16,
            height: 9,
          },
        ],
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
