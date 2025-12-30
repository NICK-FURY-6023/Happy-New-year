"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { recapCards } from "@/constants/data";
import { Howl } from "howler";

export default function MusicCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const soundRef = useRef<Howl | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [recapCards.musicCard.song.audioUrl],
      html5: true,
      volume: 0.7,
      onend: () => {
        setIsPlaying(false);
        setProgress(0);
      },
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const togglePlay = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    } else {
      soundRef.current.play();
      progressInterval.current = setInterval(() => {
        if (soundRef.current) {
          const seek = soundRef.current.seek() as number;
          const duration = soundRef.current.duration();
          setProgress((seek / duration) * 100);
        }
      }, 100);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 p-6">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10" />

        {/* Content */}
        <div className="relative z-10">
          <motion.h2
            className="text-xl font-bold text-white mb-1 font-playfair"
          >
            {recapCards.musicCard.title}
          </motion.h2>
          <p className="text-white/60 text-sm mb-6">{recapCards.musicCard.subtitle}</p>

          {/* Album Art - Vinyl Style */}
          <div className="relative flex justify-center mb-6">
            {/* Vinyl Record */}
            <motion.div
              className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-gray-900 to-gray-800"
              style={{ left: "calc(50% + 20px)", transform: "translateX(-50%)" }}
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-600" />
              <div className="absolute inset-[45%] rounded-full bg-gray-900" />
              {/* Grooves */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-gray-600/30"
                  style={{
                    inset: `${20 + i * 8}%`,
                  }}
                />
              ))}
            </motion.div>

            {/* Album Cover */}
            <motion.div
              className="relative w-32 h-32 rounded-lg overflow-hidden shadow-2xl z-10"
              animate={isPlaying ? { rotate: [0, 2, -2, 0] } : {}}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Image
                src={recapCards.musicCard.song.albumArt}
                alt="Album Art"
                fill
                className="object-cover"
              />
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
            </motion.div>
          </div>

          {/* Song Info */}
          <div className="text-center mb-4">
            <h3 className="text-white font-semibold">{recapCards.musicCard.song.title}</h3>
            <p className="text-white/60 text-sm">{recapCards.musicCard.song.artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <motion.button
              className="text-white/60 hover:text-white transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <SkipBack size={24} />
            </motion.button>

            <motion.button
              className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </motion.button>

            <motion.button
              className="text-white/60 hover:text-white transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <SkipForward size={24} />
            </motion.button>
          </div>

          {/* Audio Visualizer */}
          {isPlaying && (
            <div className="flex items-end justify-center gap-1 mt-4 h-8">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-green-500 to-emerald-400 rounded-full"
                  animate={{
                    height: [8, Math.random() * 24 + 8, 8],
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Volume Icon */}
        <motion.div
          className="absolute top-4 right-4 text-white/40"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Volume2 size={20} />
        </motion.div>
      </div>
    </motion.div>
  );
}
