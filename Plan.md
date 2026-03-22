# FitTrack AI — Project Plan

> Built with Expo + React Native | NativeWind + Gluestack UI | Firebase | Claude AI
> Phase-wise feature plan, UI design guide, tech stack and library reference

---

## Vision

A camera-powered AI fitness app that feels premium on Android and iOS.
The user opens the app, tracks workouts with their camera, logs meals by typing,
gets AI-powered nutrition breakdowns, sees health metrics, and gets a 30-day
body transformation prediction — all in one place with cloud sync and offline support.

---

## Tech Stack — Complete Reference

### Core Framework

| Technology | Version | Purpose |
|---|---|---|
| Expo | SDK 51+ | App framework — build once, run on Android + iOS |
| React Native | 0.74+ | Native mobile components, no HTML or CSS |
| TypeScript | 5.x | Type safety across the entire codebase |
| Expo Router | v3 | File-based navigation, tab bars, stack screens |

### UI & Styling

| Library | Purpose | Why This One |
|---|---|---|
| NativeWind v4 | Tailwind CSS utility classes in React Native | Write `className="bg-purple-900 rounded-2xl p-4"` instead of style objects — same as Tailwind on web |
| Gluestack UI v2 | Pre-built components on top of NativeWind | Cards, modals, progress bars, badges — all fully customizable with NativeWind classes |
| React Native Reanimated v3 | Smooth 60fps animations and gesture handling | Rep counter bounce, screen transitions, calorie ring fill animation |
| React Native Gesture Handler | Swipe gestures, drag interactions | Swipe between workout cards, dismiss modals |
| Expo Vector Icons | Icon set — Ionicons, MaterialIcons, Feather | Tab bar icons, exercise icons, UI icons |
| expo-font | Load custom fonts | Bebas Neue for headings, DM Sans for body text |
| expo-linear-gradient | Gradient backgrounds and cards | Dark purple gradient header like Image 1 |
| expo-blur | Blur effects on modals and overlays | Frosted glass effect on bottom sheets |

### Charts & Data Visualization

| Library | Purpose |
|---|---|
| Victory Native XL | Calorie ring (donut), progress line charts, macro bar charts |
| React Native Svg | Underlying SVG engine for custom drawn graphics |
| React Native Circular Progress | Simple ring progress components for BMI, steps, calories |

### Camera & Pose Tracking

| Library | Purpose |
|---|---|
| expo-camera | Open device camera, manage permissions |
| TensorFlow.js React Native | Run pose detection ML model on device |
| @tensorflow-models/pose-detection | MoveNet model — detects 17 body keypoints at 30fps |
| expo-av | Play audio beep sound on each counted rep |
| expo-haptics | Vibration feedback when a rep is completed |

### AI & Intelligence

| Library | Purpose |
|---|---|
| Anthropic Claude API (claude-sonnet-4-6) | Meal analysis, workout plan generation, 30-day prediction |
| Axios | HTTP client for API calls to Claude |

### Health Calculations (no library — pure math)

All health formulas — BMI, BMR, TDEE, body fat %, calorie burn via MET — are
calculated in pure TypeScript utility functions. No external library needed.

### Storage — On Device

| Library | Purpose |
|---|---|
| expo-sqlite | Primary on-device database — workout logs, meal history |
| expo-secure-store | Secure storage for Anthropic API key |
| @react-native-async-storage/async-storage | Profile settings, preferences, offline queue |

### Storage — Cloud

| Library | Purpose |
|---|---|
| Firebase JS SDK v10 | Firestore database, Authentication, Storage |
| @react-native-firebase (optional) | Native Firebase SDK if better performance needed |

### Media & Files

| Library | Purpose |
|---|---|
| expo-image-picker | Select progress photos from gallery or camera |
| expo-file-system | Save and read files on device |
| expo-sharing | Share workout summary as image card |
| expo-media-library | Save progress photos to device gallery |

### Notifications & Background

| Library | Purpose |
|---|---|
| expo-notifications | Push notifications — workout reminders, streak alerts |
| expo-task-manager | Background sync task when app is closed |
| expo-background-fetch | Periodic background data sync |

