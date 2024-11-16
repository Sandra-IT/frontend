import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../login/login";
import Register from "../register/register";
import Users from "../users/users";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Update from "../update/update";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const storedLoginState = localStorage.getItem("isLoggedIn") === "true";
  const [isLoggedIn, setIsLoggedIn] = useState(storedLoginState);

  const handleLogin = () => {
    setIsLoggedIn(true); // Aquí cambias el estado para indicar que el usuario está logueado
  };
  localStorage.setItem("isLoggedIn", "true"); // Guardamos el estado de login en localStorage
 

   //Función para manejar el logout
  const handleLogout = () => {
  setIsLoggedIn(false);
  localStorage.removeItem("isLoggedIn");
  };



return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header onLogout={handleLogout} />
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <Routes>
            {/* Página principal que redirige a Login o Main según el estado de login */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/main" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            {/* Página de registro */}
            <Route path="/register" element={<Register />} />
            <Route path="/update" element={<Update />} />
            <Route path="/users" element={<Users />} />
            {/* Página principal, solo accesible si está logueado */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/main"
              element={isLoggedIn ? <Main /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    
  );
};

export default App;
