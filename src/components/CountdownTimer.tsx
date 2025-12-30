"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const newYear = new Date("January 1, 2026 00:00:00").getTime();
      const now = new Date().getTime();
      const difference = newYear - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-gradient-radial from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <div className="text-center mb-12">
          <motion.p
            className="text-indigo-400 text-sm font-medium tracking-[0.3em] uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Countdown to
          </motion.p>
          <motion.h2
            className="text-5xl md:text-7xl font-bold font-playfair"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
              2026
            </span>
          </motion.h2>
        </div>

        {/* Timer Blocks - Apple Style */}
        <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Card */}
              <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/[0.08] overflow-hidden">
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Number */}
                <motion.div
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-center tabular-nums"
                  key={block.value}
                  initial={{ scale: 1.1, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                    {block.value.toString().padStart(2, "0")}
                  </span>
                </motion.div>

                {/* Label */}
                <p className="text-[10px] md:text-xs text-white/40 text-center mt-2 uppercase tracking-wider">
                  {block.label}
                </p>

                {/* Subtle glow on seconds */}
                {block.label === "Seconds" && (
                  <motion.div
                    className="absolute inset-0 bg-indigo-500/10 rounded-2xl md:rounded-3xl"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Line */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>

        {/* Message */}
        <motion.p
          className="text-center text-white/40 text-sm mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Every second counts when you&apos;re with the right person ✨
        </motion.p>
      </motion.div>
    </section>
  );
}