### Developer Tools

| Library | Purpose |
|---|---|
| Expo Dev Client | Custom development build for testing native features |
| React Native Flipper | Debugging, network inspector |
| Jest + Testing Library | Unit tests for health calculation functions |

---

## Folder Structure

```
fittrack-ai/
│
├── app/                          ← Expo Router screens (file = route)
│   ├── (tabs)/
│   │   ├── index.tsx             ← Dashboard (home tab)
│   │   ├── camera.tsx            ← Exercise tracking tab
│   │   ├── nutrition.tsx         ← Meal logging tab
│   │   ├── progress.tsx          ← Charts + history tab
│   │   └── profile.tsx           ← User profile tab
│   ├── prediction.tsx            ← 30-day prediction screen
│   ├── plan.tsx                  ← AI workout plan screen
│   ├── workout/[id].tsx          ← Single workout detail screen
│   ├── meal/[id].tsx             ← Single meal detail screen
│   └── _layout.tsx               ← Root layout + auth guard
│
├── components/
│   ├── ui/                       ← Reusable UI components
│   │   ├── StatCard.tsx          ← BMI, calories, steps stat box
│   │   ├── CalorieRing.tsx       ← Donut chart with eaten/burned
│   │   ├── MacroBar.tsx          ← Protein / carbs / fat progress bar
│   │   ├── ExerciseCard.tsx      ← Workout category card (Image 1 style)
│   │   ├── MealCard.tsx          ← Single logged meal card
│   │   ├── ProgressChart.tsx     ← Weight/calorie line chart
│   │   ├── RepCounter.tsx        ← Big number overlay on camera view
│   │   ├── SkeletonOverlay.tsx   ← Pose landmark drawing on camera
│   │   └── PredictionCard.tsx    ← 30-day forecast result card
│   │
│   ├── camera/
│   │   ├── CameraView.tsx        ← Camera + canvas overlay container
│   │   ├── PoseDetector.tsx      ← TensorFlow pose detection logic
│   │   └── ExerciseSelector.tsx  ← Horizontal exercise picker
│   │
│   ├── nutrition/
│   │   ├── MealInput.tsx         ← Text input for logging meals
│   │   ├── NutritionBreakdown.tsx← Per-item macro table
│   │   └── DailyTotals.tsx       ← Today's running calorie totals
│   │
│   └── profile/
│       ├── ProfileForm.tsx       ← Name, age, weight, height fields
│       ├── MetricsDisplay.tsx    ← BMI scale, BMR, TDEE cards
│       └── ApiKeyInput.tsx       ← Secure Anthropic key input
│
├── lib/
│   ├── health/
│   │   ├── metrics.ts            ← BMI, BMR, TDEE, body fat formulas
│   │   └── calories.ts           ← MET calorie burn calculator
│   ├── ai/
│   │   ├── claude.ts             ← Anthropic API wrapper
│   │   ├── nutrition.ts          ← Meal analysis AI call
│   │   ├── prediction.ts         ← 30-day forecast AI call
│   │   └── planner.ts            ← Workout plan AI call
│   ├── camera/
│   │   ├── angles.ts             ← Joint angle calculation
│   │   └── exercises.ts          ← Rep counting per exercise type
│   ├── db/
│   │   ├── sqlite.ts             ← SQLite setup + query helpers
│   │   └── sync.ts               ← Firebase sync + offline queue
│   └── firebase/
│       ├── config.ts             ← Firebase project config
│       ├── auth.ts               ← Login / logout helpers
│       └── firestore.ts          ← Read/write Firestore helpers
│
├── constants/
│   ├── colors.ts                 ← App color palette
│   ├── exercises.ts              ← Exercise list with MET values
│   └── theme.ts                  ← NativeWind theme config
│
├── hooks/
│   ├── useProfile.ts             ← Load/save user profile
│   ├── useWorkouts.ts            ← Workout history from SQLite
│   ├── useMeals.ts               ← Meal logs from SQLite
│   └── useSync.ts                ← Firebase sync state
│
├── assets/
│   ├── fonts/                    ← Bebas Neue, DM Sans font files
│   ├── images/                   ← Exercise illustrations, app icons
│   └── sounds/                   ← Rep beep audio file
│
├── tailwind.config.js            ← NativeWind + custom color config
├── app.json                      ← Expo app config
└── package.json
```

