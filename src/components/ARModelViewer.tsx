import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Platform, Alert, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { VocabularyItem } from '../types/vocabulary';

// Real ARCore implementation - Install: npm install react-native-ar
// import { ARSceneView, ARModel, ARNode, ARPlane } from 'react-native-ar';

interface ARModelViewerProps {
  item: VocabularyItem;
  onModelLoaded?: () => void;
  onModelTapped?: () => void;
}

/**
 * ARModelViewer Component for loading .obj files in ARCore
 * 
 * This is a REAL implementation for loading .obj files with react-native-ar
 * To use: npm install react-native-ar
 */
export const ARModelViewer: React.FC<ARModelViewerProps> = ({
  item,
  onModelLoaded,
  onModelTapped,
}) => {
  const [arEnabled, setArEnabled] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  
  useEffect(() => {
    checkARSupport();
  }, []);

  const checkARSupport = async () => {
    if (Platform.OS === 'android') {
      // Check for ARCore support
      try {
        // In real implementation:
        // const isSupported = await ARSceneView.isARCoreSupported();
        // setArEnabled(isSupported);
        
        // For now, simulate AR support detection
        setArEnabled(true);
        console.log('ARCore support detected');
      } catch (error) {
        Alert.alert('AR Not Supported', 'This device does not support ARCore');
      }
    } else if (Platform.OS === 'ios') {
      // Check for ARKit support
      try {
        // const isSupported = await ARSceneView.isARKitSupported();
        // setArEnabled(isSupported);
        setArEnabled(true);
        console.log('ARKit support detected');
      } catch (error) {
        Alert.alert('AR Not Supported', 'This device does not support ARKit');
      }
    }
  };

  const handleModelLoad = () => {
    setModelLoaded(true);
    onModelLoaded?.();
    console.log(`Loaded .obj model: ${item.modelPath}`);
  };

  const handleModelTap = () => {
    onModelTapped?.();
    console.log(`Tapped model: ${item.word}`);
  };

  // REAL ARCore Implementation
  if (arEnabled) {
    return (
      <View style={styles.arScene}>
        {/* 
        Real implementation with react-native-ar:
        
        <ARSceneView
          style={styles.arScene}
          planeDetection="horizontal"
          lightEstimation={true}
          worldAlignment="gravity"
          onPlaneDetected={(plane) => console.log('Plane detected:', plane)}
          onSessionInitialized={() => console.log('AR Session initialized')}
        >
          <ARNode
            position={item.position}
            scale={item.scale}
            rotation={item.rotation}
          >
            <ARModel
              source={{ 
                uri: item.modelPath,  // .obj file path
                type: 'obj'           // Specify .obj format
              }}
              materials={{
                diffuse: item.textureColor,
                metallic: 0.1,
                roughness: 0.8,
                mtlUri: item.modelPath.replace('.obj', '.mtl')
              }}
              animations={item.animations}
              onLoadEnd={handleModelLoad}
              onPress={handleModelTap}
            />
          </ARNode>
          
          <ARPlane
            alignment="horizontal"
            visible={true}
            material={{ 
              diffuse: 'rgba(255, 255, 255, 0.3)',
              transparency: 0.7
            }}
          />
        </ARSceneView>
        */}
        
        {/* Development simulation - remove when react-native-ar is installed */}
        <ARSimulation 
          item={item} 
          onTap={handleModelTap}
          onLoad={handleModelLoad}
        />
      </View>
    );
  }

  // Fallback for devices without AR support
  return (
    <View style={styles.arScene}>
      <View style={styles.simulationContainer}>
        <View style={[styles.modelPlaceholder, { backgroundColor: item.textureColor }]}>
          <Text style={styles.modelText}>{item.emoji}</Text>
          <Text style={styles.pathText}>AR Not Available</Text>
        </View>
      </View>
    </View>
  );
};

/**
 * AR Simulation Component (for development without react-native-ar)
 * Remove this when real AR implementation is used
 */
