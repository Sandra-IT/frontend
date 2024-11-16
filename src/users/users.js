import React, { useEffect, useState } from "react";
import { Table,Popconfirm, message } from "antd";
import {  useNavigate } from "react-router-dom";

// Definir las columnas de la tabla, incluyendo los nuevos campos

function Users() {

  const navigate = useNavigate();
  const [data, setData] = useState([]); // Estado para almacenar los usuarios
  const [loading, setLoading] = useState(true); // Estado para manejar el loading

  const columns = [
    {
      title: "Correo Electrónico",
      dataIndex: "correo",
      key: "correo",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
    },
    {
      title: "Fecha de Nacimiento",
      dataIndex: "fechaNacimiento",
      key: "fechaNacimiento",
    },
    {
      title: "Tipo de Usuario",
      dataIndex: "tipoUsuario",
      key: "tipoUsuario",
    },
  
    {
      title: "Editar",
      render: (_, record) =>
        <Popconfirm title="esta seguro que desea editar?" onConfirm={() => handleUpdate(record)}>
          <a>Update</a>
        </Popconfirm>
  
    },
  
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
          <Popconfirm title="esta seguro que desea eliminar?" onConfirm={() => handleDelete(record)}>
            <a>Delete</a>
          </Popconfirm>
      
    }, 
  
  ];
  
  
  const handleDelete = (key) => {
    deleteUser(key)
  };
  
  const deleteUser = async (id) => {
    console.log(id)
      try {
        const response = await fetch(`http://localhost:4000/eliminar-usuarios/${id.key}` , {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const result = await response.text();
          message.info(result)
          window.location.reload()
        } else {
          const errorText = await response.text();
          message.error(`Error: ${errorText}`);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        message.error("Hubo un problema al cargar los usuarios.");
      } finally {
       
      }
    };

  const handleUpdate = (key) => {
    console.log(key)
    navigate("/update", {state:key});
  };
  // Este useEffect se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/usuarios", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();

          // Aquí formateamos los datos según las columnas definidas
          const formattedData = result.map((usuario) => ({
            key: usuario.id, // Asumiendo que "id" es único
            correo: usuario.correo,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            fechaNacimiento: usuario.fecha_nacimiento, // Se asume formato de fecha adecuado
            tipoUsuario: usuario.tipo_usuario,
          
          }));

          setData(formattedData); // Actualizamos el estado con los datos
        } else {
          const errorText = await response.text();
          message.error(`Error: ${errorText}`);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        message.error("Hubo un problema al cargar los usuarios.");
      } finally {
        setLoading(false); // Terminamos el loading
      }
    };

    fetchData(); // Llamamos a la función que obtiene los datos
  }, []); // El array vacío hace que se ejecute solo una vez cuando se monta el componente

  return (
    <div>
      <h1>Usuarios</h1>
      <br />
      <Table
        columns={columns}
        dataSource={data}
        loading={loading} // Mostrar el estado de carga
        rowKey="key" // Asegúrate de que cada fila tiene una clave única
        pagination={{ pageSize: 10 }} // Cambia según el tamaño que desees por página
      />
    </div>
  );
}

export default Users;
