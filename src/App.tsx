import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductMaster } from "./pages/Product";
import { ThankYouPage } from "./pages/ThankYouPage";
import { ProductDetail } from "./pages/ProductDetail";
import Home from "./pages/Home";
import Error from "./pages/Error";
// import Navbar from "./components/Navbar";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import ShoppingCart from "./pages/ShoppingCart";
import CatalogGrid from "./components/CatalogGrid";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/catalogGrid" element={<CatalogGrid />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/product" element={<ProductMaster />} />
          <Route path="/productdetail/:productID" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />{" "}
          <Route path="/profile" element={<Profile />} />{" "}
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
