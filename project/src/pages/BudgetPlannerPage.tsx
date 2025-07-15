import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { DollarSign, Plus, Minus, Calculator, TrendingUp, AlertCircle } from 'lucide-react';

interface BudgetItem {
  id: string;
  category: string;
  item: string;
  amount: number;
  type: 'income' | 'expense';
}

const BudgetPlannerPage: React.FC = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: '1', category: 'Seeds', item: 'Tomato seeds', amount: 200, type: 'expense' },
    { id: '2', category: 'Fertilizer', item: 'Organic fertilizer', amount: 500, type: 'expense' },
    { id: '3', category: 'Labor', item: 'Harvesting', amount: 800, type: 'expense' },
    { id: '4', category: 'Sales', item: 'Tomato harvest', amount: 3000, type: 'income' }
  ]);

  const [newItem, setNewItem] = useState({
    category: '',
    item: '',
    amount: 0,
    type: 'expense' as 'income' | 'expense'
  });

  const [selectedSeason, setSelectedSeason] = useState('current');

  const handleAddItem = () => {
    if (newItem.category && newItem.item && newItem.amount > 0) {
      setBudgetItems([
        ...budgetItems,
        {
          id: Date.now().toString(),
          ...newItem
        }
      ]);
      setNewItem({ category: '', item: '', amount: 0, type: 'expense' });
    }
  };

  const handleRemoveItem = (id: string) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
  };

  const totalIncome = budgetItems
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = budgetItems
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  const expenseCategories = budgetItems
    .filter(item => item.type === 'expense')
    .reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {} as Record<string, number>);

  const categories = ['Seeds', 'Fertilizer', 'Pesticides', 'Labor', 'Equipment', 'Irrigation', 'Transportation', 'Storage', 'Other'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Budget Planner
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track your farming costs and expected income to plan better and maximize profits
          </p>
        </div>

        {/* Season Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-4">
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="current">Current Season</option>
              <option value="next">Next Season</option>
              <option value="annual">Annual Budget</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Budget Summary */}
          <div className="lg:col-span-1">
            <div className="feature-card p-6 rounded-2xl mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Budget Summary
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 dark:text-green-200">Total Income</span>
                  </div>
                  <span className="text-green-600 font-semibold">${totalIncome.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Minus className="w-5 h-5 text-red-600" />
                    <span className="text-red-800 dark:text-red-200">Total Expenses</span>
                  </div>
                  <span className="text-red-600 font-semibold">${totalExpenses.toLocaleString()}</span>
                </div>

                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  netProfit >= 0 
                    ? 'bg-blue-50 dark:bg-blue-900/20' 
                    : 'bg-orange-50 dark:bg-orange-900/20'
                }`}>
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-blue-600" />
                    <span className={`${netProfit >= 0 ? 'text-blue-800 dark:text-blue-200' : 'text-orange-800 dark:text-orange-200'}`}>
                      Net {netProfit >= 0 ? 'Profit' : 'Loss'}
                    </span>
                  </div>
                  <span className={`font-semibold ${netProfit >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                    ${Math.abs(netProfit).toLocaleString()}
                  </span>
                </div>

                {netProfit < 0 && (
                  <div className="flex items-start space-x-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                        Budget Alert
                      </p>
                      <p className="text-yellow-700 dark:text-yellow-300 text-xs">
                        Your expenses exceed expected income. Consider reducing costs or increasing revenue.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Expense Breakdown */}
            <div className="feature-card p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Expense Breakdown
              </h3>
              <div className="space-y-3">
                {Object.entries(expenseCategories).map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{category}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      ${amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Budget Items */}
          <div className="lg:col-span-2">
            <div className="feature-card p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Budget Items
              </h2>

              {/* Add New Item */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white text-sm"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  
                  <input
                    type="text"
                    value={newItem.item}
                    onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
                    placeholder="Item description"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white text-sm"
                  />
                  
                  <input
                    type="number"
                    value={newItem.amount}
                    onChange={(e) => setNewItem({ ...newItem, amount: Number(e.target.value) })}
                    placeholder="Amount"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white text-sm"
                  />
                  
                  <div className="flex space-x-2">
                    <select
                      value={newItem.type}
                      onChange={(e) => setNewItem({ ...newItem, type: e.target.value as 'income' | 'expense' })}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white text-sm"
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                    <button
                      onClick={handleAddItem}
                      className="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {budgetItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                      item.type === 'income' 
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
                        : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {item.item}
                        </h4>
                        <span className={`text-lg font-semibold ${
                          item.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.type === 'income' ? '+' : '-'}${item.amount.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {item.category}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-4 p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {budgetItems.length === 0 && (
                <div className="text-center py-8">
                  <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">
                    No budget items added yet. Start by adding your expected income and expenses.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profit Analysis */}
        <div className="mt-8">
          <div className="feature-card p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Profit Analysis & Recommendations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Cost-Saving Opportunities
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Consider bulk purchasing of seeds and fertilizers</li>
                  <li>• Explore organic alternatives to reduce input costs</li>
                  <li>• Optimize irrigation to reduce water expenses</li>
                  <li>• Use labor-sharing with neighboring farmers</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Revenue Enhancement
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Direct selling to consumers for better prices</li>
                  <li>• Value-added processing (dried, pickled)</li>
                  <li>• Organic certification for premium pricing</li>
                  <li>• Explore contract farming opportunities</li>
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

export default BudgetPlannerPage;