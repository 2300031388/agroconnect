import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Leaf, 
  DollarSign,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const guidelines = {
    farmer: [
      {
        title: "Product Quality Standards",
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        description: "Ensure all products meet organic and quality standards. Provide clear descriptions and accurate information about your produce.",
        tips: ["Use high-quality photos", "Be honest about product condition", "Specify organic certification if applicable"]
      },
      {
        title: "Fair Pricing Guidelines",
        icon: <DollarSign className="h-5 w-5 text-blue-600" />,
        description: "Set competitive prices based on market trends. Consider quality, seasonality, and transportation costs.",
        tips: ["Research market prices", "Factor in production costs", "Offer bulk discounts when possible"]
      },
      {
        title: "Communication Best Practices",
        icon: <Users className="h-5 w-5 text-purple-600" />,
        description: "Maintain clear and prompt communication with buyers. Respond to inquiries within 24 hours.",
        tips: ["Be responsive to messages", "Provide delivery updates", "Handle complaints professionally"]
      },
      {
        title: "Sustainability Focus",
        icon: <Leaf className="h-5 w-5 text-green-500" />,
        description: "Promote sustainable farming practices and environmentally friendly packaging.",
        tips: ["Use eco-friendly packaging", "Highlight sustainable practices", "Reduce food waste"]
      }
    ],
    buyer: [
      {
        title: "Smart Shopping Tips",
        icon: <ShoppingCart className="h-5 w-5 text-blue-600" />,
        description: "Make informed purchasing decisions by comparing prices, quality, and farmer ratings.",
        tips: ["Compare multiple sellers", "Read product descriptions carefully", "Check farmer reviews and ratings"]
      },
      {
        title: "Quality Assessment",
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        description: "Learn to identify fresh, quality produce and understand seasonal availability.",
        tips: ["Know seasonal products", "Understand quality indicators", "Ask questions about freshness"]
      },
      {
        title: "Supporting Local Farmers",
        icon: <Users className="h-5 w-5 text-purple-600" />,
        description: "Build relationships with local farmers and support sustainable agriculture practices.",
        tips: ["Buy from local farmers", "Provide feedback on products", "Recommend good farmers to others"]
      },
      {
        title: "Order Management",
        icon: <Info className="h-5 w-5 text-orange-600" />,
        description: "Track your orders and communicate any issues promptly with farmers.",
        tips: ["Keep track of delivery dates", "Inspect products upon delivery", "Report issues immediately"]
      }
    ]
  };

  const marketTrends = [
    { product: "Organic Tomatoes", trend: "up", price: "$4.50/kg", change: "+12%" },
    { product: "Fresh Lettuce", trend: "down", price: "$2.80/kg", change: "-5%" },
    { product: "Bell Peppers", trend: "up", price: "$6.20/kg", change: "+8%" },
    { product: "Organic Carrots", trend: "stable", price: "$3.10/kg", change: "0%" }
  ];

  const currentGuidelines = user?.role === 'farmer' ? guidelines.farmer : guidelines.buyer;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-gray-600">
          {user?.role === 'farmer' 
            ? "Manage your products and connect with buyers" 
            : "Discover fresh produce from local farmers"}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 mr-4">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active {user?.role === 'farmer' ? 'Products' : 'Orders'}</p>
              <p className="text-2xl font-bold text-gray-900">{user?.role === 'farmer' ? '23' : '5'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 mr-4">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{user?.role === 'farmer' ? 'Revenue' : 'Total Spent'}</p>
              <p className="text-2xl font-bold text-gray-900">{user?.role === 'farmer' ? '$2,450' : '$320'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100 mr-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{user?.role === 'farmer' ? 'Customers' : 'Farmers'}</p>
              <p className="text-2xl font-bold text-gray-900">{user?.role === 'farmer' ? '47' : '12'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-100 mr-4">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Growth</p>
              <p className="text-2xl font-bold text-gray-900">+18%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Guidelines Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.role === 'farmer' ? 'Farmer Guidelines' : 'Buyer Guidelines'}
              </h2>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {currentGuidelines.map((guideline, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    {guideline.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {guideline.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {guideline.description}
                    </p>
                    <div className="space-y-1">
                      {guideline.tips.map((tip, tipIndex) => (
                        <div key={tipIndex} className="flex items-center text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Market Trends</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {marketTrends.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.product}</h3>
                      <p className="text-sm text-gray-500">{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.trend === 'up' 
                        ? 'bg-green-100 text-green-800' 
                        : item.trend === 'down'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Market Insight</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Organic produce is showing strong demand this season. 
                    {user?.role === 'farmer' 
                      ? ' Consider highlighting organic certifications to maximize sales.'
                      : ' Great time to stock up on organic vegetables at competitive prices.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;