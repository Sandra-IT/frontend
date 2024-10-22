import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Correo",
    dataIndex: "correo",
    key: "correo",
  },
];
let data = [];
try {
  fetch("http://localhost:4000/usuarios", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      response.text().then((json) => {
        const d = JSON.parse(json);
        for (let index = 0; index < d.length; index++) {
          data.push({ correo: d[index].correo });
        }
      });
    } else {
      response.text().then((json) => {
        alert(json);
      });
    }
  });
} catch (error) {
  console.error("Error en la solicitud:", error);
}

function Users() {
  return (
    <div>
      <h1>Usuarios</h1>
      <br></br>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
export default Users;
