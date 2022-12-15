import "./css/App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Profile from "./components/Profile.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
