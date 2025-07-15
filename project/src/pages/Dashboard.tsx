import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  MessageCircle, 
  Camera, 
  TrendingUp, 
  CloudRain, 
  Users, 
  BookOpen,
  MapPin,
  Leaf,
  DollarSign,
  Calendar,
  Bell,
  Settings,
  BarChart,
  Droplets,
  Shield,
  Smartphone,
  ChevronRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    { icon: MessageCircle, title: 'AI Assistant', description: 'Ask farming questions', href: '/chatbot', color: 'blue' },
    { icon: Camera, title: 'Crop Diagnosis', description: 'Identify diseases', href: '/photo-upload', color: 'purple' },
    { icon: TrendingUp, title: 'Market Prices', description: 'Check current rates', href: '/market-prices', color: 'green' },
    { icon: CloudRain, title: 'Weather', description: 'Get forecasts', href: '/weather', color: 'cyan' },
    { icon: Users, title: 'Community', description: 'Connect with farmers', href: '/community', color: 'orange' },
    { icon: BookOpen, title: 'Learn', description: 'Educational resources', href: '/education', color: 'indigo' }
  ];

  const features = [
    { icon: Leaf, title: 'Crop Planning', description: 'Personalized recommendations', href: '/crop-planning' },
    { icon: DollarSign, title: 'Budget Planner', description: 'Track costs and profits', href: '/budget-planner' },
    { icon: Calendar, title: 'Crop Tracker', description: 'Monitor growth progress', href: '/crop-tracker' },
    { icon: Bell, title: 'Alerts', description: 'Important notifications', href: '/alerts' },
    { icon: BarChart, title: 'Marketplace', description: 'Sell your produce', href: '/marketplace' },
    { icon: Droplets, title: 'Irrigation', description: 'Water management', href: '/irrigation' },
    { icon: Shield, title: 'Legal Support', description: 'Land and legal help', href: '/legal-support' },
    { icon: Settings, title: 'Government Schemes', description: 'Access subsidies', href: '/government-schemes' }
  ];

  const stats = [
    { label: 'Crops Monitored', value: '3', color: 'text-green-600' },
    { label: 'Diagnoses Done', value: '12', color: 'text-blue-600' },
    { label: 'Community Posts', value: '8', color: 'text-purple-600' },
    { label: 'Courses Completed', value: '2', color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-green-100 mb-4">
                {user?.location && (
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {user.location}
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                {user?.cropType && (
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    🌾 {user.cropType}
                  </span>
                )}
                {user?.landSize && (
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    📏 {user.landSize}
                  </span>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Leaf className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="feature-card p-4 rounded-lg">
              <div className="text-center">
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                purple: 'from-purple-500 to-purple-600',
                green: 'from-green-500 to-green-600',
                cyan: 'from-cyan-500 to-cyan-600',
                orange: 'from-orange-500 to-orange-600',
                indigo: 'from-indigo-500 to-indigo-600'
              };
              
              return (
                <Link
                  key={index}
                  to={action.href}
                  className="feature-card p-6 rounded-xl hover-grow group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[action.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {action.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* All Features */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">All Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.href}
                  className="feature-card p-4 rounded-lg hover-grow group flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="feature-card p-6 rounded-xl">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Diagnosed tomato blight disease</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Asked about fertilizer timing</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Checked market prices for wheat</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;