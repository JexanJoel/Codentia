<?php
session_start();
include 'config.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FATA - Weather App</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.18.9/babel.min.js"></script>
  <style>
    @keyframes growTree {
      0% { transform: scale(0.3) translateY(20px); opacity: 0.4; }
      50% { transform: scale(0.7) translateY(-10px); opacity: 0.7; }
      100% { transform: scale(1) translateY(0); opacity: 1; }
    }
    @keyframes swayPlant {
      0%, 100% { transform: rotate(0deg) translateX(0); }
      25% { transform: rotate(3deg) translateX(5px); }
      75% { transform: rotate(-3deg) translateX(-5px); }
    }
    .tree-growth {
      animation: growTree 4s ease-in-out forwards;
      transform-origin: bottom center;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
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
      padding: 12px 24px;
      border-radius: 8px;
      transition: background-color 0.3s, transform 0.2s;
      box-shadow: 0 2px 8px rgba(21,128,61,0.09);
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .btn-primary:hover {
      background-color: #166534;
      transform: scale(1.05);
    }
    .dark .btn-primary {
      background-color: #38bdf8;
      color: #0f172a;
      box-shadow: 0 2px 8px rgba(56,189,248,0.10);
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
      .hero-bg h1 { font font-size: 2rem; }
      .hero-bg p { font-size: 1rem; }
      .btn-primary { padding: 8px 16px; font-size: 0.9rem; }
      .glass-card {
        max-width: 360px;
      }
    }
    @media (min-width: 641px) {
      .glass-card {
        max-width: 640px;
      }
    }
    .input-field {
      border: 1px solid #d1d5db;
      border-radius: 8px;
      padding: 12px 40px 12px 44px;
      width: 100%;
      transition: border-color 0.3s, box-shadow 0.3s;
      background: rgba(255,255,255,0.7);
      font-size: 1rem;
      position: relative;
    }
    .input-field:focus {
      outline: none;
      border-color: #15803d;
      box-shadow: 0 0 0 3px rgba(21,128,61,0.1);
      background: rgba(255,255,255,0.88);
    }
    .dark .input-field {
      border-color: #4b5563;
      background-color: #23272f;
      color: #e0e7ef;
    }
    .dark .input-field:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56,189,248,0.2);
      background: rgba(30,41,59,0.92);
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
    .input-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      opacity: 0.75;
      z-index: 2;
      pointer-events: none;
    }
    .input-wrapper {
      position: relative;
      width: 100%;
    }
    .weather-btn-animate {
      transition: transform 0.1s, box-shadow 0.1s;
      will-change: transform;
    }
    .weather-btn-animate:active {
      transform: scale(0.97);
      box-shadow: 0 1px 2px rgba(21,128,61,0.12);
    }
    .glass-card h2 {
      letter-spacing: 0.01em;
      font-size: 1.6rem;
      font-weight: 700;
    }
    .glass-card p {
      font-size: 1.08rem;
    }
    /* Enhanced weather results styling */
    .weather-results {
      background: rgba(255, 255, 255, 0.85);
      border-radius: 16px;
      padding: 1.5rem;
      margin-top: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }
    .dark .weather-results {
      background: rgba(30, 41, 59, 0.85);
      box-shadow: 0 4px 16px rgba(56, 189, 248, 0.1);
    }
    .weather-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .weather-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #15803d;
      text-align: center;
      margin-bottom: 0.5rem;
    }
    .dark .weather-title {
      color: #38bdf8;
    }
    .weather-icon {
      width: 80px;
      height: 80px;
      object-fit: contain;
      margin-bottom: 0.5rem;
    }
    .weather-description {
      font-size: 1.1rem;
      color: #4b5563;
      text-align: center;
      text-transform: capitalize;
      margin-bottom: 1rem;
    }
    .dark .weather-description {
      color: #9ca3af;
    }
    .weather-details {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1.5rem;
      padding: 0 1rem;
    }
    .weather-detail {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 100px;
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    .dark .weather-detail {
      background: rgba(30, 41, 59, 0.7);
      box-shadow: 0 2px 8px rgba(56, 189, 248, 0.05);
    }
    .weather-detail-icon {
      width: 28px;
      height: 28px;
      opacity: 0.9;
      margin-bottom: 0.5rem;
    }
    .weather-detail-label {
      font-size: 0.875rem;
      color: #4b5563;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }
    .dark .weather-detail-label {
      color: #9ca3af;
    }
    .weather-detail-value {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1f2937;
    }
    .dark .weather-detail-value {
      color: #f3f4f6;
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
      .weather-details {
        gap: 1rem;
      }
      .weather-results {
        padding: 1rem;
      }
      .weather-detail {
        min-width: 80px;
        padding: 0.5rem;
      }
      .weather-icon {
        width: 60px;
        height: 60px;
      }
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
              <a href="login.php" className="hover:underline text-lg">Log In</a>
              <a href="signup.php" className="btn-primary">Sign Up Free</a>
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
              <a href="login.php" className="hover:underline text-lg mobile-menu-link" onClick={toggleMenu}>Log In</a>
              <a href="signup.php" className="btn-primary mx-auto">Sign Up Free</a>
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-green-600 dark:hover:bg-gray-600 mx-auto" aria-label="Toggle dark mode">
                <img src={darkMode ? "https://img.icons8.com/ios-filled/24/ffffff/sun.png" : "https://img.icons8.com/ios-filled/24/000000/moon-symbol.png"} alt="Toggle Dark Mode" className="w-6" />
              </button>
            </div>
          )}
        </nav>
      );
    }

    function WeatherApp() {
      const [city, setCity] = React.useState('');
      const [weatherData, setWeatherData] = React.useState(null);
      const [error, setError] = React.useState('');
      const [loading, setLoading] = React.useState(false);

      const API_KEY = 'cf9c48ecb4bb944cff1c8b64f19b139b';

      const fetchWeather = async (cityName) => {
        setLoading(true);
        setError('');
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
          if (!response.ok) {
            throw new Error('City not found or API error');
          }
          const data = await response.json();
          setWeatherData(data);
        } catch (err) {
          setError(err.message);
          setWeatherData(null);
        } finally {
          setLoading(false);
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
          fetchWeather(city);
        } else {
          setError('Please enter a city name.');
        }
      };

      const getWeatherIcon = (weatherCode) => {
        return `http://openweathermap.org/img/wn/${weatherCode}@2x.png`;
      };

      return (
        <section className="flex-1 text-gray-900 dark:text-white py-8 px-6 text-center relative section-shadow" style={{ minHeight: 'calc(100vh - 320px)' }}>
          <div className="plant-left plant-sway"></div>
          <div className="plant-right plant-sway"></div>
          <img src="https://img.icons8.com/color/48/000000/leaf.png" alt="" className="floating-leaf leaf1" />
          <img src="https://img.icons8.com/color/48/000000/leaf.png" alt="" className="floating-leaf leaf2" />
          <img src="https://img.icons8.com/color/48/000000/leaf.png" alt="" className="floating-leaf leaf3" />
          <img src="https://img.icons8.com/color/48/000000/leaf.png" alt="" className="floating-leaf leaf4" />
          <div className="max-w-md mx-auto glass-card content-div px-8 py-10 md:py-12 md:px-12">
            <h2 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-200">Weather Forecast</h2>
            <p className="text-lg mb-6 dark:text-gray-300">Check the weather for your farming needs.</p>
            {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="input-wrapper">
                <img src="https://img.icons8.com/ios-filled/24/15803d/marker.png" alt="" className="input-icon" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name"
                  className="input-field"
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="btn-primary w-full weather-btn-animate" disabled={loading}>
                {loading ? 'Loading...' : 'Get Weather'}
              </button>
            </form>
            {weatherData && (
              <div className="weather-results">
                <div className="weather-header">
                  <img src={getWeatherIcon(weatherData.weather[0].icon)} alt="Weather Icon" className="weather-icon" />
                  <h3 className="weather-title">{weatherData.name}</h3>
                  <p className="weather-description">{weatherData.weather[0].description}</p>
                </div>
                <div className="weather-details">
                  <div className="weather-detail">
                    <img src="https://img.icons8.com/ios-filled/24/15803d/thermometer.png" className="weather-detail-icon" />
                    <span className="weather-detail-label">Temperature</span>
                    <span className="weather-detail-value">{weatherData.main.temp}°C</span>
                  </div>
                  <div className="weather-detail">
                    <img src="https://img.icons8.com/ios-filled/24/15803d/hygrometer.png" className="weather-detail-icon" />
                    <span className="weather-detail-label">Humidity</span>
                    <span className="weather-detail-value">{weatherData.main.humidity}%</span>
                  </div>
                  <div className="weather-detail">
                    <img src="https://img.icons8.com/ios-filled/24/15803d/wind.png" className="weather-detail-icon" />
                    <span className="weather-detail-label">Wind Speed</span>
                    <span className="weather-detail-value">{weatherData.wind.speed} m/s</span>
                  </div>
                  <div className="weather-detail">
                    <img src="https://img.icons8.com/ios-filled/24/15803d/atmospheric-pressure.png" className="weather-detail-icon" />
                    <span className="weather-detail-label">Pressure</span>
                    <span className="weather-detail-value">{weatherData.main.pressure} hPa</span>
                  </div>
                </div>
              </div>
            )}
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
                  <img src="https://img.icons8.com/color/24/000000/twitter.png" alt="Twitter" className="w-6" />
                </a>
                <a href="https://facebook.com" target="_blank" className="hover:opacity-80">
                  <img src="https://img.icons8.com/color/24/000000/facebook.png" alt="Facebook" className="w-6" />
                </a>
                <a href="https://wa.me/919999999999" target="_blank" className="hover:opacity-80">
                  <img src="https://img.icons8.com/color/24/000000/whatsapp.png" alt="WhatsApp" className="w-6" />
                </a>
                <a href="https://www.linkedin.com/in/your-linkedin-username" target="_blank" className="hover:opacity-80">
                  <img src="https://img.icons8.com/color/24/000000/linkedin.png" alt="LinkedIn" className="w-6" />
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
          <WeatherApp />
          <Footer />
        </div>
      );
    }

    ReactDOM.render(<App />, document.getElementById('root'));
  </script>
</body>
</html>