# Lumi Campus Connect App - Local Testing Guide

This is a standalone web application implementation of the Lumi Campus Connect app. It features CSS animations, JavaScript functions for dynamic behavior, and localStorage for data persistence, as requested.

## Project Structure

The project consists of three main files:

1. `index.html` - The HTML structure of the application
2. `styles.css` - CSS styling and animations
3. `app.js` - JavaScript functionality for dynamic behavior and localStorage management

## Features

### CSS Animations and Transitions
- Smooth color transitions for dark/light mode
- Slide-in and fade-in animations for content when switching tabs
- Custom ping and spin animations for notification and theme toggles
- Transform animations for buttons on click
- Loading spinner animation

### JavaScript Functions for Dynamic Behavior
- `toggleDarkMode()`: Switches between light and dark themes
- `toggleNotifications()`: Toggles notification settings
- `changeTab()`: Handles navigation between different sections
- `playAnimation()`: Tracks and plays animations triggered by user actions

### LocalStorage for Data Persistence
- Saves and retrieves user preferences:
  - Dark mode setting
  - Notification preferences
  - Last active tab
  - Animation state tracking
- Includes a "Reset Preferences" button that clears localStorage

### Responsive Design
- Mobile-first approach with optimizations for all screen sizes
- Landscape orientation support for mobile devices
- Tablet-specific layout improvements
- Desktop enhancements with hover effects
- System dark mode preference detection
- Special handling for very large screens

## How to Test Locally

1. Download all three files (`index.html`, `styles.css`, and `app.js`) to the same directory on your computer
2. Open the `index.html` file in any modern web browser
3. The app should load with a short loading animation and then display the interface
4. Test on different devices or use browser dev tools to simulate different screen sizes

## Testing Different Features

1. **Navigation**: Click on the bottom tabs to switch between Home, Courses, Calendar, and Settings
2. **Dark Mode**: Click the moon/sun icon in the header or toggle the switch in Settings
3. **Notifications**: Click the bell icon in the header or toggle the switch in Settings
4. **Persistence**: Refresh the page and verify your settings remain the same
5. **Reset**: Use the "Reset Preferences" button to clear all settings
6. **Responsiveness**: Resize your browser window to test different screen sizes
7. **Orientation**: If on mobile, rotate your device to test landscape orientation

## Browser Compatibility

This application works best in modern browsers that support:
- CSS Variables
- CSS Animations and Transitions
- localStorage API
- ES6 JavaScript features
- Media Queries
- Prefers-color-scheme media query

## Customization

You can easily customize this app by:
- Changing the color variables in the `:root` section of the CSS
- Adding more tabs or content sections in the HTML
- Extending the userPreferences object in JavaScript to store additional settings
- Adjusting breakpoints in media queries for different screen sizes