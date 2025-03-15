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

import CatalogGrid from "./components/CatalogGrid";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";

import RoleBasedRoute from "./routes/RoleBasedRoute";
import RetailerDashboard from "./pages/RetailerDashboard";
import WholesalerDashboard from "./pages/WholesalerDashboard";
import { ShoppingPage } from "./pages/ShoppingPage";



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

        {/* Protected Routes (Only Authenticated Users) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/product" element={<ProductMaster />} />
          <Route path="/productdetail/:productID" element={<ProductDetail />} />
          <Route path="/cart/:retailerID" element={<ShoppingPage/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
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
