import { Button, Flex, Heading, Text } from "@once-ui-system/core";
import Link from "next/link";

interface InternalLinksProps {
  currentPage?: string;
  className?: string;
}

export const InternalLinks: React.FC<InternalLinksProps> = ({ 
  currentPage = "",
  className = ""
}) => {
  // Définir les liens selon la page actuelle
  const getRelevantLinks = () => {
    const allLinks = [
      {
        href: "/",
        title: "Accueil",
        description: "Découvrez nos services de développement web à Maurice"
      },
      {
        href: "/about",
        title: "À propos",
        description: "Développeur web professionnel à Maurice"
      },
      {
        href: "/work",
        title: "Projets",
        description: "Portfolio de sites web et mini-apps créés à Maurice"
      },
      {
        href: "/blog",
        title: "Blog",
        description: "Articles sur le développement web et les technologies"
      },
      {
        href: "/contact",
        title: "Contact",
        description: "Demandez un devis pour votre site web à Maurice"
      }
    ];

    // Filtrer pour exclure la page actuelle et retourner 3-4 liens pertinents
    return allLinks
      .filter(link => link.href !== currentPage)
      .slice(0, 3);
  };

  const links = getRelevantLinks();

  if (links.length === 0) return null;

  return (
    <Flex 
      className={className}
      direction="column"
      gap="m"
      padding="l"
      border="neutral-alpha-weak"
      radius="l"
      background="surface"
      style={{ marginTop: "2rem" }}
    >
      <Heading variant="heading-strong-m" marginBottom="s">
        Explorez nos services
      </Heading>
      
      <Flex direction="column" gap="s">
        {links.map((link) => (
          <Link key={link.href} href={link.href} passHref>
            <Flex
              direction="column"
              gap="xs"
              padding="m"
              radius="m"
              style={{
                textDecoration: "none",
                transition: "all 0.2s ease",
                cursor: "pointer",
                background: "var(--neutral-alpha-weak)"
              }}
            >
              <Text variant="heading-strong-s" style={{ color: "inherit" }}>
                {link.title}
              </Text>
              <Text 
                variant="body-default-s" 
                onBackground="neutral-weak"
                style={{ color: "inherit" }}
              >
                {link.description}
              </Text>
            </Flex>
          </Link>
        ))}
      </Flex>

      <Text 
        variant="body-default-xs" 
        onBackground="neutral-weak"
        style={{ textAlign: "center", marginTop: "0.5rem" }}
      >
        Création de sites web professionnels à Maurice
      </Text>
    </Flex>
  );
};

export default InternalLinks;
