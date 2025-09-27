import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../contexts/CartContext';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload,
  Leaf,
  Package,
  DollarSign,
  MapPin
} from 'lucide-react';

const ProductManagement: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Organic Tomatoes',
      price: 4.50,
      unit: 'kg',
      category: 'Vegetables',
      farmer: user?.name || 'John Farmer',
      farmerLocation: user?.location || 'California',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
      description: 'Fresh, juicy organic tomatoes perfect for salads and cooking. Grown without pesticides.',
      stock: 50,
      organic: true
    },
    {
      id: '2',
      name: 'Bell Peppers',
      price: 6.20,
      unit: 'kg',
      category: 'Vegetables',
      farmer: user?.name || 'John Farmer',
      farmerLocation: user?.location || 'California',
      image: 'https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg',
      description: 'Colorful bell peppers in red, yellow, and green. Sweet and crunchy, great for cooking.',
      stock: 25,
      organic: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: 'kg',
    category: 'Vegetables',
    description: '',
    stock: '',
    organic: false,
    image: ''
  });

  const categories = ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Herbs', 'Nuts'];
  const units = ['kg', 'lb', 'piece', 'bunch', 'liter', 'dozen'];

  const sampleImages = [
    'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
    'https://images.pexels.com/photos/1352199/pexels-photo-1352199.jpeg',
    'https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg',
    'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg',
    'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
    'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg'
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      unit: 'kg',
      category: 'Vegetables',
      description: '',
      stock: '',
      organic: false,
      image: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      unit: formData.unit,
      category: formData.category,
      farmer: user?.name || 'Farmer',
      farmerLocation: user?.location || 'Location',
      image: formData.image || sampleImages[Math.floor(Math.random() * sampleImages.length)],
      description: formData.description,
      stock: parseInt(formData.stock),
      organic: formData.organic
    };

    setProducts(prev => [...prev, newProduct]);
    resetForm();
    setShowAddForm(false);
  };

  const handleEditProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        unit: product.unit,
        category: product.category,
        description: product.description,
        stock: product.stock.toString(),
        organic: product.organic,
        image: product.image
      });
      setEditingProduct(productId);
    }
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    setProducts(prev => prev.map(product => 
      product.id === editingProduct 
        ? {
            ...product,
            name: formData.name,
            price: parseFloat(formData.price),
            unit: formData.unit,
            category: formData.category,
            description: formData.description,
            stock: parseInt(formData.stock),
            organic: formData.organic,
            image: formData.image || product.image
          }
        : product
    ));
    
    resetForm();
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleCancel = () => {
    resetForm();
    setShowAddForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
            <p className="text-gray-600">Manage your agricultural products and inventory</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Product
          </button>
        </div>
      </div>

      {/* Add/Edit Product Form */}
      {(showAddForm || editingProduct) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., Organic Tomatoes"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      id="price"
                      name="price"
                      required
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                    Unit *
                  </label>
                  <select
                    id="unit"
                    name="unit"
                    required
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      required
                      min="0"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty for random sample image</p>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Describe your product, growing methods, quality, etc."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="organic"
                  name="organic"
                  checked={formData.organic}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="organic" className="ml-2 block text-sm text-gray-700 flex items-center">
                  <Leaf className="h-4 w-4 mr-1 text-green-600" />
                  Organic Product
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
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
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                  title="Edit product"
                >
                  <Edit className="h-3 w-3 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                  title="Delete product"
                >
                  <Trash2 className="h-3 w-3 text-red-600" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {product.farmerLocation}
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
                  {product.stock} {product.unit} in stock
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors"
                  title="Delete product"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-500 mb-6">Start by adding your first product to the marketplace.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <Plus className="h-5 w-5" />
            Add Your First Product
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;