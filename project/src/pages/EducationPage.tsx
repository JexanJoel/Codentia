import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookOpen, Play, Download, Clock, Users, Award, Star } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  thumbnail: string;
  lessons: number;
  category: string;
  instructor: string;
  price: number;
  isOffline: boolean;
}

const EducationPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Organic Farming Fundamentals',
      description: 'Learn the basics of organic farming, soil health, and sustainable practices',
      duration: '4 hours',
      level: 'Beginner',
      rating: 4.8,
      students: 1250,
      thumbnail: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=300',
      lessons: 12,
      category: 'Organic Farming',
      instructor: 'Dr. Raj Patel',
      price: 0,
      isOffline: true
    },
    {
      id: '2',
      title: 'Crop Disease Management',
      description: 'Identify and treat common crop diseases using integrated pest management',
      duration: '3 hours',
      level: 'Intermediate',
      rating: 4.6,
      students: 890,
      thumbnail: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300',
      lessons: 10,
      category: 'Plant Health',
      instructor: 'Dr. Priya Singh',
      price: 0,
      isOffline: true
    },
    {
      id: '3',
      title: 'Smart Irrigation Systems',
      description: 'Modern irrigation techniques for water conservation and efficiency',
      duration: '2.5 hours',
      level: 'Advanced',
      rating: 4.9,
      students: 650,
      thumbnail: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300',
      lessons: 8,
      category: 'Technology',
      instructor: 'Eng. Kumar Reddy',
      price: 0,
      isOffline: true
    },
    {
      id: '4',
      title: 'Soil Health & Nutrition',
      description: 'Understanding soil composition, testing, and nutrient management',
      duration: '3.5 hours',
      level: 'Beginner',
      rating: 4.7,
      students: 1100,
      thumbnail: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300',
      lessons: 11,
      category: 'Soil Science',
      instructor: 'Dr. Deepika Sharma',
      price: 0,
      isOffline: true
    },
    {
      id: '5',
      title: 'Farm Business Management',
      description: 'Financial planning, budgeting, and marketing strategies for farmers',
      duration: '5 hours',
      level: 'Intermediate',
      rating: 4.5,
      students: 780,
      thumbnail: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300',
      lessons: 15,
      category: 'Business',
      instructor: 'Prof. Mohan Joshi',
      price: 0,
      isOffline: true
    },
    {
      id: '6',
      title: 'Livestock Management',
      description: 'Cattle, poultry, and goat farming practices for better productivity',
      duration: '4.5 hours',
      level: 'Intermediate',
      rating: 4.8,
      students: 920,
      thumbnail: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300',
      lessons: 13,
      category: 'Animal Husbandry',
      instructor: 'Dr. Anita Gupta',
      price: 0,
      isOffline: true
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Organic Farming', label: 'Organic Farming' },
    { value: 'Plant Health', label: 'Plant Health' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Soil Science', label: 'Soil Science' },
    { value: 'Business', label: 'Business' },
    { value: 'Animal Husbandry', label: 'Animal Husbandry' }
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Center
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Enhance your farming skills with our comprehensive courses and training programs
          </p>
        </div>

        {/* Filters */}
        <div className="feature-card p-6 rounded-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                {levels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="feature-card rounded-2xl overflow-hidden hover-grow">
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                {course.isOffline && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium flex items-center space-x-1">
                      <Download className="w-3 h-3" />
                      <span>Offline</span>
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{course.category}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{course.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">Free</span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  By {course.instructor}
                </p>
                
                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Start Course</span>
                  </button>
                  {course.isOffline && (
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Tips */}
        <div className="feature-card p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Daily Farming Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">Today's Tip</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Water your plants early morning or late evening to reduce water loss through evaporation.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Weather Alert</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Heavy rains expected this week. Ensure proper drainage in your fields to prevent waterlogging.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Market Update</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Tomato prices are rising. Good time to harvest and sell if your crop is ready.
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="feature-card p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Earn Certifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Available Certifications
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span>Organic Farming Specialist</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span>Crop Disease Management Expert</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span>Smart Irrigation Technician</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span>Farm Business Manager</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Benefits
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Recognized by agricultural institutions</li>
                <li>• Improve your farming credibility</li>
                <li>• Access to exclusive resources</li>
                <li>• Better loan and subsidy eligibility</li>
                <li>• Connect with certified farmers network</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EducationPage;