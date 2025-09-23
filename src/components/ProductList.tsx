import React, { useState } from 'react';
import { useCart, Product } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, Plus, Star, MapPin, Leaf, Filter, Search } from 'lucide-react';
import ProductManagement from './ProductManagement';

const ProductList: React.FC = () => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Demo products
  const products: Product[] = [
    {
      id: '1',
      name: 'Organic Tomatoes',
      price: 4.50,
      unit: 'kg',
      category: 'Vegetables',
      farmer: 'Green Valley Farm',
      farmerLocation: 'California',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
      description: 'Fresh, juicy organic tomatoes perfect for salads and cooking. Grown without pesticides.',
      stock: 50,
      organic: true
    },
    {
      id: '2',
      name: 'Fresh Lettuce',
      price: 2.80,
      unit: 'kg',
      category: 'Vegetables',
      farmer: 'Sunny Acres',
      farmerLocation: 'Oregon',
      image: 'https://images.pexels.com/photos/1352199/pexels-photo-1352199.jpeg',
      description: 'Crisp and fresh lettuce, perfect for salads. Harvested daily for maximum freshness.',
      stock: 30,
      organic: false
    },
    {
      id: '3',
      name: 'Bell Peppers',
      price: 6.20,
      unit: 'kg',
      category: 'Vegetables',
      farmer: 'Rainbow Farms',
      farmerLocation: 'Florida',
      image: 'https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg',
      description: 'Colorful bell peppers in red, yellow, and green. Sweet and crunchy, great for cooking.',
      stock: 25,
      organic: true
    },
    {
      id: '4',
      name: 'Organic Carrots',
      price: 3.10,
      unit: 'kg',
      category: 'Vegetables',
      farmer: 'Earth Grown',
      farmerLocation: 'Colorado',
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg',
      description: 'Sweet, crunchy organic carrots. Rich in beta-carotene and perfect for snacking or cooking.',
      stock: 40,
      organic: true
    },
    {
      id: '5',
      name: 'Fresh Apples',
      price: 5.80,
      unit: 'kg',
      category: 'Fruits',
      farmer: 'Orchard Hills',
      farmerLocation: 'Washington',
      image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
      description: 'Crisp and sweet apples, freshly picked from our orchard. Multiple varieties available.',
      stock: 60,
      organic: false
    },
    {
      id: '6',
      name: 'Organic Spinach',
      price: 4.20,
      unit: 'kg',
      category: 'Vegetables',
      farmer: 'Green Leaf Co.',
      farmerLocation: 'New York',
      image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg',
      description: 'Fresh organic spinach leaves, packed with nutrients. Perfect for salads and smoothies.',
      stock: 35,
      organic: true
    }
  ];

  const categories = ['all', 'Vegetables', 'Fruits', 'Grains', 'Dairy'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  if (user?.role === 'farmer') {
    return <ProductManagement />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Fresh Produce Marketplace</h1>
        <p className="text-gray-600">Discover fresh, quality produce directly from local farmers</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products or farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                <span className="ml-2 text-sm text-gray-700">Organic Only</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                <span className="ml-2 text-sm text-gray-700">Local Farmers</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.organic && (
                <div className="absolute top-2 left-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Leaf className="h-3 w-3 mr-1" />
                  Organic
                </div>
              )}
              <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-700 flex items-center">
                <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                4.8
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {product.farmer}, {product.farmerLocation}
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl font-bold text-green-600">
                  ${product.price}
                  <span className="text-sm font-normal text-gray-500">/{product.unit}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {product.stock} {product.unit} available
                </div>
              </div>
              
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          <p className="text-gray-400 mt-2">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;