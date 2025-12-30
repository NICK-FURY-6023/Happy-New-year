"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const colors = [
  "rgba(236, 72, 153, 0.4)",  // pink
  "rgba(139, 92, 246, 0.4)",   // purple
  "rgba(99, 102, 241, 0.4)",   // indigo
  "rgba(245, 158, 11, 0.3)",   // amber
  "rgba(6, 182, 212, 0.3)",    // cyan
];

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    // Reduced to 8 particles for better performance
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 60 + 30,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 25 + 20,
        delay: Math.random() * 3,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, ${particle.color}, transparent 70%)`,
            filter: "blur(20px)",
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.6, 0.3, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
