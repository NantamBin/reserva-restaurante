import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import Reservations from './pages/Reservation/Reservation';
import Navbar from './components/Navbar/Navbar';

function App() {
    const isAuthenticated = !!localStorage.getItem('authToken');

    return (
        <BrowserRouter>
            {isAuthenticated && <Navbar />}

            <Routes>
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/reservations" /> : <Login />}
                />
                <Route
                    path="/register"
                    element={isAuthenticated ? <Navigate to="/reservations" /> : <Register />}
                />

                <Route
                    path="/reservations"
                    element={isAuthenticated ? <Reservations /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;