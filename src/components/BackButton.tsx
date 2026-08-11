"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./BackButton.module.css";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export default function BackButton({
  href = "/",
  label = "← Voltar para o início",
}: BackButtonProps) {
  const inlineRef = useRef<HTMLDivElement>(null);
  const [isFloatingVisible, setIsFloatingVisible] = useState(false);

  useEffect(() => {
    const target = inlineRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show floating button when inline button is not intersecting AND scrolled past top of viewport
        const isScrolledPast = entry.boundingClientRect.top < 0;
        setIsFloatingVisible(!entry.isIntersecting && isScrolledPast);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={inlineRef} className={styles.inlineContainer}>
        <Link href={href} className={styles.inlineButton}>
          {label}
        </Link>
      </div>

      <Link
        href={href}
        className={`${styles.floatingButton} ${isFloatingVisible ? styles.visible : ""}`}
        aria-label={label}
      >
        {label}
      </Link>
    </>
  );
}
