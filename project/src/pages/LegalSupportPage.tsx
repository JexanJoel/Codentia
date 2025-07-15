import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Scale, FileText, Phone, MessageCircle, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

interface LegalResource {
  id: string;
  title: string;
  category: string;
  description: string;
  type: 'guide' | 'form' | 'contact' | 'law';
  urgency: 'low' | 'medium' | 'high';
  url?: string;
  phone?: string;
}

const LegalSupportPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const legalResources: LegalResource[] = [
    {
      id: '1',
      title: 'Land Record Verification',
      category: 'Land Rights',
      description: 'Check and verify your land ownership documents and survey numbers',
      type: 'guide',
      urgency: 'medium',
      url: 'https://webland.ap.gov.in'
    },
    {
      id: '2',
      title: 'Tenant Farming Rights',
      category: 'Land Rights',
      description: 'Understanding rights and responsibilities of tenant farmers',
      type: 'law',
      urgency: 'high'
    },
    {
      id: '3',
      title: 'Crop Insurance Claims',
      category: 'Insurance',
      description: 'How to file and follow up on crop insurance claims',
      type: 'guide',
      urgency: 'high'
    },
    {
      id: '4',
      title: 'Water Rights Disputes',
      category: 'Water Rights',
      description: 'Resolving conflicts over irrigation water access',
      type: 'contact',
      urgency: 'high',
      phone: '1800-180-1551'
    },
    {
      id: '5',
      title: 'Contract Farming Agreement',
      category: 'Contracts',
      description: 'Template and guidelines for contract farming agreements',
      type: 'form',
      urgency: 'medium'
    },
    {
      id: '6',
      title: 'Agricultural Labor Laws',
      category: 'Labor',
      description: 'Rights and obligations regarding farm workers',
      type: 'law',
      urgency: 'medium'
    },
    {
      id: '7',
      title: 'Loan Recovery Issues',
      category: 'Finance',
      description: 'Legal support for agricultural loan problems',
      type: 'contact',
      urgency: 'high',
      phone: '1800-425-1551'
    },
    {
      id: '8',
      title: 'Organic Certification Process',
      category: 'Certification',
      description: 'Legal requirements for organic farming certification',
      type: 'guide',
      urgency: 'low',
      url: 'https://pgsindia-ncof.gov.in'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Land Rights', label: 'Land Rights' },
    { value: 'Insurance', label: 'Insurance' },
    { value: 'Water Rights', label: 'Water Rights' },
    { value: 'Contracts', label: 'Contracts' },
    { value: 'Labor', label: 'Labor' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Certification', label: 'Certification' }
  ];

  const filteredResources = legalResources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return <FileText className="w-5 h-5" />;
      case 'form': return <FileText className="w-5 h-5" />;
      case 'contact': return <Phone className="w-5 h-5" />;
      case 'law': return <Scale className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'text-blue-600';
      case 'form': return 'text-green-600';
      case 'contact': return 'text-purple-600';
      case 'law': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Legal Support & Resources
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get legal guidance and support for farming-related issues and documentation
          </p>
        </div>

        {/* Emergency Contact */}
        <div className="feature-card p-6 rounded-2xl mb-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">
                Emergency Legal Helpline
              </h2>
              <p className="text-red-700 dark:text-red-300">
                For urgent legal matters: <strong>1800-180-1551</strong> (24/7 Support)
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="feature-card p-6 rounded-2xl mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search legal resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
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
          </div>
        </div>

        {/* Legal Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="feature-card p-6 rounded-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`${getTypeColor(resource.type)}`}>
                    {getTypeIcon(resource.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {resource.category}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(resource.urgency)}`}>
                  {resource.urgency} priority
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {resource.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${getTypeColor(resource.type)} capitalize`}>
                  {resource.type}
                </span>
                
                <div className="flex space-x-2">
                  {resource.phone && (
                    <a
                      href={`tel:${resource.phone}`}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm flex items-center space-x-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  )}
                  
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Visit</span>
                    </a>
                  )}
                  
                  <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or category filter
            </p>
          </div>
        )}

        {/* Legal Aid Services */}
        <div className="feature-card p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Free Legal Aid Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Legal Consultation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Free consultation with agricultural law experts
              </p>
              <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                Book Consultation
              </button>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Document Review</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Get your legal documents reviewed by experts
              </p>
              <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                Submit Documents
              </button>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Scale className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Court Representation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Legal representation for eligible farmers
              </p>
              <button className="mt-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm">
                Apply for Aid
              </button>
            </div>
          </div>
        </div>

        {/* Common Legal Issues */}
        <div className="feature-card p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Common Legal Issues & Solutions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Frequent Issues
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Land ownership disputes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Water rights conflicts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Insurance claim rejections</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Contract farming disputes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Loan recovery problems</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Prevention Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Keep all land documents updated</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Document all agreements in writing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Understand insurance terms clearly</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Seek legal advice before signing contracts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Maintain proper financial records</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalSupportPage;