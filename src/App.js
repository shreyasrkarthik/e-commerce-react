import React, { useEffect, useState } from "react";

import "./css/App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile.js";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    console.log("Is user authenticated", authenticated)

    // useEffect(() => {
    //     if (window.localStorage.getItem("user")) {
    //         setAuthenticated(true);
    //         navigate("/home");
    //     }
    // }, [navigate]);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
}

export default App;