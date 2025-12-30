"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { bucketListItems } from "@/constants/data";
import { triggerHaptic } from "@/lib/utils";
import { soundManager } from "@/lib/sounds";

interface BucketItem {
  id: number;
  text: string;
  completed: boolean;
}

export default function BucketListSection() {
  const [items, setItems] = useState<BucketItem[]>(bucketListItems);

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    triggerHaptic(30);
    soundManager.play("ding");
  };

  const completedCount = items.filter((item) => item.completed).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-b from-[#0a0a0a] via-[#0a0f1a] to-[#0a0a0a]">
      <div className="max-w-md mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-playfair">
            2026 Bucket List
          </h2>
          <p className="text-white/60 mb-6">Things we want to do together</p>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-white/40 text-sm mt-2">
            {completedCount} of {items.length} completed
          </p>
        </motion.div>

        {/* Bucket List Items */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.button
                className={`w-full p-5 rounded-2xl backdrop-blur-xl border transition-all duration-300 text-left flex items-center gap-4 group ${
                  item.completed
                    ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
                onClick={() => toggleItem(item.id)}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Checkbox */}
                <motion.div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    item.completed
                      ? "bg-gradient-to-r from-amber-400 to-orange-500"
                      : "border-2 border-white/30 group-hover:border-white/50"
                  }`}
                  animate={item.completed ? { scale: [1, 1.2, 1] } : {}}
                >
                  <AnimatePresence>
                    {item.completed && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                      >
                        <Check size={14} className="text-white" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Text */}
                <div className="flex-1 relative">
                  <span
                    className={`text-lg transition-colors ${
                      item.completed ? "text-white/60" : "text-white"
                    }`}
                  >
                    {item.text}
                  </span>
                  {/* Strike-through animation */}
                  <AnimatePresence>
                    {item.completed && (
                      <motion.div
                        className="absolute left-0 top-1/2 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Sparkle on complete */}
                <AnimatePresence>
                  {item.completed && (
                    <motion.div
                      className="text-amber-400"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      ✨
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Motivational Message */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {completedCount === items.length ? (
            <motion.p
              className="text-xl text-amber-400 font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🎉 All goals unlocked! Let&apos;s make it happen!
            </motion.p>
          ) : (
            <p className="text-white/40">
              Check off the things you want to do in 2026!
            </p>
          )}
        </motion.div>

        {/* Floating Decorative Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full"
              style={{
                background: `radial-gradient(circle, ${
                  i % 2 === 0 ? "rgba(251, 191, 36, 0.05)" : "rgba(249, 115, 22, 0.05)"
                }, transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
