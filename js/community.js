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

// Sample posts data (updated without location and with upvote/downvote)
let posts = JSON.parse(localStorage.getItem('cropkind_posts')) || [
    {
        id: 1,
        type: 'question',
        title: 'Best time to plant tomatoes in Karnataka?',
        content: 'I am planning to plant tomatoes in my 2-acre farm in Karnataka. What would be the best time to start planting? Also, any specific variety recommendations?',
        author: 'Ravi Kumar',
        time: '2 hours ago',
        upvotes: 8,
        downvotes: 1,
        replies: 3,
        userVote: null // null, 'up', or 'down'
    },
    {
        id: 2,
        type: 'tip',
        title: 'Organic pest control for cabbage',
        content: 'I have been using neem oil mixed with soap solution for controlling pests in my cabbage farm. Mix 2 tablespoons neem oil with 1 teaspoon liquid soap in 1 liter water. Spray early morning or evening. Works great!',
        author: 'Priya Sharma',
        time: '4 hours ago',
        upvotes: 15,
        downvotes: 2,
        replies: 7,
        userVote: null
    },
    {
        id: 3,
        type: 'success',
        title: 'Doubled my wheat yield with proper spacing',
        content: 'Last season I followed the advice from this community about proper spacing for wheat (20cm between rows). My yield increased from 2 tons to 4 tons per acre! Thank you everyone.',
        author: 'Suresh Patel',
        time: '1 day ago',
        upvotes: 32,
        downvotes: 0,
        replies: 12,
        userVote: null
    },
    {
        id: 4,
        type: 'alert',
        title: 'Aphid attack warning in North India',
        content: 'Farmers in North India, please check your crops for aphids. I am seeing heavy infestation in my area. Early treatment with insecticidal soap can help. Act quickly!',
        author: 'Dr. Amit Singh',
        time: '6 hours ago',
        upvotes: 12,
        downvotes: 0,
        replies: 5,
        userVote: null
    }
];

// Post form handling
document.getElementById('newPostForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const type = document.getElementById('postType').value;
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    
    if (!title || !content) {
        alert('Please fill all fields');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('cropkind_user'));
    const newPost = {
        id: Date.now(),
        type,
        title,
        content,
        author: user.name || 'Anonymous',
        time: 'Just now',
        upvotes: 0,
        downvotes: 0,
        replies: 0,
        userVote: null
    };
    
    posts.unshift(newPost);
    localStorage.setItem('cropkind_posts', JSON.stringify(posts));
    
    // Clear form and hide it
    document.getElementById('newPostForm').reset();
    document.getElementById('postForm').classList.add('hidden');
    
    // Reload posts
    loadPosts();
});

function createPost() {
    document.getElementById('postForm').classList.remove('hidden');
    document.getElementById('postTitle').focus();
}

function cancelPost() {
    document.getElementById('postForm').classList.add('hidden');
    document.getElementById('newPostForm').reset();
}

function loadPosts() {
    const postsContainer = document.getElementById('communityPosts');
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 border border-white/30';
        
        const typeColors = {
            'question': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'tip': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'success': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            'alert': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        };
        
        const typeIcons = {
            'question': 'fas fa-question-circle',
            'tip': 'fas fa-lightbulb',
            'success': 'fas fa-trophy',
            'alert': 'fas fa-exclamation-triangle'
        };
        
        const netVotes = post.upvotes - post.downvotes;
        const upvoteClass = post.userVote === 'up' ? 'text-green-600' : 'text-gray-600 dark:text-gray-400';
        const downvoteClass = post.userVote === 'down' ? 'text-red-600' : 'text-gray-600 dark:text-gray-400';
        
        postElement.innerHTML = `
            <div class="flex items-start justify-between mb-6">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-sage-green to-vibrant-green rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-white"></i>
                    </div>
                    <div>
                        <h4 class="font-semibold text-forest-green dark:text-mint-green text-lg">${post.author}</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${post.time}</p>
                    </div>
                </div>
                <span class="px-4 py-2 rounded-full text-sm font-semibold ${typeColors[post.type]}">
                    <i class="${typeIcons[post.type]} mr-2"></i>
                    ${post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                </span>
            </div>
            
            <h3 class="text-2xl font-semibold text-forest-green dark:text-mint-green mb-4">${post.title}</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">${post.content}</p>
            
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-6">
                    <div class="flex items-center space-x-2">
                        <button onclick="votePost(${post.id}, 'up')" class="flex items-center space-x-1 hover:text-green-600 transition-colors ${upvoteClass}">
                            <i class="fas fa-arrow-up text-lg"></i>
                            <span class="font-semibold">${post.upvotes}</span>
                        </button>
                        
                        <span class="text-gray-400 mx-2">|</span>
                        
                        <button onclick="votePost(${post.id}, 'down')" class="flex items-center space-x-1 hover:text-red-600 transition-colors ${downvoteClass}">
                            <i class="fas fa-arrow-down text-lg"></i>
                            <span class="font-semibold">${post.downvotes}</span>
                        </button>
                    </div>
                    
                    <button onclick="showReplies(${post.id})" class="flex items-center space-x-2 hover:text-vibrant-green transition-colors text-gray-600 dark:text-gray-400">
                        <i class="fas fa-reply"></i>
                        <span class="font-semibold">${post.replies} Replies</span>
                    </button>
                </div>
                
                <div class="text-right">
                    <span class="text-lg font-bold ${netVotes >= 0 ? 'text-green-600' : 'text-red-600'}">
                        ${netVotes >= 0 ? '+' : ''}${netVotes}
                    </span>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Net Score</p>
                </div>
            </div>
        `;
        
        postsContainer.appendChild(postElement);
    });
}

function votePost(postId, voteType) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    // Remove previous vote if exists
    if (post.userVote === 'up') {
        post.upvotes--;
    } else if (post.userVote === 'down') {
        post.downvotes--;
    }
    
    // Apply new vote
    if (post.userVote === voteType) {
        // User is removing their vote
        post.userVote = null;
    } else {
        // User is voting or changing vote
        post.userVote = voteType;
        if (voteType === 'up') {
            post.upvotes++;
        } else {
            post.downvotes++;
        }
    }
    
    localStorage.setItem('cropkind_posts', JSON.stringify(posts));
    loadPosts();
}

function showReplies(postId) {
    alert('Reply feature will be available soon!');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
    
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