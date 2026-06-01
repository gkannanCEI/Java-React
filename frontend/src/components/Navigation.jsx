import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">Supermarket POS</Link>
        <div className="space-x-4 flex items-center">
          {user ? (
            <>
              <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium">Products</Link>
              <Link to="/cashier" className="text-gray-600 hover:text-blue-600 font-medium">Cashier</Link>
              <span className="text-sm text-gray-500 ml-4 border-l pl-4">Logged in as {user.username} ({user.role})</span>
              <button onClick={logout} className="text-red-500 hover:text-red-700 font-medium ml-4">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 font-medium">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded font-medium hover:bg-blue-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
