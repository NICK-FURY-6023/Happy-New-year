"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { envelopeContent } from "@/constants/data";
import { triggerHaptic } from "@/lib/utils";
import { soundManager } from "@/lib/sounds";

interface EnvelopeSectionProps {
  userName: string;
}

// Firework component
const Firework = ({ delay, x }: { delay: number; x: number }) => {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, bottom: "20%" }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, -200, -250, -280],
      }}
      transition={{
        duration: 2,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeOut",
      }}
    >
      <motion.div
        className="relative"
        animate={{
          scale: [0, 1, 1.5, 0],
        }}
        transition={{
          duration: 2,
          delay: delay + 0.8,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeOut",
        }}
      >
        {/* Firework burst */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff", "#5f27cd"][i % 6],
              boxShadow: `0 0 10px ${["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff", "#5f27cd"][i % 6]}`,
            }}
            animate={{
              x: [0, Math.cos((i * 30 * Math.PI) / 180) * 60],
              y: [0, Math.sin((i * 30 * Math.PI) / 180) * 60],
              opacity: [1, 1, 0],
              scale: [1, 1.5, 0],
            }}
            transition={{
              duration: 1,
              delay: delay + 0.8,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default function EnvelopeSection({ userName }: EnvelopeSectionProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const openEnvelope = () => {
    if (isOpened) return;
    setIsOpened(true);
    triggerHaptic(100);
    
    setTimeout(() => {
      setShowLetter(true);
      setShowFireworks(true);
      soundManager.play("confetti");
      soundManager.play("fireworks");
      
      // Confetti explosion
      const duration = 5000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }, 1000);
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]">
      {/* Sky Fireworks Animation */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Firework delay={0} x={15} />
          <Firework delay={0.5} x={30} />
          <Firework delay={1} x={50} />
          <Firework delay={0.3} x={70} />
          <Firework delay={0.8} x={85} />
          <Firework delay={1.5} x={25} />
          <Firework delay={2} x={75} />
          <Firework delay={1.2} x={40} />
          <Firework delay={0.7} x={60} />
        </div>
      )}
      
      {/* Background Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${["#6366f1", "#8b5cf6", "#ec4899"][i % 3]}, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [-20, 20, -20], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Envelope */}
        <motion.div
          className="relative cursor-pointer"
          onClick={openEnvelope}
          whileHover={!isOpened ? { scale: 1.02 } : {}}
          whileTap={!isOpened ? { scale: 0.98 } : {}}
        >
          {/* Envelope Body */}
          <motion.div
            className="relative w-80 h-52 md:w-96 md:h-64"
            style={{ perspective: 1000 }}
          >
            {/* Back */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-2xl" />

            {/* Inner Shadow */}
            <div className="absolute inset-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded" />

            {/* Flap */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-28 md:h-32 origin-top"
              style={{ transformStyle: "preserve-3d" }}
              animate={isOpened ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Flap Front */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-amber-200 to-amber-300"
                style={{
                  clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                  backfaceVisibility: "hidden",
                }}
              />
              {/* Flap Back */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-amber-100 to-amber-200"
                style={{
                  clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                  transform: "rotateX(180deg)",
                  backfaceVisibility: "hidden",
                }}
              />
            </motion.div>

            {/* Wax Seal */}
            <AnimatePresence>
              {!isOpened && (
                <motion.div
                  className="absolute top-16 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg z-10"
                  exit={{ scale: 0, rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-2xl">💕</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Front Fold */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-300 to-amber-200 rounded-b-lg"
              style={{ clipPath: "polygon(0 100%, 50% 30%, 100% 100%)" }}
            />
          </motion.div>

          {/* Tap Text */}
          {!isOpened && (
            <motion.p
              className="text-center mt-8 text-white/60"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {envelopeContent.tapText}
            </motion.p>
          )}
        </motion.div>

        {/* Letter Content */}
        <AnimatePresence>
          {showLetter && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center px-4"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            >
              {/* Premium Glass Card - Apple Style */}
              <div className="relative bg-gradient-to-br from-black/80 via-[#1a0a2e]/90 to-black/80 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 max-w-md w-full border border-white/30 text-center shadow-2xl shadow-purple-500/20 overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 via-transparent to-pink-500/20 rounded-[2rem]" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Personalized Name with special effect */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <span className="text-lg text-indigo-300 font-light">Dear</span>
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-300 via-rose-400 to-purple-400 bg-clip-text text-transparent font-playfair mt-1 drop-shadow-lg">
                      {userName} 💖
                    </h2>
                  </motion.div>
                  
                  <motion.h1
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent mb-6 font-playfair drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {envelopeContent.finalMessage}
                  </motion.h1>
                  
                  <motion.p
                    className="text-white text-lg mb-8 leading-relaxed font-light drop-shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {envelopeContent.subMessage}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="pt-6 border-t border-white/20"
                  >
                    <p className="text-white/90 italic text-sm drop-shadow-md">{envelopeContent.signOff}</p>
                    <p className="text-2xl font-bold mt-3 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-lg">{envelopeContent.name}</p>
                  </motion.div>
                </div>
                
                {/* Decorative sparkles */}
                <motion.div
                  className="absolute top-4 right-4 text-2xl"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ✨
                </motion.div>
                <motion.div
                  className="absolute bottom-4 left-4 text-2xl"
                  animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  🌟
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
