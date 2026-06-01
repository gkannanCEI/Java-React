import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cashier from "./pages/Cashier";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import MainLayout from "./components/MainLayout";


function App() {
  return (
      <Router>
        <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/products/edit/:id" element={<ProductForm />} />
                <Route path="/cashier" element={<Cashier />} />
              </Route>
            </Routes>
          </MainLayout>
      </Router>
  );
}

export default App;
