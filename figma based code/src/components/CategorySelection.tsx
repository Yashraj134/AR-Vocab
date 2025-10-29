import { ArrowLeft, Smile, Apple, Home, Car, Palette, Music } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface CategorySelectionProps {
  onNavigate: (screen: string) => void;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { id: "animals", name: "Animals", icon: "🦁", color: "from-orange-400 to-red-500" },
  { id: "fruits", name: "Fruits", icon: "🍎", color: "from-red-400 to-pink-500" },
  { id: "objects", name: "Objects", icon: "⚽", color: "from-blue-400 to-cyan-500" },
  { id: "vehicles", name: "Vehicles", icon: "🚗", color: "from-green-400 to-emerald-500" },
  { id: "colors", name: "Colors", icon: "🎨", color: "from-purple-400 to-pink-500" },
  { id: "music", name: "Music", icon: "🎵", color: "from-yellow-400 to-orange-500" },
  { id: "home", name: "Home", icon: "🏠", color: "from-teal-400 to-blue-500" },
  { id: "emotions", name: "Emotions", icon: "😊", color: "from-pink-400 to-rose-500" },
];

export function CategorySelection({ onNavigate, onSelectCategory }: CategorySelectionProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-100 via-blue-50 to-pink-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-blue-600 p-4 shadow-lg">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => onNavigate("home")}
            variant="ghost"
            className="rounded-full w-12 h-12 bg-white/20 hover:bg-white/30 text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h2 className="text-white">Choose a Category</h2>
            <p className="text-sm text-white/80">What do you want to learn?</p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="p-6 grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            onClick={() => {
              onSelectCategory(category.id);
              onNavigate("learning");
            }}
            className={`p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border-0 bg-gradient-to-br ${category.color} flex flex-col items-center justify-center gap-3 h-40 active:scale-95`}
          >
            <div className="text-5xl">{category.icon}</div>
            <h3 className="text-white text-center">{category.name}</h3>
          </Card>
        ))}
      </div>

      {/* Fun Encouragement */}
      <div className="p-6 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 inline-block">
          <p className="text-purple-700">✨ Pick what excites you today!</p>
        </div>
      </div>
    </div>
  );
}
