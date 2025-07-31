'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Column, Heading, Text, Spinner } from "@once-ui-system/core";

export default function EmailProtectionRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirection immédiate vers la page de contact
    router.replace('/contact');
  }, [router]);

  return (
    <Column as="section" fill center paddingBottom="160" paddingTop="80">
      <Spinner size="l" marginBottom="m" />
      <Heading marginBottom="l" variant="display-default-xs">
        Redirection en cours...
      </Heading>
      <Text onBackground="neutral-weak" style={{ textAlign: 'center', maxWidth: '500px' }}>
        Vous êtes redirigé vers notre page de contact.
      </Text>
    </Column>
  );
}
