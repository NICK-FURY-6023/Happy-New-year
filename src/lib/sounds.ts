"use client";

import { Howl } from "howler";
import { soundEffects } from "@/constants/data";

class SoundManager {
  private sounds: Map<string, Howl> = new Map();
  private initialized = false;
  private backgroundMusic: Howl | null = null;
  private isMuted = false;

  init() {
    if (this.initialized || typeof window === "undefined") return;

    // Preload all sound effects
    Object.entries(soundEffects).forEach(([key, url]) => {
      const sound = new Howl({
        src: [url],
        volume: key === "background" ? 0.4 : key === "fireworks" ? 0.6 : 0.5,
        loop: key === "background",
        preload: true,
        html5: key === "background" || key === "fireworks",
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
    const sound = this.sounds.get(soundName);
    if (sound) {
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
