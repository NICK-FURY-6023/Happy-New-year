"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { envelopeContent } from "@/constants/data";
import { triggerHaptic } from "@/lib/utils";
import { soundManager } from "@/lib/sounds";

interface EnvelopeSectionProps {
  userName: string;
}

export default function EnvelopeSection({ userName }: EnvelopeSectionProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const openEnvelope = () => {
    if (isOpened) return;
    setIsOpened(true);
    triggerHaptic(100);
    
    setTimeout(() => {
      setShowLetter(true);
      
      // Play celebration sound after a small delay
      setTimeout(() => {
        soundManager.play("celebration");
      }, 500);
      
      // Simple confetti burst - one time only
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"],
      });
    }, 1000);
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#050510] via-[#0a0a20] to-[#050510]">
      {/* Simple static stars instead of animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${5 + (i * 4.5)}%`,
              top: `${10 + ((i * 17) % 80)}%`,
            }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Premium Glass Card - Simple & Smooth */}
              <div 
                className="relative bg-gradient-to-br from-[#1a1a2e]/95 via-[#16162a]/98 to-[#0f0f1e]/95 backdrop-blur-xl rounded-3xl p-8 md:p-10 max-w-md w-full border border-white/20 text-center"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
                }}
              >
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Personalized Name */}
                  <div className="mb-8">
                    <span className="text-base text-white/60 font-light tracking-widest uppercase">Dear</span>
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-200 via-rose-300 to-purple-300 bg-clip-text text-transparent font-playfair mt-2">
                      {userName} 💖
                    </h2>
                  </div>
                  
                  {/* Year Transition - Static */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-white/30 line-through">
                      2025
                    </span>
                    <span className="text-2xl">→</span>
                    <span
                      className="text-3xl md:text-4xl font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      2026
                    </span>
                  </div>
                  
                  <h1
                    className="text-3xl md:text-4xl font-bold mb-6 font-playfair"
                    style={{
                      background: 'linear-gradient(135deg, #ffd700, #ffed4a, #ffd700)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))',
                    }}
                  >
                    {envelopeContent.finalMessage}
                  </h1>
                  
                  <p className="text-white/90 text-lg mb-6 leading-relaxed font-light">
                    {envelopeContent.subMessage}
                  </p>
                  
                  {/* Inspirational Quote */}
                  <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10">
                    <p className="text-white/70 text-sm italic leading-relaxed">
                      &ldquo;May this year bring you endless joy, love, and adventures. 
                      Here&apos;s to new beginnings and beautiful memories! 🌟&rdquo;
                    </p>
                  </div>
                  
                  {/* Wishes/Blessings - Static */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {["🎊 Joy", "💕 Love", "✨ Success", "🌈 Peace", "🎯 Dreams"].map((wish) => (
                      <span
                        key={wish}
                        className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white/80 border border-white/10 hover:bg-white/20 transition-colors duration-300"
                      >
                        {wish}
                      </span>
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-white/70 italic text-sm tracking-wide">{envelopeContent.signOff}</p>
                    <p 
                      className="text-2xl font-bold mt-3"
                      style={{
                        background: 'linear-gradient(135deg, #c084fc, #e879f9, #f0abfc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {envelopeContent.name}
                    </p>
                    
                    {/* Static Hearts */}
                    <div className="flex justify-center gap-1 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">💝</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Static corner decorations */}
                <div className="absolute top-6 right-6 text-2xl">✨</div>
                <div className="absolute bottom-6 left-6 text-2xl">🌟</div>
                <div className="absolute top-6 left-6 text-xl opacity-60">💫</div>
                <div className="absolute bottom-6 right-6 text-xl opacity-60">🎆</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
