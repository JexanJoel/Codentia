import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TrendingUp, TrendingDown, MapPin, Calendar, Search, Filter } from 'lucide-react';

interface MarketPrice {
  id: string;
  crop: string;
  price: number;
  unit: string;
  change: number;
  location: string;
  lastUpdated: string;
  quality: string;
}

const MarketPricesPage: React.FC = () => {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [filteredPrices, setFilteredPrices] = useState<MarketPrice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const mockPrices: MarketPrice[] = [
      {
        id: '1',
        crop: 'Rice',
        price: 25.50,
        unit: 'per kg',
        change: 2.5,
        location: 'Mumbai, Maharashtra',
        lastUpdated: '2 hours ago',
        quality: 'Grade A'
      },
      {
        id: '2',
        crop: 'Wheat',
        price: 22.00,
        unit: 'per kg',
        change: -1.2,
        location: 'Delhi, Delhi',
        lastUpdated: '1 hour ago',
        quality: 'Grade A'
      },
      {
        id: '3',
        crop: 'Tomatoes',
        price: 35.00,
        unit: 'per kg',
        change: 8.5,
        location: 'Bangalore, Karnataka',
        lastUpdated: '30 minutes ago',
        quality: 'Fresh'
      },
      {
        id: '4',
        crop: 'Onions',
        price: 18.75,
        unit: 'per kg',
        change: -3.1,
        location: 'Pune, Maharashtra',
        lastUpdated: '1 hour ago',
        quality: 'Grade B'
      },
      {
        id: '5',
        crop: 'Potatoes',
        price: 12.50,
        unit: 'per kg',
        change: 1.8,
        location: 'Chennai, Tamil Nadu',
        lastUpdated: '2 hours ago',
        quality: 'Grade A'
      },
      {
        id: '6',
        crop: 'Sugarcane',
        price: 3.20,
        unit: 'per kg',
        change: 0.5,
        location: 'Kolkata, West Bengal',
        lastUpdated: '3 hours ago',
        quality: 'Fresh'
      }
    ];

    setTimeout(() => {
      setPrices(mockPrices);
      setFilteredPrices(mockPrices);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = prices;

    if (searchTerm) {
      filtered = filtered.filter(price => 
        price.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        price.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(price => price.location.includes(selectedLocation));
    }

    if (selectedCrop !== 'all') {
      filtered = filtered.filter(price => price.crop === selectedCrop);
    }

    setFilteredPrices(filtered);
  }, [searchTerm, selectedLocation, selectedCrop, prices]);

  const locations = Array.from(new Set(prices.map(p => p.location.split(', ')[1])));
  const crops = Array.from(new Set(prices.map(p => p.crop)));

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Live Market Prices
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Real-time crop prices from major markets across the region
          </p>
        </div>

        {/* Filters */}
        <div className="feature-card p-6 rounded-2xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search crops or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Crops</option>
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>

            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Price Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="feature-card p-6 rounded-2xl animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrices.map((price) => (
              <div key={price.id} className="feature-card p-6 rounded-2xl hover-grow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {price.crop}
                  </h3>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    {price.quality}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{price.price}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {price.unit}
                    </p>
                  </div>
                  <div className={`flex items-center space-x-1 ${getPriceChangeColor(price.change)}`}>
                    {getPriceChangeIcon(price.change)}
                    <span className="font-medium">
                      {price.change > 0 ? '+' : ''}{price.change}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span>{price.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>Updated {price.lastUpdated}</span>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 text-sm">
                    Get Alerts
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredPrices.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No prices found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search filters to find more results
            </p>
          </div>
        )}

        {/* Market Insights */}
        <div className="mt-8">
          <div className="feature-card p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Market Insights
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Price Trends
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Tomato prices up 8.5% due to seasonal demand</li>
                  <li>• Wheat prices stable with good harvest expected</li>
                  <li>• Onion prices declining after recent arrivals</li>
                  <li>• Rice demand steady in urban markets</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Best Selling Locations
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Mumbai: Best for vegetables and fruits</li>
                  <li>• Delhi: Strong demand for grains</li>
                  <li>• Bangalore: Premium prices for organic</li>
                  <li>• Chennai: Good for spices and pulses</li>
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

export default MarketPricesPage;