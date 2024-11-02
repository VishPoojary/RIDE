// import React from "react";
// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Main/Navbar";
// import Home from "./components/Main/Home";
// import Login from "./components/Main/Login";
// import Register from "./components/Main/Register";
// import Profile from "./components/User/Profile";
// import Ride from "./components/User/Ride";
// import RideSearch from "./components/User/RideSearch";


// function App() {
//     return (
//         <div>
//             <BrowserRouter>
//                 <Navbar/>
//                 <Routes>
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/register" element={<Register />} />
//                     <Route path="/ride" element={<Ride />}></Route>
//                     <Route path="/profile" element={<Profile />}></Route>
//                     <Route path="/search" element={<RideSearch />}></Route>
//                     <Route path="/" element={<Home />} />
//                 </Routes>
//             </BrowserRouter>
//         </div>
//     );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Main/Navbar';
import Home from './components/Main/Home';
import Register from './components/Main/Register';
import Login from './components/Main/Login';
import Profile from './components/User/Profile';
import Ride from './components/User/Ride';
import { getProfile } from './api';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                setUser(res.data);
                setIsAuthenticated(true);
            } catch (err) {
                console.error(err);
            }
        };

        if (localStorage.getItem('token')) {
            fetchProfile();
        }
    }, []);

    console.log("user from app",user);

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                {isAuthenticated && (
                    <>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/ride" element={<Ride user={user} />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default App;
