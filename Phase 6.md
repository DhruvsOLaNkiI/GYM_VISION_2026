# Phase 6 — AI Prediction & Workout Planning

**Estimated time:** 3–4 days

## What Gets Built

The AI prediction screen and the AI workout plan screen, both powered by
Claude API calls using the user's saved profile and goals.

## Prediction Features

- Input form: planned days per week, session duration, calorie target
- "Predict My 30 Days" button triggers AI call
- Loading state: skeleton cards with shimmer animation while AI thinks
- Result screen shows:
  - Starting stats vs predicted stats in a side-by-side comparison table
  - Predicted weight change with a trend arrow
  - Predicted body fat % change
  - Fat lost estimate in kg
  - Muscle gained estimate in kg
  - Total calories to be burned over 30 days
  - Stamina improvement percentage
  - AI-written motivational narrative paragraph in a highlighted quote card
- Save prediction — store result to reference later
- Regenerate button to get a new prediction with adjusted inputs

## Workout Plan Features

- Plan generator form: goal, days available, session length, equipment
- AI generates a 4-week progressive plan
- Plan displayed as a weekly calendar — each day is a row
  with the workout type label and a list of exercises
- Tap any day to expand and see full exercise list with sets and reps
- Tap any exercise in the plan — navigates to Camera tab with that exercise
  already selected and target sets/reps pre-filled
- Week 1, 2, 3, 4 tabs to switch between weeks
- Progress indicator — which week you are currently in
- Mark a day as complete — it turns green in the calendar

## UI What You See

Prediction screen has a clean top section for the input form, then a
"Generate Prediction" button in the accent color. When the result loads,
the screen scrolls to reveal a dramatic stats comparison section:
two columns (Now vs In 30 Days) with numbers and colored arrows showing direction.
Below that is a card with the AI narrative text in a slightly different
background color — like a coach speaking to you directly.

Workout plan screen resembles Image 2's right panel (the workout schedule calendar).
The week selector pills at the top (Week 1 / Week 2 / Week 3 / Week 4) switch
the calendar view. Each day row has the day name, workout type badge in a color
(Push = coral, Pull = blue, Legs = green, Cardio = yellow), and a count of exercises.
Completed days show a green checkmark.

## Libraries Used in This Phase

- `axios` — AI API calls
- `@gluestack-ui/themed` — Accordion for day expansion, Badge for workout type
- `expo-sqlite` — saving and loading the generated plan
- `react-native-reanimated` — prediction number count-up animation
- `nativewind` — all layout and styling

## AI Integration

### Prediction API Prompt
Design structured prompts for 30-day transformation predictions based on user profile and planned routine.

### Workout Plan API Prompt
Create prompts for generating 4-week progressive workout plans with exercise selection and progression.

## Implementation Steps

### 1. Create AI Services
Build AI services for prediction and workout plan generation using Claude API.

### 2. Create Database Schema
Design database structure for storing predictions and workout plans.

### 3. Create Prediction Components
Build UI components for prediction input, results display, and loading states.

### 4. Create Workout Plan Components
Build UI components for plan generation, week selection, and calendar display.

### 5. Implement Navigation Integration
Connect plan exercises to camera tab with pre-filled parameters.

## Component Structure

Organize prediction and plan components into logical modules:
- Prediction input forms and result displays
- Plan generation and calendar views
- Exercise navigation and completion tracking

## Data Models

### Prediction Data
Define prediction input and result structures for 30-day transformation forecasts.

### Workout Plan Data
Define workout plan structures including weeks, days, exercises, and progress tracking.

## Animation Implementations

### Count-up Animation for Numbers
Implement smooth number counting animations for prediction results using React Native Reanimated.

### Skeleton Loading Animation
Create skeleton loading components for AI prediction processing states.

## Performance Considerations

### API Optimization
- Cache prediction results for same inputs
- Implement request debouncing
- Handle API rate limiting gracefully

### Data Storage
- Compress JSON data before storing
- Index predictions by creation date
- Limit stored predictions to last 10

## Acceptance Criteria

### Prediction Screen
- [ ] Input form validates all fields correctly
- [ ] Generate Prediction button triggers AI call
- [ ] Loading skeleton animation shows during API call
- [ ] Results display with accurate before/after comparison
- [ ] Stats arrows show correct direction (up/down)
- [ ] Narrative card displays motivational text
- [ ] Save prediction stores result locally
- [ ] Regenerate button works with new inputs
- [ ] Numbers animate smoothly on display

### Workout Plan Screen
- [ ] Plan form generates appropriate 4-week plan
- [ ] Week selector tabs switch between weeks correctly
- [ ] Calendar view shows workout days with proper colors
- [ ] Day accordion expands to show exercise list
- [ ] Tapping exercise navigates to camera with pre-filled data
- [ ] Marking day complete updates visual state
- [ ] Progress indicator shows current week
- [ ] Plan persists between app sessions
- [ ] Exercise difficulty progresses appropriately across weeks

## Next Phase

After completing Phase 6, proceed to Phase 7 — Firebase Cloud Sync & Authentication.
