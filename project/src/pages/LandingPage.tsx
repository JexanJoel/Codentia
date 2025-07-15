import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  MessageCircle, 
  Camera, 
  TrendingUp, 
  CloudRain, 
  Users, 
  BookOpen, 
  Shield,
  ArrowRight,
  Check,
  Smartphone,
  Globe,
  Zap,
  Heart,
  Star
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI-Powered Assistant",
      description: "Get instant answers to your farming questions in your local language with voice and text support.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Camera,
      title: "Crop Disease Diagnosis",
      description: "Upload photos of your crops to identify diseases and pests with AI-powered analysis.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Market Price Tracker",
      description: "Stay updated with real-time market prices and find the best places to sell your crops.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: CloudRain,
      title: "Weather Forecasting",
      description: "Get accurate weather predictions and timely alerts to protect your crops.",
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with fellow farmers, share experiences, and learn from success stories.",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: BookOpen,
      title: "Learning Center",
      description: "Access educational resources, tutorials, and skill training programs.",
      gradient: "from-indigo-500 to-indigo-600"
    }
  ];

  const benefits = [
    "Increase crop yield by up to 30%",
    "Reduce farming costs significantly",
    "Access expert knowledge 24/7",
    "Get early disease detection",
    "Optimize resource usage",
    "Connect with global markets"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-green-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">CropKind</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 sparkle"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 animate-gradient"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 slide-up">
              Grow Smarter with{' '}
              <span className="text-gradient">AI-Powered</span>{' '}
              Farming
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto slide-up">
              Join millions of farmers worldwide who trust CropKind for personalized agricultural guidance, 
              crop disease diagnosis, market insights, and expert support in their local language.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 slide-up">
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2 sparkle hover-grow"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 border-2 border-green-500 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 flex items-center justify-center space-x-2 hover-grow"
              >
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Farm Better
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From AI-powered crop diagnosis to market insights, we provide comprehensive tools 
              to help you make informed decisions and maximize your harvest.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="feature-card p-6 rounded-xl hover-grow"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Farmers Choose CropKind
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Our AI-powered platform has helped millions of farmers worldwide improve their 
                productivity, reduce costs, and increase their income through smart farming practices.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="feature-card p-6 rounded-xl">
                  <Smartphone className="w-8 h-8 text-green-500 mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mobile First</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Works on any device, even with slow internet</p>
                </div>
                <div className="feature-card p-6 rounded-xl">
                  <Globe className="w-8 h-8 text-blue-500 mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Global Reach</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Available in 50+ languages worldwide</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="feature-card p-6 rounded-xl">
                  <Zap className="w-8 h-8 text-yellow-500 mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Get instant AI responses and diagnoses</p>
                </div>
                <div className="feature-card p-6 rounded-xl">
                  <Heart className="w-8 h-8 text-red-500 mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Connect with 10M+ farmers globally</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join thousands of farmers who are already using CropKind to grow better, 
            earn more, and build sustainable farming practices.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-all duration-200 flex items-center justify-center space-x-2 sparkle hover-grow"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center justify-center space-x-2 hover-grow"
            >
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">CropKind</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering farmers worldwide with AI-powered agricultural solutions. 
                Get personalized crop guidance, market insights, and expert support.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-green-400 transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-green-400 transition-colors">Pricing</Link></li>
                <li><Link to="/api" className="text-gray-400 hover:text-green-400 transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-green-400 transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-green-400 transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">© 2024 CropKind. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;