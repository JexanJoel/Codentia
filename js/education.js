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

// Educational courses data
const courses = [
    {
        id: 1,
        title: 'Organic Farming Basics',
        category: 'organic',
        duration: '45 min',
        level: 'Beginner',
        description: 'Learn the fundamentals of organic farming, including soil preparation, natural fertilizers, and pest control.',
        videoId: '8ulpy_GFLDk', // YouTube video ID
        thumbnail: 'https://img.youtube.com/vi/8ulpy_GFLDk/maxresdefault.jpg',
        completed: false
    },
    {
        id: 2,
        title: 'Drip Irrigation Systems',
        category: 'irrigation',
        duration: '30 min',
        level: 'Intermediate',
        description: 'Complete guide to setting up and maintaining drip irrigation systems for efficient water usage.',
        videoId: '8ulpy_GFLDk',
        thumbnail: 'https://img.youtube.com/vi/8ulpy_GFLDk/maxresdefault.jpg',
        completed: true
    },
    {
        id: 3,
        title: 'Dairy Cow Management',
        category: 'livestock',
        duration: '60 min',
        level: 'Intermediate',
        description: 'Learn proper dairy cow care, feeding schedules, milking techniques, and health management.',
        videoId: '8ulpy_GFLDk',
        thumbnail: 'https://img.youtube.com/vi/8ulpy_GFLDk/maxresdefault.jpg',
        completed: false
    },
    {
        id: 4,
        title: 'Composting Techniques',
        category: 'organic',
        duration: '25 min',
        level: 'Beginner',
        description: 'Master the art of composting organic waste to create nutrient-rich fertilizer for your crops.',
        videoId: '8ulpy_GFLDk',
        thumbnail: 'https://img.youtube.com/vi/8ulpy_GFLDk/maxresdefault.jpg',
        completed: true
    },
    {
        id: 5,
        title: 'Smart Irrigation Planning',
        category: 'irrigation',
        duration: '40 min',
        level: 'Advanced',
        description: 'Advanced techniques for planning irrigation schedules based on crop needs and weather patterns.',
        videoId: '8ulpy_GFLDk',
        thumbnail: 'https://img.youtube.com/vi/8ulpy_GFLDk/maxresdefault.jpg',
        completed: false
    },
    {
        id: 6,
        title: 'Poultry Farming Basics',
        category: 'livestock',
        duration: '35 min',
        level: 'Beginner',
        description: 'Introduction to poultry farming, including housing, feeding, and disease prevention.',
        videoId: '8ulpy_GFLDk',
        thumbnail: 'https://img.youtube.com/vi/8ulpy_GFLDk/maxresdefault.jpg',
        completed: false
    },
    {
        id: 7,
        title: 'Natural Pest Control',
        category: 'organic',
        duration: '50 min',
        level: 'Intermediate',
        description: 'Effective organic methods for controlling pests without harmful chemicals.',
        videoId: '8ulpy_GFLDk',
        thumbnail: 'https://img.youtube.com/vi/8ulpy_GFLDk/maxresdefault.jpg',
        completed: true
    },
    {
        id: 8,
        title: 'Water Conservation Methods',
        category: 'irrigation',
        duration: '55 min',
        level: 'Intermediate',
        description: 'Learn various water conservation techniques to maximize efficiency and reduce waste.',
        videoId: '8ulpy_GFLDk',
        thumbnail: 'https://img.youtube.com/vi/8ulpy_GFLDk/maxresdefault.jpg',
        completed: false
    },
    {
        id: 9,
        title: 'Goat Farming Guide',
        category: 'livestock',
        duration: '45 min',
        level: 'Beginner',
        description: 'Complete guide to goat farming, including breeding, feeding, and healthcare.',
        videoId: '8ulpy_GFLDk',
        thumbnail: 'https://img.youtube.com/vi/8ulpy_GFLDk/maxresdefault.jpg',
        completed: false
    }
];

let currentFilter = 'all';