---

## Color Palette & Design System

Looking at your reference screenshots, the app uses this design language:

```
Primary background     #1A0A2E   Deep purple-black (Image 1 dark theme)
Card background        #2D1B4E   Lighter purple for cards
Accent purple          #7C3AED   Vivid purple for active states
Accent yellow/gold     #F59E0B   Highlight color (Image 2 yellow buttons)
Accent green           #16A34A   Health/nutrition theme (Image 3 green)
Text primary           #FFFFFF   White headings
Text secondary         #A78BFA   Muted purple-white for labels
Success                #22C55E   Completed sets, on-track calories
Warning                #F97316   Over calorie limit
Danger                 #EF4444   Missed workouts, over target
```

In `tailwind.config.js` these become custom classes:
`bg-fittrack-bg`, `bg-fittrack-card`, `text-fittrack-accent` and so on.
Every screen uses these tokens — no hardcoded hex values anywhere in components.

---

## Phase 1 — Project Setup & Navigation Shell

**Estimated time:** 2–3 days

### What Gets Built

The skeleton of the entire app. No features yet — just the navigation,
screens, design system, and fonts loading correctly.

### Features in This Phase

- Expo project initialized with TypeScript + Expo Router
- NativeWind v4 configured with custom color tokens
- Gluestack UI v2 installed and theme configured
- Custom fonts loaded (Bebas Neue + DM Sans) via expo-font
- Bottom tab bar with 5 tabs: Home, Camera, Nutrition, Progress, Profile
- Each tab has a placeholder screen with the correct background color
- Status bar style set to light (white text on dark background)
- Safe area handling for iPhone notch and Android status bar
- App icon and splash screen configured

### UI What You See

The app opens to a dark purple screen. At the bottom is a tab bar with 5 icons.
Tapping each tab shows a different dark screen with the tab name centered.
The tab bar has a dark background with a purple accent on the active icon.
The status bar shows white text. Fonts are loaded — headings use Bebas Neue.

### Libraries Used in This Phase

- `expo` SDK 51
- `expo-router` v3 — tab and stack navigation
- `nativewind` v4 — Tailwind classes
- `@gluestack-ui/themed` v2 — component library
- `expo-font` — custom fonts
- `expo-linear-gradient` — gradient header background
- `expo-status-bar` — white status bar text
- `react-native-safe-area-context` — notch/home bar safe zones

---

## Phase 2 — User Profile & Health Metrics

**Estimated time:** 3–4 days

### What Gets Built

The Profile tab becomes fully functional. Users fill in their details and
see all health metrics calculated instantly.

### Features in This Phase

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

### UI What You See

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

### Libraries Used in This Phase

- `@react-native-async-storage/async-storage` — profile persistence
- `expo-secure-store` — encrypted API key storage
- `@gluestack-ui/themed` — Input, Select, Switch, Card components
- `nativewind` — all styling via className
- `react-native-circular-progress` — BMI scale arc visualization
- Pure TypeScript functions for all health math (no library)

---

## Phase 3 — Camera Exercise Tracking

**Estimated time:** 5–7 days (most complex phase)

### What Gets Built

The Camera tab opens the device camera, detects body pose using TensorFlow,
counts reps automatically, and saves workout sessions.

### Features in This Phase

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

### UI What You See

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

### Libraries Used in This Phase

- `expo-camera` — camera stream, permissions
- `@tensorflow/tfjs-react-native` — TensorFlow runtime for React Native
- `@tensorflow-models/pose-detection` — MoveNet SinglePose Lightning model
- `react-native-svg` — drawing skeleton lines over the camera
- `expo-av` — playing the rep beep audio
- `expo-haptics` — vibration on rep completion
- `expo-sqlite` — saving workout sessions to local database
- `react-native-reanimated` — rep counter bounce animation
- `@gluestack-ui/themed` — BottomSheet for exercise selector

