import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken"); 

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <nav>
        <div className="navbar-logo">
          <Link to="/" className="navbar-brand">Reserva Restaurante</Link>
        </div>
        <div className="navbar-links">
          {authToken ? (
            <>
              <Link to="/reservations">Reservas</Link>
              <button onClick={logout} className="navbar-link-btn">Sair</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Registrar</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;