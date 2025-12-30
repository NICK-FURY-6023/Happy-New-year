"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="relative py-8 bg-gradient-to-t from-black via-[#0a0a0a] to-transparent"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Decorative Line */}
        <motion.div
          className="w-24 h-[1px] mx-auto mb-6 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Made with Love */}
        <motion.div
          className="flex items-center justify-center gap-2 text-white/50 text-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span>Made with</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          </motion.div>
          <span>by</span>
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
            ₦ł₵₭ ₣ɄⱤɎ ⚒
          </span>
        </motion.div>

        {/* Year & Wishes */}
        <motion.p
          className="mt-4 text-white/30 text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Wishing you a magical {currentYear + 1} ✨
        </motion.p>

        {/* Animated Stars */}
        <div className="flex justify-center gap-4 mt-6">
          {["⭐", "✨", "💫", "🌟", "✨"].map((star, i) => (
            <motion.span
              key={i}
              className="text-sm opacity-40"
              animate={{ 
                y: [0, -5, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.2,
              }}
            >
              {star}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
