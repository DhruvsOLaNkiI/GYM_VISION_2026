# Phase 5 — Dashboard & Progress

**Estimated time:** 3–4 days

## What Gets Built

The Home (Dashboard) tab and the Progress tab both become fully functional
with live data from the device database.

## Dashboard Features

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

## Progress Tab Features

- Toggle between Daily / Weekly / Monthly view
- Weight history line chart — tap a point to see that day's log
- Calorie trend chart — consumed vs target over time
- Workout frequency bar chart — sessions per week
- Personal records section — best reps for each exercise
- Body measurements history if the user logs waist, arms, chest
- Streak calendar — GitHub-style contribution grid showing active days

## UI What You See

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

## Libraries Used in This Phase

- `victory-native` — line charts, bar charts, area charts
- `react-native-circular-progress` — steps ring, streak ring
- `expo-sqlite` — reading all historical data
- `@gluestack-ui/themed` — SegmentedControl (Daily/Weekly toggle), Card
- `react-native-reanimated` — chart entry animations
- `nativewind` — all layout

## Implementation Steps

### 1. Install Dependencies
Install charting libraries and UI components for dashboard and progress tracking.

### 2. Create Dashboard Components
Build dashboard components including health score, exercise categories, progress cards, and summaries.

### 3. Create Progress Components
Build progress tracking components with charts, frequency displays, and calendar views.

### 4. Implement Data Aggregation
Create hooks for aggregating workout data, calculating health scores, and generating chart data.

### 5. Build Responsive Layouts
Design responsive layouts for dashboard feed and tabbed progress interface.

## Component Structure

Organize dashboard and progress components into logical modules for maintainability and reusability.

## Data Models

### Health Score Calculation
Define health metrics structure and calculation method based on workout consistency, nutrition targets, and streak data.

### Chart Data Points
Define data structures for various chart types including weight history, calorie trends, and workout frequency.

## Exercise Categories

### Category Mapping
Define exercise categories with icons, colors, and associated exercises for the dashboard scroller.

## Chart Implementations

### Weight History Chart
Implement line chart for tracking weight changes over time with interactive data points.

### Steps Ring Progress
Implement circular progress indicator for daily step tracking with percentage display.

## Performance Considerations

### Data Loading
- Load only recent data for dashboard (last 7 days)
- Implement pagination for historical data
- Cache chart data to avoid recalculating

### Chart Optimization
- Limit data points to 50 for smooth rendering
- Use efficient chart libraries
- Implement chart lazy loading

## Acceptance Criteria

### Dashboard
- [ ] Header shows user avatar, name, and health score
- [ ] Exercise category cards scroll horizontally
- [ ] Tapping category card navigates to camera with pre-selected exercises
- [ ] Progress card shows steps ring with accurate data
- [ ] Calories and distance stats display correctly
- [ ] Today's workout summary appears when workout completed
- [ ] Nutrition summary ring shows today's calorie status
- [ ] Streak counter shows current consecutive days
- [ ] All data updates in real-time

### Progress Tab
- [ ] Daily/Weekly/Monthly toggle works correctly
- [ ] Weight history chart displays data points accurately
- [ ] Calorie trend chart shows consumed vs target
- [ ] Workout frequency bar chart displays weekly sessions
- [ ] Personal records section shows best performance
- [ ] Streak calendar shows activity pattern
- [ ] Charts animate smoothly on load
- [ ] Data persists and loads correctly

## Next Phase

After completing Phase 5, proceed to Phase 6 — AI Prediction & Workout Planning.
