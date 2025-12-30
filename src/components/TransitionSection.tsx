"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { transitionContent } from "@/constants/data";
import { triggerHaptic } from "@/lib/utils";
import { soundManager } from "@/lib/sounds";

interface TransitionSectionProps {
  onComplete: () => void;
}

export default function TransitionSection({ onComplete }: TransitionSectionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTransition = () => {
    setIsTransitioning(true);
    triggerHaptic(100);
    soundManager.play("whoosh");
    setTimeout(onComplete, 3000);
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Warp Speed Effect */}
      {isTransitioning && (
        <motion.div className="absolute inset-0 z-20">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: 2,
                height: 2,
                left: "50%",
                top: "50%",
              }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * window.innerWidth * 2,
                y: (Math.random() - 0.5) * window.innerHeight * 2,
                opacity: 0,
                scaleX: 50,
              }}
              transition={{ duration: 2, ease: "easeIn", delay: Math.random() * 0.5 }}
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
          transition={{ delay: 1 }}
        >
          <motion.p
            className="text-2xl text-white font-light"
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

      {/* Background Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
          />
        ))}
      </div>
    </section>
  );
}
