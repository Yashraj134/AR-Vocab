import { ArrowLeft, Star, Trophy, Zap, Award, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { motion } from "motion/react";

interface ProgressScreenProps {
  onNavigate: (screen: string) => void;
}

const badges = [
  { name: "First Word", icon: "🎯", earned: true, color: "from-blue-400 to-blue-600" },
  { name: "5-Day Streak", icon: "🔥", earned: true, color: "from-orange-400 to-red-600" },
  { name: "Animal Expert", icon: "🦁", earned: true, color: "from-green-400 to-emerald-600" },
  { name: "Perfect Score", icon: "⭐", earned: true, color: "from-yellow-400 to-orange-600" },
  { name: "Speed Learner", icon: "⚡", earned: false, color: "from-purple-400 to-pink-600" },
  { name: "Master Speaker", icon: "🎤", earned: false, color: "from-cyan-400 to-blue-600" },
];

const weeklyProgress = [
  { day: "Mon", score: 80 },
  { day: "Tue", score: 65 },
  { day: "Wed", score: 90 },
  { day: "Thu", score: 75 },
  { day: "Fri", score: 95 },
  { day: "Sat", score: 85 },
  { day: "Sun", score: 70 },
];

export function ProgressScreen({ onNavigate }: ProgressScreenProps) {
  const maxScore = Math.max(...weeklyProgress.map(d => d.score));

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-100 via-pink-50 to-orange-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-pink-600 p-4 shadow-lg">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => onNavigate("home")}
            variant="ghost"
            className="rounded-full w-12 h-12 bg-white/20 hover:bg-white/30 text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h2 className="text-white">Your Progress</h2>
            <p className="text-sm text-white/80">Look how much you've learned!</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 border-0 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <p className="text-sm text-white/90">Total Stars</p>
                <p className="text-white">247</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 border-0 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <p className="text-sm text-white/90">Streak</p>
                <p className="text-white">7 Days</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl bg-gradient-to-br from-green-400 to-teal-600 border-0 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/90">Level</p>
                <p className="text-white">Level 5</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-600 border-0 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/90">Badges</p>
                <p className="text-white">4 / 6</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Weekly Progress Chart */}
        <Card className="p-6 rounded-3xl bg-white shadow-xl border-0">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="text-gray-800">This Week</h3>
          </div>
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyProgress.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ height: 0 }}
                animate={{ height: `${(day.score / maxScore) * 100}%` }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="relative w-full">
                  <div
                    className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-xl flex items-end justify-center pb-2"
                    style={{ height: `${(day.score / maxScore) * 140}px` }}
                  >
                    <span className="text-xs text-white">{day.score}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-600">{day.day}</span>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Level Progress */}
        <Card className="p-6 rounded-3xl bg-white shadow-xl border-0">
          <h3 className="text-gray-800 mb-4">Level Progress</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Level 5</span>
              <span className="text-sm text-purple-600">350 / 500 XP</span>
            </div>
            <Progress value={70} className="h-4 rounded-full" />
            <p className="text-sm text-gray-500 text-center">
              150 XP until Level 6! 🎉
            </p>
          </div>
        </Card>

        {/* Badges Collection */}
        <Card className="p-6 rounded-3xl bg-white shadow-xl border-0">
          <h3 className="text-gray-800 mb-4">Badge Collection</h3>
          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <div
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 p-3 ${
                    badge.earned
                      ? `bg-gradient-to-br ${badge.color} shadow-lg`
                      : "bg-gray-200"
                  } relative`}
                >
                  {badge.earned && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-xs">✓</span>
                    </div>
                  )}
                  <div className="text-3xl">{badge.icon}</div>
                  <p className="text-xs text-center text-white">
                    {badge.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Celebration Message */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-3xl shadow-xl"
        >
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-white mb-2">You're Amazing!</h3>
          <p className="text-sm text-white/90">
            Keep up the great work and you'll earn more rewards!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
