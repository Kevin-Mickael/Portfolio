import { Flex, IconButton, SmartLink, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      as="footer"
      fillWidth
      padding="8"
      horizontal="center"
      mobileDirection="column"
    >
      <Flex
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="space-between"
        vertical="center"
      >
        <Text 
          variant="body-default-s" 
          style={{
            color: 'var(--neutral-on-background-strong)'
          }}
        >
          <Text style={{ color: 'var(--neutral-on-background-weak)' }}>© {currentYear} /</Text>
          <Text paddingX="4">{person.name} / +230 54593145</Text>
        </Text>
        <Flex direction="column" align="center" style={{ flex: 1 }}>
          <Flex gap="16" horizontal="center">
            <SmartLink href="/confidentialite" className="footer-legal-link"  style={{ textDecoration: 'underline' }}>
              Politique de confidentialité
            </SmartLink>
            <Text as="span" style={{ color: 'var(--neutral-on-background-weak)' }}>|</Text>
            <SmartLink href="/cgu" className="footer-legal-link" style={{ textDecoration: 'underline' }}>
              CGU
            </SmartLink>
          </Flex>
        </Flex>
        <Flex gap="16">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  aria-label={item.name}
                  size="s"
                  variant="ghost"
                  style={{
                    color: 'var(--neutral-on-background-strong)'
                  }}
                />
              ),
          )}
        </Flex>
      </Flex>
      <Flex height="80" show="s"></Flex>
    </Flex>
  );
};
