# Phase 4 — AI Nutrition Engine

**Estimated time:** 3–4 days

## What Gets Built

The Nutrition tab becomes fully functional. Users type meals in plain text,
AI returns full macro breakdowns, and the day's nutrition is tracked.

## Features in This Phase

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

## UI What You See

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

## Libraries Used in This Phase

- `victory-native` — donut chart (VictoryPie) for calorie ring
- `axios` — HTTP call to Anthropic Claude API
- `expo-secure-store` — read saved API key
- `expo-sqlite` — save and query meals
- `@gluestack-ui/themed` — BottomSheet for meal input, Progress for macro bars
- `react-native-reanimated` — ring fill animation when meal logged
- `nativewind` — all layout and styling

## AI Integration

### Claude API Prompt Structure
Design structured prompts for nutrition analysis that request JSON responses with calorie counts, macronutrient breakdowns, and per-item analysis.

### API Response Handling
Parse and validate AI responses to extract nutritional data for meal logging and macro tracking.

## Implementation Steps

### 1. Install Dependencies
Install charting, HTTP client, and UI libraries for nutrition tracking.

### 2. Create AI Service
Build nutrition analysis service with Claude API integration for meal analysis.

### 3. Create Database Schema
Design database structure for storing meals with nutritional information and timestamps.

### 4. Create Nutrition Components
Build UI components for calorie ring, macro bars, meal input, and nutrition breakdown.

### 5. Implement Daily Tracking
Create hooks for managing meal data and calculating daily nutrition totals.

### 6. Build Responsive Layout
Design responsive layout with header, calorie ring, macro bars, and meal list.

## Component Structure

Organize nutrition components into logical modules:
- Calorie ring visualization
- Macro progress bars
- Meal input interface
- Nutrition breakdown display
- Daily totals calculation
- Time-grouped meal display

## Data Models

### Meal Interface
Define meal structure with nutritional information, timing, and item breakdown.

### Daily Nutrition Summary
Define daily nutrition tracking structure with calories, macros, and meal history.

## Macro Targets Calculation

### Based on User Goals
Calculate macro targets based on user goals (lose weight, maintain, gain muscle) with appropriate protein, carb, and fat ratios adjusted for each goal type.

## Error Handling

### AI API Errors
- Handle rate limiting from Claude API
- Provide fallback calorie estimation
- Show clear error messages to user
- Allow retry mechanism

### Network Issues
- Queue meals when offline
- Sync when connection restored
- Show offline status indicator

## Performance Considerations

### API Optimization
- Cache common meal analyses
- Batch multiple meal items in single API call
- Implement request debouncing

### Database Optimization
- Index meals by date for fast queries
- Use efficient aggregation for daily totals
- Limit initial meal load to today's data

## Acceptance Criteria

- [ ] Daily greeting shows user name with appropriate time-based message
- [ ] Calorie ring displays eaten/net/burned values correctly
- [ ] Macro progress bars show current vs target values
- [ ] Meal input bottom sheet opens and closes smoothly
- [ ] AI nutrition analysis returns accurate macro breakdowns
- [ ] Meals are saved to SQLite with all data
- [ ] Daily totals update instantly after adding meals
- [ ] Swipe-to-delete functionality works on meal cards
- [ ] Time grouping of meals works correctly
- [ ] Net calories calculation includes workout calories
- [ ] UI matches Image 3 layout and styling
- [ ] Error handling works for API failures

## Next Phase

After completing Phase 4, proceed to Phase 5 — Dashboard & Progress.
