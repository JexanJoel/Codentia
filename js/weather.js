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

function refreshWeather() {
    const refreshBtn = document.querySelector('[onclick="refreshWeather()"]');
    const originalClass = refreshBtn.className;
    
    refreshBtn.className = originalClass + ' animate-spin';
    
    // Simulate weather refresh
    setTimeout(() => {
        document.getElementById('lastUpdated').textContent = 'Just now';
        refreshBtn.className = originalClass;
        
        // You could update weather data here
        console.log('Weather data refreshed');
    }, 1000);
}

// Simulate real-time weather updates
setInterval(() => {
    const now = new Date();
    const minutes = now.getMinutes();
    const timeAgo = minutes < 1 ? 'Just now' : `${minutes} minutes ago`;
    document.getElementById('lastUpdated').textContent = timeAgo;
}, 60000); // Update every minute