// User preferences object structure
const userPreferences = {
    darkMode: false,
    notifications: true,
    activeTab: 'home',
    animationPlayed: {}
  };
  
  // DOM Elements
  const loadingScreen = document.getElementById('loading-screen');
  const mainApp = document.getElementById('main-app');
  const themeToggle = document.getElementById('theme-toggle');
  const notificationToggle = document.getElementById('notification-toggle');
  const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
  const notificationsCheckbox = document.getElementById('notifications-checkbox');
  const resetButton = document.getElementById('reset-button');
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Debug function to help troubleshoot
  function debug(message) {
    console.log(`[Debug] ${message}`);
  }
  
  // Initialize the app
  function initApp() {
    // Load preferences from localStorage
    loadUserPreferences();
    
    // Simulate loading (you can adjust the time or remove for production)
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        mainApp.classList.remove('hidden');
      }, 500);
    }, 1500);
    
    // Apply initial preferences
    applyUserPreferences();
    
    // Set up event listeners
    setupEventListeners();
  }
  
  // Load user preferences from localStorage
  function loadUserPreferences() {
    try {
      const storedDarkMode = localStorage.getItem('lumiDarkMode');
      const storedNotifications = localStorage.getItem('lumiNotifications');
      const storedActiveTab = localStorage.getItem('lumiActiveTab');
      const storedAnimations = localStorage.getItem('lumiAnimations');
      
      debug("Loading preferences from localStorage");
      
      if (storedDarkMode !== null) {
        userPreferences.darkMode = JSON.parse(storedDarkMode);
        debug(`Loaded darkMode: ${userPreferences.darkMode}`);
      }
      
      if (storedNotifications !== null) {
        userPreferences.notifications = JSON.parse(storedNotifications);
        debug(`Loaded notifications: ${userPreferences.notifications}`);
      }
      
      if (storedActiveTab) {
        userPreferences.activeTab = storedActiveTab;
        debug(`Loaded activeTab: ${userPreferences.activeTab}`);
      }
      
      if (storedAnimations) {
        userPreferences.animationPlayed = JSON.parse(storedAnimations);
        debug("Loaded animation states");
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
      // If there's an error, we'll just use the defaults
    }
  }
  
  // Apply the user preferences to the UI
  function applyUserPreferences() {
    // Apply dark mode
    if (userPreferences.darkMode) {
      document.body.classList.add('dark-theme');
      darkModeCheckbox.checked = true;
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      themeToggle.classList.add('active');
    } else {
      document.body.classList.remove('dark-theme');
      darkModeCheckbox.checked = false;
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      themeToggle.classList.remove('active');
    }
    
    // Apply notification settings
    if (userPreferences.notifications) {
      notificationsCheckbox.checked = true;
      notificationToggle.classList.add('active');
    } else {
      notificationsCheckbox.checked = false;
      notificationToggle.classList.remove('active');
    }
    
    // Apply active tab
    setActiveTab(userPreferences.activeTab);
    
    // Force a style recalculation to ensure theme changes are applied
    document.body.offsetHeight;
  }
  
  // Set up all event listeners
  function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', () => {
      toggleDarkMode();
      playAnimation('theme');
    });
    
    darkModeCheckbox.addEventListener('change', () => {
      userPreferences.darkMode = darkModeCheckbox.checked;
      saveUserPreferences();
      applyUserPreferences();
    });
    
    // Notification toggle
    notificationToggle.addEventListener('click', () => {
      toggleNotifications();
      playAnimation('notification');
    });
    
    notificationsCheckbox.addEventListener('change', () => {
      userPreferences.notifications = notificationsCheckbox.checked;
      saveUserPreferences();
      applyUserPreferences();
    });
    
    // Tab navigation
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const tabName = item.getAttribute('data-tab');
        changeTab(tabName);
        playAnimation(tabName);
      });
    });
    
    // Reset button
    resetButton.addEventListener('click', () => {
      resetPreferences();
    });
  }
  
  // Toggle dark mode
  function toggleDarkMode() {
    userPreferences.darkMode = !userPreferences.darkMode;
    
    // Apply the change immediately
    if (userPreferences.darkMode) {
      document.body.classList.add('dark-theme');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      themeToggle.classList.add('active');
      darkModeCheckbox.checked = true;
    } else {
      document.body.classList.remove('dark-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      themeToggle.classList.remove('active');
      darkModeCheckbox.checked = false;
    }
    
    // Force style recalculation
    document.body.offsetHeight;
    
    // Save the preference
    saveUserPreferences();
  }
  
  // Toggle notifications
  function toggleNotifications() {
    userPreferences.notifications = !userPreferences.notifications;
    saveUserPreferences();
    applyUserPreferences();
  }
  
  // Change the active tab
  function changeTab(tabName) {
    userPreferences.activeTab = tabName;
    saveUserPreferences();
    setActiveTab(tabName);
  }
  
  // Set the active tab in the UI
  function setActiveTab(tabName) {
    // Update nav items
    navItems.forEach(item => {
      if (item.getAttribute('data-tab') === tabName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Update tab content
    tabContents.forEach(content => {
      if (content.id === `${tabName}-content`) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    });
  }
  
  // Play animation and track it
  function playAnimation(id) {
    userPreferences.animationPlayed[id] = true;
    saveUserPreferences();
    
    // Apply specific animations
    if (id === 'notification') {
      notificationToggle.classList.add('ping-animation');
      setTimeout(() => {
        notificationToggle.classList.remove('ping-animation');
      }, 500);
    } else if (id === 'theme') {
      themeToggle.classList.add('spin-animation');
      setTimeout(() => {
        themeToggle.classList.remove('spin-animation');
      }, 500);
    }
  }
  
  // Save preferences to localStorage
  function saveUserPreferences() {
    debug("Saving preferences to localStorage");
    debug(`darkMode: ${userPreferences.darkMode}`);
    debug(`notifications: ${userPreferences.notifications}`);
    debug(`activeTab: ${userPreferences.activeTab}`);
    
    localStorage.setItem('lumiDarkMode', JSON.stringify(userPreferences.darkMode));
    localStorage.setItem('lumiNotifications', JSON.stringify(userPreferences.notifications));
    localStorage.setItem('lumiActiveTab', userPreferences.activeTab);
    localStorage.setItem('lumiAnimations', JSON.stringify(userPreferences.animationPlayed));
  }
  
  // Reset all preferences
  function resetPreferences() {
    localStorage.clear();
    
    // Reset to defaults
    userPreferences.darkMode = false;
    userPreferences.notifications = true;
    userPreferences.activeTab = 'home';
    userPreferences.animationPlayed = {};
    
    // Apply defaults
    applyUserPreferences();
  }
  
  // Initialize the app when the DOM is loaded
  document.addEventListener('DOMContentLoaded', initApp);