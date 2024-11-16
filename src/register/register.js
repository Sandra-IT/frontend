import React from "react";
import { Form, Input, Button, Select, DatePicker, message } from "antd";
import { useNavigate, Link } from "react-router-dom";

// Definir las opciones de tipo de usuario
const { Option } = Select;

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Función para manejar el registro
  const onFinish = async (values) => {
    debugger
    console.log("Registro exitoso:", values);
    // Validar que las contraseñas coinciden
    if (values.password !== values.confirmPassword) {
      message.error("Las contraseñas no coinciden");
      return;
    }

    // Crear el objeto de usuario con los valores del formulario
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
      const response = await fetch("http://localhost:4000/register", {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        message.success("Registro exitoso");
        navigate("/login"); // Redirigir a la página de login después del registro
      } else {
        const errorText = await response.text();
        console.log("Error Response:", errorText); // Verificar el error
        message.error(errorText);
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      message.error("Hubo un error al registrar el usuario.");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <br></br>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          tipoUsuario: "cliente", // Valor por defecto
        }}
        layout="vertical"
      >
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: "Por favor ingresa tu nombre" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Apellido"
          name="apellido"
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

        <Form.Item
          label="clave"
          name="password"
          rules={[
            { required: true, message: "Por favor ingresa tu contraseña" },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirmar clave"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Por favor confirma tu contraseña" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden")
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Registrarse
          </Button>
        </Form.Item>

        <Form.Item>
          <Link to="/login">
            <Button block>¿Ya tienes una cuenta? Inicia sesión</Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
