import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Analytics: React.FC = () => {
  const { user } = useAuth();

  const farmerStats = [
    { label: 'Total Sales', value: '$12,450', change: '+18%', trend: 'up' },
    { label: 'Orders This Month', value: '87', change: '+12%', trend: 'up' },
    { label: 'Active Products', value: '23', change: '+3%', trend: 'up' },
    { label: 'Customer Rating', value: '4.8', change: '+0.2%', trend: 'up' }
  ];

  const buyerStats = [
    { label: 'Total Spent', value: '$1,250', change: '+25%', trend: 'up' },
    { label: 'Orders Placed', value: '15', change: '+5%', trend: 'up' },
    { label: 'Favorite Farmers', value: '8', change: '+2%', trend: 'up' },
    { label: 'Savings vs Retail', value: '22%', change: '+5%', trend: 'up' }
  ];

  const topProducts = user?.role === 'farmer' 
    ? [
        { name: 'Organic Tomatoes', sales: 45, revenue: '$675' },
        { name: 'Bell Peppers', sales: 32, revenue: '$480' },
        { name: 'Fresh Lettuce', sales: 28, revenue: '$420' },
        { name: 'Organic Carrots', sales: 25, revenue: '$375' }
      ]
    : [
        { name: 'Organic Tomatoes', orders: 8, spent: '$120' },
        { name: 'Fresh Apples', orders: 6, spent: '$90' },
        { name: 'Bell Peppers', orders: 4, spent: '$85' },
        { name: 'Organic Spinach', orders: 3, spent: '$65' }
      ];

  const stats = user?.role === 'farmer' ? farmerStats : buyerStats;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">
          {user?.role === 'farmer' 
            ? 'Track your sales performance and customer insights'
            : 'Monitor your purchasing patterns and savings'}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
              <div className={`flex items-center text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.role === 'farmer' ? 'Sales Trend' : 'Spending Trend'}
              </h2>
            </div>
          </div>
          
          <div className="p-6">
            {/* Simulated chart area */}
            <div className="h-64 bg-gradient-to-t from-green-50 to-transparent rounded-lg flex items-end justify-between p-4">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className="bg-green-500 rounded-t w-8 mb-2"
                    style={{ height: `${Math.random() * 150 + 50}px` }}
                  ></div>
                  <span className="text-xs text-gray-500">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {user?.role === 'farmer' 
                  ? 'Weekly sales showing consistent growth'
                  : 'Your weekly spending on fresh produce'}
              </p>
            </div>
          </div>
        </div>

        {/* Top Products/Purchases */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <ShoppingBag className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.role === 'farmer' ? 'Top Selling Products' : 'Most Purchased Items'}
              </h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-green-700">#{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {user?.role === 'farmer' 
                          ? `${item.sales} units sold`
                          : `${item.orders} orders placed`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {user?.role === 'farmer' ? item.revenue : item.spent}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="h-6 w-6 text-orange-600 mr-3" />
          {user?.role === 'farmer' ? 'Customer Insights' : 'Farmer Relationships'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {user?.role === 'farmer' ? '47' : '12'}
            </div>
            <p className="text-sm text-blue-700">
              {user?.role === 'farmer' ? 'Active Customers' : 'Trusted Farmers'}
            </p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {user?.role === 'farmer' ? '92%' : '4.9'}
            </div>
            <p className="text-sm text-green-700">
              {user?.role === 'farmer' ? 'Satisfaction Rate' : 'Average Rating'}
            </p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {user?.role === 'farmer' ? '15%' : '$280'}
            </div>
            <p className="text-sm text-purple-700">
              {user?.role === 'farmer' ? 'Repeat Customer Rate' : 'Monthly Average'}
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">
                {user?.role === 'farmer' ? 'Seasonal Recommendation' : 'Seasonal Tip'}
              </h4>
              <p className="text-sm text-yellow-700 mt-1">
                {user?.role === 'farmer' 
                  ? 'Consider expanding your winter vegetable selection. Root vegetables and leafy greens are in high demand during colder months.'
                  : 'Winter is perfect for root vegetables and preserved goods. Stock up on seasonal produce for better prices and fresher options.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;