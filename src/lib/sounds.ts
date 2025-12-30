"use client";

import { Howl } from "howler";
import { soundEffects } from "@/constants/data";

class SoundManager {
  private sounds: Map<string, Howl> = new Map();
  private initialized = false;
  private backgroundMusic: Howl | null = null;
  private isMuted = false;
  private currentlyPlaying: Set<string> = new Set();

  init() {
    if (this.initialized || typeof window === "undefined") return;

    // Preload all sound effects with lower volumes
    Object.entries(soundEffects).forEach(([key, url]) => {
      const isFirework = key.startsWith("fireworks");
      const sound = new Howl({
        src: [url],
        volume: key === "background" ? 0.25 : isFirework ? 0.4 : 0.3,
        loop: key === "background",
        preload: true,
        html5: key === "background",
        onend: () => {
          this.currentlyPlaying.delete(key);
        },
      });

      this.sounds.set(key, sound);

      if (key === "background") {
        this.backgroundMusic = sound;
      }
    });

    this.initialized = true;
  }

  play(soundName: keyof typeof soundEffects) {
    if (this.isMuted) return;
    
    // Don't play if already playing (prevents overlap)
    if (this.currentlyPlaying.has(soundName)) return;
    
    // Don't play more than 2 sounds at once (excluding background)
    const activeSounds = Array.from(this.currentlyPlaying).filter(s => s !== "background");
    if (activeSounds.length >= 2) return;
    
    const sound = this.sounds.get(soundName);
    if (sound) {
      this.currentlyPlaying.add(soundName);
      sound.play();
    }
  }

  playBackground() {
    if (this.isMuted) return;
    if (this.backgroundMusic && !this.backgroundMusic.playing()) {
      this.backgroundMusic.play();
    }
  }

  stopBackground() {
    if (this.backgroundMusic) {
      this.backgroundMusic.stop();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBackground();
    } else {
      this.playBackground();
    }
    return this.isMuted;
  }

  getMuted() {
    return this.isMuted;
  }
}

export const soundManager = new SoundManager();
