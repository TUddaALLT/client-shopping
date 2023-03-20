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
import Order from "./components/Order";
import MyCart from "./components/MyCart";
import Cart from "./components/Cart";

function App() {
  return (
    <div>
      <MyHeader></MyHeader>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<MyCart />} />
        <Route path='/buy/:id/*' element={<Buy />} />
        <Route path='/order' element={<Order />} />

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
