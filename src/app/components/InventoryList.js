// InventoryList.js
import React from 'react';
import Inventory from './Inventory';  // Importa el componente para mostrar cada item

function InventoryList() {
    const items = [
        {
            imagen: '"/images/Rodilleras.jpeg"', // Ruta desde la carpeta public
            titulo: 'Rodilleras de protección',
            codigo: '001',
            ubicacion: 'Bodega A',
            cantidad: 20,
            descripcion: 'Rodilleras para protección en trabajos de construcción'
        },
        {
            imagen: '/images/casco.jpg', // Ruta desde la carpeta public
            titulo: 'Casco de seguridad',
            codigo: '002',
            ubicacion: 'Bodega B',
            cantidad: 15,
            descripcion: 'Casco para protección en alturas'
        }
        // más ítems...
    ];

    return (
        <div className="row">
            {items.map((item) => (
                <Inventory 
                    key={item.codigo}
                    imagen={item.imagen} // Pasa la ruta de la imagen
                    titulo={item.titulo}
                    codigo={item.codigo}
                    ubicacion={item.ubicacion}
                    cantidad={item.cantidad}
                    descripcion={item.descripcion}
                />
            ))}
        </div>
    );
}

export default InventoryList;
