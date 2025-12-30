"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { transitionContent } from "@/constants/data";
import { triggerHaptic } from "@/lib/utils";
import { soundManager } from "@/lib/sounds";
import { Rocket } from "lucide-react";

interface TransitionSectionProps {
  onComplete: () => void;
}

export default function TransitionSection({ onComplete }: TransitionSectionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Pre-calculate star positions for performance
  const stars = useMemo(() => 
    [...Array(40)].map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      delay: i * 0.02,
    })), []
  );

  const handleTransition = () => {
    setIsTransitioning(true);
    triggerHaptic(100);
    soundManager.play("whoosh");
    setTimeout(onComplete, 2500);
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0a0a15] to-[#0a0a0a]">
      {/* Warp Speed Effect - Optimized */}
      {isTransitioning && (
        <motion.div className="absolute inset-0 z-20 flex items-center justify-center">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute bg-white rounded-full"
              style={{
                width: 2,
                height: 2,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scaleX: 1 }}
              animate={{
                x: star.x,
                y: star.y,
                opacity: 0,
                scaleX: 30,
              }}
              transition={{ duration: 1.5, ease: "easeIn", delay: star.delay }}
            />
          ))}
        </motion.div>
      )}

      {/* Processing Text */}
      {isTransitioning && (
        <motion.div
          className="absolute z-30 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <Rocket className="w-8 h-8 text-indigo-400 mx-auto" />
          </motion.div>
          <motion.p
            className="text-xl text-white/80 font-light"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {transitionContent.processingText}
          </motion.p>
        </motion.div>
      )}

      {/* Main Content */}
      {!isTransitioning && (
        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready for 2026?
          </motion.h2>
          <motion.p
            className="text-white/60 mb-12 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Let&apos;s leave the past behind and embrace the future
          </motion.p>

          <motion.button
            className="relative px-10 py-5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-lg overflow-hidden group"
            onClick={handleTransition}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{transitionContent.buttonText}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)",
              }}
            />
          </motion.button>
        </motion.div>
      )}

      {/* Background Stars - Optimized */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
            style={{ left: `${(i * 7) % 100}%`, top: `${(i * 11) % 100}%` }}
          />
        ))}
      </div>
    </section>
  );
}
