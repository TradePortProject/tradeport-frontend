import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductMaster } from "./pages/Product";
import { ThankYouPage } from "./pages/ThankYouPage";
import { ProductDetail } from './pages/ProductDetail';
import Home from "./pages/Home";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";

import CatalogGrid from "./components/CatalogGrid";
import { ShoppingPage } from "./pages/ShoppingPage";



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogGrid" element={<CatalogGrid />} />
        <Route path="/product" element={<ProductMaster />} />
        <Route path="/productdetail/:productID" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/catalogGrid" element={<CatalogGrid />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart/:productID" element={<ShoppingPage/>} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