---

## Phase 4 — AI Nutrition Engine

**Estimated time:** 3–4 days

### What Gets Built

The Nutrition tab becomes fully functional. Users type meals in plain text,
AI returns full macro breakdowns, and the day's nutrition is tracked.

### Features in This Phase

- Daily greeting header — "Good morning, [Name]!" like Image 3
- Calorie ring at the top — shows Eaten / Net Kcal / Burned as three numbers
  around a donut chart, colored green when on track and red when over
- Macro progress bars below the ring — Carbs, Protein, Fat each with
  current / target values (e.g. 115 / 217g) like Image 3
- Meal section below showing logged meals grouped by time of day
- Add meal button opens a bottom sheet with a text input
- User types their meal in plain text — "2 rotis, 1 bowl dal, 1 banana"
- AI call sent to Claude — spinner shown while waiting
- Result shows as a meal card with: total calories, per-item breakdown table,
  all macros in a compact grid
- Meal saved to SQLite and daily totals update instantly
- Net calories = consumed minus burned from workouts shown prominently
- Fat burned today in grams shown as a secondary stat
- Full day history — scroll down to see all meals logged today
- Swipe left on any meal card to delete it

### UI What You See

The screen looks very close to Image 3 — clean and structured.
The top section has the daily greeting in a large serif/display font.
Below it: the time and date pills (like the 9:41 and Today: Monday chips in Image 3).

The calorie ring card takes up about 1/3 of the screen — a large donut ring
with three numbers: Eaten on the left, the net Kcal in the center inside the ring,
and Burned on the right. The ring fills based on how close to the daily target.

Below the ring: three horizontal macro bars (Carbs, Protein, Fat) each with
a filled progress indicator and current / target labels. This is the exact layout
from Image 3 bottom section.

Further down is the Nutrition section header followed by time-grouped meal cards.
Each card shows a food emoji, meal name, calorie count, and a small + button
to add another item to that meal slot. The yellow "9:00" breakfast time pill
from Image 3 is replicated as a time badge above each meal group.

The add meal button floats above the bottom tab bar as a large circular + button.

### Libraries Used in This Phase

- `victory-native` — donut chart (VictoryPie) for calorie ring
- `axios` — HTTP call to Anthropic Claude API
- `expo-secure-store` — read saved API key
- `expo-sqlite` — save and query meals
- `@gluestack-ui/themed` — BottomSheet for meal input, Progress for macro bars
- `react-native-reanimated` — ring fill animation when meal logged
- `nativewind` — all layout and styling

---

## Phase 5 — Dashboard & Progress

**Estimated time:** 3–4 days

### What Gets Built

The Home (Dashboard) tab and the Progress tab both become fully functional
with live data from the device database.

### Dashboard Features

- Header with user avatar, name, and health score percentage (like Image 1 top)
- Notification bell icon in top right
- "Choose Your Exercise" horizontal card scroller — each card has a category
  illustration, category name, and colored background (like Image 1 Strength/Cardio cards)
  Tapping a card navigates to the Camera tab with that category pre-selected
- Progress section card showing:
  - Steps count with a circular ring progress (Image 1 middle section)
  - Last updated timestamp
  - Calories burned stat with flame icon
  - Distance / active minutes stat
- Today's workout summary if a session was done today
- Today's nutrition summary ring (smaller version, links to Nutrition tab)
- Upcoming workout from the AI plan if one exists
- Streak counter card — current daily streak in days

### Progress Tab Features

- Toggle between Daily / Weekly / Monthly view
- Weight history line chart — tap a point to see that day's log
- Calorie trend chart — consumed vs target over time
- Workout frequency bar chart — sessions per week
- Personal records section — best reps for each exercise
- Body measurements history if the user logs waist, arms, chest
- Streak calendar — GitHub-style contribution grid showing active days

### UI What You See

