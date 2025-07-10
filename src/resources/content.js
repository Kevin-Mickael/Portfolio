import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Kevin Mickael",
  lastName: "",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
  avatar: "/images/avatar.jpeg",
  email: "Andriatsilavokevin@gmail.com",
  location: "Indian/Mauritius",
  locationDisplay: "Mauritius",
  locationLabel: "Madagascar/Maurice",
  languages: ["Français", "Anglais","Malagasy"],
};

const newsletter = {
  display: true,
  title: <>Restez à la pointe des nouveautés en vous abonnant à notre newsletter&nbsp;✉️</>,
  description: (
    <>
      Restez à l&apos;écoute des nouvelles opportunités, suivez les dernières tendances technologiques, découvrez des formations pour progresser et profitez d&apos;offres de réduction exclusives.
    </>
  ),
};

const social = [
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
    name: "Facebook",
    icon: "facebook",
    link: "https://www.facebook.com/creativfolio/",
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

const socialAbout = [
  {
    name: "Resume",
    icon: "document",
    link: "https://docs.google.com/document/d/1HvyuqkGyeOfPC-H-hGiZ726bS5ih2MOY-oOQTaYL8Po/edit?usp=sharing",
  },
];

const home = {
  path: "/",
  image: "/favicon.png",
  label: "Accueil",
  title: `Création de site web et Portfolio à l'île Maurice`,
  description: `Création de site web et portfolio à l'île Maurice  présentant mon travail en tant que ${person.role}`,
  headline: <>Création de sites web professionnels et intuitifs</>,
  featured: {
    display: true,
    title: <><strong>Création de site web à l&apos;île Maurice</strong></>,
    href: undefined,
  },
  subline: (
    <>
      Je suis {person.name}, un développeur web basé à l&apos;île Maurice, passionné par la création d&apos;expériences utilisateurs intuitives et professionnelles.<br />  
      Je conçois des portfolios et des sites web modernes pour aider mes clients à se démarquer et à gagner en visibilité en ligne.
    </>
  ),
};

const about = {
  path: "/about",
  label: "À propos",
  title: `À propos de ${person.name}`,
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
        Basé à l&apos;île Maurice originaire de Madagascar, Kevin Mickael est un spécialiste IT support et développement logiciel, toujours curieux et passionné par l&apos;innovation. Il conçoit des solutions aux problèmes techniques et crée des applications web et mobiles sur des bases solides, pour des projets utiles et à impact positif.
      </>
    ),
  },
  work: {
    display: true,
    title: "Expérience professionnelle",
    experiences: [
      {
        company: "Nations Unies pour le développement international",
        timeframe: "2024 - Présent",
        role: "eHealth IT Assistant",
        achievements: [
          <>Contribution au développement et à l&apos;amélioration de l&apos;interface utilisateur (UI/UX) du système de laboratoire <a href="https://openelis-global.org/" target="_blank" rel="noopener noreferrer">OpenELIS</a>, adapté et déployé à Maurice, avec ReactJS, en réponse aux besoins exprimés par les utilisateurs.</>,
          <>Support technique et assistance aux utilisateurs du système eHealth, avec des retours et recommandations sur la structure et l&apos;ergonomie du système pour améliorer l&apos;expérience globale.</>,
        ],
        images: [
          {
            src: "/images/ehealth-logo.jpg",
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
          <>Création de <a href="https://craftle.pages.dev" target="_blank" rel="noopener noreferrer">Craftle</a>, une plateforme e-commerce de vente de templates, avec un backend robuste en Go pour la gestion des utilisateurs et une base de données PostgreSQL performante. Le site propose également des services, des plugins et des tutoriels. Il s&apos;agit d&apos;un de mes plus gros projets développés à ce jour.
          </>,
          <>Développement de <a href="https://money-link.pages.dev" target="_blank" rel="noopener noreferrer">MoneyLink</a>, un site web de transfert d&apos;argent entre Madagascar et Maurice, conçu en ReactJS. Il intègre un calculateur de taux de change en temps réel et un formulaire de demande de transfert pour les agents.</>,
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
            src: "/images/attitude-hotel-logo.jpg",
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
          <>Élaboration du Modèle Conceptuel des Traitements (MCT) pour définir les traitements et flux d&apos;informations.</>,
          <>Élaboration du Modèle Conceptuel de Données (MCD) pour identifier les entités et leurs relations.</>,
          <>Définition du Modèle Logique de Données (MLD) en vue de la normalisation et de la structure relationnelle.</>,
          <>Réalisation du Modèle Physique de Données (MPD) adapté à Microsoft SQL Server et Microsoft Access.</>,
        ],        
        images: [
          {
            src: "/images/interieur-logo.jpg",
            alt: "Ministère de l'Intérieur logo",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Études",
    institutions: [
      {
        name: "Ecole Supérieure de Management et D'Informatique Appliquée",
        description: <>Études en informatique.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Compétences techniques",
    skills: [
      {
        title: "SQL",
        description: <>Excellente maîtrise du langage SQL pour la conception, l&apos;interrogation et l&apos;optimisation de bases de données relationnelles, incluant la création de schémas, les jointures complexes, les sous-requêtes, les fonctions d&apos;agrégation ainsi que l&apos;optimisation des performances avec des index et des vues.</>,
        images: [
          {
            src: "/images/mysql-logo.jpg",
            alt: "MySQL Logo",
            width: 16,
            height: 9,
          },
          {
            src: "/images/postgresql-logo.png",
            alt: "PostgreSQL logo",
            width: 16,
            height: 9,
          },
        ],
        link: undefined,
      },      
      {
        title: "Git",
        description: <>Solide maîtrise de Git pour la gestion de versions et la collaboration en équipe, incluant la création et la gestion de branches, la résolution de conflits, l&apos;utilisation avancée de commandes (rebase, cherry-pick, stash) ainsi que l&apos;intégration avec des plateformes comme GitHub et GitLab.</>,
        images: [],
        link: undefined,
      },
      {
        title: "Excel",
        description: <>Maîtrise avancée d&apos;Excel pour l&apos;analyse et la visualisation de données, incluant la création de tableaux croisés dynamiques, l&apos;utilisation de formules complexes (recherche, logiques, financières) ainsi que des fonctions matricielles et dynamiques telles que LET, LAMBDA, FILTER et SEQUENCE.</>,
        images: [],
        link: undefined,
      },
      {
        title: "React avec le framework Next.js",
        description: <>Développement d&apos;applications web e-commerce avec React (framework Next.js), backend Go et PostgreSQL.</>,
        images: [
          {
            src: "/images/react-logo.jpg",
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
};

const work = {
  path: "/work",
  label: "Projets",
  title: "Projets",
  description: "Découvrez mes projets et réalisations.",
};

const contact = {
  path: "/contact",
  label: "Contact",
  title: "Contact",
  description: "Contactez-moi pour discuter de vos projets et collaborations.",
};

export { person, social, socialAbout, newsletter, home, about, blog, work, contact };