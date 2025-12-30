"use client";

import { motion } from "framer-motion";
import { Heart, Star, Camera } from "lucide-react";

const memories = [
  { id: 1, emoji: "🌅", text: "First sunrise together", color: "from-orange-500/20 to-amber-500/20" },
  { id: 2, emoji: "🎭", text: "Laughing until we cried", color: "from-pink-500/20 to-rose-500/20" },
  { id: 3, emoji: "🌙", text: "Late night conversations", color: "from-indigo-500/20 to-purple-500/20" },
  { id: 4, emoji: "🎵", text: "Our favorite songs", color: "from-green-500/20 to-emerald-500/20" },
  { id: 5, emoji: "☕", text: "Coffee dates", color: "from-amber-500/20 to-yellow-500/20" },
  { id: 6, emoji: "🌧️", text: "Dancing in the rain", color: "from-blue-500/20 to-cyan-500/20" },
];

export default function MemoriesSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] via-[#08080f] to-[#0a0a0a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[800px] h-[400px] bg-gradient-radial from-purple-500/5 via-transparent to-transparent blur-3xl" />
      </div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Camera size={14} className="text-indigo-400" />
            <span className="text-xs text-white/60 uppercase tracking-wider">Memories</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold font-playfair mb-4">
            <span className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
              Moments We Cherish
            </span>
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Every moment with you becomes a beautiful memory
          </p>
        </motion.div>

        {/* Memories Grid - Apple Bento Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              className={`relative group rounded-2xl md:rounded-3xl p-6 bg-gradient-to-br ${memory.color} backdrop-blur-xl border border-white/5 overflow-hidden ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                <motion.span
                  className={`text-4xl ${index === 0 ? "md:text-6xl" : ""}`}
                  whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {memory.emoji}
                </motion.span>
                <p className={`text-white/80 font-medium mt-4 ${index === 0 ? "text-lg md:text-xl" : "text-sm"}`}>
                  {memory.text}
                </p>
              </div>

              {/* Corner decoration */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Floating hearts decoration */}
        <div className="flex justify-center mt-12 gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              <Heart
                size={16}
                className={`${i === 2 ? "text-pink-400 fill-pink-400" : "text-white/20"}`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
