import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import ARModelViewer from '../components/ARModelViewer';
import vocabularyData from '../../assets/ar/vocabulary-data.json';

interface ARLearningScreenProps {
  navigation: any;
  route: {
    params: {
      categoryId: string;
    };
  };
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ARLearningScreen({ navigation, route }: ARLearningScreenProps) {
  const { categoryId } = route.params;
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  
  // Animation values for Figma-based UI
  const floatingAnimation = useRef(new Animated.Value(0)).current;
  const sparkleAnimation = useRef(new Animated.Value(0)).current;
  const gridOpacity = useRef(new Animated.Value(0.3)).current;

  const categoryData = vocabularyData.categories.find(
    cat => cat.id === categoryId
  );
  const items = categoryData?.items || [];
  const currentItem = items[currentItemIndex];

  useEffect(() => {
    // Start floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Grid pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(gridOpacity, {
          toValue: 0.6,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(gridOpacity, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const triggerSparkle = () => {
    setShowSparkle(true);
    Animated.sequence([
      Animated.timing(sparkleAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(sparkleAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => setShowSparkle(false));
  };

  const playSound = async () => {
    if (!currentItem?.soundPath || isPlaying) return;
    
    try {
      setIsPlaying(true);
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/audio/apple.mp3') // Fallback audio
      );
      setSound(sound);
      await sound.playAsync();
      triggerSparkle();
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentItemIndex < items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    } else {
      Alert.alert(
        'Congratulations!',
        'You have completed all words in this category!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  };

  const handlePrevious = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  if (!currentItem) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No items found for this category</Text>
      </SafeAreaView>
    );
  }

  const floatingTransform = {
    transform: [
      {
        translateY: floatingAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Camera Background Simulation */}
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f4c75']}
        style={styles.backgroundGradient}
      />
      
      {/* AR Grid Overlay */}
      <Animated.View style={[styles.gridOverlay, { opacity: gridOpacity }]}>
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={`h-${i}`} style={[styles.gridLine, { top: i * 60 }]} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <View key={`v-${i}`} style={[styles.gridLineVertical, { left: i * 70 }]} />
        ))}
      </Animated.View>

      {/* Header */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <View style={styles.backButtonContainer}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </View>
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>AR Learning</Text>
            <Text style={styles.headerSubtitle}>
              {currentItemIndex + 1} of {items.length}
            </Text>
          </View>
          
          <View style={styles.headerSpacer} />
        </View>
      </SafeAreaView>

      {/* AR View Container */}
      <View style={styles.arContainer}>
        <ARModelViewer
          item={{
            ...currentItem,
            scale: currentItem.scale as [number, number, number],
            position: currentItem.position as [number, number, number],
            rotation: currentItem.rotation as [number, number, number],
            difficulty: currentItem.difficulty as 'easy' | 'medium' | 'hard'
          }}
          onModelLoaded={() => console.log('Model loaded:', currentItem.word)}
          onModelTapped={playSound}
        />
        
        {/* 3D Object Display Area with AR Effects */}
        <View style={styles.objectDisplayArea}>
          {showSparkle && (
            <Animated.View
              style={[
                styles.sparkleContainer,
                {
                  transform: [
                    {
                      scale: sparkleAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 2],
                      }),
                    },
                  ],
                  opacity: sparkleAnimation,
                },
              ]}
            >
              <Ionicons name="star" size={100} color="#FFD700" />
            </Animated.View>
          )}
          
          <View style={styles.objectFrame}>
            {/* AR Corner Markers */}
            <View style={[styles.arMarker, styles.arMarkerTopLeft]} />
            <View style={[styles.arMarker, styles.arMarkerTopRight]} />
            <View style={[styles.arMarker, styles.arMarkerBottomLeft]} />
            <View style={[styles.arMarker, styles.arMarkerBottomRight]} />
            
            <Animated.View style={[styles.emojiContainer, floatingTransform]}>
              <Text style={styles.emoji}>{currentItem.emoji}</Text>
            </Animated.View>
          </View>
        </View>
      </View>

      {/* Word Info Card */}
      <View style={styles.wordInfoCard}>
        <View style={styles.wordInfo}>
          <Text style={styles.instructionText}>Say this word:</Text>
          <Text style={styles.wordText}>{currentItem.word}</Text>
          <Text style={styles.pronunciationText}>{currentItem.pronunciation}</Text>
        </View>

        {/* Control Buttons */}
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={playSound}
            style={styles.controlButton}
            disabled={isPlaying}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.buttonGradient}
            >
              <Ionicons
                name={isPlaying ? "volume-high" : "volume-high-outline"}
                size={24}
                color="white"
              />
              <Text style={styles.buttonText}>Repeat</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            style={styles.controlButton}
          >
            <LinearGradient
              colors={['#11998e', '#38ef7d']}
              style={styles.buttonGradient}
            >
              <Ionicons name="play-skip-forward" size={24} color="white" />
              <Text style={styles.buttonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.controlButton}
          >
            <LinearGradient
              colors={['#bdc3c7', '#95a5a6']}
              style={styles.buttonGradient}
            >
              <Ionicons name="close" size={24} color="white" />
              <Text style={styles.buttonText}>Exit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {items.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentItemIndex ? styles.progressDotActive : null,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0, 255, 255, 0.3)',
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(0, 255, 255, 0.3)',
  },
  safeArea: {
    flex: 1,
    zIndex: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    zIndex: 10,
  },
  backButton: {
    borderRadius: 25,
  },
  backButtonContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 25,
  },
  headerInfo: {
    flex: 1,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 2,
  },
  headerSpacer: {
    width: 50,
  },
  arContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  arViewer: {
    ...StyleSheet.absoluteFillObject,
  },
  objectDisplayArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleContainer: {
    position: 'absolute',
    zIndex: 10,
  },
  objectFrame: {
    width: 200,
    height: 200,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  arMarker: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#00ffff',
  },
  arMarkerTopLeft: {
    top: 8,
    left: 8,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  arMarkerTopRight: {
    top: 8,
    right: 8,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  arMarkerBottomLeft: {
    bottom: 8,
    left: 8,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  arMarkerBottomRight: {
    bottom: 8,
    right: 8,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  emojiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 80,
  },
  wordInfoCard: {
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  wordInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  instructionText: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    marginBottom: 5,
  },
  wordText: {
    color: '#667eea',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pronunciationText: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  controlButton: {
    flex: 1,
    height: 64,
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  progressDotActive: {
    width: 32,
    backgroundColor: '#667eea',
  },
});
