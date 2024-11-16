import React from 'react';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="Index_home.html">Inventario</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="gestion.html" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Gestión de Inventario
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="gestion.html">Agregar Producto</a></li>
                                <li><a className="dropdown-item" href="gestion.html">Eliminar Producto</a></li>
                                <li><a className="dropdown-item" href="reportes.html">Reporte</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="inicio_sesion.html">Iniciar Sesión</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="registro.html">Registro</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
