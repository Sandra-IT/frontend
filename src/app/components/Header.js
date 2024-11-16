import React from "react";

function Header() {
  return (
    <header className="bg-dark text-light text-center py-3">
      <h1>Sistema de Inventario Virtual</h1>
      <button className="btn btn-outline-secondary me-2" id="btnRegresar">
        Regresar
      </button>
      <a href="Index_home.html" className="btn btn-outline-primary">
        Inicio
      </a>
    </header>
  );
}

export default Header;
