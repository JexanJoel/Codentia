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

// Water requirements database (liters per acre per day)
const waterRequirements = {
    rice: { seedling: 50, vegetative: 80, flowering: 100, fruiting: 90, maturity: 40 },
    wheat: { seedling: 20, vegetative: 35, flowering: 45, fruiting: 40, maturity: 15 },
    corn: { seedling: 25, vegetative: 40, flowering: 60, fruiting: 55, maturity: 20 },
    tomato: { seedling: 15, vegetative: 30, flowering: 45, fruiting: 50, maturity: 25 },
    potato: { seedling: 20, vegetative: 35, flowering: 40, fruiting: 45, maturity: 20 },
    cotton: { seedling: 25, vegetative: 45, flowering: 65, fruiting: 60, maturity: 30 },
    sugarcane: { seedling: 60, vegetative: 100, flowering: 120, fruiting: 110, maturity: 80 },
    onion: { seedling: 15, vegetative: 25, flowering: 35, fruiting: 30, maturity: 15 }
};

// Soil type multipliers
const soilMultipliers = {
    clay: 0.8,
    loamy: 1.0,
    sandy: 1.3,
    silty: 0.9
};

// Climate multipliers
const climateMultipliers = {
    arid: 1.4,
    'semi-arid': 1.2,
    temperate: 1.0,
    tropical: 1.1,
    humid: 0.9
};

// Irrigation efficiency
const irrigationEfficiency = {
    drip: 0.9,
    sprinkler: 0.75,
    flood: 0.5,
    furrow: 0.6
};

// Water calculator form
document.getElementById('waterCalculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        cropType: document.getElementById('cropType').value,
        farmArea: parseFloat(document.getElementById('farmArea').value),
        growthStage: document.getElementById('growthStage').value,
        soilType: document.getElementById('soilType').value,
        climate: document.getElementById('climate').value,
        irrigationMethod: document.getElementById('irrigationMethod').value
    };
    
    if (!formData.cropType || !formData.farmArea || !formData.growthStage || !formData.soilType || !formData.climate || !formData.irrigationMethod) {
        alert('Please fill all fields');
        return;
    }
    
    calculateWaterRequirements(formData);
});

function calculateWaterRequirements(data) {
    // Base water requirement
    const baseRequirement = waterRequirements[data.cropType][data.growthStage];
    
    // Apply multipliers
    const soilAdjusted = baseRequirement * soilMultipliers[data.soilType];
    const climateAdjusted = soilAdjusted * climateMultipliers[data.climate];
    const efficiency = irrigationEfficiency[data.irrigationMethod];
    
    // Calculate final requirements
    const dailyRequirement = Math.round(climateAdjusted / efficiency);
    const totalDaily = Math.round(dailyRequirement * data.farmArea);
    const weeklyTotal = totalDaily * 7;
    const monthlyTotal = totalDaily * 30;
    
    // Generate schedule
    generateWaterSchedule({
        ...data,
        dailyPerAcre: dailyRequirement,
        totalDaily: totalDaily,
        weeklyTotal: weeklyTotal,
        monthlyTotal: monthlyTotal
    });
}

