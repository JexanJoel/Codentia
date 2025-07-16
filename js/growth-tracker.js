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

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Check authentication
function checkAuth() {
    const user = localStorage.getItem('cropkind_user');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
}

// Initialize
checkAuth();
initializeTheme();

// Growth tracking data
let growthData = JSON.parse(localStorage.getItem('cropkind_growth')) || [];

// File upload handling
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImg').src = e.target.result;
            document.getElementById('imagePreview').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
});

// Drag and drop functionality
const uploadArea = document.getElementById('uploadArea');

uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadArea.classList.add('border-vibrant-green');
});

uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('border-vibrant-green');
});

uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('border-vibrant-green');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('previewImg').src = e.target.result;
                document.getElementById('imagePreview').classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    }
});

function removeImage() {
    document.getElementById('imagePreview').classList.add('hidden');
    document.getElementById('fileInput').value = '';
}

function analyzeGrowth() {
    const cropName = document.getElementById('cropName').value;
    const growthStage = document.getElementById('growthStage').value;
    
    if (!cropName || !growthStage) {
        alert('Please fill in crop name and growth stage');
        return;
    }
    
    // Show loading state
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Analyzing...';
    button.disabled = true;
    
    // Simulate AI analysis
    setTimeout(() => {
        const analysisResult = {
            id: Date.now(),
            cropName,
            growthStage,
            date: new Date().toLocaleDateString(),
            healthScore: Math.floor(Math.random() * 20) + 80, // 80-100
            growthRate: Math.floor(Math.random() * 15) + 85, // 85-100
            leafQuality: Math.floor(Math.random() * 25) + 75, // 75-100
            recommendations: generateRecommendations(growthStage),
            image: document.getElementById('previewImg').src
        };
        
        growthData.unshift(analysisResult);
        localStorage.setItem('cropkind_growth', JSON.stringify(growthData));
        
        // Reset form
        document.getElementById('cropName').value = '';
        document.getElementById('growthStage').value = '';
        removeImage();
        
        // Update timeline
        loadGrowthTimeline();
        
        button.innerHTML = originalText;
        button.disabled = false;
        
        alert('Growth analysis completed successfully!');
    }, 3000);
}

function generateRecommendations(stage) {
    const recommendations = {
        seedling: [
            'Maintain consistent moisture levels',
            'Provide adequate light but avoid direct sunlight',
            'Use diluted fertilizer solution',
            'Monitor for damping-off disease'
        ],
        vegetative: [
            'Increase nitrogen-rich fertilizer',
            'Ensure proper spacing between plants',
            'Regular pruning of lower leaves',
            'Monitor for pest activity'
        ],
        flowering: [
            'Switch to phosphorus-rich fertilizer',
            'Reduce watering frequency slightly',
            'Support heavy branches if needed',
            'Monitor for pollination issues'
        ],
        fruiting: [
            'Increase potassium in fertilizer mix',
            'Maintain consistent watering schedule',
            'Support fruit-bearing branches',
            'Monitor for fruit diseases'
        ],
        maturity: [
            'Reduce watering before harvest',
            'Monitor for optimal harvest timing',
            'Prepare harvesting equipment',
            'Plan post-harvest storage'
        ]
    };
    
    return recommendations[stage] || recommendations.vegetative;
}

function loadGrowthTimeline() {
    const timeline = document.getElementById('growthTimeline');
    timeline.innerHTML = '';
    
    if (growthData.length === 0) {
        timeline.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-chart-line text-gray-400 text-6xl mb-4"></i>
                <p class="text-gray-500 dark:text-gray-400 text-xl">No growth data yet. Upload your first photo to start tracking!</p>
            </div>
        `;
        return;
    }
    
    growthData.forEach((entry, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'flex items-start space-x-6 p-6 bg-gradient-to-r from-light-green to-mint-green rounded-2xl shadow-lg';
        
        const healthColor = entry.healthScore >= 90 ? 'text-green-600' : entry.healthScore >= 75 ? 'text-yellow-600' : 'text-red-600';
        
        timelineItem.innerHTML = `
            <div class="flex-shrink-0">
                <img src="${entry.image}" alt="Growth photo" class="w-24 h-24 object-cover rounded-xl shadow-md">
            </div>
            <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-xl font-semibold text-forest-green">${entry.cropName}</h3>
                    <span class="text-sm text-gray-600">${entry.date}</span>
                </div>
                <div class="flex items-center space-x-4 mb-3">
                    <span class="px-3 py-1 bg-white rounded-full text-sm font-medium text-forest-green">${entry.growthStage}</span>
                    <span class="text-lg font-bold ${healthColor}">${entry.healthScore}% Health</span>
                </div>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-600">Growth Rate:</span>
                        <span class="font-semibold text-emerald ml-2">${entry.growthRate}%</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Leaf Quality:</span>
                        <span class="font-semibold text-yellow-600 ml-2">${entry.leafQuality}%</span>
                    </div>
                </div>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadGrowthTimeline();
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
        if (currentTheme === 'system') {
            applyTheme('system');
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            document.getElementById('mobile-menu').classList.add('hidden');
        });
    });
});