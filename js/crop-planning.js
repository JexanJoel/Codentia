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

// Crop recommendation data
const cropDatabase = {
    kharif: {
        rice: {
            name: 'Rice',
            icon: 'fas fa-seedling',
            suitability: 95,
            soilTypes: ['clay', 'loamy'],
            waterRequirement: 'abundant',
            duration: '120-150 days',
            yield: '25-30 quintals/acre',
            investment: '₹15,000-20,000/acre',
            profit: '₹25,000-35,000/acre',
            tips: [
                'Transplant 25-30 day old seedlings',
                'Maintain 2-3 inches water level',
                'Apply fertilizer in 3 splits',
                'Harvest when 80% grains are golden'
            ]
        },
        cotton: {
            name: 'Cotton',
            icon: 'fas fa-cloud',
            suitability: 88,
            soilTypes: ['sandy', 'loamy'],
            waterRequirement: 'moderate',
            duration: '180-200 days',
            yield: '8-12 quintals/acre',
            investment: '₹20,000-25,000/acre',
            profit: '₹30,000-45,000/acre',
            tips: [
                'Sow after good rainfall',
                'Maintain proper plant spacing',
                'Regular pest monitoring essential',
                'Pick cotton in early morning'
            ]
        },
        sugarcane: {
            name: 'Sugarcane',
            icon: 'fas fa-leaf',
            suitability: 82,
            soilTypes: ['loamy', 'clay'],
            waterRequirement: 'abundant',
            duration: '10-12 months',
            yield: '350-400 quintals/acre',
            investment: '₹35,000-40,000/acre',
            profit: '₹50,000-70,000/acre',
            tips: [
                'Plant healthy seed cane',
                'Ensure proper drainage',
                'Apply organic manure',
                'Harvest at proper maturity'
            ]
        }
    },
    rabi: {
        wheat: {
            name: 'Wheat',
            icon: 'fas fa-wheat-awn',
            suitability: 92,
            soilTypes: ['loamy', 'clay'],
            waterRequirement: 'moderate',
            duration: '110-130 days',
            yield: '18-25 quintals/acre',
            investment: '₹12,000-15,000/acre',
            profit: '₹20,000-30,000/acre',
            tips: [
                'Sow at optimum time',
                'Use recommended seed rate',
                'Apply fertilizer as per soil test',
                'Harvest at physiological maturity'
            ]
        },
        mustard: {
            name: 'Mustard',
            icon: 'fas fa-circle',
            suitability: 87,
            soilTypes: ['loamy', 'sandy'],
            waterRequirement: 'limited',
            duration: '90-110 days',
            yield: '6-8 quintals/acre',
            investment: '₹8,000-10,000/acre',
            profit: '₹15,000-20,000/acre',
            tips: [
                'Sow in lines for better yield',
                'Thin overcrowded plants',
                'Monitor for aphids',
                'Harvest when pods turn brown'
            ]
        },
        peas: {
            name: 'Peas',
            icon: 'fas fa-seedling',
            suitability: 78,
            soilTypes: ['loamy', 'sandy'],
            waterRequirement: 'moderate',
            duration: '75-90 days',
            yield: '4-6 quintals/acre',
            investment: '₹10,000-12,000/acre',
            profit: '₹18,000-25,000/acre',
            tips: [
                'Sow in cool weather',
                'Provide support for climbing',
                'Pick pods regularly',
                'Harvest when pods are full'
            ]
        }
    },
    zaid: {
        watermelon: {
            name: 'Watermelon',
            icon: 'fas fa-apple-alt',
            suitability: 89,
            soilTypes: ['sandy', 'loamy'],
            waterRequirement: 'moderate',
            duration: '90-100 days',
            yield: '150-200 quintals/acre',
            investment: '₹15,000-18,000/acre',
            profit: '₹35,000-50,000/acre',
            tips: [
                'Prepare raised beds',
                'Mulch to conserve moisture',
                'Support fruits with straw',
                'Harvest when fruit sounds hollow'
            ]
        },
        cucumber: {
            name: 'Cucumber',
            icon: 'fas fa-leaf',
            suitability: 85,
            soilTypes: ['loamy', 'sandy'],
            waterRequirement: 'moderate',
            duration: '60-70 days',
            yield: '80-100 quintals/acre',
            investment: '₹12,000-15,000/acre',
            profit: '₹25,000-35,000/acre',
            tips: [
                'Provide support for climbing',
                'Regular watering essential',
                'Harvest when young and tender',
                'Pick fruits regularly'
            ]
        },
        fodder: {
            name: 'Fodder Crops',
            icon: 'fas fa-grass',
            suitability: 80,
            soilTypes: ['loamy', 'clay'],
            waterRequirement: 'moderate',
            duration: '45-60 days',
            yield: '200-250 quintals/acre',
            investment: '₹5,000-8,000/acre',
            profit: '₹12,000-18,000/acre',
            tips: [
                'Cut at proper stage',
                'Multiple cuts possible',
                'Good for livestock feed',
                'Quick growing option'
            ]
        }
    }
};

