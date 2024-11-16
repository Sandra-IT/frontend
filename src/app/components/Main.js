import React from 'react';
import Navbar from './Navbar';
import Inventory from './Inventory';


function Main() {
    return (
       <div>
         <Navbar /> 
      
        <main className="container my-5">
            <div className="input-group mb-4" style={{width: "50%", margin: "auto"}}>
                <input type="text" className="form-control" placeholder="Buscar en el inventario..."/>
                <button className="btn btn-outline-secondary" type="button">Buscar</button>
            </div>
            <div className="text-center mb-4">
                <button className="btn btn-outline-primary" type="button">Filtrar</button>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="inventoryList">
                
                    {/* Aquí pasamos los datos como props al componente Inventory */}
                    <Inventory
                        imagen="Images/Rodilleras.jpeg"
                        titulo="Rodilleras"
                        codigo="001"
                        ubicacion="Almacén A"
                        cantidad="150"
                        descripcion="Rodilleras deportivas para protección."
                    />
                    <Inventory
                        imagen="Images/Sport_watch.jpeg"
                        titulo="Sport Watch"
                        codigo="002"
                        ubicacion="Almacén B"
                        cantidad="75"
                        descripcion="Reloj deportivo resistente al agua."
                    />
                    <Inventory
                        imagen="Images/Yellow_jacket.jpeg"
                        titulo="Chaqueta Amarilla"
                        codigo="003"
                        ubicacion="Almacén C"
                        cantidad="50"
                        descripcion="Chaqueta impermeable de color amarillo."
                    />
                    </div>
        </main>
    </div>
    );
}

export default Main;
