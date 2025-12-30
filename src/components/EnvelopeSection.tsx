"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { envelopeContent } from "@/constants/data";
import { triggerHaptic } from "@/lib/utils";
import { soundManager } from "@/lib/sounds";

interface EnvelopeSectionProps {
  userName: string;
}

// Skyshot Rocket Component - Goes from bottom to top then bursts
const SkyshotRocket = ({ delay, x, color }: { delay: number; x: number; color: string }) => {
  const colors = {
    red: { trail: "#ff4444", burst: ["#ff6b6b", "#ff8787", "#ffa8a8"] },
    gold: { trail: "#ffd700", burst: ["#feca57", "#ffe066", "#fff3b0"] },
    blue: { trail: "#4dabf7", burst: ["#48dbfb", "#74c0fc", "#a5d8ff"] },
    pink: { trail: "#f06595", burst: ["#ff9ff3", "#faa2c1", "#ffdeeb"] },
    green: { trail: "#40c057", burst: ["#69db7c", "#8ce99a", "#b2f2bb"] },
    purple: { trail: "#7950f2", burst: ["#9775fa", "#b197fc", "#d0bfff"] },
  };
  
  const colorScheme = colors[color as keyof typeof colors] || colors.gold;

  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, bottom: 0 }}
    >
      {/* Rocket Trail - Goes up */}
      <motion.div
        className="relative"
        initial={{ y: 100, opacity: 0 }}
        animate={{ 
          y: [100, -350],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 1.2,
          delay: delay,
          repeat: Infinity,
          repeatDelay: 4 + Math.random() * 2,
          ease: [0.36, 0, 0.66, -0.56], // Accelerating upward
        }}
      >
        {/* Rocket head */}
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ 
            background: colorScheme.trail,
            boxShadow: `0 0 15px ${colorScheme.trail}, 0 0 30px ${colorScheme.trail}`,
          }}
        />
        {/* Trail */}
        <motion.div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-1"
          style={{
            background: `linear-gradient(to bottom, ${colorScheme.trail}, transparent)`,
            height: '60px',
          }}
        />
      </motion.div>

      {/* Burst Effect - Appears after rocket reaches top */}
      <motion.div
        className="absolute"
        style={{ top: -350, left: 0 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1, 1.2, 0],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 1.5,
          delay: delay + 1.1,
          repeat: Infinity,
          repeatDelay: 4 + Math.random() * 2,
          ease: "easeOut",
        }}
      >
        {/* Burst particles */}
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: colorScheme.burst[i % 3],
              boxShadow: `0 0 8px ${colorScheme.burst[i % 3]}, 0 0 16px ${colorScheme.burst[i % 3]}`,
            }}
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{
              x: Math.cos((i * 22.5 * Math.PI) / 180) * (50 + Math.random() * 30),
              y: Math.sin((i * 22.5 * Math.PI) / 180) * (50 + Math.random() * 30) + 20,
              scale: [1, 1.2, 0],
              opacity: [1, 0.8, 0],
            }}
            transition={{
              duration: 1.2,
              delay: delay + 1.1,
              repeat: Infinity,
              repeatDelay: 4 + Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
        {/* Inner sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`inner-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: '#fff',
              boxShadow: `0 0 4px #fff, 0 0 8px ${colorScheme.trail}`,
            }}
            initial={{ x: 0, y: 0 }}
            animate={{
              x: Math.cos((i * 45 * Math.PI) / 180) * 25,
              y: Math.sin((i * 45 * Math.PI) / 180) * 25,
              opacity: [1, 0],
            }}
            transition={{
              duration: 0.8,
              delay: delay + 1.15,
              repeat: Infinity,
              repeatDelay: 4 + Math.random() * 2,
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

  // Play fireworks sound repeatedly - sky rocket burst sounds
  const playFireworksSounds = useCallback(() => {
    if (!showFireworks) return;
    
    // Play sky rocket launch + burst sounds with staggered timing
    soundManager.play("fireworks");
    setTimeout(() => {
      soundManager.play("fireworks2");
    }, 800);
    setTimeout(() => {
      soundManager.play("fireworks3");
    }, 1600);
    setTimeout(() => {
      soundManager.play("fireworks");
    }, 2500);
  }, [showFireworks]);

  useEffect(() => {
    if (showFireworks) {
      playFireworksSounds();
      const interval = setInterval(playFireworksSounds, 4000);
      return () => clearInterval(interval);
    }
  }, [showFireworks, playFireworksSounds]);

  const openEnvelope = () => {
    if (isOpened) return;
    setIsOpened(true);
    triggerHaptic(100);
    
    setTimeout(() => {
      setShowLetter(true);
      setShowFireworks(true);
      
      // Play sweet celebration sounds together
      soundManager.play("magic");
      setTimeout(() => {
        soundManager.play("celebration");
      }, 300);
      
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
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#050510] via-[#0a0a20] to-[#050510]">
      {/* Sky Fireworks Animation - Skyshot rockets going from bottom to top */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Left side rockets */}
          <SkyshotRocket delay={0} x={8} color="red" />
          <SkyshotRocket delay={0.8} x={15} color="gold" />
          <SkyshotRocket delay={1.6} x={22} color="blue" />
          
          {/* Center-left rockets */}
          <SkyshotRocket delay={0.4} x={30} color="pink" />
          <SkyshotRocket delay={1.2} x={38} color="green" />
          
          {/* Center-right rockets */}
          <SkyshotRocket delay={0.6} x={62} color="purple" />
          <SkyshotRocket delay={1.4} x={70} color="gold" />
          
          {/* Right side rockets */}
          <SkyshotRocket delay={0.2} x={78} color="blue" />
          <SkyshotRocket delay={1.0} x={85} color="red" />
          <SkyshotRocket delay={1.8} x={92} color="pink" />
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
              initial={{ opacity: 0, scale: 0.85, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: 0.3, 
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1], // Apple's spring-like curve
              }}
            >
              {/* Premium Glass Card - Apple Style */}
              <motion.div 
                className="relative bg-gradient-to-br from-[#1a1a2e]/95 via-[#16162a]/98 to-[#0f0f1e]/95 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 max-w-md w-full border border-white/20 text-center overflow-hidden"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 100px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
                initial={{ rotateX: 15 }}
                animate={{ rotateX: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Animated gradient overlay */}
                <motion.div 
                  className="absolute inset-0 rounded-[2.5rem]"
                  style={{
                    background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1), rgba(245, 158, 11, 0.1))',
                  }}
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.05), rgba(245, 158, 11, 0.1))',
                      'linear-gradient(45deg, rgba(245, 158, 11, 0.1), rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.05))',
                      'linear-gradient(45deg, rgba(236, 72, 153, 0.05), rgba(245, 158, 11, 0.1), rgba(139, 92, 246, 0.15))',
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Personalized Name with special effect */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-base text-white/60 font-light tracking-widest uppercase">Dear</span>
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-200 via-rose-300 to-purple-300 bg-clip-text text-transparent font-playfair mt-2">
                      {userName} 💖
                    </h2>
                  </motion.div>
                  
                  <motion.h1
                    className="text-3xl md:text-4xl font-bold mb-6 font-playfair"
                    style={{
                      background: 'linear-gradient(135deg, #ffd700, #ffed4a, #ffd700)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))',
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {envelopeContent.finalMessage}
                  </motion.h1>
                  
                  <motion.p
                    className="text-white/90 text-lg mb-8 leading-relaxed font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    {envelopeContent.subMessage}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="pt-6 border-t border-white/10"
                  >
                    <p className="text-white/70 italic text-sm tracking-wide">{envelopeContent.signOff}</p>
                    <motion.p 
                      className="text-2xl font-bold mt-3"
                      style={{
                        background: 'linear-gradient(135deg, #c084fc, #e879f9, #f0abfc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                      animate={{ 
                        textShadow: [
                          '0 0 20px rgba(192, 132, 252, 0.5)',
                          '0 0 40px rgba(232, 121, 249, 0.5)',
                          '0 0 20px rgba(192, 132, 252, 0.5)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {envelopeContent.name}
                    </motion.p>
                  </motion.div>
                </div>
                
                {/* Corner decorations */}
                <motion.div
                  className="absolute top-6 right-6 text-2xl"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✨
                </motion.div>
                <motion.div
                  className="absolute bottom-6 left-6 text-2xl"
                  animate={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  🌟
                </motion.div>
                <motion.div
                  className="absolute top-6 left-6 text-xl opacity-60"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  💫
                </motion.div>
                <motion.div
                  className="absolute bottom-6 right-6 text-xl opacity-60"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  🎆
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