// Form submission
document.getElementById('planningForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        location: document.getElementById('location').value,
        farmSize: document.getElementById('farmSize').value,
        soilType: document.getElementById('soilType').value,
        budget: document.getElementById('budget').value,
        season: document.getElementById('season').value,
        waterAvailability: document.getElementById('waterAvailability').value,
        preferences: {
            organic: document.getElementById('organic').checked,
            highYield: document.getElementById('highYield').checked,
            drought: document.getElementById('drought').checked,
            pestResistant: document.getElementById('pestResistant').checked
        }
    };
    
    if (!formData.location || !formData.farmSize || !formData.soilType || !formData.budget || !formData.season || !formData.waterAvailability) {
        alert('Please fill all required fields');
        return;
    }
    
    generateRecommendations(formData);
});

function generateRecommendations(formData) {
    const seasonCrops = cropDatabase[formData.season];
    const recommendations = [];
    
    // Filter crops based on criteria
    Object.keys(seasonCrops).forEach(cropKey => {
        const crop = seasonCrops[cropKey];
        let score = crop.suitability;
        
        // Adjust score based on soil type
        if (crop.soilTypes.includes(formData.soilType)) {
            score += 5;
        } else {
            score -= 10;
        }
        
        // Adjust score based on water availability
        if (crop.waterRequirement === formData.waterAvailability) {
            score += 5;
        } else if (
            (crop.waterRequirement === 'abundant' && formData.waterAvailability === 'moderate') ||
            (crop.waterRequirement === 'moderate' && formData.waterAvailability === 'limited')
        ) {
            score -= 5;
        }
        
        // Adjust score based on budget
        const investment = parseInt(crop.investment.replace(/[₹,]/g, '').split('-')[0]);
        const budgetPerAcre = parseInt(formData.budget) / parseInt(formData.farmSize);
        
        if (investment <= budgetPerAcre) {
            score += 10;
        } else {
            score -= 15;
        }
        
        if (score > 60) {
            recommendations.push({
                ...crop,
                score: Math.min(score, 100)
            });
        }
    });
    
    // Sort by score
    recommendations.sort((a, b) => b.score - a.score);
    
    displayRecommendations(recommendations);
    generatePlantingCalendar(formData.season);
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendedCrops');
    container.innerHTML = '';
    
    recommendations.forEach(crop => {
        const cropCard = document.createElement('div');
        cropCard.className = 'bg-light-green rounded-lg p-6 hover:shadow-lg transition-shadow';
        
        const suitabilityColor = crop.score >= 90 ? 'text-green-600' : crop.score >= 80 ? 'text-yellow-600' : 'text-orange-600';
        
        cropCard.innerHTML = `
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <i class="${crop.icon} text-forest-green text-2xl"></i>
                    <h3 class="text-lg font-semibold text-forest-green">${crop.name}</h3>
                </div>
                <span class="px-3 py-1 rounded-full text-sm font-medium bg-white ${suitabilityColor}">${crop.score}% suitable</span>
            </div>
            
            <div class="space-y-2 mb-4">
                <p class="text-sm text-gray-600"><strong>Duration:</strong> ${crop.duration}</p>
                <p class="text-sm text-gray-600"><strong>Expected Yield:</strong> ${crop.yield}</p>
                <p class="text-sm text-gray-600"><strong>Investment:</strong> ${crop.investment}</p>
                <p class="text-sm text-gray-600"><strong>Expected Profit:</strong> ${crop.profit}</p>
            </div>
            
            <div class="border-t pt-4">
                <h4 class="font-semibold text-forest-green mb-2">Key Tips:</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                    ${crop.tips.map(tip => `<li>• ${tip}</li>`).join('')}
                </ul>
            </div>
        `;
        
        container.appendChild(cropCard);
    });
    
    document.getElementById('recommendations').classList.remove('hidden');
}

