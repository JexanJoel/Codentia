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

// Sample price data
const cropPrices = [
    { name: 'Rice', current: 45, previous: 43, icon: 'fas fa-seedling', market: 'Central Mandi' },
    { name: 'Wheat', current: 25, previous: 24, icon: 'fas fa-wheat-awn', market: 'Central Mandi' },
    { name: 'Tomatoes', current: 35, previous: 40, icon: 'fas fa-apple-alt', market: 'Farmers Market' },
    { name: 'Onions', current: 28, previous: 30, icon: 'fas fa-circle', market: 'Farmers Market' },
    { name: 'Potatoes', current: 22, previous: 22, icon: 'fas fa-circle', market: 'Wholesale Market' },
    { name: 'Carrots', current: 18, previous: 16, icon: 'fas fa-carrot', market: 'Farmers Market' },
    { name: 'Cabbage', current: 15, previous: 17, icon: 'fas fa-leaf', market: 'Farmers Market' },
    { name: 'Corn', current: 20, previous: 19, icon: 'fas fa-corn', market: 'Central Mandi' },
    { name: 'Beans', current: 45, previous: 42, icon: 'fas fa-seedling', market: 'Farmers Market' },
    { name: 'Spinach', current: 12, previous: 14, icon: 'fas fa-leaf', market: 'Farmers Market' }
];

function loadPrices() {
    const tableBody = document.getElementById('priceTableBody');
    tableBody.innerHTML = '';
    
    cropPrices.forEach(crop => {
        const change = crop.current - crop.previous;
        const changePercent = ((change / crop.previous) * 100).toFixed(1);
        const changeClass = change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
        const changeIcon = change > 0 ? 'fas fa-arrow-up' : change < 0 ? 'fas fa-arrow-down' : 'fas fa-minus';
        
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-100 hover:bg-light-green transition-colors';
        row.innerHTML = `
            <td class="p-4">
                <div class="flex items-center space-x-3">
                    <i class="${crop.icon} text-forest-green"></i>
                    <span class="font-medium text-forest-green">${crop.name}</span>
                </div>
            </td>
            <td class="p-4">
                <span class="text-lg font-semibold text-forest-green">₹${crop.current}</span>
            </td>
            <td class="p-4">
                <span class="text-gray-600">₹${crop.previous}</span>
            </td>
            <td class="p-4">
                <div class="flex items-center space-x-2">
                    <i class="${changeIcon} ${changeClass}"></i>
                    <span class="${changeClass} font-medium">
                        ${change > 0 ? '+' : ''}${change} (${changePercent}%)
                    </span>
                </div>
            </td>
            <td class="p-4">
                <span class="text-sage-green font-medium">${crop.market}</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function refreshPrices() {
    const refreshBtn = document.querySelector('[onclick="refreshPrices()"]');
    const originalClass = refreshBtn.className;
    
    refreshBtn.className = originalClass + ' animate-spin';
    
    // Simulate price refresh
    setTimeout(() => {
        // Slightly modify prices
        cropPrices.forEach(crop => {
            crop.previous = crop.current;
            crop.current = crop.current + (Math.random() - 0.5) * 4;
            crop.current = Math.max(5, Math.round(crop.current));
        });
        
        loadPrices();
        document.getElementById('lastUpdated').textContent = 'Just now';
        refreshBtn.className = originalClass;
    }, 1000);
}

// Load prices on page load
loadPrices();