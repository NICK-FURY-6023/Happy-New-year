"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from "lucide-react";
import { recapCards } from "@/constants/data";

export default function MusicCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Format time to mm:ss
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(recapCards.musicCard.song.audioUrl);
    audioRef.current.volume = 0.7;
    
    audioRef.current.addEventListener("error", () => {
      setAudioError(true);
    });

    audioRef.current.addEventListener("loadedmetadata", () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    });

    audioRef.current.addEventListener("timeupdate", () => {
      if (audioRef.current && !isDragging) {
        const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(isNaN(currentProgress) ? 0 : currentProgress);
        setCurrentTime(audioRef.current.currentTime);
      }
    });

    audioRef.current.addEventListener("ended", () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isDragging]);

  // Handle seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || audioError || !progressBarRef.current) return;
    
    // Check if duration is valid before seeking
    const audioDuration = audioRef.current.duration;
    if (!audioDuration || !isFinite(audioDuration) || audioDuration <= 0) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    
    const newTime = (clampedPercentage / 100) * audioDuration;
    if (isFinite(newTime)) {
      audioRef.current.currentTime = newTime;
      setProgress(clampedPercentage);
      setCurrentTime(newTime);
    }
  };

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleSeek(e);
  };

  // Handle drag
  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleSeek(e);
    }
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Add global mouse up listener for drag end
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };
    
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging]);

  const togglePlay = () => {
    if (!audioRef.current || audioError) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setAudioError(true));
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
            {audioError && (
              <p className="text-amber-400/80 text-xs mt-2 flex items-center justify-center gap-1">
                <Music size={12} />
                Add song.mp3 to /public/audio/
              </p>
            )}
          </div>

          {/* Progress Bar with Timestamp */}
          <div className="mb-4">
            {/* Time Labels */}
            <div className="flex justify-between text-xs text-white/50 mb-2 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            {/* Seekable Progress Bar */}
            <div 
              ref={progressBarRef}
              className="relative h-2 bg-white/10 rounded-full overflow-visible cursor-pointer group"
              onClick={handleSeek}
              onMouseDown={handleDragStart}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              {/* Progress Fill */}
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: isDragging ? 0 : 0.1 }}
              />
              
              {/* Draggable Thumb */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-green-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ left: `calc(${progress}% - 8px)` }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
              
              {/* Glow effect on hover */}
              <div 
                className="absolute top-0 left-0 h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ 
                  width: `${progress}%`,
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
                }}
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
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg ${
                audioError 
                  ? "bg-white/20 shadow-none cursor-not-allowed" 
                  : "bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-500/30"
              }`}
              whileTap={audioError ? {} : { scale: 0.9 }}
              whileHover={audioError ? {} : { scale: 1.05 }}
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
          {isPlaying && !audioError && (
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
