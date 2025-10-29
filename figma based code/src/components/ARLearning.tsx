import { ArrowLeft, Volume2, SkipForward, X, Camera, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface ARLearningProps {
  onNavigate: (screen: string) => void;
  category: string;
}

const categoryWords = {
  animals: [
    { word: "Lion", emoji: "🦁", pronunciation: "/ˈlaɪ.ən/" },
    { word: "Elephant", emoji: "🐘", pronunciation: "/ˈel.ɪ.fənt/" },
    { word: "Monkey", emoji: "🐵", pronunciation: "/ˈmʌŋ.ki/" },
  ],
  fruits: [
    { word: "Apple", emoji: "🍎", pronunciation: "/ˈæp.əl/" },
    { word: "Banana", emoji: "🍌", pronunciation: "/bəˈnæn.ə/" },
    { word: "Orange", emoji: "🍊", pronunciation: "/ˈɔːr.ɪndʒ/" },
  ],
  default: [
    { word: "Ball", emoji: "⚽", pronunciation: "/bɔːl/" },
    { word: "Book", emoji: "📚", pronunciation: "/bʊk/" },
    { word: "Toy", emoji: "🧸", pronunciation: "/tɔɪ/" },
  ],
};

export function ARLearning({ onNavigate, category }: ARLearningProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  const words = categoryWords[category as keyof typeof categoryWords] || categoryWords.default;
  const currentWord = words[currentIndex];

  const handlePlaySound = () => {
    setIsPlaying(true);
    setShowSparkle(true);
    setTimeout(() => {
      setIsPlaying(false);
      setShowSparkle(false);
    }, 1000);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 relative overflow-hidden">
      {/* Simulated Camera Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500 rounded-full blur-3xl"></div>
        </div>
        {/* Grid Overlay for AR feel */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between p-4">
        <Button
          onClick={() => onNavigate("categories")}
          variant="ghost"
          className="rounded-full w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
          <Camera className="w-5 h-5 text-white" />
          <span className="text-sm text-white">AR Mode</span>
        </div>
        <Button
          onClick={() => onNavigate("home")}
          variant="ghost"
          className="rounded-full w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* 3D Object (Emoji) with AR Effect */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <motion.div
          key={currentIndex}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative"
        >
          {showSparkle && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 2, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute -inset-8"
            >
              <Sparkles className="w-full h-full text-yellow-400" />
            </motion.div>
          )}
          <div className="w-48 h-48 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/30 relative overflow-hidden">
            {/* AR Corner Markers */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-cyan-400"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-cyan-400"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-cyan-400"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-cyan-400"></div>
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-8xl"
            >
              {currentWord.emoji}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Word Info Card */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 bg-white/95 backdrop-blur-xl rounded-t-3xl p-6 shadow-2xl"
      >
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 mb-1">Say this word:</p>
          <h2 className="text-purple-600 mb-2">{currentWord.word}</h2>
          <p className="text-sm text-gray-600">{currentWord.pronunciation}</p>
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={handlePlaySound}
            className="h-16 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-1 border-0"
            disabled={isPlaying}
          >
            <Volume2 className="w-6 h-6" />
            <span className="text-xs">Repeat</span>
          </Button>

          <Button
            onClick={handleNext}
            className="h-16 bg-gradient-to-br from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-1 border-0"
          >
            <SkipForward className="w-6 h-6" />
            <span className="text-xs">Next</span>
          </Button>

          <Button
            onClick={() => onNavigate("home")}
            className="h-16 bg-gradient-to-br from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-1 border-0"
          >
            <X className="w-6 h-6" />
            <span className="text-xs">Exit</span>
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {words.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-gradient-to-r from-blue-500 to-purple-600"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
