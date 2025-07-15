import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FileText, Calendar, DollarSign, Users, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface Scheme {
  id: string;
  name: string;
  description: string;
  benefits: string;
  eligibility: string[];
  documents: string[];
  deadline: string;
  amount: string;
  status: 'active' | 'closing-soon' | 'closed';
  category: string;
  applyUrl: string;
}

const GovernmentSchemesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const schemes: Scheme[] = [
    {
      id: '1',
      name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
      description: 'Direct income support to farmers for better livelihood',
      benefits: 'Financial assistance of ₹6,000 per year in three installments',
      eligibility: ['Small and marginal farmers', 'Land holding up to 2 hectares', 'Indian citizenship required'],
      documents: ['Aadhaar card', 'Land ownership documents', 'Bank account details'],
      deadline: 'Open throughout the year',
      amount: '₹6,000/year',
      status: 'active',
      category: 'income-support',
      applyUrl: 'https://pmkisan.gov.in'
    },
    {
      id: '2',
      name: 'Crop Insurance Scheme (PMFBY)',
      description: 'Insurance coverage for crop losses due to natural disasters',
      benefits: 'Compensation for crop losses, premium subsidies',
      eligibility: ['All farmers', 'Sharecroppers and tenant farmers', 'Crop must be notified'],
      documents: ['Land records', 'Crop sowing certificate', 'Bank account details'],
      deadline: 'December 31, 2024',
      amount: 'Up to ₹2,00,000',
      status: 'closing-soon',
      category: 'insurance',
      applyUrl: 'https://pmfby.gov.in'
    },
    {
      id: '3',
      name: 'Soil Health Card Scheme',
      description: 'Free soil testing and nutrient recommendations',
      benefits: 'Soil testing, customized fertilizer recommendations, improved productivity',
      eligibility: ['All farmers', 'No restrictions on land size', 'Valid land documents'],
      documents: ['Land ownership proof', 'Aadhaar card', 'Contact details'],
      deadline: 'March 31, 2024',
      amount: 'Free service',
      status: 'active',
      category: 'subsidy',
      applyUrl: 'https://soilhealth.dac.gov.in'
    },
    {
      id: '4',
      name: 'Micro Irrigation Fund',
      description: 'Financial assistance for drip and sprinkler irrigation systems',
      benefits: 'Up to 90% subsidy on irrigation equipment',
      eligibility: ['Small and marginal farmers', 'Water availability certificate', 'Land ownership'],
      documents: ['Land documents', 'Water source certificate', 'Project estimate'],
      deadline: 'February 28, 2024',
      amount: 'Up to ₹1,50,000',
      status: 'closing-soon',
      category: 'subsidy',
      applyUrl: 'https://pmksy.gov.in'
    },
    {
      id: '5',
      name: 'Kisan Credit Card (KCC)',
      description: 'Easy access to credit for farming and related activities',
      benefits: 'Low-interest agricultural loans, flexible repayment',
      eligibility: ['All farmers', 'Sharecroppers', 'Tenant farmers', 'Good credit history'],
      documents: ['Identity proof', 'Address proof', 'Land documents', 'Income proof'],
      deadline: 'Open throughout the year',
      amount: 'Up to ₹3,00,000',
      status: 'active',
      category: 'credit',
      applyUrl: 'https://kcc.gov.in'
    },
    {
      id: '6',
      name: 'Organic Farming Certification',
      description: 'Support for organic farming practices and certification',
      benefits: 'Certification support, market linkage, premium prices',
      eligibility: ['Farmers practicing organic methods', 'Minimum 1 acre land', 'No chemical use for 3 years'],
      documents: ['Land records', 'Organic farming proof', 'Group certification'],
      deadline: 'January 15, 2024',
      amount: '₹50,000/acre',
      status: 'closed',
      category: 'subsidy',
      applyUrl: 'https://pgsindia-ncof.gov.in'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Schemes' },
    { value: 'income-support', label: 'Income Support' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'subsidy', label: 'Subsidies' },
    { value: 'credit', label: 'Credit/Loans' }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closing-soon': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'closed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'closing-soon': return <AlertCircle className="w-4 h-4" />;
      case 'closed': return <AlertCircle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Government Schemes & Subsidies
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Access financial support, subsidies, and government programs designed for farmers
          </p>
        </div>

        {/* Filters */}
        <div className="feature-card p-6 rounded-2xl mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schemes List */}
        <div className="space-y-6">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="feature-card p-6 rounded-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {scheme.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(scheme.status)}`}>
                      {getStatusIcon(scheme.status)}
                      <span className="capitalize">{scheme.status.replace('-', ' ')}</span>
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {scheme.description}
                  </p>
                </div>
                <a
                  href={scheme.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center space-x-2"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span>Benefits</span>
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {scheme.benefits}
                  </p>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-2">
                    Amount: {scheme.amount}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>Eligibility</span>
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {scheme.eligibility.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-purple-500" />
                    <span>Required Documents</span>
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {scheme.documents.map((doc, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-purple-500 mt-0.5">•</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>Deadline: {scheme.deadline}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                      Get Help
                    </button>
                    <button className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm">
                      Save Scheme
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No schemes found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or category filter
            </p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8">
          <div className="feature-card p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Need Help Applying?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Application Support
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Step-by-step guidance for each scheme</li>
                  <li>• Document preparation assistance</li>
                  <li>• Online application support</li>
                  <li>• Status tracking help</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Contact Information
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Toll-free: 1800-180-1551</li>
                  <li>• Email: support@pmkisan.gov.in</li>
                  <li>• Local agricultural officer</li>
                  <li>• District collector office</li>
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

export default GovernmentSchemesPage;