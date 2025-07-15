<?php
session_start();
include 'config.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}

// Fetch user data
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
$stmt->execute(['id' => $_SESSION['user_id']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    session_destroy();
    header('Location: login.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FATA - Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.18.9/babel.min.js"></script>
  <style>
    @keyframes swayPlant {
      0%, 100% { transform: rotate(0deg) translateX(0); }
      25% { transform: rotate(3deg) translateX(5px); }
      75% { transform: rotate(-3deg) translateX(-5px); }
    }
    .plant-sway {
      animation: swayPlant 5s ease-in-out infinite;
      transform-origin: bottom;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
    }
    .hero-bg {
      background: linear-gradient(rgba(255,255,255,0.88),rgba(255,255,255,0.88)), url('https://images.unsplash.com/photo-1500595046743-ddf4d3d753fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80');
      background-size: cover;
      background-position: center;
      position: relative;
      overflow: hidden;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 2rem;
    }
    .dark .hero-bg {
      background: linear-gradient(rgba(22,30,38,0.96),rgba(22,30,38,0.96)), url('https://images.unsplash.com/photo-1500595046743-ddf4d3d753fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80');
    }
    .plant-left, .plant-right {
      position: absolute;
      bottom: 0;
      width: 120px;
      height: 180px;
      background: url('https://img.icons8.com/color/48/000000/plant.png') no-repeat bottom;
      background-size: contain;
      opacity: 0.9;
    }
    .plant-left { left: -20px; }
    .plant-right { right: -20px; transform: scaleX(-1); }
    .hamburger div {
      width: 28px;
      height: 4px;
      background-color: white;
      margin: 6px 0;
      transition: all 0.3s ease;
      border-radius: 2px;
    }
    .hamburger.open div:nth-child(1) { transform: rotate(45deg) translate(6px, 6px); }
    .hamburger.open div:nth-child(2) { opacity: 0; }
    .hamburger.open div:nth-child(3) { transform: rotate(-45deg) translate(8px, -8px); }
    .section-shadow {
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      border-radius: 12px;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .section-shadow:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 18px rgba(0,0,0,0.13);
    }
    .btn-primary {
      background-color: #15803d;
      color: white;
      padding: 8px 16px;
      border-radius: 8px;
      transition: background-color 0.3s, transform 0.2s;
      box-shadow: 0 2px 6px rgba(21,128,61,0.09);
      font-weight: 600;
      letter-spacing: 0.02em;
      font-size: 0.9rem;
    }
    .btn-primary:hover {
      background-color: #166534;
      transform: scale(1.05);
    }
    .dark .btn-primary {
      background-color: #38bdf8;
      color: #0f172a;
      box-shadow: 0 2px 6px rgba(56,189,248,0.10);
    }
    .dark .btn-primary:hover {
      background-color: #0ea5e9;
    }
    .content-div {
      background: linear-gradient(145deg, #ffffff, #f0f0f0);
      border-radius: 12px;
      padding: 24px;
      transition: background 0.3s, color 0.3s;
    }
    .dark .content-div {
      background: linear-gradient(145deg, #23272f, #18181b);
      color: #e0e7ef;
    }
    .dark .content-div h2,
    .dark .content-div h3 {
      color: #38bdf8;
    }
    .dark .content-div p {
      color: #cbd5e1;
    }
    .dark .section-shadow {
      box-shadow: 0 4px 16px rgba(56,189,248,0.09);
    }
    .dark .section-shadow:hover {
      box-shadow: 0 6px 24px rgba(56,189,248,0.16);
    }
    .dark .bg-white,
    .dark .bg-green-50,
    .dark .bg-green-100,
    .dark .bg-green-600,
    .dark .bg-green-700,
    .dark .bg-green-800 {
      background-color: #18181b !important;
    }
    .dark .bg-gray-800 {
      background-color: #23272f !important;
    }
    .dark .bg-gray-900 {
      background-color: #18181b !important;
    }
    .dark .text-white {
      color: #e0e7ef !important;
    }
    .dark .text-gray-300 {
      color: #cbd5e1 !important;
    }
    .dark .text-gray-200 {
      color: #e0e7ef !important;
    }
    .dark .text-green-800,
    .dark .text-green-600 {
      color: #38bdf8 !important;
    }
    .dark .text-green-400 {
      color: #7dd3fc !important;
    }
    .dark .hover\:bg-green-600:hover {
      background-color: #0891b2 !important;
    }
    .dark .hover\:bg-gray-600:hover {
      background-color: #334155 !important;
    }
    .mobile-menu-link {
      color: #1f2937;
    }
    .dark .mobile-menu-link {
      color: #e0e7ef;
    }
    @media (max-width: 640px) {
      .hero-bg {
        min-height: 100vh;
      }
      .plant-left, .plant-right { width: 80px; height: 120px; }
      .section-shadow { padding: 16px; }
      .hero-bg h1 { font-size: 2rem; }
      .hero-bg p { font-size: 1rem; }
      .btn-primary { padding: 6px 12px; font-size: 0.8rem; }
    }
    .glass-card {
      background: rgba(255,255,255,0.45);
      border-radius: 22px;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.17);
      backdrop-filter: blur(11px);
      -webkit-backdrop-filter: blur(11px);
      border: 1.5px solid rgba(255,255,255,0.22);
      transition: box-shadow 0.3s, transform 0.3s;
      position: relative;
      overflow: hidden;
      z-index: 2;
    }
    .glass-card:hover {
      box-shadow: 0 16px 40px 0 rgba(31, 38, 135, 0.22);
      transform: scale(1.018);
    }
    .dark .glass-card {
      background: rgba(30,41,59,0.82);
      border: 1.5px solid rgba(56,189,248,0.08);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    .floating-leaf {
      position: absolute;
      width: 38px;
      height: 38px;
      opacity: 0.13;
      pointer-events: none;
      z-index: 1;
      animation: floatLeaf 8s infinite linear;
    }
    .floating-leaf.leaf1 { top: 10%; left: 0%; animation-delay: 0s;}
    .floating-leaf.leaf2 { top: 50%; left: 90%; animation-delay: 2s;}
    .floating-leaf.leaf3 { top: 80%; left: 10%; animation-delay: 4s;}
    .floating-leaf.leaf4 { top: 25%; left: 80%; animation-delay: 1s;}
    @keyframes floatLeaf {
      0% { transform: translateY(0) rotate(-12deg);}
      50% { transform: translateY(-20px) rotate(12deg);}
      100% { transform: translateY(0) rotate(-12deg);}
    }
    .feature-card {
      aspect-ratio: 1/1;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 18px rgba(0,0,0,0.13);
    }
    .dark .feature-card:hover {
      box-shadow: 0 6px 24px rgba(56,189,248,0.16);
    }
    @media (max-width: 640px) {
      .glass-card {
        padding: 14px 6px !important;
        border-radius: 16px;
      }
      .floating-leaf {
        width: 28px;
        height: 28px;
      }
      .glass-card h2 { font-size: 1.15rem; }
      .feature-card img { width: 60px; height: 60px; }
    }
  </style>
</head>
<body className="font-sans bg-green-100 transition-colors duration-300">
  <div id="root"></div>
  <script type="text/babel">
    function getInitialDarkMode() {
      const stored = localStorage.getItem('darkMode');
      return stored === 'true';
    }

    function useDarkMode(darkMode) {
      React.useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode);
      }, [darkMode]);
    }

    function Nav() {
      const [isOpen, setIsOpen] = React.useState(false);
      const [darkMode, setDarkMode] = React.useState(getInitialDarkMode);

      useDarkMode(darkMode);

      const toggleMenu = () => setIsOpen(!isOpen);
      const toggleDarkMode = () => setDarkMode((prev) => !prev);

      return (
        <nav className="bg-green-700 dark:bg-gray-800 text-white py-4 px-6 sticky top-0 z-50 section-shadow">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="https://img.icons8.com/color/48/000000/leaf.png" alt="FATA Logo" className="w-10" />
              <h1 className="text-2xl font-bold">FATA</h1>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="index.html#home" className="hover:underline text-lg">Home</a>
              <a href="index.html#about" className="hover:underline text-lg">About</a>
              <a href="dashboard.php" className="hover:underline text-lg">Dashboard</a>
              <a href="logout.php" className="btn-primary">Log Out</a>
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-green-600 dark:hover:bg-gray-600" aria-label="Toggle dark mode">
                <img src={darkMode ? "https://img.icons8.com/ios-filled/24/ffffff/sun.png" : "https://img.icons8.com/ios-filled/24/000000/moon-symbol.png"} alt="Toggle Dark Mode" className="w-6" />
              </button>
            </div>
            <div className="md:hidden">
              <button onClick={toggleMenu} className={`hamburger ${isOpen ? 'open' : ''}`} aria-label="Toggle menu">
                <div></div>
                <div></div>
                <div></div>
              </button>
            </div>
          </div>
          {isOpen && (
            <div className="md:hidden mt-4 flex flex-col gap-4 text-center content-div section-shadow">
              <a href="index.html#home" className="hover:underline text-lg mobile-menu-link" onClick={toggleMenu}>Home</a>
              <a href="index.html#about" className="hover:underline text-lg mobile-menu-link" onClick={toggleMenu}>About</a>
              <a href="dashboard.php" className="hover:underline text-lg mobile-menu-link" onClick={toggleMenu}>Dashboard</a>
              <a href="logout.php" className="btn-primary mx-auto">Log Out</a>
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-green-600 dark:hover:bg-gray-600 mx-auto" aria-label="Toggle dark mode">
                <img src={darkMode ? "https://img.icons8.com/ios-filled/24/ffffff/sun.png" : "https://img.icons8.com/ios-filled/24/000000/moon-symbol.png"} alt="Toggle Dark Mode" className="w-6" />
              </button>
            </div>
          )}
        </nav>
      );
    }

    function DashboardPage() {
      return (
        <section className="flex-1 text-gray-900 dark:text-white py-8 px-6 relative">
          <div className="plant-left plant-sway"></div>
          <div className="plant-right plant-sway"></div>
          <img src="https://img.icons8.com/color/48/000000/leaf.png" alt="" className="floating-leaf leaf1" />
          <img src="https://img.icons8.com/color/48/000000/leaf.png" alt="" className="floating-leaf leaf2" />
          <img src="https://img.icons8.com/color/48/000000/leaf.png" alt="" className="floating-leaf leaf3" />
          <img src="https://img.icons8.com/color/48/000000/leaf.png" alt="" className="floating-leaf leaf4" />
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto text-center mb-12">
            <div className="glass-card content-div px-8 py-10 md:py-12 md:px-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800 dark:text-green-200">Welcome <?php echo htmlspecialchars($user['username']); ?>!</h1>
              <p className="text-lg md:text-xl mb-6 dark:text-gray-300">Your AI-powered farming assistant for small-scale farmers.</p>
              <a href="#features" className="btn-primary">Explore Features</a>
            </div>
          </div>
          {/* Features Section */}
          <div className="max-w-7xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-green-800 dark:text-green-200">AI Farming Assistant Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/chat.png" alt="Chatbot" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">AI Chatbot</h3>
                <p className="text-sm mb-4 dark:text-gray-300">Voice/text in local languages for farming queries.</p>
                <a href="chatbot.php" className="btn-primary w-full text-center">Chat Now</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/camera.png" alt="Crop Diagnosis" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Crop Diagnosis</h3>
                <p className="text-sm mb-4 dark:text-gray-300">Upload photos to identify pests/diseases.</p>
                <a href="#diagnosis" className="btn-primary w-full text-center">Diagnose Now</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/corn.png" alt="Crop Planning" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Crop Planning</h3>
                <p className="text-sm mb-4 dark:text-gray-300">Personalized crop advice based on location.</p>
                <a href="#planning" className="btn-primary w-full text-center">Plan Crops</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/calculator.png" alt="Budget Planner" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Budget Planner</h3>
                <p className="text-sm mb-4 dark:text-gray-300">Track costs and predict profits.</p>
                <a href="#budget" className="btn-primary w-full text-center">Plan Budget</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/bank.png" alt="Market Prices" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Market Prices</h3>
                <p className="text-sm mb-4 dark:text-gray-300">Daily crop prices and best markets.</p>
                <a href="#market" className="btn-primary w-full text-center">Check Prices</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/partly-cloudy-day.png" alt="Weather Forecast" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Weather Forecast</h3>
                <p className="text-sm mb-4 dark:text-gray-300">Local weather with timely alerts.</p>
                <a href="weather.php" className="btn-primary w-full text-center">Check Weather</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/document.png" alt="Government Schemes" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Government Schemes</h3>
                <p className="text-sm mb-4 dark:text-gray-300">Info and help with subsidies, loans.</p>
                <a href="#schemes" className="btn-primary w-full text-center">Explore Schemes</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/comments.png" alt="Farmer Forum" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Farmer Forum</h3>
                <p className="text-sm mb-4 dark:text-gray-300">Connect with local farmers.</p>
                <a href="#forum" className="btn-primary w-full text-center">Join Forum</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/video.png" alt="Success Stories" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Education</h3>
                <p className="text-sm mb-4 dark:text-gray-300">Learn with farming courses and tutorials.</p>
                <a href="#stories" className="btn-primary w-full text-center">Watch Now</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/phone.png" alt="Emergency Helpline" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Emergency Helpline</h3>
                <p className="text-sm mb-4 dark:text-gray-300">Connect to experts instantly.</p>
                <a href="#helpline" className="btn-primary w-full text-center">Call Now</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/soil.png" alt="Soil Analysis" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Soil Analysis</h3>
                <p className="text-sm mb-4 dark:text-gray-300">AI-based soil health insights.</p>
                <a href="#soil" className="btn-primary w-full text-center">Analyze Soil</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/plant-under-sun.png" alt="Crop Growth Tracker" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Crop Growth Tracker</h3>
                <p className="text-sm mb-4 dark:text-gray-300">Track crop health with weekly photos.</p>
                <a href="#growth-tracker" className="btn-primary w-full text-center">Track Growth</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/bank.png" alt="Microloan Help" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Microloan Help</h3>
                <p className="text-sm mb-4 dark:text-gray-300">AI guides microloan applications.</p>
                <a href="#microloan" className="btn-primary w-full text-center">Apply Now</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/water.png" alt="Water Planner" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Water Planner</h3>
                <p className="text-sm mb-4 dark:text-gray-300">Optimize irrigation timing and amount.</p>
                <a href="#water-planner" className="btn-primary w-full text-center">Plan Watering</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/language.png" alt="Multi-language Support" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Multi-language Support</h3>
                <p className="text-sm mb-4 dark:text-gray-300">Local dialects for easy use.</p>
                <a href="#language" className="btn-primary w-full text-center">Set Language</a>
              </div>
              <div className="feature-card glass-card content-div p-6 flex flex-col items-center justify-between">
                <img src="https://img.icons8.com/color/96/trophy.png" alt="Farm Rewards" className="w-20 h-20 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Farm Rewards</h3>
                <p className="text-sm mb-4 dark:text-gray-300">Earn points for tools and discounts.</p>
                <a href="#rewards" className="btn-primary w-full text-center">View Rewards</a>
              </div>
            </div>
          </div>
        </section>
      );
    }

    function Footer() {
      return (
        <footer className="py-12 px-6 bg-green-800 dark:bg-gray-900 text-white section-shadow">
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center md:grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">Get the App</h3>
              <a href="#app" className="block hover:underline mb-2">Download for iOS</a>
              <a href="#app" className="block hover:underline">Download for Android</a>
            </div>
            <div className="flex flex-col items-center mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <a href="index.html#about" className="block hover:underline mb-2">Our Mission</a>
              <a href="#team" className="block hover:underline">Our Team</a>
            </div>
            <div className="flex flex-col items-center mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <a href="#support" className="block hover:underline mb-2">Contact Us</a>
              <a href="index.html#faq" className="block hover:underline">FAQ</a>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
              <div className="flex gap-4">
                <a href="https://twitter.com" target="_blank" className="hover:opacity-80">
                  <img src="https://img.icons8.com/color/24/twitter.png" alt="Twitter" className="w-6" />
                </a>
                <a href="https://facebook.com" target="_blank" className="hover:opacity-80">
                  <img src="https://img.icons8.com/color/24/facebook.png" alt="Facebook" className="w-6" />
                </a>
                <a href="https://wa.me/919999999999" target="_blank" className="hover:opacity-80">
                  <img src="https://img.icons8.com/color/24/whatsapp.png" alt="WhatsApp" className="w-6" />
                </a>
                <a href="https://www.linkedin.com/in/your-linkedin-username" target="_blank" className="hover:opacity-80">
                  <img src="https://img.icons8.com/color/24/linkedin.png" alt="LinkedIn" className="w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center text-center">
            <p>Helping 1 Million Farmers Grow by 2030</p>
            <p className="mt-2 text-sm">Crafted with love <span role="img" aria-label="love">❤️</span> by Codentia.</p>
            <p className="mt-2 text-sm">© 2025 FATA. All rights reserved.</p>
          </div>
        </footer>
      );
    }

    function App() {
      return (
        <div className="hero-bg">
          <Nav />
          <DashboardPage />
          <Footer />
        </div>
      );
    }

    ReactDOM.render(<App />, document.getElementById('root'));
  </script>
</body>
</html>