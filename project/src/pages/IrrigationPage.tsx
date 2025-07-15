import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Droplets, Calendar, Thermometer, Cloud, AlertTriangle, CheckCircle } from 'lucide-react';

interface IrrigationSchedule {
  id: string;
  crop: string;
  area: string;
  nextWatering: string;
  duration: number;
  waterAmount: number;
  soilMoisture: number;
  status: 'scheduled' | 'watering' | 'completed';
}

const IrrigationPage: React.FC = () => {
  const [schedules, setSchedules] = useState<IrrigationSchedule[]>([
    {
      id: '1',
      crop: 'Tomatoes',
      area: 'Field A (2 acres)',
      nextWatering: '2024-01-20T06:00:00',
      duration: 45,
      waterAmount: 500,
      soilMoisture: 35,
      status: 'scheduled'
    },
    {
      id: '2',
      crop: 'Rice',
      area: 'Field B (3 acres)',
      nextWatering: '2024-01-20T18:00:00',
      duration: 60,
      waterAmount: 800,
      soilMoisture: 65,
      status: 'watering'
    },
    {
      id: '3',
      crop: 'Wheat',
      area: 'Field C (1.5 acres)',
      nextWatering: '2024-01-21T06:00:00',
      duration: 30,
      waterAmount: 300,
      soilMoisture: 45,
      status: 'completed'
    }
  ]);

  const [waterUsage, setWaterUsage] = useState({
    today: 1200,
    thisWeek: 7500,
    thisMonth: 28000,
    efficiency: 85
  });

  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    humidity: 65,
    rainfall: 0,
    windSpeed: 12,
    forecast: [
      { day: 'Today', rain: 0, temp: 28 },
      { day: 'Tomorrow', rain: 5, temp: 26 },
      { day: 'Day 3', rain: 15, temp: 24 },
      { day: 'Day 4', rain: 0, temp: 29 },
      { day: 'Day 5', rain: 2, temp: 27 }
    ]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'watering': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Calendar className="w-4 h-4" />;
      case 'watering': return <Droplets className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getMoistureColor = (moisture: number) => {
    if (moisture < 30) return 'text-red-600';
    if (moisture < 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getMoistureStatus = (moisture: number) => {
    if (moisture < 30) return 'Low';
    if (moisture < 50) return 'Medium';
    return 'Good';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Smart Irrigation Management
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Optimize water usage with AI-powered irrigation scheduling and monitoring
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="feature-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Today's Usage</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{waterUsage.today}L</p>
              </div>
            </div>
          </div>

          <div className="feature-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Efficiency</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{waterUsage.efficiency}%</p>
              </div>
            </div>
          </div>

          <div className="feature-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Temperature</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{weatherData.temperature}°C</p>
              </div>
            </div>
          </div>

          <div className="feature-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                <Cloud className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Humidity</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{weatherData.humidity}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Irrigation Schedule */}
          <div className="feature-card p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Irrigation Schedule
            </h2>
            
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {schedule.crop}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {schedule.area}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(schedule.status)}`}>
                      {getStatusIcon(schedule.status)}
                      <span className="capitalize">{schedule.status}</span>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">Next Watering</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(schedule.nextWatering).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">Duration</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {schedule.duration} minutes
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">Water Amount</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {schedule.waterAmount}L
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">Soil Moisture</p>
                      <p className={`font-medium ${getMoistureColor(schedule.soilMoisture)}`}>
                        {schedule.soilMoisture}% ({getMoistureStatus(schedule.soilMoisture)})
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    <button className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm">
                      Modify
                    </button>
                    <button className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm">
                      Start Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200">
              Add New Schedule
            </button>
          </div>

          {/* Weather & Recommendations */}
          <div className="space-y-6">
            {/* Weather Forecast */}
            <div className="feature-card p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Weather Forecast
              </h2>
              
              <div className="grid grid-cols-5 gap-2">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">{day.day}</p>
                    <div className="flex justify-center mb-1">
                      {day.rain > 0 ? (
                        <Cloud className="w-4 h-4 text-blue-500" />
                      ) : (
                        <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{day.temp}°C</p>
                    {day.rain > 0 && (
                      <p className="text-xs text-blue-600 dark:text-blue-400">{day.rain}mm</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Water Usage Analytics */}
            <div className="feature-card p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Water Usage Analytics
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">This Week</span>
                  <span className="font-medium text-gray-900 dark:text-white">{waterUsage.thisWeek}L</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">This Month</span>
                  <span className="font-medium text-gray-900 dark:text-white">{waterUsage.thisMonth}L</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Efficiency Rate</span>
                  <span className="font-medium text-green-600">{waterUsage.efficiency}%</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-green-800 dark:text-green-200 font-medium text-sm">
                      Great efficiency!
                    </p>
                    <p className="text-green-700 dark:text-green-300 text-xs">
                      You're saving 20% more water compared to traditional methods.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="feature-card p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Smart Recommendations
              </h2>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Droplets className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-blue-800 dark:text-blue-200 font-medium text-sm">
                        Reduce watering tomorrow
                      </p>
                      <p className="text-blue-700 dark:text-blue-300 text-xs">
                        15mm rain expected. Skip morning irrigation for tomatoes.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-yellow-800 dark:text-yellow-200 font-medium text-sm">
                        Check soil moisture
                      </p>
                      <p className="text-yellow-700 dark:text-yellow-300 text-xs">
                        Field A showing low moisture levels. Consider early watering.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-green-800 dark:text-green-200 font-medium text-sm">
                        Optimal conditions
                      </p>
                      <p className="text-green-700 dark:text-green-300 text-xs">
                        Perfect weather for rice field irrigation this evening.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Irrigation Tips */}
        <div className="mt-8">
          <div className="feature-card p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Water Conservation Tips
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Best Practices
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Water early morning or late evening to reduce evaporation</li>
                  <li>• Use drip irrigation for maximum efficiency</li>
                  <li>• Monitor soil moisture regularly</li>
                  <li>• Apply mulch to retain soil moisture</li>
                  <li>• Collect rainwater for irrigation</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Technology Benefits
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Automated scheduling saves time and water</li>
                  <li>• Soil sensors provide real-time moisture data</li>
                  <li>• Weather integration prevents overwatering</li>
                  <li>• Remote monitoring and control</li>
                  <li>• Data analytics for optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IrrigationPage;