import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Bell, AlertTriangle, Info, CheckCircle, X, Settings } from 'lucide-react';

interface Alert {
  id: string;
  type: 'weather' | 'market' | 'disease' | 'government' | 'irrigation';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
}

const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'weather',
      priority: 'critical',
      title: 'Heavy Rain Alert',
      message: 'Heavy rainfall (50-80mm) expected in the next 24 hours. Secure your crops and ensure proper drainage.',
      timestamp: '2024-01-20T08:00:00',
      isRead: false,
      actionRequired: true
    },
    {
      id: '2',
      type: 'market',
      priority: 'high',
      title: 'Tomato Price Surge',
      message: 'Tomato prices increased by 25% in local markets. Good time to sell if your crop is ready.',
      timestamp: '2024-01-20T06:30:00',
      isRead: false,
      actionRequired: true
    },
    {
      id: '3',
      type: 'disease',
      priority: 'high',
      title: 'Pest Outbreak Warning',
      message: 'Aphid infestation reported in nearby farms. Check your crops and apply preventive measures.',
      timestamp: '2024-01-19T18:00:00',
      isRead: true,
      actionRequired: true
    },
    {
      id: '4',
      type: 'government',
      priority: 'medium',
      title: 'Subsidy Application Deadline',
      message: 'Last date to apply for organic farming subsidy is January 31st. Submit your application soon.',
      timestamp: '2024-01-19T10:00:00',
      isRead: true,
      actionRequired: true
    },
    {
      id: '5',
      type: 'irrigation',
      priority: 'medium',
      title: 'Water Level Alert',
      message: 'Soil moisture in Field A is below optimal level. Consider irrigation within next 12 hours.',
      timestamp: '2024-01-19T07:00:00',
      isRead: false,
      actionRequired: true
    },
    {
      id: '6',
      type: 'weather',
      priority: 'low',
      title: 'Temperature Rise',
      message: 'Temperature expected to rise to 35°C tomorrow. Monitor crops for heat stress.',
      timestamp: '2024-01-18T20:00:00',
      isRead: true,
      actionRequired: false
    }
  ]);

  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showSettings, setShowSettings] = useState(false);

  const alertTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'weather', label: 'Weather' },
    { value: 'market', label: 'Market' },
    { value: 'disease', label: 'Disease/Pest' },
    { value: 'government', label: 'Government' },
    { value: 'irrigation', label: 'Irrigation' }
  ];

  const priorities = [
    { value: 'all', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesType = selectedType === 'all' || alert.type === selectedType;
    const matchesPriority = selectedPriority === 'all' || alert.priority === selectedPriority;
    return matchesType && matchesPriority;
  });

  const unreadCount = alerts.filter(alert => !alert.isRead).length;
  const criticalCount = alerts.filter(alert => alert.priority === 'critical').length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-200 dark:border-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weather': return '🌦️';
      case 'market': return '📈';
      case 'disease': return '🐛';
      case 'government': return '🏛️';
      case 'irrigation': return '💧';
      default: return '📢';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      case 'medium': return <Info className="w-5 h-5" />;
      case 'low': return <Info className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, isRead: true })));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Alerts & Notifications
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Stay informed about important updates affecting your farming operations
          </p>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="feature-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Alerts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{alerts.length}</p>
              </div>
            </div>
          </div>

          <div className="feature-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Unread</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{unreadCount}</p>
              </div>
            </div>
          </div>

          <div className="feature-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Critical</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{criticalCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="feature-card p-6 rounded-2xl mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                {alertTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                {priorities.map(priority => (
                  <option key={priority.value} value={priority.value}>{priority.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                Mark All Read
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="feature-card p-6 rounded-2xl mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Notification Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Alert Types</h3>
                <div className="space-y-2">
                  {alertTypes.slice(1).map(type => (
                    <label key={type.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Delivery Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">In-app notifications</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">SMS alerts</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Email notifications</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Voice calls (critical only)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`feature-card p-6 rounded-2xl border-l-4 ${getPriorityColor(alert.priority)} ${
                !alert.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="text-2xl">{getTypeIcon(alert.type)}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className={`text-lg font-semibold ${!alert.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        {alert.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getPriorityColor(alert.priority)}`}>
                        {getPriorityIcon(alert.priority)}
                        <span className="capitalize">{alert.priority}</span>
                      </span>
                      {!alert.isRead && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {alert.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                      
                      {alert.actionRequired && (
                        <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-md text-xs font-medium">
                          Action Required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {!alert.isRead && (
                    <button
                      onClick={() => markAsRead(alert.id)}
                      className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors"
                      title="Mark as read"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    title="Dismiss alert"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {alert.actionRequired && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 text-sm">
                      Take Action
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                      Learn More
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No alerts found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your filters or check back later
            </p>
          </div>
        )}

        {/* Alert Statistics */}
        <div className="mt-8">
          <div className="feature-card p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Alert Insights
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Most Common Alerts
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Weather warnings (35%)</li>
                  <li>• Market price changes (25%)</li>
                  <li>• Irrigation reminders (20%)</li>
                  <li>• Disease/pest alerts (15%)</li>
                  <li>• Government updates (5%)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Response Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Act quickly on critical weather alerts</li>
                  <li>• Monitor market trends for selling decisions</li>
                  <li>• Set up automated irrigation responses</li>
                  <li>• Keep pest control supplies ready</li>
                  <li>• Stay updated on government schemes</li>
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

export default AlertsPage;