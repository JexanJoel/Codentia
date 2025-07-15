import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ShoppingCart, Plus, Search, Filter, MapPin, Phone, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  quantity: string;
  quality: string;
  seller: string;
  location: string;
  phone: string;
  rating: number;
  image: string;
  description: string;
  harvestDate: string;
  isOrganic: boolean;
}

const MarketplacePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      price: 35,
      unit: 'per kg',
      quantity: '500 kg available',
      quality: 'Grade A',
      seller: 'Raj Patel',
      location: 'Gujarat, India',
      phone: '+91 98765 43210',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Fresh, juicy tomatoes harvested this morning. Perfect for cooking and salads.',
      harvestDate: '2024-01-20',
      isOrganic: false
    },
    {
      id: '2',
      name: 'Organic Rice',
      category: 'Grains',
      price: 45,
      unit: 'per kg',
      quantity: '2000 kg available',
      quality: 'Premium',
      seller: 'Priya Singh',
      location: 'Punjab, India',
      phone: '+91 98765 43211',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/33239/rice-grains-white-food.jpg?auto=compress&cs=tinysrgb&w=300',
      description: 'Certified organic basmati rice, grown without chemicals. Long grain, aromatic.',
      harvestDate: '2024-01-15',
      isOrganic: true
    },
    {
      id: '3',
      name: 'Fresh Onions',
      category: 'Vegetables',
      price: 25,
      unit: 'per kg',
      quantity: '1000 kg available',
      quality: 'Grade B',
      seller: 'Kumar Reddy',
      location: 'Andhra Pradesh, India',
      phone: '+91 98765 43212',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Red onions, well-dried and stored. Good for long-term storage.',
      harvestDate: '2024-01-18',
      isOrganic: false
    },
    {
      id: '4',
      name: 'Organic Wheat',
      category: 'Grains',
      price: 28,
      unit: 'per kg',
      quantity: '3000 kg available',
      quality: 'Grade A',
      seller: 'Deepika Sharma',
      location: 'Haryana, India',
      phone: '+91 98765 43213',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Organic wheat flour quality. High protein content, perfect for bread making.',
      harvestDate: '2024-01-10',
      isOrganic: true
    },
    {
      id: '5',
      name: 'Fresh Potatoes',
      category: 'Vegetables',
      price: 18,
      unit: 'per kg',
      quantity: '800 kg available',
      quality: 'Grade A',
      seller: 'Mohan Joshi',
      location: 'Maharashtra, India',
      phone: '+91 98765 43214',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Fresh potatoes, uniform size. Great for cooking and processing.',
      harvestDate: '2024-01-19',
      isOrganic: false
    },
    {
      id: '6',
      name: 'Organic Mangoes',
      category: 'Fruits',
      price: 80,
      unit: 'per kg',
      quantity: '200 kg available',
      quality: 'Premium',
      seller: 'Anita Gupta',
      location: 'Karnataka, India',
      phone: '+91 98765 43215',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Alphonso mangoes, organically grown. Sweet and juicy, perfect ripeness.',
      harvestDate: '2024-01-21',
      isOrganic: true
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyOrganic, setShowOnlyOrganic] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Vegetables', label: 'Vegetables' },
    { value: 'Fruits', label: 'Fruits' },
    { value: 'Grains', label: 'Grains' },
    { value: 'Pulses', label: 'Pulses' },
    { value: 'Spices', label: 'Spices' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrganic = !showOnlyOrganic || product.isOrganic;
    return matchesCategory && matchesSearch && matchesOrganic;
  });

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Premium': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Grade A': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Grade B': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Farmer Marketplace
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Buy and sell fresh produce directly from farmers. No middlemen, fair prices.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showOnlyOrganic}
                onChange={(e) => setShowOnlyOrganic(e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Organic only</span>
            </label>
            
            <button
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Sell Product</span>
            </button>
          </div>
        </div>

        {/* Add Product Form */}
        {showAddProduct && (
          <div className="feature-card p-6 rounded-2xl mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              List Your Product
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Product name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white">
                  <option>Select category</option>
                  {categories.slice(1).map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <input
                  type="number"
                  placeholder="Price per kg"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Quantity available"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="md:col-span-2">
                <textarea
                  placeholder="Product description"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Organic certified</span>
              </label>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200">
                List Product
              </button>
              <button
                onClick={() => setShowAddProduct(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="feature-card rounded-2xl overflow-hidden hover-grow">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getQualityColor(product.quality)}`}>
                    {product.quality}
                  </span>
                </div>
                {product.isOrganic && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                      Organic
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{product.price}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {product.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {product.quantity}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Harvested: {new Date(product.harvestDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {product.seller}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{product.location}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span>Buy Now</span>
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Marketplace Benefits */}
        <div className="mt-8">
          <div className="feature-card p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Why Use Our Marketplace?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Direct Trading</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Buy directly from farmers, eliminating middlemen and ensuring fair prices
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Quality Assured</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All products are quality checked and rated by verified buyers
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Local Sourcing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Find fresh produce from farmers in your area for maximum freshness
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MarketplacePage;