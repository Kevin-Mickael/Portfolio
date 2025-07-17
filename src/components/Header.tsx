"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, about, blog, work, contact } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from './Header.module.scss';

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  // Ajout gestion de langue
  const [lang, setLang] = useState<'fr' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lang') as 'fr' | 'en') || 'fr';
    }
    return 'fr';
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lang');
      if (stored === 'fr' || stored === 'en') setLang(stored);
    }
  }, []);

  const handleLangSwitch = () => {
    const nextLang = lang === 'fr' ? 'en' : 'fr';
    setLang(nextLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', nextLang);
      window.location.reload();
    }
  };
  
  console.log("Routes:", routes);
  console.log("Contact route:", routes["/contact"]);
  console.log("Pathname:", pathname);

  return (
    <>
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={9} />
      <Fade show="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      <Flex
        fitHeight
        position="unset"
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
      >
        <Flex paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Flex hide="s">{person.locationDisplay}</Flex>}
        </Flex>
        <Flex fillWidth horizontal="center">
          <Flex
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="person"
                    href="/about"
                    label="À propos"
                    selected={pathname === "/about"}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="person"
                    href="/about"
                    selected={pathname === "/about"}
                  />
                </>
              )}
              {routes["/work"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="grid"
                    href="/work"
                    label="Projets"
                    selected={pathname.startsWith("/work")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="grid"
                    href="/work"
                    selected={pathname.startsWith("/work")}
                  />
                </>
              )}
              {routes["/blog"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="book"
                    href="/blog"
                    label="Blog"
                    selected={pathname.startsWith("/blog")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="book"
                    href="/blog"
                    selected={pathname.startsWith("/blog")}
                  />
                </>
              )}
              {routes["/contact"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="email"
                    href="/contact"
                    label="Contact"
                    selected={pathname.startsWith("/contact")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="email"
                    href="/contact"
                    selected={pathname.startsWith("/contact")}
                  />
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex hide="s">{display.time && <TimeDisplay timeZone={person.location} />}</Flex>
            {/* Switch FR-EN button (placeholder) à l'extrémité droite */}
            {mounted && (
              <button
                type="button"
                style={{
                  marginLeft: '12px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #fff',
                  background: 'transparent',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
                aria-label="Switch language"
                onClick={handleLangSwitch}
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
