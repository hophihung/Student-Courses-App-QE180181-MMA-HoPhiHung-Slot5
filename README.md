# Student Courses App

A React Native Expo app that displays a list of students and their enrolled courses with infinite scrolling, grouped sections, and data persistence.

## Features

### Part 1 - FlatList (Basic List of Students)

- ✅ **Student List Display**: Shows students with name, email, and profile avatar
- ✅ **Pull-to-Refresh**: Refresh the student list by pulling down
- ✅ **Profile Avatars**: Random avatar images from Pravatar service

### Part 2 - SectionList (Group Courses by Category)

- ✅ **Course Categories**: Courses grouped by Programming, Design, Math, Science, Languages
- ✅ **Section Headers**: Each category has a colored header with course count
- ✅ **Course Details**: Each course shows title and duration
- ✅ **Search Functionality**: Filter courses by name with real-time search
- ✅ **Color-Coded Categories**: Each category has a distinct color

### Part 3 - InfiniteList (Load More Students)

- ✅ **Infinite Scrolling**: Load students in batches of 10
- ✅ **Loading States**: Shows spinner while loading more students
- ✅ **End State**: Displays "No more students available" when limit reached
- ✅ **Performance**: Efficient loading with pagination

### Bonus Features

- ✅ **Sticky Headers**: Category names remain visible while scrolling in SectionList
- ✅ **Navigation**: Tap student → navigate to detail screen with course SectionList
- ✅ **AsyncStorage Persistence**: Data persists after app restart
- ✅ **Error Handling**: Proper error handling with user feedback
- ✅ **Loading States**: Comprehensive loading indicators
- ✅ **Responsive Design**: Works on different screen sizes

## Technical Implementation

### Architecture

- **Navigation**: React Navigation v6 with native stack navigator
- **State Management**: React hooks (useState, useEffect, useCallback)
- **Data Persistence**: AsyncStorage for local data storage
- **Performance**: Optimized with useMemo and useCallback hooks

### Components

- `StudentItem`: Individual student card with avatar and info
- `CourseItem`: Course card with category badge
- `SectionHeader`: Category header with count and color coding
- `SearchBar`: Reusable search input with clear functionality

### Screens

- `StudentsListScreen`: Main list with infinite scroll and refresh
- `StudentDetailScreen`: Student details with course sections

### Data Structure

```typescript
interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  courses: Course[];
}

interface Course {
  id: string;
  title: string;
  duration: string;
  category: CourseCategory;
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app on physical device)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Scan the QR code with Expo Go app or press 'a' for Android/'i' for iOS

## Dependencies

### Core Dependencies

- `react-native`: Core React Native framework
- `expo`: Expo SDK for cross-platform development
- `@react-navigation/native`: Navigation library
- `@react-navigation/native-stack`: Stack navigator
- `@react-native-async-storage/async-storage`: Local data persistence

### Dev Dependencies

- `typescript`: TypeScript support
- `@types/react`: Type definitions for React

## Features Demo

### Students List

- Displays 100 mock students with infinite scrolling
- Pull-to-refresh functionality
- Loads 10 students at a time for performance
- Persistent data across app restarts

### Student Detail

- Shows student profile with large avatar
- Lists all enrolled courses grouped by category
- Search functionality to filter courses
- Sticky section headers for better UX

### Data Persistence

- Student data is automatically saved to AsyncStorage
- App restores previous state on restart
- Refresh option to reload fresh data

## Mock Data

The app includes comprehensive mock data:

- 100 students with unique names and emails
- 19 different courses across 5 categories
- Random avatar assignments
- Realistic course durations and names

## UI/UX Features

- Clean, modern Material Design inspired interface
- Consistent color scheme for categories
- Smooth animations and transitions
- Loading states and error handling
- Empty states with helpful messages
- Responsive design for different screen sizes

## Performance Optimizations

- Efficient FlatList and SectionList rendering
- Memoized components and callbacks
- Optimized image loading with default fallbacks
- Pagination to reduce memory usage
- Debounced search functionality
