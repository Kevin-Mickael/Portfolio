import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Kevin Mickael",
  lastName: "",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "IT Support Engineer · Software Engineer",
  avatar: "/images/avatar.jpeg",
  email: "Andriatsilavokevin@gmail.com",
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
    link: "https://github.com/Kevin-Mickael",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/andriatsilavokevin/",
  },
  {
    name: "Resume",
    icon: "document",
    link: "https://docs.google.com/document/d/1HvyuqkGyeOfPC-H-hGiZ726bS5ih2MOY-oOQTaYL8Po/edit?usp=sharing",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:Andriatsilavokevin@gmail.com`,
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    link: "https://wa.me/23054593145",
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Accueil",
  title: `Portfolio de ${person.name}`,
  description: `Site portfolio présentant mon travail en tant que ${person.role}`,
  headline: <>Création de sites web professionnels et intuitifs</>,
  featured: {
    display: true,
    title: <>Projet récent : <strong className="ml-4">Once UI</strong></>,
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      Je suis {person.name}, un développeur web basé à l’Île Maurice, passionné par la création d’expériences utilisateurs intuitives et professionnelles.<br />  
      Je conçois des portfolios et des sites web modernes pour aider mes clients à se démarquer et à gagner en visibilité en ligne.
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
        images: [
          {
            src: "https://yop.l-frii.com/wp-content/uploads/2023/06/Le-PNUD-recrute-pour-ce-poste-27-Decembre-2021-4.png",
            alt: "PNUD Logo",
            width: 16,
            height: 9,
          },
          {
            src: "https://yt3.googleusercontent.com/xamtiH56sPu5qm65ONu_LuoxoBcNkEzh6Oqr6ZCClbYLN6olA7vCD-dTdFE8q1G3716_0CV3=s900-c-k-c0x00ffffff-no-rj",
            alt: "eHealth",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Freelance",
        timeframe: "2021 - Présent",
        role: "Web developer, Designer, IT Support",
        achievements: [
          <>Création de <a href="https://craftle.pages.dev" target="_blank" rel="noopener noreferrer">Craftle</a>, une plateforme e-commerce de vente de templates, avec un backend robuste en Go pour la gestion des utilisateurs et une base de données PostgreSQL performante. Le site propose également des services, des plugins et des tutoriels. Il s'agit d'un de mes plus gros projets développés à ce jour.
          </>,
          <>Développement de <a href="https://money-link.pages.dev" target="_blank" rel="noopener noreferrer">MoneyLink</a>, un site web de transfert d'argent entre Madagascar et Maurice, conçu en ReactJS. Il intègre un calculateur de taux de change en temps réel et un formulaire de demande de transfert pour les agents.</>,
          <>Réalisation de <a href="https://wholesale-broker-shop.pages.dev/" target="_blank" rel="noopener noreferrer">CommerceProPlus</a>, un site web pour un client souhaitant recevoir et traiter des commandes en ligne. La plateforme présente ses produits sur un frontend développé en ReactJS.</>,
        ],
        images: [
          {
            src: "/images/projects/craftlelogo.png",
            alt: "craftle Logo",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/moneylink.png",
            alt: "Moneylink Logo",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/commerceproplus.png",
            alt: "e-commerce Logo",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Attitude Hotels",
        timeframe: "2023 - 2024",
        role: "Technicien IT Support",
        achievements: [
          <>Assistance technique aux collaborateurs concernant les équipements informatiques, incluant ordinateurs, imprimantes et périphériques associés.</>,
          <>Diagnostic et résolution des problèmes liés aux logiciels de réservation, aux systèmes de point de vente (POS), et autres outils hôteliers.</>,
        ],
        images: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Uxe4KGD-s5h-kfVEmL54y3Cun3r9rDVZvA&s",
            alt: "Attitude Hotel logo",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Ministère de l'Intérieur",
        timeframe: "2022",
        role: "Stagiaire en conception de bases de données",
        achievements: [
          <>Élaboration du Modèle Conceptuel des Traitements (MCT) pour définir les traitements et flux d'informations.</>,
          <>Élaboration du Modèle Conceptuel de Données (MCD) pour identifier les entités et leurs relations.</>,
          <>Définition du Modèle Logique de Données (MLD) en vue de la normalisation et de la structure relationnelle.</>,
          <>Réalisation du Modèle Physique de Données (MPD) adapté à Microsoft SQL Server et Microsoft Access.</>,
        ],        
        images: [
          {
            src: "https://www.ivotoro.mg/wp-content/themes/hueman/images/rep-logo.jpg",
            alt: "Ministère de l'Intérieur logo",
            width: 16,
            height: 9,
          },
        ],
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
        title: "SQL",
        description: <>Excellente maîtrise du langage SQL pour la conception, l'interrogation et l'optimisation de bases de données relationnelles, incluant la création de schémas, les jointures complexes, les sous-requêtes, les fonctions d'agrégation ainsi que l'optimisation des performances avec des index et des vues.</>,
        images: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBn9djlMmqMEnNhETDtAZUaVMxhO5jvldqqA&s",
            alt: "MySQL Logo",
            width: 16,
            height: 9,
          },
          {
            src: "https://techvify-software.com/wp-content/uploads/2024/03/what-is-postgresql-used-for.png",
            alt: "PostgreSQL logo",
            width: 16,
            height: 9,
          },
        ],
        link: undefined,
      },      
      {
        title: "Git",
        description: <>Solide maîtrise de Git pour la gestion de versions et la collaboration en équipe, incluant la création et la gestion de branches, la résolution de conflits, l'utilisation avancée de commandes (rebase, cherry-pick, stash) ainsi que l'intégration avec des plateformes comme GitHub et GitLab.</>,
        images: [],
        link: undefined,
      },
      {
        title: "Excel",
        description: <>Maîtrise avancée d'Excel pour l'analyse et la visualisation de données, incluant la création de tableaux croisés dynamiques, l'utilisation de formules complexes (recherche, logiques, financières) ainsi que des fonctions matricielles et dynamiques telles que LET, LAMBDA, FILTER et SEQUENCE.</>,
        images: [],
        link: undefined,
      },
      {
        title: "React avec le framework Next.js",
        description: <>Développement d'applications web e-commerce avec React (framework Next.js), backend Go et PostgreSQL.</>,
        images: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYFYUMxwjoJUgk-Bv9mwUGhi6uhAIKOfWZHw&s",
            alt: "React Logo",
            width: 16,
            height: 9,
          },
        ],
        link: {},
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