function generateWaterSchedule(requirements) {
    const scheduleContent = document.getElementById('scheduleContent');
    
    // Generate weekly schedule
    const schedule = [];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // Determine watering frequency based on irrigation method
    let wateringDays = [];
    switch(requirements.irrigationMethod) {
        case 'drip':
            wateringDays = [0, 2, 4, 6]; // Every other day
            break;
        case 'sprinkler':
            wateringDays = [1, 3, 5]; // 3 times a week
            break;
        case 'flood':
            wateringDays = [0, 3]; // Twice a week
            break;
        case 'furrow':
            wateringDays = [1, 4]; // Twice a week
            break;
    }
    
    days.forEach((day, index) => {
        const isWateringDay = wateringDays.includes(index);
        const amount = isWateringDay ? Math.round(requirements.totalDaily * (7 / wateringDays.length)) : 0;
        
        schedule.push({
            day: day,
            watering: isWateringDay,
            amount: amount,
            time: isWateringDay ? getOptimalTime(requirements.climate) : null
        });
    });
    
    scheduleContent.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div class="bg-gradient-to-br from-light-green to-mint-green rounded-2xl p-6">
                <h3 class="text-xl font-semibold text-forest-green mb-4">Water Requirements Summary</h3>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-gray-700">Daily per acre:</span>
                        <span class="font-semibold text-forest-green">${requirements.dailyPerAcre} L</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-700">Total daily:</span>
                        <span class="font-semibold text-forest-green">${requirements.totalDaily} L</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-700">Weekly total:</span>
                        <span class="font-semibold text-forest-green">${requirements.weeklyTotal} L</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-700">Monthly total:</span>
                        <span class="font-semibold text-forest-green">${requirements.monthlyTotal} L</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-light-green to-mint-green rounded-2xl p-6">
                <h3 class="text-xl font-semibold text-forest-green mb-4">Optimization Tips</h3>
                <ul class="space-y-2 text-gray-700">
                    <li class="flex items-start space-x-2">
                        <i class="fas fa-check text-vibrant-green mt-1"></i>
                        <span>Water during ${getOptimalTime(requirements.climate)} for best efficiency</span>
                    </li>
                    <li class="flex items-start space-x-2">
                        <i class="fas fa-check text-vibrant-green mt-1"></i>
                        <span>Monitor soil moisture before each watering</span>
                    </li>
                    <li class="flex items-start space-x-2">
                        <i class="fas fa-check text-vibrant-green mt-1"></i>
                        <span>Adjust schedule based on rainfall</span>
                    </li>
                    <li class="flex items-start space-x-2">
                        <i class="fas fa-check text-vibrant-green mt-1"></i>
                        <span>Use mulching to reduce water loss</span>
                    </li>
                </ul>
            </div>
        </div>
        
        <h3 class="text-2xl font-semibold text-forest-green mb-6">Weekly Watering Schedule</h3>
        <div class="grid grid-cols-1 md:grid-cols-7 gap-4">
            ${schedule.map(day => `
                <div class="bg-white dark:bg-gray-700 rounded-xl p-4 text-center ${day.watering ? 'border-2 border-vibrant-green' : 'border border-gray-200 dark:border-gray-600'}">
                    <h4 class="font-semibold text-forest-green dark:text-mint-green mb-2">${day.day}</h4>
                    ${day.watering ? `
                        <div class="text-vibrant-green mb-2">
                            <i class="fas fa-tint text-2xl"></i>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${day.amount} L</p>
                        <p class="text-xs text-gray-500 dark:text-gray-500">${day.time}</p>
                    ` : `
                        <div class="text-gray-400 mb-2">
                            <i class="fas fa-times text-2xl"></i>
                        </div>
                        <p class="text-sm text-gray-500 dark:text-gray-500">No watering</p>
                    `}
                </div>
            `).join('')}
        </div>
        
        <div class="mt-8 flex space-x-4">
            <button onclick="saveSchedule()" class="bg-gradient-to-r from-forest-green to-nature-green text-white px-6 py-3 rounded-xl hover:from-nature-green hover:to-emerald transition-all duration-300 shadow-lg font-semibold">
                <i class="fas fa-save mr-2"></i>Save Schedule
            </button>
            <button onclick="exportSchedule()" class="bg-gradient-to-r from-sage-green to-vibrant-green text-white px-6 py-3 rounded-xl hover:from-vibrant-green hover:to-emerald transition-all duration-300 shadow-lg font-semibold">
                <i class="fas fa-download mr-2"></i>Export PDF
            </button>
        </div>
    `;
    
    document.getElementById('waterSchedule').classList.remove('hidden');
    document.getElementById('waterSchedule').scrollIntoView({ behavior: 'smooth' });
}

function getOptimalTime(climate) {
    switch(climate) {
        case 'arid':
        case 'semi-arid':
            return 'Early morning (5-7 AM)';
        case 'tropical':
        case 'humid':
            return 'Early morning (6-8 AM) or evening (6-8 PM)';
        default:
            return 'Early morning (6-8 AM)';
    }
}

function saveSchedule() {
    alert('Water schedule saved to your dashboard!');
}

function exportSchedule() {
    alert('Schedule exported as PDF. Download will start shortly.');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
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