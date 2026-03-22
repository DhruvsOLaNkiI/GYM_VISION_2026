# Phase 1 — Project Setup & Navigation Shell

**Estimated time:** 2–3 days

## What Gets Built

The skeleton of the entire app. No features yet — just the navigation,
screens, design system, and fonts loading correctly.

## Features in This Phase

- Expo project initialized with TypeScript + Expo Router
- NativeWind v4 configured with custom color tokens
- Gluestack UI v2 installed and theme configured
- Custom fonts loaded (Bebas Neue + DM Sans) via expo-font
- Bottom tab bar with 5 tabs: Home, Camera, Nutrition, Progress, Profile
- Each tab has a placeholder screen with the correct background color
- Status bar style set to light (white text on dark background)
- Safe area handling for iPhone notch and Android status bar
- App icon and splash screen configured

## UI What You See

The app opens to a dark purple screen. At the bottom is a tab bar with 5 icons.
Tapping each tab shows a different dark screen with the tab name centered.
The tab bar has a dark background with a purple accent on the active icon.
The status bar shows white text. Fonts are loaded — headings use Bebas Neue.

## Libraries Used in This Phase

- `expo` SDK 51
- `expo-router` v3 — tab and stack navigation
- `nativewind` v4 — Tailwind classes
- `@gluestack-ui/themed` v2 — component library
- `expo-font` — custom fonts
- `expo-linear-gradient` — gradient header background
- `expo-status-bar` — white status bar text
- `react-native-safe-area-context` — notch/home bar safe zones

## Implementation Steps

### 1. Initialize Expo Project
Use Expo CLI to create a new React Native project with TypeScript template.

### 2. Install Dependencies
Install all required libraries for navigation, styling, and UI components.

### 3. Configure NativeWind
Set up Tailwind CSS configuration with custom color tokens for the app theme.

### 4. Create App Structure
Organize the file structure with tab-based navigation using Expo Router.

### 5. Setup Tab Navigation
Configure the bottom tab navigator with 5 main tabs.

### 6. Create Placeholder Screens
Build basic screens for each tab with proper styling.

### 7. Configure Fonts
Load and apply custom fonts (Bebas Neue and DM Sans).

### 8. Setup Design System
Configure Gluestack UI theme with custom color tokens.

## Acceptance Criteria

- [ ] App launches without errors
- [ ] All 5 tabs are visible and functional
- [ ] Tab navigation works smoothly
- [ ] Custom fonts are loaded and applied
- [ ] Dark purple theme is consistent
- [ ] Status bar shows white text
- [ ] Safe areas are handled correctly on iOS and Android
- [ ] App icon and splash screen are configured

## Next Phase

After completing Phase 1, proceed to Phase 2 — User Profile & Health Metrics.
