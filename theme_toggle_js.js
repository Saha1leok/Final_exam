// assets/js/theme-toggle.js
// Dark/Light Mode Toggle with Local Storage

// ========================================
// 1. THEME MANAGEMENT
// ========================================
const ThemeManager = {
    // Theme configuration
    themes: {
        light: {
            name: 'light',
            icon: 'fa-moon',
            label: 'Темная тема'
        },
        dark: {
            name: 'dark',
            icon: 'fa-sun',
            label: 'Светлая тема'
        }
    },
    
    // Get current theme from localStorage
    getCurrentTheme() {
        return localStorage.getItem('theme') || 'light';
    },
    
    // Save theme to localStorage
    saveTheme(theme) {
        localStorage.setItem('theme', theme);
        console.log(`Theme saved: ${theme}`);
    },
    
    // Apply theme to document
    applyTheme(theme) {
        const root = document.documentElement;
        
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            root.setAttribute('data-theme', 'light');
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
        
        this.updateToggleButton(theme);
        console.log(`Theme applied: ${theme}`);
    },
    
    // Update toggle button appearance
    updateToggleButton(theme) {
        const toggleBtn = document.getElementById('themeToggle');
        if (!toggleBtn) return;
        
        const icon = toggleBtn.querySelector('i');
        const currentTheme = this.themes[theme];
        const oppositeTheme = theme === 'light' ? this.themes.dark : this.themes.light;
        
        if (icon) {
            icon.className = `fas ${oppositeTheme.icon}`;
        }
        
        toggleBtn.setAttribute('title', oppositeTheme.label);
        toggleBtn.setAttribute('aria-label', oppositeTheme.label);
    },
    
    // Toggle between themes
    toggleTheme() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        this.saveTheme(newTheme);
        this.applyTheme(newTheme);
        
        // Add animation effect
        this.addToggleAnimation();
    },
    
    // Add visual feedback animation
    addToggleAnimation() {
        const toggleBtn = document.getElementById('themeToggle');
        if (!toggleBtn) return;
        
        toggleBtn.classList.add('rotating');
        setTimeout(() => {
            toggleBtn.classList.remove('rotating');
        }, 500);
    },
    
    // Initialize theme on page load
    init() {
        console.log('Theme Manager initialized');
        
        // Apply saved theme or default
        const savedTheme = this.getCurrentTheme();
        this.applyTheme(savedTheme);
        
        // Setup event listener
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTheme());
            console.log('Theme toggle button listener attached');
        }
        
        // Listen for system theme changes (optional)
        this.listenForSystemThemeChanges();
    },
    
    // Detect system theme preference
    listenForSystemThemeChanges() {
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            darkModeQuery.addEventListener('change', (e) => {
                // Only apply if user hasn't set a preference
                if (!localStorage.getItem('theme')) {
                    const systemTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme(systemTheme);
                    console.log(`System theme changed to: ${systemTheme}`);
                }
            });
        }
    }
};

// ========================================
// 2. THEME-SPECIFIC ANIMATIONS
// ========================================
function addThemeTransitions() {
    // Add smooth transitions to elements when theme changes
    const transitionElements = [
        'body',
        '.card',
        '.btn',
        '.navbar',
        'footer',
        '.form-control',
        '.accordion-button'
    ];
    
    transitionElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease';
        });
    });
}

// ========================================
// 3. KEYBOARD SHORTCUT (Optional)
// ========================================
function setupKeyboardShortcut() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Shift + T to toggle theme
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            ThemeManager.toggleTheme();
            console.log('Theme toggled via keyboard shortcut');
        }
    });
}

// ========================================
// 4. INITIALIZE ON DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager
    ThemeManager.init();
    
    // Add smooth transitions
    addThemeTransitions();
    
    // Setup keyboard shortcut
    setupKeyboardShortcut();
    
    console.log('Dark/Light mode feature initialized');
    console.log('Current theme:', ThemeManager.getCurrentTheme());
    console.log('Keyboard shortcut: Ctrl/Cmd + Shift + T');
});

// ========================================
// 5. EXPORT FOR USE IN OTHER SCRIPTS
// ========================================
window.ThemeManager = ThemeManager;