"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingLogoProps {
  className?: string;
  glowColor?: string;
  glowInterval?: number;
}

export const GlowingLogo: React.FC<GlowingLogoProps> = ({
  className,
  glowColor = "rgba(255, 255, 255, 0.8)",
  glowInterval = 3000,
}) => {
  const [isGlowing, setIsGlowing] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [audio, setAudio] = useState<{
    hover: HTMLAudioElement[];
    click: HTMLAudioElement;
  } | null>(null);

  // Inicializar y precargar audios
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hoverSounds = [
        new Audio(
          "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
        ),
      ];

      // Sonido de click (más nítido)
      const clickSound = new Audio(
        "https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3"
      );

      // Precargar audios
      hoverSounds.forEach((sound) => {
        sound.volume = 0.2;
        sound.preload = "auto";
      });
      clickSound.volume = 0.3;
      clickSound.preload = "auto";

      setAudio({
        hover: hoverSounds,
        click: clickSound,
      });

      // Limpieza al desmontar
      return () => {
        hoverSounds.forEach((sound) => (sound.src = ""));
        clickSound.src = "";
      };
    }
  }, []);

  // Efecto de brillo intermitente
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 800);
    }, glowInterval);

    return () => clearInterval(intervalId);
  }, [glowInterval]);

  // Reproducir sonido de hover aleatorio (para letras individuales)
  const playHoverSound = useCallback(() => {
    if (!audio?.hover) return;
    const randomSound =
      audio.hover[Math.floor(Math.random() * audio.hover.length)];
    randomSound.currentTime = 0;
    randomSound.play().catch(() => {});
  }, [audio]);

  // Reproducir sonido de click (para el botón completo)
  const playClickSound = useCallback(() => {
    if (!audio?.click) return;
    audio.click.currentTime = 0;
    audio.click.play().catch(() => {});
  }, [audio]);

  const letters = [..."pro", ..."blen¿"];

  return (
    <motion.div
      className={cn("relative cursor-pointer", className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={playClickSound} // Click en el contenedor principal
      role="button"
      aria-label="Problen¿ logo - clickable"
      tabIndex={0}
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000 ease-in-out",
          isGlowing ? "opacity-100" : "opacity-0"
        )}
        style={{
          boxShadow: `0 0 20px 2px ${glowColor}`,
          filter: "blur(10px)",
        }}
      />
      <div className="px-4 py-2">
        <div className="text-2xl font-bold tracking-tight flex items-center justify-center">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className={cn(
                "cursor-pointer transition-colors duration-200",
                index >= 3 ? "italic" : "",
                hoveredIndex === index ? "text-blue-600" : ""
              )}
              onHoverStart={() => {
                setHoveredIndex(index);
                playHoverSound(); // Sonido solo al hacer hover en letras
              }}
              onHoverEnd={() => setHoveredIndex(null)}
              // Eliminamos el onClick aquí para que no interfiera con el del contenedor
              animate={{
                scale: hoveredIndex === index ? 1.2 : 1,
                y: hoveredIndex === index ? -2 : 0,
                rotateX: hoveredIndex === index ? 10 : 0,
                rotateY: hoveredIndex === index ? 5 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 15,
              }}
              style={{
                display: "inline-block",
                transformOrigin: "center",
                transformStyle: "preserve-3d",
                textShadow:
                  hoveredIndex === index ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
              }}
              role="presentation"
              tabIndex={-1}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
