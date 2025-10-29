# AR-Vocab: Augmented Reality Vocabulary Learning App

An innovative AR-powered vocabulary learning application designed specifically for children with autism to enhance speech therapy through immersive 3D experiences.

## 🌟 Features

### Core Functionality
- **AR Learning**: Marker-less AR experience using ARCore for Android
- **Speech Assessment**: Real-time pronunciation analysis and feedback
- **Interactive 3D Models**: Touch-responsive vocabulary objects with animations
- **Category-Based Learning**: Animals, fruits, colors, and vehicles
- **Audio Feedback**: High-quality pronunciation examples
- **Progress Tracking**: Individual learning analytics

### Accessibility Features
- **Autism-Friendly Design**: Simple, non-overwhelming interface
- **Visual Learning**: Emoji-based category recognition
- **Multi-Sensory Experience**: Visual, auditory, and haptic feedback
- **Customizable Content**: JSON-based vocabulary data management
- **Settings Management**: Customizable app preferences
- **Help & Support**: Built-in help system and FAQ

## Technology Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Screen navigation and routing
- **Expo Linear Gradient**: Beautiful gradient effects
- **Responsive Dimensions**: Screen size adaptation
- **Expo Vector Icons**: Comprehensive icon library

## Installation

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AR-Vocab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on specific platforms**
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   
   # Web
   npm run web
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Progress.tsx
│   └── index.ts
├── screens/            # Screen components
│   ├── HomeScreen.tsx
│   ├── CategorySelectionScreen.tsx
│   ├── ARLearningScreen.tsx
│   ├── SpeechAssessmentScreen.tsx
│   ├── ProgressScreen.tsx
│   ├── SettingsScreen.tsx
│   └── HelpScreen.tsx
├── navigation/         # Navigation configuration
├── styles/            # Style constants and themes
│   └── constants.ts
├── types/             # TypeScript type definitions
│   └── navigation.ts
└── utils/             # Utility functions
```

## Responsive Design Features

The app includes comprehensive responsive design features:

- **Flexible Layouts**: Uses flexbox for adaptive layouts
- **Responsive Dimensions**: Percentage-based sizing using `react-native-responsive-dimensions`
- **Screen Adaptation**: Automatically adjusts to different screen sizes
- **Typography Scaling**: Font sizes scale based on screen dimensions
- **Adaptive Spacing**: Margins and padding adjust to screen size
- **Orientation Support**: Works in both portrait and landscape modes

## Key Components

### Button Component
- Multiple variants (primary, secondary, ghost, gradient)
- Responsive sizing (sm, md, lg)
- Built-in icon support
- Custom gradient colors

### Card Component
- Consistent styling across the app
- Customizable padding and elevation
- Shadow effects for depth

### Progress Component
- Animated progress bars
- Gradient color support
- Customizable height and colors

### Badge Component
- Achievement and status indicators
- Gradient background support
- Flexible content support

## Navigation Structure

The app uses React Navigation with a stack navigator:

- **Home**: Main dashboard with navigation options
- **Categories**: Grid of vocabulary categories
- **Learning**: AR learning experience (placeholder)
- **Assessment**: Speech recognition practice (placeholder)
- **Progress**: User statistics and achievements
- **Settings**: App configuration options
- **Help**: Support and FAQ information

## Styling System

The app uses a centralized styling system with:

- **Color Palette**: Consistent color scheme with primary, secondary, and accent colors
- **Typography**: Responsive font sizes and weights
- **Spacing**: Standardized margins and padding
- **Border Radius**: Consistent rounded corners
- **Shadows**: Depth and elevation effects
- **Gradients**: Beautiful gradient color combinations

## Development Guidelines

### Adding New Screens

1. Create the screen component in `src/screens/`
2. Add the screen to the navigation stack in `App.tsx`
3. Update the navigation types in `src/types/navigation.ts`

### Adding New Components

1. Create the component in `src/components/`
2. Export it from `src/components/index.ts`
3. Follow the existing styling patterns

### Responsive Design Best Practices

1. Use percentage-based dimensions where possible
2. Utilize the responsive helper functions from `constants.ts`
3. Test on multiple screen sizes
4. Consider both portrait and landscape orientations

## Migration from Web React

This React Native app was converted from a web-based React project with the following changes:

### Component Conversions
- `<div>` → `<View>`
- `<span>`, `<p>` → `<Text>`
- `<img>` → `<Image>`
- CSS classes → StyleSheet objects
- HTML buttons → TouchableOpacity/Button components

### Styling Changes
- CSS → React Native StyleSheet
- Tailwind classes → Custom style objects
- Web gradients → LinearGradient component
- CSS flexbox → React Native flexbox

### Navigation Changes
- React Router → React Navigation
- URL-based routing → Stack navigation
- Browser history → Navigation state

### Responsive Design
- CSS media queries → Responsive dimensions
- Fixed pixel values → Percentage-based sizing
- CSS viewport units → Screen dimension calculations

## Future Enhancements

- [ ] AR camera integration
- [ ] Speech recognition implementation
- [ ] Real vocabulary data integration
- [ ] User authentication
- [ ] Progress synchronization
- [ ] Offline mode support
- [ ] Push notifications
- [ ] Social sharing features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on multiple devices
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: support@arvocab.com
- Documentation: [App Help Section]
- Issues: [GitHub Issues]