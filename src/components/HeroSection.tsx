"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Fingerprint, Sparkles } from "lucide-react";
import { heroContent } from "@/constants/data";
import { triggerHaptic } from "@/lib/utils";
import { soundManager } from "@/lib/sounds";

interface HeroSectionProps {
  onComplete: (userName: string) => void;
}

export default function HeroSection({ onComplete }: HeroSectionProps) {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [userName, setUserName] = useState("");
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const holdStartTime = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mouse/Touch tracking for particles
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (showNameInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showNameInput]);

  const startScan = useCallback(() => {
    if (showNameInput) return;
    setIsScanning(true);
    holdStartTime.current = Date.now();
    triggerHaptic(50);

    progressInterval.current = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + 3;
        if (newProgress >= 100) {
          clearInterval(progressInterval.current!);
          setIsComplete(true);
          triggerHaptic(200);
          soundManager.play("success");
          // Show name input instead of completing
          setTimeout(() => setShowNameInput(true), 800);
          return 100;
        }
        // Haptic feedback at intervals
        if (newProgress % 25 === 0) {
          triggerHaptic(30);
        }
        return newProgress;
      });
    }, 50);
  }, [showNameInput]);

  const stopScan = useCallback(() => {
    if (progressInterval.current && !isComplete) {
      clearInterval(progressInterval.current);
      setIsScanning(false);
      setScanProgress(0);
    }
  }, [isComplete]);

  const handleNameSubmit = () => {
    if (userName.trim()) {
      triggerHaptic(100);
      soundManager.play("success");
      soundManager.playBackground();
      setTimeout(() => onComplete(userName.trim()), 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameSubmit();
    }
  };

  return (
    <motion.section
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl"
        style={{ x: springX, y: springY }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-4 font-playfair"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {heroContent.title}
        </motion.h1>
        <motion.p
          className="text-white/60 text-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {heroContent.subtitle}
        </motion.p>

        {/* Fingerprint Scanner */}
        <motion.div
          className="relative inline-flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
        >
          {/* Outer Ring */}
          <motion.div
            className="absolute w-40 h-40 rounded-full border-2 border-white/10"
            animate={isScanning ? { scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />

          {/* Progress Ring */}
          <svg className="absolute w-44 h-44 -rotate-90">
            <circle
              cx="88"
              cy="88"
              r="70"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="4"
              fill="none"
            />
            <motion.circle
              cx="88"
              cy="88"
              r="70"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * scanProgress) / 100}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Fingerprint Button */}
          <motion.button
            className={`w-32 h-32 rounded-full backdrop-blur-xl flex items-center justify-center transition-all duration-300 ${
              isComplete
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : isScanning
                ? "bg-white/20"
                : "bg-white/10 hover:bg-white/15"
            }`}
            style={{
              boxShadow: isScanning
                ? "0 0 60px rgba(99, 102, 241, 0.5)"
                : "0 0 30px rgba(99, 102, 241, 0.2)",
            }}
            onMouseDown={startScan}
            onMouseUp={stopScan}
            onMouseLeave={stopScan}
            onTouchStart={startScan}
            onTouchEnd={stopScan}
            whileHover={{ scale: 1.05 }}
            animate={isScanning ? { boxShadow: "0 0 80px rgba(99, 102, 241, 0.6)" } : {}}
          >
            <motion.div
              animate={
                isComplete
                  ? { scale: [1, 1.2, 1] }
                  : isScanning
                  ? { scale: [1, 0.9, 1] }
                  : {}
              }
              transition={{ duration: 0.5, repeat: isScanning && !isComplete ? Infinity : 0 }}
            >
              <Fingerprint
                size={48}
                className={`transition-colors duration-300 ${
                  isComplete ? "text-white" : isScanning ? "text-indigo-400" : "text-white/60"
                }`}
              />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Status Text */}
        {!showNameInput && (
          <motion.p
            className="mt-8 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {isComplete ? (
              <span className="text-green-400">{heroContent.accessGrantedText}</span>
            ) : isScanning ? (
              <span className="text-indigo-400">{heroContent.scanningText}</span>
            ) : (
              <span className="text-white/40">Hold to scan</span>
            )}
          </motion.p>
        )}

        {/* Name Input Modal */}
        <AnimatePresence>
          {showNameInput && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20 px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 w-full max-w-sm"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 20 }}
              >
                <motion.div
                  className="flex justify-center mb-6"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-12 h-12 text-yellow-400" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white text-center mb-2 font-playfair">
                  Welcome! ✨
                </h3>
                <p className="text-white/60 text-center mb-6 text-sm">
                  What should we call you?
                </p>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your name..."
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 text-center text-lg"
                />
                
                <motion.button
                  onClick={handleNameSubmit}
                  disabled={!userName.trim()}
                  className={`w-full mt-4 py-4 rounded-2xl font-semibold text-lg transition-all ${
                    userName.trim()
                      ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white"
                      : "bg-white/10 text-white/40 cursor-not-allowed"
                  }`}
                  whileHover={userName.trim() ? { scale: 1.02 } : {}}
                  whileTap={userName.trim() ? { scale: 0.98 } : {}}
                >
                  Continue →
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scanning Lines Effect */}
      {isScanning && !isComplete && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
              animate={{
                y: ["-100vh", "100vh"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}