function generatePlantingCalendar(season) {
    const calendarData = {
        kharif: {
            title: 'Kharif Season Calendar (June - November)',
            activities: [
                { month: 'June', activity: 'Land preparation and seed sowing', icon: 'fas fa-seedling' },
                { month: 'July', activity: 'Transplanting and fertilizer application', icon: 'fas fa-leaf' },
                { month: 'August', activity: 'Weeding and pest management', icon: 'fas fa-bug' },
                { month: 'September', activity: 'Flowering and water management', icon: 'fas fa-tint' },
                { month: 'October', activity: 'Grain filling and monitoring', icon: 'fas fa-eye' },
                { month: 'November', activity: 'Harvesting and post-harvest', icon: 'fas fa-cut' }
            ]
        },
        rabi: {
            title: 'Rabi Season Calendar (November - April)',
            activities: [
                { month: 'November', activity: 'Land preparation and sowing', icon: 'fas fa-seedling' },
                { month: 'December', activity: 'Irrigation and fertilizer application', icon: 'fas fa-tint' },
                { month: 'January', activity: 'Weeding and pest control', icon: 'fas fa-bug' },
                { month: 'February', activity: 'Flowering and water management', icon: 'fas fa-leaf' },
                { month: 'March', activity: 'Grain development monitoring', icon: 'fas fa-eye' },
                { month: 'April', activity: 'Harvesting and storage', icon: 'fas fa-cut' }
            ]
        },
        zaid: {
            title: 'Zaid Season Calendar (March - June)',
            activities: [
                { month: 'March', activity: 'Land preparation and sowing', icon: 'fas fa-seedling' },
                { month: 'April', activity: 'Irrigation and fertilizer application', icon: 'fas fa-tint' },
                { month: 'May', activity: 'Flowering and fruit development', icon: 'fas fa-apple-alt' },
                { month: 'June', activity: 'Harvesting and marketing', icon: 'fas fa-cut' }
            ]
        }
    };
    
    const calendar = calendarData[season];
    const container = document.getElementById('calendarContent');
    
    container.innerHTML = `
        <h3 class="text-xl font-semibold text-forest-green mb-6">${calendar.title}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${calendar.activities.map(activity => `
                <div class="bg-light-green rounded-lg p-4">
                    <div class="flex items-center space-x-3 mb-2">
                        <i class="${activity.icon} text-sage-green text-xl"></i>
                        <h4 class="font-semibold text-forest-green">${activity.month}</h4>
                    </div>
                    <p class="text-gray-700 text-sm">${activity.activity}</p>
                </div>
            `).join('')}
        </div>
    `;
    
    document.getElementById('plantingCalendar').classList.remove('hidden');
}

function savePlan() {
    const recommendations = document.getElementById('recommendations');
    if (recommendations.classList.contains('hidden')) {
        alert('Please generate recommendations first');
        return;
    }
    
    alert('Crop plan saved to your dashboard!');
}