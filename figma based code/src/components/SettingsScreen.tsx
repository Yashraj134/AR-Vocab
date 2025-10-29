import { ArrowLeft, Volume2, Gauge, Mic, Lock, User, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [volume, setVolume] = useState([75]);
  const [difficulty, setDifficulty] = useState("medium");

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-100 via-purple-50 to-pink-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => onNavigate("home")}
            variant="ghost"
            className="rounded-full w-12 h-12 bg-white/20 hover:bg-white/30 text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h2 className="text-white">Settings</h2>
            <p className="text-sm text-white/80">Customize your experience</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Profile Section */}
        <Card className="p-6 rounded-3xl bg-white shadow-xl border-0">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-purple-600" />
            <h3 className="text-gray-800">Profile</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center shadow-lg">
              <span className="text-3xl">😊</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-800">Alex</p>
              <p className="text-sm text-gray-500">Age: 7 years</p>
            </div>
            <Button className="rounded-full bg-purple-500 hover:bg-purple-600 text-white border-0">
              Edit
            </Button>
          </div>
        </Card>

        {/* Sound Settings */}
        <Card className="p-6 rounded-3xl bg-white shadow-xl border-0">
          <div className="flex items-center gap-2 mb-4">
            <Volume2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-800">Sound</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-effects" className="text-gray-700">Sound Effects</Label>
              <Switch
                id="sound-effects"
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="background-music" className="text-gray-700">Background Music</Label>
              <Switch
                id="background-music"
                checked={musicEnabled}
                onCheckedChange={setMusicEnabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume" className="text-gray-700">Volume</Label>
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-gray-400" />
                <Slider
                  id="volume"
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-12">{volume}%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Settings */}
        <Card className="p-6 rounded-3xl bg-white shadow-xl border-0">
          <div className="flex items-center gap-2 mb-4">
            <Gauge className="w-5 h-5 text-green-600" />
            <h3 className="text-gray-800">Learning</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty" className="text-gray-700">Difficulty Level</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger id="difficulty" className="rounded-xl bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">
                    <div className="flex items-center gap-2">
                      <span>🟢</span>
                      <span>Easy - Beginner</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <span>🟡</span>
                      <span>Medium - Intermediate</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="hard">
                    <div className="flex items-center gap-2">
                      <span>🔴</span>
                      <span>Hard - Advanced</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl">
              <p className="text-sm text-blue-700">
                💡 Tip: Start with Easy mode and progress as your child improves!
              </p>
            </div>
          </div>
        </Card>

        {/* Voice Calibration */}
        <Card className="p-6 rounded-3xl bg-white shadow-xl border-0">
          <div className="flex items-center gap-2 mb-4">
            <Mic className="w-5 h-5 text-orange-600" />
            <h3 className="text-gray-800">Voice Calibration</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Calibrate the microphone sensitivity for better speech recognition.
          </p>

          <Button className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg border-0">
            <Mic className="w-5 h-5 mr-2" />
            Test Microphone
          </Button>
        </Card>

        {/* Privacy & Safety */}
        <Card className="p-6 rounded-3xl bg-white shadow-xl border-0">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-red-600" />
            <h3 className="text-gray-800">Privacy & Safety</h3>
          </div>
          
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start rounded-xl border-gray-200 hover:bg-gray-50"
            >
              Parent Controls
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start rounded-xl border-gray-200 hover:bg-gray-50"
            >
              Data & Privacy
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start rounded-xl border-gray-200 hover:bg-gray-50"
            >
              Screen Time Limits
            </Button>
          </div>
        </Card>

        {/* About */}
        <Card className="p-6 rounded-3xl bg-white shadow-xl border-0">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-gray-600" />
            <h3 className="text-gray-800">About</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Version</span>
              <span className="text-gray-800">1.0.0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">App Name</span>
              <span className="text-gray-800">AR-Vocab</span>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50"
            >
              Help Center
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50"
            >
              Contact Us
            </Button>
          </div>
        </Card>

        {/* Parent Mode Notice */}
        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-white mt-0.5" />
            <div>
              <p className="text-sm text-white">
                <strong>Parent Mode:</strong> Some settings require parental verification to change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