// Load courses
function loadCourses(coursesToShow = courses) {
    const coursesGrid = document.getElementById('coursesGrid');
    coursesGrid.innerHTML = '';
    
    coursesToShow.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border border-white/30';
        
        const levelColors = {
            'Beginner': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'Intermediate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            'Advanced': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        };
        
        courseCard.innerHTML = `
            <div class="relative">
                <img src="${course.thumbnail}" alt="${course.title}" class="w-full h-48 object-cover">
                <div class="absolute top-4 right-4 ${levelColors[course.level]} px-3 py-1 rounded-full text-sm font-semibold">
                    ${course.level}
                </div>
                ${course.completed ? '<div class="absolute top-4 left-4 bg-vibrant-green text-white px-3 py-1 rounded-full text-sm font-semibold"><i class="fas fa-check mr-1"></i>Completed</div>' : ''}
                <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button onclick="playCourse('${course.videoId}', '${course.title}')" class="bg-white text-forest-green px-6 py-3 rounded-full font-semibold hover:bg-light-green transition-colors">
                        <i class="fas fa-play mr-2"></i>Watch Now
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <h3 class="text-xl font-semibold text-forest-green dark:text-mint-green mb-2">${course.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">${course.description}</p>
                
                <div class="flex items-center justify-between mb-4">
                    <span class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <i class="fas fa-clock mr-2 text-sage-green"></i>
                        ${course.duration}
                    </span>
                    <span class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <i class="fas fa-tag mr-2 text-sage-green"></i>
                        ${course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                    </span>
                </div>
                
                <div class="flex space-x-3">
                    <button onclick="playCourse('${course.videoId}', '${course.title}')" class="flex-1 bg-gradient-to-r from-forest-green to-nature-green text-white py-3 rounded-xl hover:from-nature-green hover:to-emerald transition-all duration-300 shadow-lg font-semibold">
                        <i class="fas fa-play mr-2"></i>Watch
                    </button>
                    <button onclick="toggleBookmark(${course.id})" class="bg-gradient-to-r from-sage-green to-vibrant-green text-white px-4 py-3 rounded-xl hover:from-vibrant-green hover:to-emerald transition-all duration-300 shadow-lg">
                        <i class="fas fa-bookmark"></i>
                    </button>
                </div>
            </div>
        `;
        
        coursesGrid.appendChild(courseCard);
    });
}

// Filter courses
function filterCourses(category) {
    currentFilter = category;
    
    // Update button styles
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-gradient-to-r', 'from-forest-green', 'to-nature-green', 'text-white');
        btn.classList.add('bg-white', 'dark:bg-gray-700', 'text-forest-green', 'dark:text-mint-green', 'border-2', 'border-sage-green');
    });
    
    event.target.classList.remove('bg-white', 'dark:bg-gray-700', 'text-forest-green', 'dark:text-mint-green', 'border-2', 'border-sage-green');
    event.target.classList.add('active', 'bg-gradient-to-r', 'from-forest-green', 'to-nature-green', 'text-white');
    
    // Filter courses
    const filteredCourses = category === 'all' ? courses : courses.filter(course => course.category === category);
    loadCourses(filteredCourses);
}

// Play course
function playCourse(videoId, title) {
    // Create modal for video player
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-full overflow-auto">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl font-bold text-forest-green dark:text-mint-green">${title}</h3>
                <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="aspect-video">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen class="rounded-lg"></iframe>
            </div>
            <div class="mt-4 flex space-x-4">
                <button onclick="markCompleted('${videoId}')" class="bg-gradient-to-r from-forest-green to-nature-green text-white px-6 py-3 rounded-xl hover:from-nature-green hover:to-emerald transition-all duration-300 shadow-lg font-semibold">
                    <i class="fas fa-check mr-2"></i>Mark as Completed
                </button>
                <button onclick="downloadCertificate('${title}')" class="bg-gradient-to-r from-sage-green to-vibrant-green text-white px-6 py-3 rounded-xl hover:from-vibrant-green hover:to-emerald transition-all duration-300 shadow-lg font-semibold">
                    <i class="fas fa-certificate mr-2"></i>Get Certificate
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
        modal.remove();
    }
}

// Mark course as completed
function markCompleted(videoId) {
    const course = courses.find(c => c.videoId === videoId);
    if (course) {
        course.completed = true;
        loadCourses(currentFilter === 'all' ? courses : courses.filter(c => c.category === currentFilter));
        closeModal();
        alert('Course marked as completed! Certificate available for download.');
    }
}

// Download certificate
function downloadCertificate(courseTitle) {
    alert(`Certificate for "${courseTitle}" will be generated and downloaded.`);
}

// Toggle bookmark
function toggleBookmark(courseId) {
    alert('Course bookmarked! You can find it in your saved courses.');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
    
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