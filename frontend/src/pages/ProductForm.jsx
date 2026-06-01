import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProduct, updateProduct } from '../services/productService';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [product, setProduct] = useState({
    name: '',
    barcode: '',
    category: '',
    price: '',
    stockQuantity: ''
  });

  useEffect(() => {
    if (isEdit) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await getProduct(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProduct(id, product);
      } else {
        await createProduct(product);
      }
      navigate('/products');
    } catch (error) {
      console.error('Failed to save product', error);
      alert('Error saving product');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Product Name *</label>
            <input required type="text" name="name" value={product.name} onChange={handleChange} 
                   className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                   placeholder="e.g. Organic Milk" />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Barcode</label>
            <input type="text" name="barcode" value={product.barcode} onChange={handleChange} 
                   className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                   placeholder="e.g. 123456789012" />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category *</label>
            <input required type="text" name="category" value={product.category} onChange={handleChange} 
                   className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                   placeholder="e.g. Dairy" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Price ($) *</label>
              <input required type="number" step="0.01" min="0" name="price" value={product.price} onChange={handleChange} 
                     className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                     placeholder="0.00" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Stock Quantity *</label>
              <input required type="number" min="0" name="stockQuantity" value={product.stockQuantity} onChange={handleChange} 
                     className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                     placeholder="0" />
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button type="button" onClick={() => navigate('/products')} 
                    className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-2 px-4 rounded focus:outline-none">
              Cancel
            </button>
            <button type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              {isEdit ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}