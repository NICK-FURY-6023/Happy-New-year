"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import RecapSection from "@/components/RecapSection";
import BucketListSection from "@/components/BucketListSection";
import TransitionSection from "@/components/TransitionSection";
import EnvelopeSection from "@/components/EnvelopeSection";
import { soundManager } from "@/lib/sounds";
import { Volume2, VolumeX } from "lucide-react";

type Phase = "loading" | "hero" | "main" | "envelope";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [isMuted, setIsMuted] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handlePreloaderComplete = () => {
    soundManager.init();
    setPhase("hero");
  };

  const handleHeroComplete = () => {
    setPhase("main");
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setPhase("envelope");
  };

  const toggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <main className="bg-[#0a0a0a] min-h-screen overflow-x-hidden">
      {/* Sound Toggle Button */}
      {phase !== "loading" && (
        <motion.button
          className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
          onClick={toggleMute}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}

        {phase === "hero" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeroSection onComplete={handleHeroComplete} />
          </motion.div>
        )}

        {phase === "main" && !showTransition && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RecapSection />
            <BucketListSection />
            <TransitionSection onComplete={handleTransitionComplete} />
          </motion.div>
        )}

        {phase === "envelope" && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <EnvelopeSection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
