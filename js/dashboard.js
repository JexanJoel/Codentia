// Theme management
let currentTheme = localStorage.getItem('cropkind_theme') || 'system';

function initializeTheme() {
    const themeIcon = document.getElementById('themeIcon');
    const themeDropdown = document.getElementById('themeDropdown');
    
    // Apply theme
    applyTheme(currentTheme);
    
    // Theme toggle button
    document.getElementById('themeToggle').addEventListener('click', function() {
        themeDropdown.classList.toggle('hidden');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!document.getElementById('themeToggle').contains(e.target) && !themeDropdown.contains(e.target)) {
            themeDropdown.classList.add('hidden');
        }
    });
}

function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('cropkind_theme', theme);
    applyTheme(theme);
    document.getElementById('themeDropdown').classList.add('hidden');
}

function applyTheme(theme) {
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    
    if (theme === 'dark') {
        html.classList.add('dark');
        themeIcon.className = 'fas fa-moon text-lg';
    } else if (theme === 'light') {
        html.classList.remove('dark');
        themeIcon.className = 'fas fa-sun text-lg';
    } else { // system
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            html.classList.add('dark');
            themeIcon.className = 'fas fa-desktop text-lg';
        } else {
            html.classList.remove('dark');
            themeIcon.className = 'fas fa-desktop text-lg';
        }
    }
}

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('cropkind_user');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    const userData = JSON.parse(user);
    
    // Update welcome message
    if (userData.name) {
        document.getElementById('userGreeting').textContent = `Hello, ${userData.name}!`;
        document.getElementById('welcomeMessage').textContent = `Welcome back, ${userData.name}!`;
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('cropkind_user');
        window.location.href = 'index.html';
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initializeTheme();
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
        if (currentTheme === 'system') {
            applyTheme('system');
        }
    });
});