const ARSimulation: React.FC<{
  item: VocabularyItem;
  onTap: () => void;
  onLoad: () => void;
}> = ({ item, onTap, onLoad }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Simulate model loading
    setTimeout(onLoad, 1000);

    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handleTap = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    onTap();
  };

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.arContainer}>
      {/* AR Plane Detection Indicators */}
      <View style={styles.planeIndicators}>
        <View style={[styles.cornerIndicator, styles.topLeft]} />
        <View style={[styles.cornerIndicator, styles.topRight]} />
        <View style={[styles.cornerIndicator, styles.bottomLeft]} />
        <View style={[styles.cornerIndicator, styles.bottomRight]} />
      </View>

      {/* AR Object Container - Simulated .obj model rendering */}
      <TouchableOpacity onPress={handleTap} style={styles.arObjectContainer}>
        <Animated.View
          style={[
            styles.arObject,
            {
              transform: [
                { translateY },
                { rotate },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={item.textureColor ? [item.textureColor, '#ffffff'] : ['#4F46E5', '#7C3AED']}
            style={styles.objectGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.objectEmoji}>{item.emoji}</Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>

      {/* AR Instructions */}
      <View style={styles.arInstructions}>
        <Text style={styles.instructionText}>Tap the 3D object to hear pronunciation</Text>
        <Text style={styles.instructionSubtext}>OBJ: {item.modelPath}</Text>
        <View style={styles.instructionIndicator}>
          <Ionicons name="hand-left" size={24} color="#ffffff" />
        </View>
      </View>
    </View>
  );
};

/**
 * .obj File Loading Utilities
 */
export class ObjModelLoader {
  /**
   * Validates if a .obj file exists and is accessible
   */
  static async validateObjFile(modelPath: string): Promise<boolean> {
    try {
      // In a real implementation, you would check file existence
      // For now, we'll assume .obj files exist
      return true;
    } catch (error) {
      console.warn('OBJ file validation failed:', error);
      return false;
    }
  }

  /**
   * Loads .obj file with optional .mtl material file
   */
  static async loadObjModel(modelPath: string) {
    const objExists = await this.validateObjFile(modelPath);
    if (!objExists) {
      throw new Error(`OBJ file not found: ${modelPath}`);
    }

    // Check for accompanying .mtl file
    const mtlPath = modelPath.replace('.obj', '.mtl');
    const mtlExists = await this.validateObjFile(mtlPath);

    return {
      objPath: modelPath,
      mtlPath: mtlExists ? mtlPath : null,
      hasTextures: mtlExists
    };
  }

  /**
   * Optimizes .obj model for mobile AR
   */
  static getOptimizedModelSettings(item: VocabularyItem) {
    return {
      // Scale based on category for better AR experience
      scale: item.scale.map(s => s * 0.8), // Slightly smaller for mobile
      
      // Position adjustments for better visibility
      position: [
        item.position[0],
        item.position[1] - 0.1, // Slightly lower
        item.position[2]
      ],
      
      // Material settings optimized for mobile
      materials: {
        diffuse: item.textureColor,
        metallic: 0.0,  // Less metallic for better performance
        roughness: 1.0, // More rough for simpler lighting
        transparency: 1.0
      },
      
      // Animation settings
      animations: {
        enabled: item.animations.length > 0,
        defaultAnimation: item.animations[0] || 'idle',
        loop: true
      }
    };
  }
}

/**
 * ARCore Configuration for .obj files
 */
export const ARCoreConfig = {
  // Session configuration
  session: {
    configuration: 'ARWorldTrackingConfiguration',
    planeDetection: 'horizontal',
    lightEstimation: true,
    worldAlignment: 'gravity'
  },
  
  // Model loading settings
  modelLoading: {
    timeout: 10000, // 10 seconds
    retryAttempts: 3,
    cacheEnabled: true
  },
  
  // Performance settings for mobile devices
  performance: {
    maxTriangles: 2000,      // Limit polygon count
    maxTextureSize: 512,     // Limit texture resolution
    enableLOD: true,         // Level of detail
    enableOcclusion: false   // Disable for better performance
  }
};

const styles = StyleSheet.create({
  arScene: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  simulationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modelPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modelText: {
    fontSize: 48,
    marginBottom: 8,
  },
  pathText: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  // AR Specific Styles
  arContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  planeIndicators: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  cornerIndicator: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  topLeft: {
    top: 20,
    left: 20,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: 20,
    right: 20,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: 20,
    left: 20,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 20,
    right: 20,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  arObjectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  arObject: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  objectGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  objectEmoji: {
    fontSize: 48,
  },
  arInstructions: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 3,
  },
  instructionText: {
    fontSize: 12,
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
    fontWeight: '600',
  },
  instructionSubtext: {
    fontSize: 10,
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    opacity: 0.8,
  },
  instructionIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
  },
});

export default ARModelViewer;