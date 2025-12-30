"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import { soundManager } from "@/lib/sounds";
import { Volume2, VolumeX } from "lucide-react";

// Lazy load heavy components for better performance
const RecapSection = dynamic(() => import("@/components/RecapSection"), { ssr: false });
const BucketListSection = dynamic(() => import("@/components/BucketListSection"), { ssr: false });
const TransitionSection = dynamic(() => import("@/components/TransitionSection"), { ssr: false });
const EnvelopeSection = dynamic(() => import("@/components/EnvelopeSection"), { ssr: false });
const CountdownTimer = dynamic(() => import("@/components/CountdownTimer"), { ssr: false });
const MemoriesSection = dynamic(() => import("@/components/MemoriesSection"), { ssr: false });
const PhotoGallery = dynamic(() => import("@/components/PhotoGallery"), { ssr: false });
const Snowfall = dynamic(() => import("@/components/Snowfall"), { ssr: false });
const ShareButton = dynamic(() => import("@/components/ShareButton"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

type Phase = "loading" | "hero" | "main" | "envelope";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [isMuted, setIsMuted] = useState(false);
  const [userName, setUserName] = useState("");

  const handlePreloaderComplete = () => {
    soundManager.init();
    // Auto-play background music after user interaction
    setTimeout(() => {
      soundManager.playBackground();
    }, 500);
    setPhase("hero");
  };

  const handleHeroComplete = (name: string) => {
    setUserName(name);
    setPhase("main");
  };

  const handleTransitionComplete = () => {
    setPhase("envelope");
  };

  const toggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <main className="bg-[#0a0a0a] min-h-screen overflow-x-hidden">
      {/* Snowfall Effect */}
      {phase !== "loading" && <Snowfall />}
      
      {/* Share Button */}
      {phase !== "loading" && <ShareButton />}
      
      {/* Sound Toggle Button */}
      {phase !== "loading" && (
        <motion.button
          className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
          onClick={toggleMute}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}

        {phase === "hero" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroSection onComplete={handleHeroComplete} />
          </motion.div>
        )}

        {phase === "main" && (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <CountdownTimer />
            <RecapSection userName={userName} />
            <MemoriesSection />
            <PhotoGallery />
            <BucketListSection />
            <TransitionSection onComplete={handleTransitionComplete} />
          </motion.div>
        )}

        {phase === "envelope" && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <EnvelopeSection userName={userName} />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
