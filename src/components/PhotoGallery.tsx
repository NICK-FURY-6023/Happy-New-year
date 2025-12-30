"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

const photos = [
  {
    id: 1,
    src: "/images/memory1.jpg",
    title: "Golden Moments",
    description: "Every sunset is better with you",
  },
  {
    id: 2,
    src: "/images/memory2.jpg",
    title: "Together Forever",
    description: "Friends who became family",
  },
  {
    id: 3,
    src: "/images/memory3.jpg",
    title: "Love Story",
    description: "Our journey together",
  },
  {
    id: 4,
    src: "/images/memory4.jpg",
    title: "Adventures",
    description: "Exploring the world hand in hand",
  },
  {
    id: 5,
    src: "/images/memory5.jpg",
    title: "Mountain Dreams",
    description: "Reaching new heights together",
  },
  {
    id: 6,
    src: "/images/memory6.jpg",
    title: "Nature's Beauty",
    description: "Finding peace in nature",
  },
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  const openPhoto = (id: number) => {
    setSelectedPhoto(id);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      const currentIndex = photos.findIndex((p) => p.id === selectedPhoto);
      const nextIndex = (currentIndex + 1) % photos.length;
      setSelectedPhoto(photos[nextIndex].id);
    }
  };

  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      const currentIndex = photos.findIndex((p) => p.id === selectedPhoto);
      const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
      setSelectedPhoto(photos[prevIndex].id);
    }
  };

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectedPhotoData = photos.find((p) => p.id === selectedPhoto);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] via-[#050510] to-[#0a0a0a] relative overflow-hidden">
      {/* Background blur orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-sm">📸</span>
            <span className="text-xs text-white/60 uppercase tracking-wider">Photo Gallery</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold font-playfair mb-4">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Our Photo Album
            </span>
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            A collection of our favorite moments together
          </p>
        </motion.div>

        {/* Apple-style Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl ${
                index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openPhoto(photo.id)}
            >
              {/* Image */}
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content on hover */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              >
                <h3 className="text-white font-semibold text-lg md:text-xl mb-1">
                  {photo.title}
                </h3>
                <p className="text-white/70 text-sm">{photo.description}</p>
              </motion.div>

              {/* Like button */}
              <motion.button
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/30 backdrop-blur-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => toggleLike(photo.id, e)}
              >
                <Heart
                  size={18}
                  className={`transition-colors ${
                    likedPhotos.has(photo.id)
                      ? "fill-red-500 text-red-500"
                      : "text-white"
                  }`}
                />
              </motion.button>

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Photo Viewer - Apple Style */}
      <AnimatePresence>
        {selectedPhoto !== null && selectedPhotoData && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
              onClick={closePhoto}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              onClick={closePhoto}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            {/* Navigation - Previous */}
            <motion.button
              className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              onClick={prevPhoto}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Navigation - Next */}
            <motion.button
              className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              onClick={nextPhoto}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>

            {/* Image Container */}
            <motion.div
              className="relative w-[90vw] h-[70vh] md:w-[80vw] md:h-[80vh] max-w-5xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Image
                src={selectedPhotoData.src}
                alt={selectedPhotoData.title}
                fill
                className="object-contain rounded-2xl"
              />
            </motion.div>

            {/* Photo Info */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-white text-xl md:text-2xl font-semibold mb-1">
                {selectedPhotoData.title}
              </h3>
              <p className="text-white/60 text-sm">{selectedPhotoData.description}</p>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {photos.map((photo) => (
                  <motion.button
                    key={photo.id}
                    className={`w-2 h-2 rounded-full transition-all ${
                      photo.id === selectedPhoto
                        ? "bg-white w-6"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    onClick={() => setSelectedPhoto(photo.id)}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
