"use client";
import { useRef } from "react";
import Image from "next/image";
import styles from './ProjectShowcaseSlider.module.css';

const projects = [
  {
    name: "Koppee",
    category: "Coffee Shop",
    image: "/images/header/koppee.webp",
    link: "https://craftleyourwebsite.github.io/koppee/",
  },
  {
    name: "VideoGraph",
    category: "Video Editing",
    image: "/images/header/videograph.webp",
    link: "https://craftleyourwebsite.github.io/videograph",
  },
  {
    name: "Furni",
    category: "Decoration & Interior Design",
    image: "/images/header/Furni.webp",
    link: "https://craftleyourwebsite.github.io/Furni/",
  },
  {
    name: "Restaurantly",
    category: "Restaurant",
    image: "/images/header/restaurantly.webp",
    link: "https://craftleyourwebsite.github.io/restaurantly",
  },
  {
    name: "Amado",
    category: "E-commerce",
    image: "/images/header/amado.webp",
    link: "https://craftleyourwebsite.github.io/amado",
  },
  {
    name: "Terapia",
    category: "Relaxation & Fitness",
    image: "/images/header/terapia.webp",
    link: "https://craftleyourwebsite.github.io/terapia",
  },
  {
    name: "FestaveLive",
    category: "Live & Festivals",
    image: "/images/header/festavelive.webp",
    link: "https://craftleyourwebsite.github.io/festavelive",
  },
  {
    name: "Montana",
    category: "Hotel Resort",
    image: "/images/header/montana.webp",
    link: "https://craftleyourwebsite.github.io/montana",
  },
  {
    name: "Romyk",
    category: "ice Cream",
    image: "/images/header/Romyk.webp",
    link: "https://craftleyourwebsite.github.io/romyk/",
  },
  {
    name: "Booth",
    category: "Mobile App",
    image: "/images/header/booth.webp",
    link: "https://craftleyourwebsite.github.io/booth/",
  },
];

export default function ProjectShowcaseSlider() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider} ref={sliderRef}>
        {projects.map((project, index) => (
          <div key={project.name + index} className={styles.sliderItem}>
            <Image
              src={project.image}
              alt={project.name}
              className={styles.sliderImage}
              width={320}
              height={240}
              unoptimized
            />
            <div className={styles.sliderOverlay}>
              <div className={styles.sliderItemInfo}>
                <h3 className={styles.sliderItemTitle}>{project.name}</h3>
                <p className={styles.sliderItemCategory}>{project.category}</p>
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <button className={styles.viewButton}>View</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 