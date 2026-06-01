import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

function Navigation() {
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">Supermarket POS</Link>
        <div className="space-x-4 flex items-center">
          {user ? (
            <>
              <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium">Products</Link>
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navigation />
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={
                <div className="flex items-center justify-center h-full">
                  <h1 className="text-4xl font-bold text-gray-400 mt-20">Welcome to Supermarket POS</h1>
                </div>
              } />
              
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/products/edit/:id" element={<ProductForm />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
