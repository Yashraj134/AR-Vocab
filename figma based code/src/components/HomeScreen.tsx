import { Star, Sparkles, BookOpen, Award, Settings, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-100 via-purple-50 to-pink-50 p-6 overflow-y-auto">
      {/* Header Section with Avatar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center shadow-lg ring-4 ring-white">
            <span className="text-3xl">😊</span>
          </div>
          <div>
            <h2 className="text-white drop-shadow-md">Hi, Alex!</h2>
            <p className="text-sm text-purple-700">Keep learning!</p>
          </div>
        </div>
        <Button
          onClick={() => onNavigate("settings")}
          className="rounded-full w-12 h-12 bg-white shadow-lg hover:shadow-xl transition-all"
          variant="ghost"
        >
          <Settings className="w-6 h-6 text-purple-600" />
        </Button>
      </div>

      {/* Stats Card */}
      <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl border-0">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-2 shadow-lg">
              <Star className="w-8 h-8 text-white fill-white" />
            </div>
            <p className="text-sm text-gray-600">Stars</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-2 shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-gray-600">Badges</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center mb-2 shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-gray-600">Level</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Today's Progress</span>
            <span className="text-sm text-purple-600">3/5 lessons</span>
          </div>
          <Progress value={60} className="h-3 rounded-full" />
        </div>

        {/* Badges */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-md">
            🦁 Animal Master
          </Badge>
          <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full shadow-md">
            🍎 Fruit Expert
          </Badge>
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-md">
            ⭐ 7-Day Streak
          </Badge>
        </div>
      </Card>

      {/* Main Navigation Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button
          onClick={() => onNavigate("categories")}
          className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-0 flex flex-col items-center justify-center gap-2"
        >
          <BookOpen className="w-10 h-10" />
          <span className="text-lg">Learn</span>
        </Button>

        <Button
          onClick={() => onNavigate("assessment")}
          className="h-32 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-0 flex flex-col items-center justify-center gap-2"
        >
          <Sparkles className="w-10 h-10" />
          <span className="text-lg">Practice</span>
        </Button>

        <Button
          onClick={() => onNavigate("progress")}
          className="h-32 bg-gradient-to-br from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-0 flex flex-col items-center justify-center gap-2"
        >
          <Award className="w-10 h-10" />
          <span className="text-lg">Rewards</span>
        </Button>

        <Button
          onClick={() => onNavigate("help")}
          className="h-32 bg-gradient-to-br from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-0 flex flex-col items-center justify-center gap-2"
        >
          <span className="text-4xl">❓</span>
          <span className="text-lg">Help</span>
        </Button>
      </div>

      {/* Fun Message */}
      <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl">
        <p className="text-sm text-purple-700">🌟 You're doing amazing! Keep it up!</p>
      </div>
    </div>
  );
}