Dashboard matches Image 1 closely. Dark purple background throughout.
Top section has a gradient header (deep purple to slightly lighter purple) with
the avatar, name, and health percentage in a heart icon badge.
The exercise category scroller shows colorful illustrated cards — each a different
background color (peach for Strength, cyan for Cardio like Image 1).

The Progress card below has a dark card background with the steps ring on the right,
big bold steps number on the left, and the calories/distance mini-stats in a 2-column
grid at the bottom of the card.

Progress tab matches Image 2 left panel — Daily/Calendar toggle at the top,
the step ring and calories on one card, weight display, and the workout finder
section with category filters (All / Full body / Upper / Lower).

### Libraries Used in This Phase

- `victory-native` — line charts, bar charts, area charts
- `react-native-circular-progress` — steps ring, streak ring
- `expo-sqlite` — reading all historical data
- `@gluestack-ui/themed` — SegmentedControl (Daily/Weekly toggle), Card
- `react-native-reanimated` — chart entry animations
- `nativewind` — all layout

---

## Phase 6 — AI Prediction & Workout Planning

**Estimated time:** 3–4 days

### What Gets Built

The AI prediction screen and the AI workout plan screen, both powered by
Claude API calls using the user's saved profile and goals.

### Prediction Features

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

### Workout Plan Features

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

### UI What You See

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

### Libraries Used in This Phase

- `axios` — AI API calls
- `@gluestack-ui/themed` — Accordion for day expansion, Badge for workout type
- `expo-sqlite` — saving and loading the generated plan
- `react-native-reanimated` — prediction number count-up animation
- `nativewind` — all layout and styling

---

## Phase 7 — Firebase Cloud Sync & Authentication

**Estimated time:** 3–4 days

### What Gets Built

User accounts, login, and real-time sync across all devices.

### Features in This Phase

- Onboarding screen shown on first launch — app name, tagline, Get Started button
- Login screen: Google sign-in button + email/password option
- "Continue without account" option — skip login, use locally only
- When signed in: sync indicator in header (cloud icon with status)
- All workout sessions, meals, profile, and plans sync to Firestore in real time
- Offline queue: if offline, changes stored locally and pushed when reconnected
- A banner appears at the top when there are unsynced items
- Progress photos upload to Firebase Storage
- Sign out option in Profile tab
- Account deletion option in Settings
- Firestore security rules: each user only reads/writes their own data

### UI What You See

The onboarding screen is full-screen with the app name in Bebas Neue,
a short tagline, and two buttons at the bottom — "Sign in with Google"
(white button with Google logo) and "Continue without account" (text link).

When signed in, a small cloud sync icon appears next to the user name in the
header. It shows a spinning indicator when syncing, a checkmark when synced,
and an exclamation mark if offline. Tapping it shows a small popover with
sync status details.

### Libraries Used in This Phase

- `firebase` JS SDK v10
- `@react-native-google-signin/google-signin` — Google authentication
- `expo-sqlite` — local source of truth
- `@react-native-async-storage/async-storage` — offline queue
- `@gluestack-ui/themed` — Toast for sync status notifications
- `nativewind` — all styling

---

## Phase 8 — Notifications, Sharing & Polish

**Estimated time:** 3–4 days

### What Gets Built

Push notifications for workout reminders, the ability to share workout
summaries, and final polish across all screens.

### Features in This Phase

- Push notification permission request on first workout completion
- Workout reminder notifications — user sets a daily time, app sends a reminder
- Streak save notification — "You haven't worked out today. Keep your streak!"
- Workout summary share card — generated image showing exercise, reps, calories
  with the FitTrack AI branding, shareable to WhatsApp, Instagram, etc.
- Weekly summary notification every Sunday — workouts done, calories burned, streak
- Settings screen accessible from Profile tab:
  - Notification preferences (on/off per type)
  - Unit preferences (metric/imperial)
  - Theme toggle (dark purple / light green like Image 3)
  - Clear all local data option
  - App version and about section
- App icon badge showing today's streak count
- Widget support (optional) — today's calorie summary on home screen

### UI What You See

The share card is a tall portrait image generated as a screenshot-like graphic —
dark background with the FitTrack AI logo, the exercise name in large Bebas Neue,
the rep count, duration, and calories burned in bold stat boxes, and a motivational
tagline at the bottom. Sharing it opens the native share sheet.

