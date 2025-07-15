import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CloudRain, Sun, Cloud, Wind, Thermometer, Droplets, Eye, Compass } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  condition: string;
  icon: string;
  rainfall: number;
  uvIndex: number;
}

interface ForecastDay {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  rainfall: number;
}

const WeatherPage: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [location, setLocation] = useState('Mumbai, Maharashtra');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const mockCurrentWeather: WeatherData = {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      visibility: 10,
      condition: 'Partly Cloudy',
      icon: 'partly-cloudy',
      rainfall: 2.5,
      uvIndex: 6
    };

    const mockForecast: ForecastDay[] = [
      {
        date: '2024-01-20',
        day: 'Today',
        high: 30,
        low: 22,
        condition: 'Partly Cloudy',
        icon: 'partly-cloudy',
        rainfall: 0
      },
      {
        date: '2024-01-21',
        day: 'Tomorrow',
        high: 32,
        low: 24,
        condition: 'Sunny',
        icon: 'sunny',
        rainfall: 0
      },
      {
        date: '2024-01-22',
        day: 'Monday',
        high: 29,
        low: 21,
        condition: 'Light Rain',
        icon: 'rain',
        rainfall: 5.2
      },
      {
        date: '2024-01-23',
        day: 'Tuesday',
        high: 27,
        low: 20,
        condition: 'Heavy Rain',
        icon: 'heavy-rain',
        rainfall: 15.8
      },
      {
        date: '2024-01-24',
        day: 'Wednesday',
        high: 25,
        low: 19,
        condition: 'Thunderstorm',
        icon: 'thunderstorm',
        rainfall: 25.3
      },
      {
        date: '2024-01-25',
        day: 'Thursday',
        high: 28,
        low: 22,
        condition: 'Cloudy',
        icon: 'cloudy',
        rainfall: 2.1
      },
      {
        date: '2024-01-26',
        day: 'Friday',
        high: 31,
        low: 23,
        condition: 'Partly Cloudy',
        icon: 'partly-cloudy',
        rainfall: 0
      }
    ];

    setTimeout(() => {
      setCurrentWeather(mockCurrentWeather);
      setForecast(mockForecast);
      setIsLoading(false);
    }, 1000);
  }, [location]);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'partly-cloudy':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'rain':
      case 'heavy-rain':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'thunderstorm':
        return <CloudRain className="w-8 h-8 text-purple-500" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Sunny':
        return 'from-yellow-400 to-orange-500';
      case 'Cloudy':
        return 'from-gray-400 to-gray-600';
      case 'Partly Cloudy':
        return 'from-blue-400 to-gray-500';
      case 'Light Rain':
        return 'from-blue-400 to-blue-600';
      case 'Heavy Rain':
        return 'from-blue-500 to-blue-700';
      case 'Thunderstorm':
        return 'from-purple-500 to-purple-700';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  const getUVIndexColor = (uvIndex: number) => {
    if (uvIndex <= 2) return 'bg-green-100 text-green-800';
    if (uvIndex <= 5) return 'bg-yellow-100 text-yellow-800';
    if (uvIndex <= 7) return 'bg-orange-100 text-orange-800';
    if (uvIndex <= 10) return 'bg-red-100 text-red-800';
    return 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Weather Forecast
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Stay informed about weather conditions to protect your crops
          </p>
        </div>

        {/* Location Selector */}
        <div className="mb-6">
          <div className="flex justify-center">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
              <option value="Delhi, Delhi">Delhi, Delhi</option>
              <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
              <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
              <option value="Kolkata, West Bengal">Kolkata, West Bengal</option>
              <option value="Pune, Maharashtra">Pune, Maharashtra</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="feature-card p-8 rounded-2xl animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Current Weather */}
            <div className={`feature-card p-8 rounded-2xl mb-6 bg-gradient-to-r ${getConditionColor(currentWeather!.condition)}`}>
              <div className="text-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{location}</h2>
                    <p className="text-lg opacity-90">{currentWeather!.condition}</p>
                  </div>
                  {getWeatherIcon(currentWeather!.icon)}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-6xl font-bold">
                    {currentWeather!.temperature}°C
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Feels like {currentWeather!.temperature + 2}°C</p>
                    <p className="text-sm opacity-90">UV Index: {currentWeather!.uvIndex}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="feature-card p-6 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Droplets className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Humidity</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{currentWeather!.humidity}%</p>
                  </div>
                </div>
              </div>

              <div className="feature-card p-6 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Wind className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Wind Speed</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{currentWeather!.windSpeed} km/h</p>
                  </div>
                </div>
              </div>

              <div className="feature-card p-6 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <CloudRain className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Rainfall</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{currentWeather!.rainfall} mm</p>
                  </div>
                </div>
              </div>

              <div className="feature-card p-6 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Eye className="w-8 h-8 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Visibility</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{currentWeather!.visibility} km</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="feature-card p-6 rounded-2xl mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                7-Day Forecast
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {forecast.map((day, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                      {day.day}
                    </p>
                    <div className="flex justify-center mb-2">
                      {getWeatherIcon(day.icon)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {day.condition}
                    </p>
                    <div className="text-sm">
                      <p className="font-bold text-gray-900 dark:text-white">{day.high}°</p>
                      <p className="text-gray-500 dark:text-gray-400">{day.low}°</p>
                    </div>
                    {day.rainfall > 0 && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        {day.rainfall}mm
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Farming Recommendations */}
            <div className="feature-card p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Farming Recommendations
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    Today's Activities
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Good day for harvesting (low humidity)</li>
                    <li>• Avoid heavy irrigation due to expected rain</li>
                    <li>• Consider pest monitoring in humid conditions</li>
                    <li>• Check drainage systems before heavy rainfall</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    This Week's Outlook
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Heavy rains expected Tuesday-Wednesday</li>
                    <li>• Protect young plants from strong winds</li>
                    <li>• Good time for planting after rain stops</li>
                    <li>• Monitor for fungal diseases in wet conditions</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WeatherPage;