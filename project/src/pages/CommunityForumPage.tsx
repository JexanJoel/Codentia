import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Users, MessageSquare, ThumbsUp, Reply, Plus, Search, Filter } from 'lucide-react';

interface Post {
  id: string;
  author: string;
  avatar: string;
  location: string;
  title: string;
  content: string;
  category: string;
  timestamp: string;
  likes: number;
  replies: number;
  isLiked: boolean;
  tags: string[];
}

const CommunityForumPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Raj Patel',
      avatar: 'RP',
      location: 'Gujarat, India',
      title: 'Best time to plant cotton in Gujarat?',
      content: 'Planning to plant cotton this season. What would be the ideal time considering the monsoon patterns? Also, which variety would be best for our soil conditions?',
      category: 'Crop Planning',
      timestamp: '2 hours ago',
      likes: 15,
      replies: 8,
      isLiked: false,
      tags: ['cotton', 'planting', 'gujarat', 'monsoon']
    },
    {
      id: '2',
      author: 'Priya Singh',
      avatar: 'PS',
      location: 'Punjab, India',
      title: 'Organic pesticide for aphids - Success story!',
      content: 'I successfully controlled aphids using neem oil and soap solution. Mixed 2 tbsp neem oil + 1 tsp liquid soap in 1 liter water. Sprayed in evening for 3 days. 90% reduction in aphid population!',
      category: 'Pest Control',
      timestamp: '5 hours ago',
      likes: 32,
      replies: 12,
      isLiked: true,
      tags: ['organic', 'aphids', 'neem', 'success']
    },
    {
      id: '3',
      author: 'Kumar Reddy',
      avatar: 'KR',
      location: 'Andhra Pradesh, India',
      title: 'Drip irrigation setup - Need advice',
      content: 'Setting up drip irrigation for 5 acres. What should be the spacing for tomatoes? Also, which brand would you recommend for good quality and durability?',
      category: 'Irrigation',
      timestamp: '1 day ago',
      likes: 18,
      replies: 15,
      isLiked: false,
      tags: ['drip irrigation', 'tomatoes', 'spacing', 'equipment']
    },
    {
      id: '4',
      author: 'Deepika Sharma',
      avatar: 'DS',
      location: 'Haryana, India',
      title: 'Market prices for wheat - Where to sell?',
      content: 'Harvested 50 quintals of wheat. Current mandi rate is ₹2100/quintal. Should I sell now or wait? Also, heard about direct selling apps - any recommendations?',
      category: 'Market & Sales',
      timestamp: '1 day ago',
      likes: 25,
      replies: 20,
      isLiked: true,
      tags: ['wheat', 'market price', 'selling', 'mandi']
    },
    {
      id: '5',
      author: 'Mohan Joshi',
      avatar: 'MJ',
      location: 'Maharashtra, India',
      title: 'Soil testing results - Need interpretation',
      content: 'Got my soil test report. pH is 6.2, N is low, P is medium, K is high. Growing sugarcane. What fertilizer combination would you suggest? Attaching report image.',
      category: 'Soil & Fertilizer',
      timestamp: '2 days ago',
      likes: 12,
      replies: 7,
      isLiked: false,
      tags: ['soil testing', 'fertilizer', 'sugarcane', 'pH']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const categories = [
    { value: 'all', label: 'All Posts' },
    { value: 'Crop Planning', label: 'Crop Planning' },
    { value: 'Pest Control', label: 'Pest Control' },
    { value: 'Irrigation', label: 'Irrigation' },
    { value: 'Market & Sales', label: 'Market & Sales' },
    { value: 'Soil & Fertilizer', label: 'Soil & Fertilizer' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Crop Planning': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Pest Control': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Irrigation': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Market & Sales': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Soil & Fertilizer': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Community Forum
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Connect with fellow farmers, share experiences, and get advice from the community
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
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
          
          <button
            onClick={() => setShowNewPost(!showNewPost)}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Post</span>
          </button>
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <div className="feature-card p-6 rounded-2xl mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Create New Post
            </h2>
            
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Post title..."
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
                <textarea
                  placeholder="Write your post content..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200">
                  Post
                </button>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="feature-card p-6 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {post.avatar}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{post.author}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{post.location} • {post.timestamp}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h4>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.content}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                        post.isLiked 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <Reply className="w-4 h-4" />
                      <span className="text-sm">{post.replies}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or category filter
            </p>
          </div>
        )}

        {/* Community Guidelines */}
        <div className="mt-8">
          <div className="feature-card p-6 rounded-2xl">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Community Guidelines
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  What to Post
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Farming questions and experiences</li>
                  <li>• Success stories and tips</li>
                  <li>• Crop and livestock advice</li>
                  <li>• Market information and trends</li>
                  <li>• Equipment recommendations</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Community Rules
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Be respectful and helpful</li>
                  <li>• Share accurate information</li>
                  <li>• No spam or promotional content</li>
                  <li>• Use appropriate language</li>
                  <li>• Stay on topic</li>
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

export default CommunityForumPage;