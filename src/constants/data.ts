// ============================================
// 🎯 CUSTOMIZE YOUR WEBSITE HERE
// Change these values to personalize your experience
// ============================================

export const siteConfig = {
  title: "The 2026 Cinematic Journey",
  description: "An immersive journey from 2025 to 2026",
};

// Hero Section Content
export const heroContent = {
  title: "Welcome to Our Journey",
  subtitle: "Place your finger to unlock memories",
  accessGrantedText: "Access Granted",
  scanningText: "Scanning...",
};

// Loading Screen Messages
export const loadingMessages = [
  "Loading Memories...",
  "Syncing Vibes...",
  "Gathering Stardust...",
  "Ready for 2026",
];

// Recap Cards Content
export const recapCards = {
  bondCard: {
    title: "The Bond",
    subtitle: "Forever & Always",
    description: "Through every moment, every smile, every tear - we grew stronger together.",
    // Replace with your actual image URL
    imageUrl: "/images/couple.jpg",
  },
  statsCard: {
    title: "365 Days of Us",
    stats: [
      { label: "Days Together", value: 365, suffix: "" },
      { label: "Memories Made", value: 1000, suffix: "+" },
      { label: "Smiles Shared", value: 9999, suffix: "+" },
      { label: "Adventures", value: 52, suffix: "" },
      { label: "Movies Watched", value: 48, suffix: "" },
      { label: "Late Night Calls", value: 200, suffix: "+" },
    ],
  },
  musicCard: {
    title: "Our Soundtrack",
    subtitle: "The songs that defined us",
    // Replace with your actual song
    song: {
      title: "Perfect",
      artist: "Ed Sheeran",
      albumArt: "/images/album.jpg",
      // Add your audio file in public/audio/
      audioUrl: "/audio/song.mp3",
    },
  },
};

// Bucket List Items
export const bucketListItems = [
  { id: 1, text: "Watch sunrise together 🌅", completed: false },
  { id: 2, text: "Go to the mountains ⛰️", completed: false },
  { id: 3, text: "Have a midnight picnic 🌙", completed: false },
  { id: 4, text: "Take a spontaneous trip ✈️", completed: false },
  { id: 5, text: "Learn something new together 📚", completed: false },
  { id: 6, text: "Cook a fancy dinner 🍝", completed: false },
  { id: 7, text: "Stargaze all night ⭐", completed: false },
  { id: 8, text: "Write letters to each other 💌", completed: false },
];

// Transition Section
export const transitionContent = {
  buttonText: "Lock 2025 & Open 2026",
  processingText: "Processing your happiness...",
};

// Final Message in Envelope
export const envelopeContent = {
  tapText: "Tap to Open",
  finalMessage: "Happy New Year 2026!",
  subMessage: "You are my favorite part of every year. Here's to another 365 days of us! 💕",
  signOff: "With all my love,",
  name: "Your Name", // Replace with your name
};

// Sound Effects URLs (place files in public/audio/)
export const soundEffects = {
  click: "/audio/click.mp3",
  success: "/audio/success.mp3",
  ding: "/audio/ding.mp3",
  whoosh: "/audio/whoosh.mp3",
  confetti: "/audio/confetti.mp3",
  scan: "/audio/scan.mp3",
  background: "/audio/background.mp3",
};

// Colors (Cosmic Love Theme)
export const colors = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  accent: "#ec4899",
  background: "#0a0a0a",
  surface: "rgba(255, 255, 255, 0.05)",
  border: "rgba(255, 255, 255, 0.1)",
  text: "#ffffff",
  textMuted: "rgba(255, 255, 255, 0.6)",
};
