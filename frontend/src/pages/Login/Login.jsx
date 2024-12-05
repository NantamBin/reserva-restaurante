import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService"; 
import { Link } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await authService.login(email, password);
      
      localStorage.setItem("token", response.token); 
      navigate("/reservations"); 
    } catch (error) {
      setErrorMessage("Email ou senha inválidos.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      <p>Ainda não tem uma conta? <Link to="../register">Cadastre-se</Link></p>
    </div>
  );
};

export default Login;
