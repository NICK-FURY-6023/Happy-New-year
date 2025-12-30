"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { recapCards } from "@/constants/data";

export default function BondCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 100,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full max-w-sm mx-auto perspective-1000"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 p-6"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glowing Border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />
        
        {/* Content */}
        <div className="relative z-10">
          <motion.h2
            className="text-2xl font-bold text-white mb-2 font-playfair"
            style={{ transform: "translateZ(50px)" }}
          >
            {recapCards.bondCard.title}
          </motion.h2>
          <motion.p
            className="text-white/60 mb-6"
            style={{ transform: "translateZ(30px)" }}
          >
            {recapCards.bondCard.subtitle}
          </motion.p>

          {/* Image Container with Parallax */}
          <motion.div
            className="relative aspect-square rounded-2xl overflow-hidden mb-6"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-pink-500/30" />
            <Image
              src={recapCards.bondCard.imageUrl}
              alt="Bond"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </motion.div>

          <motion.p
            className="text-white/80 text-sm leading-relaxed"
            style={{ transform: "translateZ(20px)" }}
          >
            {recapCards.bondCard.description}
          </motion.p>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}
