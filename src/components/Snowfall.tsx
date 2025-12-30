"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: "snow" | "sparkle";
}

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    // Regular snowflakes
    for (let i = 0; i < 40; i++) {
      flakes.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.6 + 0.2,
        type: "snow",
      });
    }
    // Sparkles
    for (let i = 40; i < 60; i++) {
      flakes.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 8 + 6,
        duration: Math.random() * 15 + 12,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.8 + 0.2,
        type: "sparkle",
      });
    }
    setSnowflakes(flakes);
  }, []);

  const sparkleEmojis = ["✨", "⭐", "💫", "🌟"];

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute"
          style={{
            left: `${flake.x}%`,
            fontSize: flake.type === "sparkle" ? flake.size : undefined,
            width: flake.type === "snow" ? flake.size : undefined,
            height: flake.type === "snow" ? flake.size : undefined,
            opacity: flake.opacity,
            filter: flake.type === "snow" ? "blur(0.5px)" : undefined,
            background: flake.type === "snow" ? "white" : undefined,
            borderRadius: flake.type === "snow" ? "50%" : undefined,
          }}
          initial={{ y: -20 }}
          animate={{
            y: "100vh",
            x: [0, 30, -30, 0],
            rotate: flake.type === "sparkle" ? [0, 360] : undefined,
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {flake.type === "sparkle" && sparkleEmojis[flake.id % sparkleEmojis.length]}
        </motion.div>
      ))}
    </div>
  );
}
