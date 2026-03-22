# Phase 2 — User Profile & Health Metrics

**Estimated time:** 3–4 days

## What Gets Built

The Profile tab becomes fully functional. Users fill in their details and
see all health metrics calculated instantly.

## Features in This Phase

- Profile form: name, age, sex, weight (kg/lbs toggle), height (cm/ft toggle), activity level, goal
- All data saved to AsyncStorage on change — persists between app launches
- BMI calculated and displayed with a color-coded visual scale
- BMR (Basal Metabolic Rate) calculated — calories burned at rest per day
- TDEE (Total Daily Energy Expenditure) calculated — actual daily calorie need
- Body fat % estimator — optional Navy Method with extra measurements
- Daily protein target based on selected goal
- Daily water intake recommendation in glasses and liters
- Anthropic API key input with secure storage — masked field, save/clear option
- All metrics update live as form fields change — no submit button needed

## UI What You See

Profile tab has a header with the user's name and avatar initials.
Below is a scrollable form split into sections: Personal Info, Body Measurements,
Goal Settings, and AI Settings (API key).

Below the form is a Metrics section:
- BMI card: large number, colored bar scale (blue → green → yellow → red),
  category label underneath (Normal / Overweight etc.)
- A 2-column grid of stat cards: BMR, TDEE, Body Fat %, Daily Protein, Water Intake
- Each stat card has a large number, unit label, and a small description

The design matches Image 3's clean card layout — white cards on a light green
background but in the app's dark purple theme: dark cards on the deep purple background.

## Libraries Used in This Phase

- `@react-native-async-storage/async-storage` — profile persistence
- `expo-secure-store` — encrypted API key storage
- `@gluestack-ui/themed` — Input, Select, Switch, Card components
- `nativewind` — all styling via className
- `react-native-circular-progress` — BMI scale arc visualization
- Pure TypeScript functions for all health math (no library)

## Health Calculation Formulas

### BMI Formula
Calculate BMI using weight in kilograms divided by height in meters squared.

### BMR Formulas (Mifflin-St Jeor)
Use gender-specific formulas to calculate basal metabolic rate based on weight, height, and age.

### TDEE Formula
Multiply BMR by activity factor based on user's activity level (sedentary to very active).

### Body Fat % (Navy Method)
Use circumference measurements (neck, waist, hip) with gender-specific formulas to estimate body fat percentage.

## Implementation Steps

### 1. Install Additional Dependencies
Install required libraries for data persistence, secure storage, and progress visualization.

### 2. Create Health Utilities
Create utility functions for all health metric calculations.

### 3. Create Profile Form Components
Build form components for user profile input and metrics display.

### 4. Implement Data Persistence
Set up local storage for profile data and secure storage for API keys.

### 5. Create BMI Scale Visualization
Implement visual BMI scale with color-coded ranges.

### 6. Build Responsive Layout
Create scrollable form layout with sections and metric cards.

## Component Structure

Organize profile components into logical modules:
- Main form container
- Personal information inputs
- Body measurement fields
- Goal settings controls
- Metrics display visualization
- Secure API key input

## Data Models

### Profile Interface
Define user profile structure with personal details, measurements, and goals.

### Health Metrics Interface
Define calculated health metrics including BMI, BMR, TDEE, and recommendations.

## Acceptance Criteria

- [ ] All form fields are functional with proper validation
- [ ] Profile data persists between app launches
- [ ] BMI calculation is accurate with color-coded scale
- [ ] BMR and TDEE calculations are correct
- [ ] Body fat % estimation works when measurements provided
- [ ] Protein and water recommendations update based on goal
- [ ] API key is stored securely and masked in UI
- [ ] All metrics update live as form fields change
- [ ] Layout is responsive and scrollable
- [ ] Design matches dark purple theme

## Next Phase

After completing Phase 2, proceed to Phase 3 — Camera Exercise Tracking.
