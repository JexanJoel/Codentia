import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Leaf, Calendar, Beaker, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface FertilizerRecommendation {
  id: string;
  name: string;
  type: 'organic' | 'chemical' | 'biofertilizer';
  npkRatio: string;
  application: string;
  dosage: string;
  timing: string;
  benefits: string[];
  precautions: string[];
  cost: string;
  suitableFor: string[];
}

const FertilizerGuidePage: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedGrowthStage, setSelectedGrowthStage] = useState('');
  const [selectedSoilType, setSelectedSoilType] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const fertilizers: FertilizerRecommendation[] = [
    {
      id: '1',
      name: 'Urea',
      type: 'chemical',
      npkRatio: '46-0-0',
      application: 'Soil application, foliar spray',
      dosage: '100-150 kg/acre',
      timing: 'Split application: 50% at planting, 50% at flowering',
      benefits: ['Quick nitrogen supply', 'Promotes vegetative growth', 'Readily available'],
      precautions: ['Avoid over-application', 'Don\'t apply during hot weather', 'Mix with soil immediately'],
      cost: '₹300-400/50kg',
      suitableFor: ['Rice', 'Wheat', 'Maize', 'Sugarcane']
    },
    {
      id: '2',
      name: 'Compost',
      type: 'organic',
      npkRatio: '1-1-1',
      application: 'Soil incorporation',
      dosage: '5-10 tons/acre',
      timing: '2-3 weeks before planting',
      benefits: ['Improves soil structure', 'Slow nutrient release', 'Enhances water retention'],
      precautions: ['Ensure proper composting', 'Check for weed seeds', 'Apply when soil is moist'],
      cost: '₹2000-3000/ton',
      suitableFor: ['All crops', 'Vegetables', 'Fruits', 'Cereals']
    },
    {
      id: '3',
      name: 'Rhizobium',
      type: 'biofertilizer',
      npkRatio: 'N-fixation',
      application: 'Seed treatment',
      dosage: '200g/acre',
      timing: 'At sowing time',
      benefits: ['Fixes atmospheric nitrogen', 'Eco-friendly', 'Reduces chemical fertilizer need'],
      precautions: ['Store in cool place', 'Use within expiry date', 'Avoid contact with chemicals'],
      cost: '₹50-100/200g',
      suitableFor: ['Legumes', 'Pulses', 'Groundnut', 'Soybean']
    },
    {
      id: '4',
      name: 'DAP (Diammonium Phosphate)',
      type: 'chemical',
      npkRatio: '18-46-0',
      application: 'Basal application',
      dosage: '50-100 kg/acre',
      timing: 'At planting time',
      benefits: ['High phosphorus content', 'Promotes root development', 'Suitable for acidic soils'],
      precautions: ['Apply at proper depth', 'Avoid direct seed contact', 'Store in dry place'],
      cost: '₹1200-1400/50kg',
      suitableFor: ['Rice', 'Wheat', 'Cotton', 'Pulses']
    },
    {
      id: '5',
      name: 'Vermicompost',
      type: 'organic',
      npkRatio: '1.5-1.0-1.5',
      application: 'Soil mixing, top dressing',
      dosage: '2-5 tons/acre',
      timing: 'Before planting and during growth',
      benefits: ['Rich in nutrients', 'Improves soil biology', 'Increases water holding capacity'],
      precautions: ['Ensure proper moisture', 'Check for pest contamination', 'Apply gradually'],
      cost: '₹3000-5000/ton',
      suitableFor: ['Vegetables', 'Fruits', 'Flowers', 'Cereals']
    },
    {
      id: '6',
      name: 'Potash (MOP)',
      type: 'chemical',
      npkRatio: '0-0-60',
      application: 'Soil application',
      dosage: '25-50 kg/acre',
      timing: 'At flowering and fruit development',
      benefits: ['Improves fruit quality', 'Enhances disease resistance', 'Increases shelf life'],
      precautions: ['Avoid excess application', 'Don\'t apply on saline soils', 'Apply with adequate moisture'],
      cost: '₹800-1000/50kg',
      suitableFor: ['Fruits', 'Vegetables', 'Tuber crops', 'Cereals']
    }
  ];

  const crops = ['Rice', 'Wheat', 'Maize', 'Tomatoes', 'Potatoes', 'Cotton', 'Sugarcane', 'Pulses'];
  const growthStages = ['Seedling', 'Vegetative', 'Flowering', 'Fruiting', 'Maturity'];
  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Silt', 'Rocky'];

  const handleGetRecommendations = () => {
    if (selectedCrop && selectedGrowthStage && selectedSoilType) {
      setShowRecommendations(true);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'organic': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'chemical': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'biofertilizer': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'organic': return <Leaf className="w-4 h-4" />;
      case 'chemical': return <Beaker className="w-4 h-4" />;
      case 'biofertilizer': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const filteredFertilizers = fertilizers.filter(fertilizer => 
    fertilizer.suitableFor.includes(selectedCrop) || fertilizer.suitableFor.includes('All crops')
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Fertilizer & Pesticide Guide
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get personalized recommendations for fertilizers and pesticides based on your crop and soil conditions
          </p>
        </div>

        {/* Input Form */}
        <div className="feature-card p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Get Personalized Recommendations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Crop
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Choose crop</option>
                {crops.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Growth Stage
              </label>
              <select
                value={selectedGrowthStage}
                onChange={(e) => setSelectedGrowthStage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Choose stage</option>
                {growthStages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Soil Type
              </label>
              <select
                value={selectedSoilType}
                onChange={(e) => setSelectedSoilType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Choose soil type</option>
                {soilTypes.map(soil => (
                  <option key={soil} value={soil}>{soil}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGetRecommendations}
            disabled={!selectedCrop || !selectedGrowthStage || !selectedSoilType}
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Beaker className="w-5 h-5" />
            <span>Get Recommendations</span>
          </button>
        </div>

        {/* Recommendations */}
        {showRecommendations && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recommended for {selectedCrop} ({selectedGrowthStage} stage)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFertilizers.map((fertilizer) => (
                <div key={fertilizer.id} className="feature-card p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {fertilizer.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getTypeColor(fertilizer.type)}`}>
                      {getTypeIcon(fertilizer.type)}
                      <span className="capitalize">{fertilizer.type}</span>
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">NPK Ratio</p>
                        <p className="font-medium text-gray-900 dark:text-white">{fertilizer.npkRatio}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">Cost</p>
                        <p className="font-medium text-gray-900 dark:text-white">{fertilizer.cost}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Dosage</p>
                      <p className="font-medium text-gray-900 dark:text-white">{fertilizer.dosage}</p>
                    </div>

                    <div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Timing</p>
                      <p className="font-medium text-gray-900 dark:text-white">{fertilizer.timing}</p>
                    </div>

                    <div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Application</p>
                      <p className="font-medium text-gray-900 dark:text-white">{fertilizer.application}</p>
                    </div>

                    <div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Benefits</p>
                      <ul className="space-y-1">
                        {fertilizer.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Precautions</p>
                      <ul className="space-y-1">
                        {fertilizer.precautions.map((precaution, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <AlertTriangle className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300">{precaution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Application Calendar */}
        <div className="feature-card p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Fertilizer Application Calendar
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white">Growth Stage</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white">Fertilizer</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white">Timing</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white">Purpose</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Seedling</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Starter fertilizer</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">At planting</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Root development</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Vegetative</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Nitrogen-rich</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">2-3 weeks after planting</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Leaf and stem growth</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Flowering</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Phosphorus-rich</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">At flower initiation</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Flower development</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Fruiting</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Potassium-rich</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">At fruit set</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Fruit quality</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Organic vs Chemical */}
        <div className="feature-card p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Organic vs Chemical Fertilizers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-medium text-green-800 dark:text-green-200 mb-3 flex items-center space-x-2">
                <Leaf className="w-5 h-5" />
                <span>Organic Fertilizers</span>
              </h3>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li>• Slow and steady nutrient release</li>
                <li>• Improves soil health and structure</li>
                <li>• Environmentally friendly</li>
                <li>• Supports beneficial microorganisms</li>
                <li>• Long-term soil fertility</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3 flex items-center space-x-2">
                <Beaker className="w-5 h-5" />
                <span>Chemical Fertilizers</span>
              </h3>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• Quick nutrient availability</li>
                <li>• Precise nutrient content</li>
                <li>• Immediate visible results</li>
                <li>• Cost-effective for large areas</li>
                <li>• Easy to apply and store</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FertilizerGuidePage;