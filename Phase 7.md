# Phase 7 — Firebase Cloud Sync & Authentication

**Estimated time:** 3–4 days

## What Gets Built

User accounts, login, and real-time sync across all devices.

## Features in This Phase

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

## UI What You See

The onboarding screen is full-screen with the app name in Bebas Neue,
a short tagline, and two buttons at the bottom — "Sign in with Google"
(white button with Google logo) and "Continue without account" (text link).

When signed in, a small cloud sync icon appears next to the user name in the
header. It shows a spinning indicator when syncing, a checkmark when synced,
and an exclamation mark if offline. Tapping it shows a small popover with
sync status details.

## Libraries Used in This Phase

- `firebase` JS SDK v10
- `@react-native-google-signin/google-signin` — Google authentication
- `expo-sqlite` — local source of truth
- `@react-native-async-storage/async-storage` — offline queue
- `@gluestack-ui/themed` — Toast for sync status notifications
- `nativewind` — all styling

## Implementation Steps

### 1. Install Dependencies
Install Firebase and Google Sign-In libraries for authentication and cloud services.

### 2. Firebase Project Setup
Create Firebase project, configure services, and download configuration files.

### 3. Firebase Configuration
Initialize Firebase services in the app with proper configuration.

### 4. Authentication Services
Implement authentication functions for Google sign-in and email/password login.

### 5. Firestore Services
Create database operations for user data, workouts, meals, and plans.

### 6. Sync Management
Implement offline queue management and real-time sync functionality.

### 7. Create Authentication Components
Build UI components for onboarding, login, and sync status display.

### 8. Implement Security Rules
Set up Firestore security rules to protect user data.

## Component Structure

Organize authentication and sync components into logical modules:
- Onboarding and login screens
- Sync status indicators and notifications
- Account management settings

lib/firebase/
- Firebase initialization and configuration
- Authentication functions
- Database operations
- File upload functions

lib/db/
- Offline queue management
- Conflict resolution strategies

## Data Models

### User Document Structure
Define user profile structure with settings, preferences, and metadata.

### Sync Queue Item
Define sync queue structure for offline operations and retry logic.

## Authentication Flow

### Google Sign-In Implementation
Implement Google authentication using React Native Google Sign-In library with Firebase credential integration.

### Email/Password Authentication
Implement traditional email and password authentication with Firebase Auth.

## Sync Implementation

### Offline Queue Management
Create sync manager for handling offline operations and retry logic with conflict resolution.

### Real-time Sync Triggers
Set up real-time listeners for data synchronization and conflict handling.

## Conflict Resolution

### Last-Write-Wins Strategy
Implement timestamp-based conflict resolution with local and remote data comparison.

## Progress Photo Upload

### Firebase Storage Integration
Handle progress photo uploads to Firebase Storage with proper file management.

## Performance Considerations

### Batch Operations
Implement batch Firestore operations for improved performance and reduced API calls.

### Data Compression
Compress JSON data before storage to optimize local storage usage.

## Error Handling

### Network Error Recovery
Set up network listeners to handle connection changes and queue processing.

### Authentication Error Handling
Implement authentication state management and error handling for login flows.

## Acceptance Criteria

- [ ] Onboarding screen shows on first launch
- [ ] Google sign-in works correctly
- [ ] Email/password authentication functions
- [ ] "Continue without account" option works
- [ ] Sync indicator shows correct status
- [ ] Data syncs to Firestore in real-time
- [ ] Offline queue stores changes when offline
- [ ] Changes sync when connection restored
- [ ] Progress photos upload to Firebase Storage
- [ ] Security rules prevent cross-user data access
- [ ] Sign out functionality works
- [ ] Account deletion removes all user data
- [ ] Conflict resolution handles simultaneous edits
- [ ] Sync banner shows when offline
- [ ] Local data remains accessible when offline

## Next Phase

After completing Phase 7, proceed to Phase 8 — Notifications, Sharing & Polish.
