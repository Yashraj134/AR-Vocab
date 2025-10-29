import { ArrowLeft, Camera, Mic, Star, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HelpScreenProps {
  onNavigate: (screen: string) => void;
}

const tutorialSteps = [
  {
    id: 1,
    title: "Welcome to AR-Vocab!",
    description: "Learn new words with fun AR animations and improve your speech!",
    icon: "👋",
    color: "from-blue-400 to-purple-500",
  },
  {
    id: 2,
    title: "Choose a Category",
    description: "Pick what you want to learn: animals, fruits, objects, and more!",
    icon: "📚",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 3,
    title: "AR Learning Mode",
    description: "See 3D objects come to life! Tap to hear how to say each word.",
    icon: "📱",
    color: "from-green-400 to-teal-500",
  },
  {
    id: 4,
    title: "Practice Speaking",
    description: "Say the word into the microphone and get instant feedback!",
    icon: "🎤",
    color: "from-orange-400 to-red-500",
  },
  {
    id: 5,
    title: "Earn Rewards",
    description: "Collect stars, badges, and level up as you learn!",
    icon: "🌟",
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: 6,
    title: "Ready to Start?",
    description: "You're all set! Let's begin your learning adventure!",
    icon: "🚀",
    color: "from-pink-400 to-purple-500",
  },
];

export function HelpScreen({ onNavigate }: HelpScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onNavigate("home");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = tutorialSteps[currentStep];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-100 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => onNavigate("home")}
            variant="ghost"
            className="rounded-full w-12 h-12 bg-white/20 hover:bg-white/30 text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h2 className="text-white">Help & Tutorial</h2>
            <p className="text-sm text-white/80">Learn how to use AR-Vocab</p>
          </div>
        </div>
      </div>

      {/* Tutorial Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="w-full"
          >
            <Card className={`p-8 rounded-3xl bg-gradient-to-br ${step.color} shadow-2xl border-0 text-center`}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-8xl mb-6"
              >
                {step.icon}
              </motion.div>
              <h2 className="text-white mb-4">{step.title}</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                {step.description}
              </p>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        <div className="flex gap-2 mt-8">
          {tutorialSteps.map((_, index) => (
            <motion.div
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`h-3 rounded-full cursor-pointer transition-all ${
                index === currentStep
                  ? "w-8 bg-gradient-to-r from-purple-500 to-pink-500"
                  : "w-3 bg-gray-300"
              }`}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 w-full max-w-md">
          {currentStep > 0 && (
            <Button
              onClick={handlePrev}
              className="flex-1 h-14 rounded-2xl bg-white/80 hover:bg-white text-purple-600 shadow-lg border-0"
            >
              Previous
            </Button>
          )}
          <Button
            onClick={handleNext}
            className={`h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg border-0 ${
              currentStep === 0 ? "w-full" : "flex-1"
            }`}
          >
            {currentStep === tutorialSteps.length - 1 ? "Start Learning!" : "Next"}
          </Button>
        </div>
      </div>

      {/* Quick Tips Section */}
      <div className="p-6 bg-white border-t border-gray-200">
        <h3 className="text-gray-800 mb-4 text-center">Quick Tips</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 rounded-2xl bg-blue-50 border-0 text-center">
            <Camera className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-sm text-blue-700">Use good lighting for AR</p>
          </Card>
          <Card className="p-4 rounded-2xl bg-purple-50 border-0 text-center">
            <Mic className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="text-sm text-purple-700">Speak clearly</p>
          </Card>
          <Card className="p-4 rounded-2xl bg-green-50 border-0 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="text-sm text-green-700">Practice daily</p>
          </Card>
          <Card className="p-4 rounded-2xl bg-orange-50 border-0 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <p className="text-sm text-orange-700">Learn at your pace</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
