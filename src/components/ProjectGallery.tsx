"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./ProjectGallery.module.css";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, isFullscreen]);

  const isMultiple = images.length > 1;

  // Prevenir scroll do body quando em fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFullscreen]);

  return (
    <div className={styles.galleryContainer}>
      {/* Main Image */}
      <div className={styles.mainImageWrapper}>
        {isMultiple && (
          <button className={`${styles.navButton} ${styles.prevButton}`} onClick={goToPrev} aria-label="Anterior">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        )}
        
        <div 
          className={styles.mainImageInner} 
          onClick={() => setIsFullscreen(true)}
          style={{ cursor: isFullscreen ? 'default' : 'zoom-in' }}
        >
          <Image
            src={images[currentIndex]}
            alt={`${title} - Imagem ${currentIndex + 1}`}
            fill
            sizes="(max-width: 800px) 100vw, 800px"
            className={styles.image}
            priority
          />
        </div>

        {isMultiple && (
          <button className={`${styles.navButton} ${styles.nextButton}`} onClick={goToNext} aria-label="Próxima">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        )}
      </div>

      {/* Thumbnail Carousel */}
      {isMultiple && (
        <div className={styles.thumbnailCarousel}>
          {images.map((imgSrc, idx) => (
            <button
              key={idx}
              className={`${styles.thumbnailWrapper} ${idx === currentIndex ? styles.activeThumbnail : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ver imagem ${idx + 1}`}
            >
              <Image
                src={imgSrc}
                alt={`Miniatura ${idx + 1}`}
                fill
                sizes="100px"
                className={styles.thumbnailImage}
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className={styles.fullscreenOverlay} onClick={() => setIsFullscreen(false)}>
          <button className={styles.closeButton} onClick={() => setIsFullscreen(false)} aria-label="Fechar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          
          <div className={styles.fullscreenImageWrapper} onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[currentIndex]}
              alt={`${title} - Imagem ${currentIndex + 1} em tela cheia`}
              fill
              sizes="100vw"
              className={styles.fullscreenImage}
              quality={100}
            />
            {isMultiple && (
              <>
                <button className={`${styles.navButton} ${styles.prevButton} ${styles.fullscreenNav}`} onClick={(e) => { e.stopPropagation(); goToPrev(); }} aria-label="Anterior">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button className={`${styles.navButton} ${styles.nextButton} ${styles.fullscreenNav}`} onClick={(e) => { e.stopPropagation(); goToNext(); }} aria-label="Próxima">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
