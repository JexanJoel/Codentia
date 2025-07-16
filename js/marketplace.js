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

// Sample products data
let products = JSON.parse(localStorage.getItem('cropkind_products')) || [
    {
        id: 1,
        name: 'Organic Tomato Seeds',
        category: 'seeds',
        price: 150,
        quantity: '100 packets',
        description: 'High-quality organic tomato seeds with 95% germination rate. Disease resistant variety.',
        seller: 'Ravi Kumar',
        contact: '+91 9876543210',
        location: 'Karnataka',
        image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
        id: 2,
        name: 'Drip Irrigation Kit',
        category: 'irrigation',
        price: 2500,
        quantity: '5 sets',
        description: 'Complete drip irrigation system for 1-acre farm. Includes pipes, emitters, and timer.',
        seller: 'Priya Sharma',
        contact: '+91 9876543211',
        location: 'Punjab',
        image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
        id: 3,
        name: 'Organic Fertilizer',
        category: 'fertilizers',
        price: 800,
        quantity: '50 kg bags',
        description: 'Natural compost fertilizer made from cow dung and organic waste. Rich in nutrients.',
        seller: 'Suresh Patel',
        contact: '+91 9876543212',
        location: 'Gujarat',
        image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
        id: 4,
        name: 'Hand Weeder Tool',
        category: 'tools',
        price: 350,
        quantity: '20 pieces',
        description: 'Ergonomic hand weeder for efficient weed removal. Durable steel construction.',
        seller: 'Amit Singh',
        contact: '+91 9876543213',
        location: 'Uttar Pradesh',
        image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
        id: 5,
        name: 'Neem Oil Pesticide',
        category: 'pesticides',
        price: 450,
        quantity: '1 liter bottles',
        description: 'Natural neem oil pesticide for organic farming. Effective against aphids and other pests.',
        seller: 'Lakshmi Devi',
        contact: '+91 9876543214',
        location: 'Tamil Nadu',
        image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
        id: 6,
        name: 'Healthy Dairy Cow',
        category: 'livestock',
        price: 45000,
        quantity: '2 cows',
        description: 'Healthy Holstein Friesian dairy cows. Good milk production. Vaccinated and healthy.',
        seller: 'Rajesh Yadav',
        contact: '+91 9876543215',
        location: 'Haryana',
        image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
];

// Load products
function loadProducts(productsToShow = products) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-gray-400 text-6xl mb-4"></i>
                <p class="text-gray-500 dark:text-gray-400 text-xl">No products found. Try adjusting your search criteria.</p>
            </div>
        `;
        return;
    }
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border border-white/30';
        
        productCard.innerHTML = `
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="absolute top-4 right-4 bg-gradient-to-r from-forest-green to-nature-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </div>
            </div>
            
            <div class="p-6">
                <h3 class="text-xl font-semibold text-forest-green dark:text-mint-green mb-2">${product.name}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">${product.description}</p>
                
                <div class="flex items-center justify-between mb-4">
                    <span class="text-2xl font-bold text-vibrant-green">₹${product.price.toLocaleString()}</span>
                    <span class="text-sm text-gray-600 dark:text-gray-400">${product.quantity}</span>
                </div>
                
                <div class="flex items-center space-x-2 mb-4">
                    <i class="fas fa-user text-sage-green"></i>
                    <span class="text-sm text-gray-700 dark:text-gray-300">${product.seller}</span>
                    <i class="fas fa-map-marker-alt text-sage-green ml-2"></i>
                    <span class="text-sm text-gray-700 dark:text-gray-300">${product.location}</span>
                </div>
                
                <div class="flex space-x-3">
                    <button onclick="contactSeller('${product.contact}')" class="flex-1 bg-gradient-to-r from-forest-green to-nature-green text-white py-3 rounded-xl hover:from-nature-green hover:to-emerald transition-all duration-300 shadow-lg font-semibold">
                        <i class="fas fa-phone mr-2"></i>Contact
                    </button>
                    <button onclick="sendEnquiry(${product.id})" class="flex-1 bg-gradient-to-r from-sage-green to-vibrant-green text-white py-3 rounded-xl hover:from-vibrant-green hover:to-emerald transition-all duration-300 shadow-lg font-semibold">
                        <i class="fas fa-envelope mr-2"></i>Enquiry
                    </button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// Search products
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const location = document.getElementById('locationFilter').value.toLowerCase();
    
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        const matchesLocation = !location || product.location.toLowerCase().includes(location);
        
        return matchesSearch && matchesCategory && matchesLocation;
    });
    
    loadProducts(filteredProducts);
}

// Contact seller
function contactSeller(contact) {
    window.open(`tel:${contact}`, '_blank');
}

// Send enquiry
function sendEnquiry(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const message = `Hi, I'm interested in your ${product.name}. Can you provide more details?`;
        const whatsappUrl = `https://wa.me/${product.contact.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}

// Sell product form
document.getElementById('sellProductForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        id: Date.now(),
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        quantity: document.getElementById('productQuantity').value,
        description: document.getElementById('productDescription').value,
        contact: document.getElementById('contactInfo').value,
        seller: 'You',
        location: 'Your Location',
        image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300'
    };
    
    if (!formData.name || !formData.category || !formData.price || !formData.quantity || !formData.description || !formData.contact) {
        alert('Please fill all fields');
        return;
    }
    
    products.unshift(formData);
    localStorage.setItem('cropkind_products', JSON.stringify(products));
    
    // Clear form
    document.getElementById('sellProductForm').reset();
    
    // Reload products
    loadProducts();
    
    alert('Product listed successfully!');
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
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