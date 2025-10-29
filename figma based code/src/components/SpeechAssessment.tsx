import { ArrowLeft, Mic, SkipForward, X, Camera, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SpeechAssessmentProps {
  onNavigate: (screen: string) => void;
}

const assessmentWords = [
  { word: "Cat", emoji: "🐱", target: "cat" },
  { word: "Dog", emoji: "🐶", target: "dog" },
  { word: "Bird", emoji: "🐦", target: "bird" },
];

export function SpeechAssessment({ onNavigate }: SpeechAssessmentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<"great" | "tryagain" | null>(null);

  const currentWord = assessmentWords[currentIndex];

  const handleRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      // Simulate random feedback
      const isCorrect = Math.random() > 0.3;
      setFeedback(isCorrect ? "great" : "tryagain");
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
        setFeedback(null);
      }, 2000);
    }, 2000);
  };

  const handleNext = () => {
    if (currentIndex < assessmentWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setShowFeedback(false);
    setFeedback(null);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between p-4">
        <Button
          onClick={() => onNavigate("home")}
          variant="ghost"
          className="rounded-full w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
          <Mic className="w-5 h-5 text-white" />
          <span className="text-sm text-white">Speech Test</span>
        </div>
        <Button
          onClick={() => onNavigate("home")}
          variant="ghost"
          className="rounded-full w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        {/* Object Display */}
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative mb-8"
        >
          <div className="w-48 h-48 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/30 relative overflow-hidden">
            {/* AR Markers */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-400"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-400"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-400"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-400"></div>
            
            <motion.div
              animate={{ rotate: isRecording ? 360 : 0 }}
              transition={{ duration: 2, repeat: isRecording ? Infinity : 0, ease: "linear" }}
              className="text-8xl"
            >
              {currentWord.emoji}
            </motion.div>
          </div>
        </motion.div>

        {/* Word Display */}
        <div className="text-center mb-8">
          <p className="text-lg text-white/80 mb-2">Say this word:</p>
          <h2 className="text-white">{currentWord.word}</h2>
        </div>

        {/* Recording Button */}
        <motion.div
          animate={{
            scale: isRecording ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.5,
            repeat: isRecording ? Infinity : 0,
          }}
        >
          <Button
            onClick={handleRecord}
            disabled={isRecording}
            className={`w-24 h-24 rounded-full shadow-2xl border-4 border-white/50 transition-all ${
              isRecording
                ? "bg-gradient-to-br from-red-500 to-pink-600"
                : "bg-gradient-to-br from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
            }`}
          >
            <Mic className="w-12 h-12 text-white" />
          </Button>
        </motion.div>

        {isRecording && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white mt-4"
          >
            Listening...
          </motion.p>
        )}

        {/* Feedback Animation */}
        <AnimatePresence>
          {showFeedback && feedback && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className={`p-8 rounded-3xl shadow-2xl ${
                  feedback === "great"
                    ? "bg-gradient-to-br from-green-400 to-emerald-500"
                    : "bg-gradient-to-br from-yellow-400 to-orange-500"
                }`}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {feedback === "great" ? "🌟" : "🔄"}
                  </div>
                  <h2 className="text-white mb-2">
                    {feedback === "great" ? "Great Job!" : "Try Again!"}
                  </h2>
                  <p className="text-white/90">
                    {feedback === "great"
                      ? "You said it perfectly!"
                      : "You can do it! Try once more."}
                  </p>
                  <div className="flex justify-center gap-1 mt-4">
                    {feedback === "great" && (
                      <>
                        <motion.div
                          animate={{ y: [0, -20, 0] }}
                          transition={{ duration: 0.5, delay: 0 }}
                        >
                          ⭐
                        </motion.div>
                        <motion.div
                          animate={{ y: [0, -20, 0] }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          ⭐
                        </motion.div>
                        <motion.div
                          animate={{ y: [0, -20, 0] }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          ⭐
                        </motion.div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 bg-white/95 backdrop-blur-xl p-6 rounded-t-3xl">
        <div className="flex gap-3">
          <Button
            onClick={handleNext}
            className="flex-1 h-16 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg flex items-center justify-center gap-2 border-0"
          >
            <SkipForward className="w-6 h-6" />
            <span>Next Word</span>
          </Button>
        </div>

        {/* Progress */}
        <div className="flex justify-center gap-2 mt-4">
          {assessmentWords.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-gradient-to-r from-purple-500 to-pink-600"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
