import React from "react";
import { Form, Input, Button, Select, DatePicker, message } from "antd";
import { useNavigate, Link, useLocation } from "react-router-dom";


// Definir las opciones de tipo de usuario
const { Option } = Select;

function Update() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const {nombre,apellido,fechaNacimiento,tipoUsuario,correo,key} = location.state || {}
  const onFinish = async (values) => {
    console.log("modificacion exitosa:", values);
   
    const userData = {
      nombre: values.nombre,
      apellido: values.apellido,
      fechaNacimiento: values.fechaNacimiento.format("YYYY-MM-DD"), // Convertir a formato de fecha
      tipoUsuario: values.tipoUsuario,
      correo: values.correo,
      confirmCorreo: values.confirmCorreo,
      clave: values.password,
    };

    try {
      const response = await fetch(`http://localhost:4000/usuarios/${key}`, {
        method: 'PUT',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        message.success("modificacion exitosa");
        navigate("/users"); // Redirigir a la página de login después del registro
      } else {
        const errorText = await response.text();
        console.log("Error Response:", errorText); // Verificar el error
        message.error(errorText);
      }
    } catch (error) {
      console.error("Error al modificar:", error);
      message.error("Hubo un error al modificar el usuario.");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h2>Modificar</h2>
      <br></br>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          tipoUsuario: "cliente",
        }}
        layout="vertical"
      >
        <Form.Item
          label="Nombre"
          name="nombre"
          initialValue={nombre}
          rules={[{ required: true, message: "Por favor ingresa tu nombre" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Apellido"
          name="apellido"
          initialValue={apellido}
          rules={[{ required: true, message: "Por favor ingresa tu apellido" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Fecha de Nacimiento"
          name="fechaNacimiento"
          rules={[
            {
              required: true,
              message: "Por favor selecciona tu fecha de nacimiento",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Tipo de Usuario"
          name="tipoUsuario"
          initialValue={tipoUsuario}
          rules={[
            {
              required: true,
              message: "Por favor selecciona el tipo de usuario",
            },
          ]}
        >
          <Select>
            <Option value="cliente">Cliente</Option>
            <Option value="admin">Administrador</Option>
            <Option value="moderador">Moderador</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Correo Electrónico"
          name="correo"
          initialValue={correo}
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu correo electrónico",
            },
            { type: "email", message: "El correo no es válido" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Confirmar Correo"
          name="confirmCorreo"
          initialValue={correo}
          dependencies={["correo"]}
          rules={[
            {
              required: true,
              message: "Por favor confirma tu correo electrónico",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("correo") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Los correos electrónicos no coinciden")
                );
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Actualizar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Update;
