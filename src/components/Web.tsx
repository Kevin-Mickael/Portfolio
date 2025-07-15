"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from './Web.module.css';
import { 
  FaReact, FaAngular, FaVuejs, FaNodeJs, FaHtml5, 
  FaCss3Alt, FaJs, FaDatabase, FaGitAlt, FaDocker,
  FaAws, FaPython, FaPhp, FaGithub, FaNpm, 
  FaWordpress, FaBootstrap, FaFigma, FaSlack
} from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiGraphql, SiNextdotjs, SiYarn } from 'react-icons/si';
import Head from 'next/head';

interface AppIconProps {
  Icon: React.ElementType;
  color: string;
  background?: string;
  index: number;
  hoveredIndex: number | null;
  name: string;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

const AppIcon: React.FC<AppIconProps> = ({ 
  Icon, 
  color, 
  background = 'rgba(235, 232, 254, 1)', 
  index, 
  hoveredIndex, 
  name,
  onMouseEnter, 
  onMouseLeave 
}) => {
  // Determine if this card is focused or blurred
  const isFocused = hoveredIndex === index;
  const isBlurred = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <div 
      className={`${styles.appCard} ${isFocused ? styles.focused : ''} ${isBlurred ? styles.blurred : ''}`} 
      style={{ background }}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
    >
      <Icon className={styles.appIcon} style={{ color }} />
      <div className={styles.techName}>{name}</div>
    </div>
  );
};

const AppIntegration: React.FC = () => {
  const dividerRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // Animation for the divider elements when component mounts
    const animationTimeout = setTimeout(() => {
      if (verticalLineRef.current) {
        verticalLineRef.current.style.height = "66px";
      }
      
      if (circleRef.current) {
        circleRef.current.style.transform = "scale(1, 1) translateY(0)";
      }
    }, 500);

    return () => clearTimeout(animationTimeout);
  }, []);

  // Array of technologies with their details
  const technologies = [
    { Icon: FaReact, color: "#61DAFB", name: "React" },
    { Icon: FaAngular, color: "#DD0031", name: "Angular" },
    { Icon: FaVuejs, color: "#4FC08D", name: "Vue.js" },
    { Icon: SiNextdotjs, color: "#000000", name: "Next.js" },
    { Icon: FaNodeJs, color: "#339933", name: "Node.js" },
    { Icon: FaHtml5, color: "#E34F26", name: "HTML5" },
    { Icon: FaCss3Alt, color: "#1572B6", name: "CSS3" },
    { Icon: FaJs, color: "#F7DF1E", background: "#333333", name: "JavaScript" },
    { Icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
    { Icon: FaDatabase, color: "#4479A1", name: "Database" },
    { Icon: SiMongodb, color: "#47A248", name: "MongoDB" },
    { Icon: SiGraphql, color: "#E10098", name: "GraphQL" },
    { Icon: FaGitAlt, color: "#F05032", name: "Git" },
    { Icon: FaGithub, color: "#181717", name: "GitHub" },
    { Icon: FaDocker, color: "#2496ED", name: "Docker" },
    { Icon: FaAws, color: "#232F3E", name: "AWS" },
    { Icon: FaPython, color: "#3776AB", name: "Python" },
    { Icon: FaPhp, color: "#777BB4", name: "PHP" },
    { Icon: FaNpm, color: "#CB3837", name: "npm" },
    { Icon: SiYarn, color: "#2C8EBB", name: "Yarn" },
    { Icon: FaBootstrap, color: "#7952B3", name: "Bootstrap" },
    { Icon: FaWordpress, color: "#21759B", name: "WordPress" },
    { Icon: FaFigma, color: "#F24E1E", name: "Figma" },
    { Icon: FaSlack, color: "#4A154B", name: "Slack" },
  ];

  // Handlers for mouse events
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <Head>
        <title>Technologies utilisées | Portfolio Développeur Web</title>
        <meta name="description" content="Découvrez toutes les technologies web maîtrisées : React, Next.js, Node.js, TypeScript, HTML5, CSS3, et bien d'autres. Un savoir-faire moderne pour vos projets web sur-mesure." />
      </Head>
      <section className={`${styles.section} ${styles.variables}`} id="app-integration">
        <div className={styles.container}>
          <h2 className={styles.heading96px} id="technologies-web" data-droip="dpyn5enz">
            <span className={styles.nosColor}>Nos</span> <br/><strong className={`${styles.heading96px} ${styles.primary}`} data-droip="dp7gsrd3">Technologies</strong>
          </h2>
          <div className={styles.textWrapper}>
            <div className={styles.dividerWrapper}>
              <div className={styles.linearDivider} ref={dividerRef}></div>
              <div className={styles.dividerDetail}>
                <div className={styles.verticalLine} ref={verticalLineRef}></div>
                <div className={styles.dividerCircle} ref={circleRef}></div>
              </div>
            </div>
            <div className={styles.paragraphWrapper}>
              <p className={styles.paragraph}>Que votre projet soit petit ou ambitieux, nous choisissons toujours la technologie la plus adaptée à vos besoins.</p>
            </div>
          </div>
          <div className={styles.appsGrid}>
            {/* Render app icons using the array of technologies */}
            {technologies.map((tech, index) => (
              <AppIcon 
                key={index}
                Icon={tech.Icon} 
                color={tech.color} 
                background={tech.background} 
                index={index}
                hoveredIndex={hoveredIndex}
                name={
                  tech.name === 'Database' ? 'Base de données' :
                  tech.name === 'JavaScript' ? 'JavaScript' :
                  tech.name === 'TypeScript' ? 'TypeScript' :
                  tech.name === 'Node.js' ? 'Node.js' :
                  tech.name === 'Next.js' ? 'Next.js' :
                  tech.name === 'React' ? 'React' :
                  tech.name === 'Angular' ? 'Angular' :
                  tech.name === 'Vue.js' ? 'Vue.js' :
                  tech.name === 'HTML5' ? 'HTML5' :
                  tech.name === 'CSS3' ? 'CSS3' :
                  tech.name === 'MongoDB' ? 'MongoDB' :
                  tech.name === 'GraphQL' ? 'GraphQL' :
                  tech.name === 'Git' ? 'Git' :
                  tech.name === 'GitHub' ? 'GitHub' :
                  tech.name === 'Docker' ? 'Docker' :
                  tech.name === 'AWS' ? 'AWS' :
                  tech.name === 'Python' ? 'Python' :
                  tech.name === 'PHP' ? 'PHP' :
                  tech.name === 'npm' ? 'npm' :
                  tech.name === 'Yarn' ? 'Yarn' :
                  tech.name === 'Bootstrap' ? 'Bootstrap' :
                  tech.name === 'WordPress' ? 'WordPress' :
                  tech.name === 'Figma' ? 'Figma' :
                  tech.name === 'Slack' ? 'Slack' :
                  tech.name
                }
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AppIntegration; 