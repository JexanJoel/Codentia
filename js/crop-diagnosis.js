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
    uploadArea.classList.add('border-forest-green');
});

uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('border-forest-green');
});

uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('border-forest-green');
    
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
    document.getElementById('resultsSection').classList.add('hidden');
}

function analyzeImage() {
    // Show loading state
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Analyzing...';
    button.disabled = true;
    
    // Simulate AI analysis
    setTimeout(() => {
        showResults();
        button.innerHTML = originalText;
        button.disabled = false;
    }, 3000);
}

function showResults() {
    // Generate random diagnosis for demo
    const diagnoses = [
        {
            disease: 'Tomato Leaf Blight',
            confidence: 92,
            severity: 'Moderate',
            description: 'Early blight is a fungal disease that affects tomato plants, causing dark spots on leaves.',
            treatment: [
                'Remove affected leaves immediately',
                'Apply copper-based fungicide',
                'Improve air circulation',
                'Water at soil level, not on leaves'
            ],
            prevention: [
                'Crop rotation',
                'Proper spacing between plants',
                'Avoid overhead watering',
                'Use disease-resistant varieties'
            ]
        },
        {
            disease: 'Powdery Mildew',
            confidence: 87,
            severity: 'Mild',
            description: 'A fungal disease that appears as white powdery spots on leaves and stems.',
            treatment: [
                'Apply neem oil spray',
                'Use baking soda solution (1 tsp per liter)',
                'Ensure good air circulation',
                'Remove severely infected parts'
            ],
            prevention: [
                'Avoid overcrowding plants',
                'Water in the morning',
                'Maintain proper humidity levels',
                'Choose resistant varieties'
            ]
        }
    ];
    
    const diagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
    
    const resultsHTML = `
        <div class="bg-light-green rounded-lg p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-semibold text-forest-green">${diagnosis.disease}</h3>
                <span class="bg-forest-green text-white px-3 py-1 rounded-full text-sm">${diagnosis.confidence}% Confidence</span>
            </div>
            <p class="text-gray-700 mb-4">${diagnosis.description}</p>
            <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-600">Severity:</span>
                <span class="px-3 py-1 rounded-full text-sm ${diagnosis.severity === 'Mild' ? 'bg-green-100 text-green-800' : diagnosis.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">${diagnosis.severity}</span>
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 class="text-lg font-semibold text-forest-green mb-4">
                    <i class="fas fa-medkit mr-2"></i>Treatment
                </h4>
                <ul class="space-y-2">
                    ${diagnosis.treatment.map(item => `<li class="flex items-start space-x-2"><i class="fas fa-check text-sage-green mt-1"></i><span class="text-gray-700">${item}</span></li>`).join('')}
                </ul>
            </div>
            
            <div>
                <h4 class="text-lg font-semibold text-forest-green mb-4">
                    <i class="fas fa-shield-alt mr-2"></i>Prevention
                </h4>
                <ul class="space-y-2">
                    ${diagnosis.prevention.map(item => `<li class="flex items-start space-x-2"><i class="fas fa-check text-sage-green mt-1"></i><span class="text-gray-700">${item}</span></li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div class="flex items-center space-x-2 mb-2">
                <i class="fas fa-info-circle text-yellow-600"></i>
                <span class="font-semibold text-yellow-800">Important Note</span>
            </div>
            <p class="text-yellow-700 text-sm">This is an AI-powered diagnosis. For severe cases or if symptoms persist, consult with local agricultural experts or extension officers.</p>
        </div>
        
        <div class="mt-6 flex space-x-4">
            <button onclick="saveResults()" class="bg-sage-green text-white px-6 py-2 rounded-lg hover:bg-leaf-green transition-colors">
                <i class="fas fa-save mr-2"></i>Save Results
            </button>
            <button onclick="shareResults()" class="bg-forest-green text-white px-6 py-2 rounded-lg hover:bg-leaf-green transition-colors">
                <i class="fas fa-share mr-2"></i>Share
            </button>
        </div>
    `;
    
    document.getElementById('analysisResults').innerHTML = resultsHTML;
    document.getElementById('resultsSection').classList.remove('hidden');
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

function saveResults() {
    alert('Results saved to your diagnosis history!');
}

function shareResults() {
    alert('Results shared with your agricultural advisor!');
}

function showHistory() {
    alert('Diagnosis history will be available soon!');
}