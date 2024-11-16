import React from 'react';


function Inventory({ imagen, titulo, codigo, ubicacion, cantidad, descripcion }) {
    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
                <img src={imagen} className="card-img-top" alt={titulo} />
                <div className="card-body">
                    <h5 className="card-title">{titulo}</h5>
                    <p className="card-text"><strong>Código:</strong> {codigo}</p>
                    <p className="card-text"><strong>Ubicación:</strong> {ubicacion}</p>
                    <p className="card-text"><strong>Cantidad:</strong> {cantidad}</p>
                    <p className="card-text"><strong>Descripción:</strong> {descripcion}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <button className="btn btn-warning btn-sm">Editar</button>
                    <button className="btn btn-danger btn-sm">Eliminar</button>
                    <button className="btn btn-info btn-sm">Reportar Ingreso/Salida</button>
                </div>
            </div>
        </div>
    );
}

export default Inventory;