Settings screen is a simple grouped list — each section has a header label and
rows with toggle switches or navigation arrows. Same dark card style as the rest of the app.

### Libraries Used in This Phase

- `expo-notifications` — local and push notifications
- `expo-sharing` — native share sheet
- `expo-media-library` — save share card to camera roll
- `expo-task-manager` — background notification scheduling
- `react-native-view-shot` — capture the share card as an image
- `@gluestack-ui/themed` — Switch, List, ListItem for settings
- `nativewind` — all styling

---

## Screen-by-Screen UI Reference

### Home / Dashboard Screen
- Inspiration: Image 1 (dark purple fitness app)
- Top gradient header with avatar, name, health score
- Horizontal exercise category card scroller with illustrations
- Progress stats card (steps ring + calories + distance)
- Today's snapshot cards

### Camera / Exercise Tracking Screen
- Full screen camera view
- Skeleton overlay on top of video
- Large rep counter floating over camera
- Exercise selector cards before workout starts
- Compact control strip at bottom
- Rest timer overlay between sets

### Nutrition Screen
- Inspiration: Image 3 (green nutrition app) — same layout, dark purple theme
- Greeting header with date/time pills
- Large calorie donut ring with Eaten / Net / Burned
- Macro progress bars (Carbs, Protein, Fat)
- Meal cards grouped by time
- Floating add button

### Progress Screen
- Inspiration: Image 2 left panel (progress dashboard)
- Daily / Weekly toggle
- Step ring + weight + calorie summary card
- Workout finder with category filter chips
- Workout cards with photo, title, duration, calorie range

### Profile Screen
- Scrollable form sections
- BMI arc scale visualization
- Health metric stat cards grid
- Secure API key input field

### Prediction Screen
- Input form for planned routine
- Dramatic before / after stats comparison
- AI narrative quote card
- Regenerate and Save buttons

### Workout Plan Screen
- Week selector pill tabs
- Calendar-style day rows with workout type badges
- Exercise list inside each day
- Tap exercise → camera opens with it pre-selected

---

## Phase Summary Table

| Phase | What Gets Built | Duration | AI Used |
|---|---|---|---|
| 1 | Project setup, navigation shell, design system | 2–3 days | No |
| 2 | Profile form, BMI/BMR/TDEE metrics | 3–4 days | No |
| 3 | Camera + pose tracking + rep counting | 5–7 days | No |
| 4 | Nutrition — meal logging + AI macro analysis | 3–4 days | Yes — meal analysis |
| 5 | Dashboard + progress charts + history | 3–4 days | No |
| 6 | AI prediction + AI workout plan generator | 3–4 days | Yes — prediction + plan |
| 7 | Firebase login + cloud sync + offline queue | 3–4 days | No |
| 8 | Notifications + sharing + final polish | 3–4 days | No |

**Total estimated time: 25–34 days for a solo developer**

---

## What Needs an Anthropic API Key

| Feature | Needs Key |
|---|---|
| Camera rep counting | No |
| All health metric calculations | No |
| Progress charts | No |
| Workout history | No |
| Meal nutrition analysis | Yes |
| 30-day transformation prediction | Yes |
| Workout plan generation | Yes |

The entire tracking and health side of the app works without any API key.
The AI features need the user's own Anthropic API key saved in the Profile tab.
It is stored in expo-secure-store on the device only — never uploaded to Firebase.

---

## Offline Behaviour

| Action | Offline |
|---|---|
| Track exercise + count reps | Works — no internet needed |
| View health metrics and profile | Works — stored locally |
| View workout history | Works — SQLite on device |
| Log a meal | Saved locally — AI call queued for when online |
| View previously generated prediction | Works |
| Generate new prediction or plan | Requires internet for AI call |
| Sync to Firebase | Queued — auto-syncs when connection returns |

---

*FitTrack AI — PLAN.md v1.0 | Expo + React Native + NativeWind + Gluestack UI + Firebase + Claude AI*