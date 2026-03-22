# Phase 3 — Camera Exercise Tracking

**Estimated time:** 5–7 days (most complex phase)

## What Gets Built

The Camera tab opens the device camera, detects body pose using TensorFlow,
counts reps automatically, and saves workout sessions.

## Features in This Phase

- Camera permission request with clear explanation dialog
- Exercise selector: horizontal scrollable row of exercise cards
  (Push-up, Squat, Bicep Curl, Lunge, Shoulder Press, Plank, Jumping Jack, Sit-up)
- Sets and reps target input before starting
- Live camera view with pose skeleton overlay drawn on top
- Rep counter — large number displayed over the camera feed
- Visual feedback: counter flashes green and phone vibrates on each rep
- Audio beep on each completed rep (can be muted)
- Set completion banner — "Set 1 of 3 Complete!" shown at set end
- Rest timer between sets — countdown with visual ring (30s / 60s / 90s)
- Session summary screen shown after all sets: exercise, total reps, duration,
  estimated calories burned, personal record notification if applicable
- Session saved to SQLite on finish
- Calories burned calculated using MET values per exercise type and user weight

## UI What You See

Camera tab has the live camera feed taking up most of the screen.
At the top: a small exercise name label and set progress indicator (Set 2/3).
Over the camera: the skeleton overlay (colored lines connecting joints).
At the bottom overlay: the large rep counter number in bright yellow/green,
below it the target reps label "8 / 10 reps".

Below the camera is a compact control strip with:
- Current exercise name with a swap icon to change exercise
- Mute button for the beep sound
- A "Finish Set" button in the accent color

When the rest timer is active, the camera dims slightly and a large countdown
ring appears in the center of the screen with the time remaining.

The exercise selector is a horizontal scroll of cards before the workout starts —
each card has a simple icon and the exercise name, similar to the Strength / Cardio
cards in Image 1 but for individual exercises.

## Libraries Used in This Phase

- `expo-camera` — camera stream, permissions
- `@tensorflow/tfjs-react-native` — TensorFlow runtime for React Native
- `@tensorflow-models/pose-detection` — MoveNet SinglePose Lightning model
- `react-native-svg` — drawing skeleton lines over the camera
- `expo-av` — playing the rep beep audio
- `expo-haptics` — vibration on rep completion
- `expo-sqlite` — saving workout sessions to local database
- `react-native-reanimated` — rep counter bounce animation
- `@gluestack-ui/themed` — BottomSheet for exercise selector

## Exercise Detection Logic

### Supported Exercises
1. **Push-ups** - Detect elbow angle and shoulder movement
2. **Squats** - Detect knee angle and hip movement
3. **Bicep Curls** - Detect elbow flexion/extension
4. **Lunges** - Detect knee bend and forward movement
5. **Shoulder Press** - Detect arm extension overhead
6. **Plank** - Detect body position stability
7. **Jumping Jacks** - Detect arm and leg spread pattern
8. **Sit-ups** - Detect torso flexion/extension

### Rep Counting Algorithm
Use joint angle calculations to detect exercise movements and count repetitions based on specific angle thresholds for each exercise type.

### MET Values for Calorie Calculation
Assign MET (Metabolic Equivalent of Task) values to each exercise to calculate calories burned based on user weight and duration.

## Implementation Steps

### 1. Install Dependencies
Install camera, TensorFlow, and audio libraries for exercise tracking.

### 2. Setup TensorFlow and Pose Detection
Initialize TensorFlow runtime and load pose detection model for real-time exercise tracking.

### 3. Create Camera Components
Build camera interface components including view, pose detection, skeleton overlay, and controls.

### 4. Implement Exercise Logic
Create exercise detection algorithms for rep counting and movement analysis.

### 5. Build Workout Session Management
Implement session tracking, set management, and rest timer functionality.

### 6. Create Database Schema
Design database structure for storing workout sessions and exercise data.

### 7. Implement Audio and Haptic Feedback
Add sound and vibration feedback for completed repetitions.

## Component Structure

Organize camera components into logical modules:
- Main camera container
- TensorFlow integration
- Skeleton overlay
- Rep counter display
- Exercise picker cards
- Control strip
- Rest timer
- Session summary

## Data Models

### Workout Session Interface
Define workout session structure with exercise details, sets, reps, duration, and calories.

### Pose Detection State
Define pose detection state management for real-time tracking and rep counting.

## Performance Considerations

### Camera Frame Processing
- Process frames at 15-30 FPS for smooth detection
- Use React Native Reanimated for smooth animations
- Optimize pose detection for real-time performance

### Memory Management
- Release camera resources when not in use
- Clean up TensorFlow model on component unmount
- Manage audio resources properly

## Error Handling

### Camera Permissions
- Gracefully handle permission denial
- Provide clear explanation of why camera is needed
- Offer retry mechanism

### Pose Detection Failures
- Detect when pose is not visible
- Provide user feedback to adjust position
- Fallback to manual rep counting if needed

## Acceptance Criteria

- [ ] Camera opens with proper permissions
- [ ] Exercise selector shows all 8 exercises
- [ ] Pose detection works for all supported exercises
- [ ] Rep counting is accurate and reliable
- [ ] Visual and audio feedback work on each rep
- [ ] Rest timer functions correctly between sets
- [ ] Session summary shows accurate stats
- [ ] Workouts are saved to SQLite database
- [ ] Calorie calculation is accurate based on MET values
- [ ] UI is responsive and animations are smooth
- [ ] App handles camera errors gracefully

## Next Phase

After completing Phase 3, proceed to Phase 4 — AI Nutrition Engine.
