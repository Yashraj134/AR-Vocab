import { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { CategorySelection } from "./components/CategorySelection";
import { ARLearning } from "./components/ARLearning";
import { SpeechAssessment } from "./components/SpeechAssessment";
import { ProgressScreen } from "./components/ProgressScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { HelpScreen } from "./components/HelpScreen";

type Screen = "home" | "categories" | "learning" | "assessment" | "progress" | "settings" | "help";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("animals");

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Mobile Container - Simulates a phone */}
      <div className="w-full max-w-md h-[800px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-800 relative">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl z-50"></div>
        
        {/* Screen Content */}
        <div className="h-full overflow-hidden">
          {currentScreen === "home" && <HomeScreen onNavigate={handleNavigate} />}
          {currentScreen === "categories" && (
            <CategorySelection onNavigate={handleNavigate} onSelectCategory={handleSelectCategory} />
          )}
          {currentScreen === "learning" && (
            <ARLearning onNavigate={handleNavigate} category={selectedCategory} />
          )}
          {currentScreen === "assessment" && <SpeechAssessment onNavigate={handleNavigate} />}
          {currentScreen === "progress" && <ProgressScreen onNavigate={handleNavigate} />}
          {currentScreen === "settings" && <SettingsScreen onNavigate={handleNavigate} />}
          {currentScreen === "help" && <HelpScreen onNavigate={handleNavigate} />}
        </div>
      </div>
    </div>
  );
}
