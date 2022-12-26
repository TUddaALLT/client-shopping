import "./App.css";

import Home from "./components/Home.js";
import About from "./components/About.js";
import MyHeader from "./components/MyHeader.js";
import Admin from "./components/Admin.js";
import Buy from "./components/Buy.js";
import Login from "./components/Login.js";

import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./components/utils/NotFoundPage";
function App() {
  return (
    <div>
      <MyHeader></MyHeader>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/buy/:id/*' element={<Buy />} />
        {/* <Route path='/admin' element={<Admin />} /> */}
        {localStorage.getItem("admin") === "admin" && (
          <Route path='/admin' element={<Admin />} />
        )}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
export default App;
