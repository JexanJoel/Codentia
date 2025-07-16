// Global variables
let currentLoginMethod = 'email';
let currentSignupMethod = 'email';
let currentUserData = {};

// Login method selection
function selectLoginMethod(method) {
    currentLoginMethod = method;
    
    // Update button styles
    document.getElementById('emailLoginBtn').classList.remove('bg-sage-green', 'text-white', 'border-sage-green');
    document.getElementById('mobileLoginBtn').classList.remove('bg-sage-green', 'text-white', 'border-sage-green');
    document.getElementById('emailLoginBtn').classList.add('border-sage-green', 'hover:bg-light-green');
    document.getElementById('mobileLoginBtn').classList.add('border-sage-green', 'hover:bg-light-green');
    
    if (method === 'email') {
        document.getElementById('emailLoginBtn').classList.add('bg-sage-green', 'text-white');
        document.getElementById('emailLoginBtn').classList.remove('hover:bg-light-green');
        document.getElementById('loginInputs').innerHTML = `
            <div>
                <label class="block text-gray-700 mb-2 font-semibold">Email Address</label>
                <div class="relative">
                    <i class="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-green"></i>
                    <input type="email" id="loginEmail" class="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-vibrant-green transition-colors" placeholder="Enter your email" required>
                </div>
            </div>
        `;
    } else {
        document.getElementById('mobileLoginBtn').classList.add('bg-sage-green', 'text-white');
        document.getElementById('mobileLoginBtn').classList.remove('hover:bg-light-green');
        document.getElementById('loginInputs').innerHTML = `
            <div>
                <label class="block text-gray-700 mb-2 font-semibold">Mobile Number</label>
                <div class="relative">
                    <i class="fas fa-mobile-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-green"></i>
                    <input type="tel" id="loginMobile" class="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-vibrant-green transition-colors" placeholder="Enter your mobile number" required>
                </div>
            </div>
        `;
    }
}

// Signup method selection
function selectSignupMethod(method) {
    currentSignupMethod = method;
    
    // Update button styles
    document.getElementById('emailSignupBtn').classList.remove('bg-sage-green', 'text-white', 'border-sage-green');
    document.getElementById('mobileSignupBtn').classList.remove('bg-sage-green', 'text-white', 'border-sage-green');
    document.getElementById('emailSignupBtn').classList.add('border-sage-green', 'hover:bg-light-green');
    document.getElementById('mobileSignupBtn').classList.add('border-sage-green', 'hover:bg-light-green');
    
    if (method === 'email') {
        document.getElementById('emailSignupBtn').classList.add('bg-sage-green', 'text-white');
        document.getElementById('emailSignupBtn').classList.remove('hover:bg-light-green');
        document.getElementById('signupInputs').innerHTML = `
            <div>
                <label class="block text-gray-700 mb-2 font-semibold">Full Name</label>
                <div class="relative">
                    <i class="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-green"></i>
                    <input type="text" id="signupName" class="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-vibrant-green transition-colors" placeholder="Enter your full name" required>
                </div>
            </div>
            <div>
                <label class="block text-gray-700 mb-2 font-semibold">Email Address</label>
                <div class="relative">
                    <i class="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-green"></i>
                    <input type="email" id="signupEmail" class="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-vibrant-green transition-colors" placeholder="Enter your email" required>
                </div>
            </div>
            <div>
                <label class="block text-gray-700 mb-2 font-semibold">Location</label>
                <div class="relative">
                    <i class="fas fa-map-marker-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-green"></i>
                    <input type="text" id="signupLocation" class="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-vibrant-green transition-colors" placeholder="Enter your location" required>
                </div>
            </div>
        `;
    } else {
        document.getElementById('mobileSignupBtn').classList.add('bg-sage-green', 'text-white');
        document.getElementById('mobileSignupBtn').classList.remove('hover:bg-light-green');
        document.getElementById('signupInputs').innerHTML = `
            <div>
                <label class="block text-gray-700 mb-2 font-semibold">Full Name</label>
                <div class="relative">
                    <i class="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-green"></i>
                    <input type="text" id="signupName" class="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-vibrant-green transition-colors" placeholder="Enter your full name" required>
                </div>
            </div>
            <div>
                <label class="block text-gray-700 mb-2 font-semibold">Mobile Number</label>
                <div class="relative">
                    <i class="fas fa-mobile-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-green"></i>
                    <input type="tel" id="signupMobile" class="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-vibrant-green transition-colors" placeholder="Enter your mobile number" required>
                </div>
            </div>
            <div>
                <label class="block text-gray-700 mb-2 font-semibold">Location</label>
                <div class="relative">
                    <i class="fas fa-map-marker-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-green"></i>
                    <input type="text" id="signupLocation" class="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-vibrant-green transition-colors" placeholder="Enter your location" required>
                </div>
            </div>
        `;
    }
}

// Form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize default methods
    if (document.getElementById('emailLoginBtn')) {
        selectLoginMethod('email');
    }
    if (document.getElementById('emailSignupBtn')) {
        selectSignupMethod('email');
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let identifier = '';
            if (currentLoginMethod === 'email') {
                identifier = document.getElementById('loginEmail').value;
            } else {
                identifier = document.getElementById('loginMobile').value;
            }
            
            if (!identifier) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate sending OTP
            currentUserData = { identifier, method: currentLoginMethod, action: 'login' };
            document.getElementById('otpDestination').textContent = currentLoginMethod === 'email' ? 'email' : 'mobile number';
            
            openOtpModal();
            
            // In a real app, you would send OTP via API
            console.log('Sending OTP to:', identifier);
        });
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const location = document.getElementById('signupLocation').value;
            let identifier = '';
            
            if (currentSignupMethod === 'email') {
                identifier = document.getElementById('signupEmail').value;
            } else {
                identifier = document.getElementById('signupMobile').value;
            }
            
            if (!name || !location || !identifier) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate sending OTP
            currentUserData = { 
                name, 
                location, 
                identifier, 
                method: currentSignupMethod, 
                action: 'signup' 
            };
            document.getElementById('otpDestination').textContent = currentSignupMethod === 'email' ? 'email' : 'mobile number';
            
            openOtpModal();
            
            // In a real app, you would send OTP via API
            console.log('Sending OTP to:', identifier);
        });
    }

    // OTP form
    const otpForm = document.getElementById('otpForm');
    if (otpForm) {
        otpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const otp = document.getElementById('otpInput').value;
            
            if (!otp || otp.length !== 6) {
                alert('Please enter a valid 6-digit OTP');
                return;
            }
            
            // Simulate OTP verification
            if (otp === '123456' || otp.length === 6) {
                // Store user data in localStorage
                localStorage.setItem('cropkind_user', JSON.stringify(currentUserData));
                
                closeOtpModal();
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid OTP. Please try again.');
            }
        });
    }
});

function openOtpModal() {
    document.getElementById('otpModal').classList.remove('hidden');
    document.getElementById('otpModal').classList.add('flex');
    document.getElementById('otpInput').focus();
}

function closeOtpModal() {
    document.getElementById('otpModal').classList.add('hidden');
    document.getElementById('otpModal').classList.remove('flex');
    document.getElementById('otpInput').value = '';
}

function resendOtp() {
    // Simulate resending OTP
    console.log('Resending OTP to:', currentUserData.identifier);
    
    // Show success message
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check mr-2"></i>OTP Sent!';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 3000);
}