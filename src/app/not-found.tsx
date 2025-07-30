import { Column, Heading, Text, Button, Flex } from "@once-ui-system/core";
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page non trouvée - 404',
  description: 'La page que vous recherchez n\'existe pas. Découvrez nos services de développement web à Maurice : création de sites internet, portfolios et mini-apps.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <Column as="section" fill center paddingBottom="160" paddingTop="80">
      <Text marginBottom="s" variant="display-strong-xl" style={{ fontSize: '6rem', fontWeight: 'bold', color: '#ff6b6b' }}>
        404
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        Page non trouvée
      </Heading>
      <Text onBackground="neutral-weak" marginBottom="l" style={{ textAlign: 'center', maxWidth: '500px' }}>
        La page que vous recherchez n&apos;existe pas ou a été déplacée. 
        Découvrez nos services de développement web à Maurice.
      </Text>
      
      <Flex direction="column" horizontal="center" gap="m" marginBottom="xl">
        <Text variant="body-default-m" onBackground="neutral-medium" style={{ textAlign: 'center' }}>
          Explorez nos sections principales :
        </Text>
        
        <Flex direction="row" gap="m" wrap horizontal="center">
          <Link href="/" passHref>
            <Button variant="primary" size="m">
              Accueil
            </Button>
          </Link>
          
          <Link href="/about" passHref>
            <Button variant="secondary" size="m">
              À propos
            </Button>
          </Link>
          
          <Link href="/work" passHref>
            <Button variant="secondary" size="m">
              Projets
            </Button>
          </Link>
          
          <Link href="/blog" passHref>
            <Button variant="secondary" size="m">
              Blog
            </Button>
          </Link>
          
          <Link href="/contact" passHref>
            <Button variant="tertiary" size="m">
              Contact
            </Button>
          </Link>
        </Flex>
      </Flex>
      
      <Text variant="body-default-s" onBackground="neutral-weak" style={{ textAlign: 'center', marginTop: '2rem' }}>
        Besoin d&apos;aide ? <Link href="/contact" style={{ color: '#007bff', textDecoration: 'underline' }}>Contactez-nous</Link>
      </Text>
    </Column>
  );
}
