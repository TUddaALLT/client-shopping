import "./App.css";

import Home from "./components/Home.js";
import About from "./components/About.js";
import MyHeader from "./components/MyHeader.js";
import Admin from "./components/Admin.js";
import Buy from "./components/Buy.js";
import Login from "./components/Login.js";

import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./components/utils/NotFoundPage";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Order from "./components/Order";

function App() {
  return (
    <div>
      <MyHeader></MyHeader>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/buy/:id/*' element={<Buy />} />
        <Route path='/order/:totalPrice' element={<Order />} />
        {/* <Route path='/admin' element={<Admin />} /> */}
        {localStorage.getItem("admin") === "admin" && (
          <Route path='/admin' element={<Admin />} />
        )}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}
export default App;
