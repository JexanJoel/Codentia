import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Camera, Calendar, TrendingUp, Leaf, Droplets, Sun, AlertCircle } from 'lucide-react';

interface CropRecord {
  id: string;
  cropName: string;
  variety: string;
  plantingDate: string;
  area: string;
  currentStage: string;
  healthScore: number;
  daysToHarvest: number;
  photos: string[];
  notes: string[];
  treatments: string[];
}

const CropTrackerPage: React.FC = () => {
  const [crops, setCrops] = useState<CropRecord[]>([
    {
      id: '1',
      cropName: 'Tomatoes',
      variety: 'Roma',
      plantingDate: '2024-01-01',
      area: 'Field A (2 acres)',
      currentStage: 'Flowering',
      healthScore: 85,
      daysToHarvest: 45,
      photos: [
        'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300'
      ],
      notes: [
        'Good growth observed',
        'First flowers appeared',
        'Applied organic fertilizer'
      ],
      treatments: [
        'Organic fertilizer - Jan 15',
        'Pest spray - Jan 18'
      ]
    },
    {
      id: '2',
      cropName: 'Rice',
      variety: 'Basmati',
      plantingDate: '2023-12-15',
      area: 'Field B (3 acres)',
      currentStage: 'Grain Filling',
      healthScore: 92,
      daysToHarvest: 20,
      photos: [
        'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300'
      ],
      notes: [
        'Excellent growth',
        'No pest issues',
        'Good water management'
      ],
      treatments: [
        'Nitrogen fertilizer - Dec 20',
        'Fungicide spray - Jan 10'
      ]
    },
    {
      id: '3',
      cropName: 'Wheat',
      variety: 'HD-2967',
      plantingDate: '2023-11-20',
      area: 'Field C (1.5 acres)',
      currentStage: 'Maturity',
      healthScore: 78,
      daysToHarvest: 5,
      photos: [
        'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300'
      ],
      notes: [
        'Ready for harvest',
        'Some lodging observed',
        'Overall good yield expected'
      ],
      treatments: [
        'Herbicide - Dec 10',
        'Phosphorus fertilizer - Dec 25'
      ]
    }
  ]);

  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [showAddPhoto, setShowAddPhoto] = useState(false);

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
    return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
  };

  const getStageColor = (stage: string) => {
    const stageColors = {
      'Seedling': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Vegetative': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Flowering': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Grain Filling': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Maturity': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };
    return stageColors[stage as keyof typeof stageColors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getDaysToHarvestColor = (days: number) => {
    if (days <= 7) return 'text-red-600';
    if (days <= 30) return 'text-yellow-600';
    return 'text-green-600';
  };

  const calculateDaysPlanted = (plantingDate: string) => {
    const planted = new Date(plantingDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - planted.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Crop Growth Tracker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Monitor your crop growth with AI-powered analysis and photo tracking
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="feature-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Active Crops</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{crops.length}</p>
              </div>
            </div>
          </div>

          <div className="feature-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Avg Health Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(crops.reduce((sum, crop) => sum + crop.healthScore, 0) / crops.length)}%
                </p>
              </div>
            </div>
          </div>

          <div className="feature-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Ready to Harvest</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {crops.filter(crop => crop.daysToHarvest <= 7).length}
                </p>
              </div>
            </div>
          </div>

          <div className="feature-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Photos Taken</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {crops.reduce((sum, crop) => sum + crop.photos.length, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Crop Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {crops.map((crop) => (
            <div key={crop.id} className="feature-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {crop.cropName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {crop.variety} • {crop.area}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStageColor(crop.currentStage)}`}>
                  {crop.currentStage}
                </span>
              </div>

              {/* Photo Gallery */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Growth Photos</h4>
                  <button
                    onClick={() => setShowAddPhoto(true)}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm flex items-center space-x-1"
                  >
                    <Camera className="w-3 h-3" />
                    <span>Add Photo</span>
                  </button>
                </div>
                <div className="flex space-x-2 overflow-x-auto">
                  {crop.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`${crop.cropName} growth ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Health Score</p>
                  <p className={`text-lg font-bold ${getHealthScoreColor(crop.healthScore).split(' ')[0]}`}>
                    {crop.healthScore}%
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Days Planted</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {calculateDaysPlanted(crop.plantingDate)}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300">To Harvest</p>
                  <p className={`text-lg font-bold ${getDaysToHarvestColor(crop.daysToHarvest)}`}>
                    {crop.daysToHarvest} days
                  </p>
                </div>
              </div>

              {/* Recent Notes */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recent Notes</h4>
                <div className="space-y-1">
                  {crop.notes.slice(-2).map((note, index) => (
                    <p key={index} className="text-sm text-gray-600 dark:text-gray-300">
                      • {note}
                    </p>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 text-sm">
                  View Details
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                  Add Note
                </button>
              </div>

              {/* Alerts */}
              {crop.daysToHarvest <= 7 && (
                <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-orange-800 dark:text-orange-200 font-medium text-sm">
                        Harvest Ready Soon
                      </p>
                      <p className="text-orange-700 dark:text-orange-300 text-xs">
                        This crop will be ready for harvest in {crop.daysToHarvest} days.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add New Crop */}
        <div className="feature-card p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Add New Crop
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Crop name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Variety"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="mt-4 flex space-x-3">
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200">
              Add Crop
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Cancel
            </button>
          </div>
        </div>

        {/* Growth Analytics */}
        <div className="feature-card p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Growth Analytics & Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                AI Insights
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Tomato growth rate is 15% above average</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Droplets className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Rice field showing optimal water levels</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Sun className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Wheat benefiting from current weather conditions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>Monitor tomatoes for early blight symptoms</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Photo Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Take photos at the same time each week</li>
                <li>• Capture overall plant and close-up details</li>
                <li>• Include a reference object for scale</li>
                <li>• Photograph in good natural lighting</li>
                <li>• Document any issues or treatments applied</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CropTrackerPage;