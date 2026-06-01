import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full mt-20 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Supermarket POS</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-lg">
        Efficiently manage your inventory and sales with our modern Point of Sale system.
      </p>
      
      {!user ? (
        <div className="space-x-4">
          <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">
            Login
          </Link>
          <Link to="/register" className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-sm">
            Register
          </Link>
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/cashier" className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md">
            Go to Cashier
          </Link>
          <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">
            Manage Inventory
          </Link>
        </div>
      )}
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl px-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-blue-500 mb-3">
            <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <h3 className="font-bold text-gray-800">Inventory Tracking</h3>
          <p className="text-gray-500 text-sm mt-2">Real-time stock updates and barcode support.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-green-500 mb-3">
            <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 className="font-bold text-gray-800">Quick Checkout</h3>
          <p className="text-gray-500 text-sm mt-2">Streamlined cashier interface for faster sales.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-purple-500 mb-3">
            <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h3 className="font-bold text-gray-800">Secure Access</h3>
          <p className="text-gray-500 text-sm mt-2">Role-based permissions and JWT authentication.</p>
        </div>
      </div>
    </div>
  );
}
