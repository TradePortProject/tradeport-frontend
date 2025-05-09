import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductMaster } from "./pages/Product";
import { ThankYouPage } from "./pages/ThankYouPage";
import { ProductDetail } from "./pages/ProductDetail";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import RegisterForm from "./pages/RegisterForm";
import CatalogGrid from "./components/CatalogGrid";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";

import RoleBasedRoute from "./routes/RoleBasedRoute";
import RetailerDashboard from "./pages/RetailerDashboard";
import WholesalerDashboard from "./pages/WholesalerDashboard";
import { ShoppingPage } from "./pages/ShoppingPage";
import Orders from "./pages/Orders";
import { ContactInfoPage } from "./pages/ContactInfoPage";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/catalogGrid" element={<CatalogGrid />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/cart" element={<ShoppingPage />} />
        <Route path="/product" element={<ProductMaster />} />
        <Route path="/productdetail/:productID" element={<ProductDetail />} />
        <Route path="/Contact" element={<ContactInfoPage />} />

        {/* Protected Routes (Only Authenticated Users) */}
          <Route element={<ProtectedRoute />}>   
          <Route path="/profile" element={<Profile />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/orders" element={<Orders />} />
        </Route>

        {/* Role-Based Routes */}
        <Route element={<RoleBasedRoute allowedRoles={["retailer"]} />}>
          <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
        </Route>

        <Route element={<RoleBasedRoute allowedRoles={["wholesaler"]} />}>
          <Route
            path="/wholesaler-dashboard"
            element={<WholesalerDashboard />}
          />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
