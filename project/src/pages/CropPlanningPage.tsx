import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Leaf, MapPin, Calendar, DollarSign, Droplets, Sun, ChevronRight } from 'lucide-react';

const CropPlanningPage: React.FC = () => {
  const [formData, setFormData] = useState({
    location: '',
    soilType: '',
    landSize: '',
    budget: '',
    season: '',
    waterAvailability: '',
    experience: ''
  });

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock recommendations
    const mockRecommendations = [
      {
        crop: 'Tomatoes',
        profitability: 85,
        difficulty: 'Medium',
        duration: '90-120 days',
        expectedYield: '15-20 tons/acre',
        investment: '$800-1200',
        marketDemand: 'High',
        tips: ['Start with seedlings', 'Requires good drainage', 'Regular pruning needed']
      },
      {
        crop: 'Rice',
        profitability: 70,
        difficulty: 'Easy',
        duration: '120-150 days',
        expectedYield: '4-6 tons/acre',
        investment: '$400-600',
        marketDemand: 'Very High',
        tips: ['Flooded fields required', 'Good for monsoon season', 'Stable market prices']
      },
      {
        crop: 'Wheat',
        profitability: 65,
        difficulty: 'Easy',
        duration: '120-130 days',
        expectedYield: '3-5 tons/acre',
        investment: '$300-500',
        marketDemand: 'High',
        tips: ['Cool weather crop', 'Minimal water needs', 'Good storage life']
      }
    ];
    
    setRecommendations(mockRecommendations);
    setIsLoading(false);
  };

  const getProfitabilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Personalized Crop Planning
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get AI-powered recommendations based on your location, soil, budget, and farming conditions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <div className="feature-card p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Farming Details
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Maharashtra, India"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Soil Type
                  </label>
                  <select
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select soil type</option>
                    <option value="clay">Clay</option>
                    <option value="sandy">Sandy</option>
                    <option value="loamy">Loamy</option>
                    <option value="silt">Silt</option>
                    <option value="rocky">Rocky</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Land Size
                  </label>
                  <input
                    type="text"
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., 5 acres"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Budget
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., $5000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Season
                  </label>
                  <select
                    name="season"
                    value={formData.season}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select season</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="monsoon">Monsoon</option>
                    <option value="winter">Winter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Water Availability
                  </label>
                  <select
                    name="waterAvailability"
                    value={formData.waterAvailability}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select water availability</option>
                    <option value="high">High (Irrigation available)</option>
                    <option value="medium">Medium (Seasonal water)</option>
                    <option value="low">Low (Rain-fed only)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Farming Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select experience level</option>
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="intermediate">Intermediate (3-10 years)</option>
                    <option value="expert">Expert (10+ years)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Leaf className="w-5 h-5" />
                      <span>Get Recommendations</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Recommendations */}
          <div className="lg:col-span-2">
            {recommendations.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recommended Crops for Your Farm
                </h2>
                
                {recommendations.map((rec, index) => (
                  <div key={index} className="feature-card p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {rec.crop}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProfitabilityColor(rec.profitability)}`}>
                          {rec.profitability}% Profitable
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(rec.difficulty)}`}>
                          {rec.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Duration: {rec.duration}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Leaf className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Expected Yield: {rec.expectedYield}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Investment: {rec.investment}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Market Demand: {rec.marketDemand}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Key Tips:
                      </h4>
                      <ul className="space-y-1">
                        {rec.tips.map((tip: string, tipIndex: number) => (
                          <li key={tipIndex} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex space-x-3">
                      <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200">
                        Start Planning
                      </button>
                      <button className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Save for Later
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="feature-card p-8 rounded-2xl text-center">
                <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Recommendations Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Fill in your farming details to get personalized crop recommendations
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CropPlanningPage;