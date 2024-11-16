
import { Button, Form, Input, } from "antd";
import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";


function Login(props) {
  const navigate = useNavigate();
  // eslint-disable-next-line no-undef
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    try {
      fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: values.username,
          clave: values.password,
        }),
      }).then((response) => {
        setLoading(false);
        if (response.ok) {
          response.text().then((data)  => {
            alert(data);
            props.onLogin(); 
            navigate("/main"); 
          });
        } else {
          response.text().then((json) => {
            alert(json);
          });
        }
      });
    } catch (error) {
      setLoading(false);
      console.error("Error en la solicitud:", error);
      alert("Hubo un error en la solicitud.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <main
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div
          className="card p-4 shadow-lg "
          style={{ width: "400px", minHeight: "400px" }}
        >
          <Form
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ width: "100%" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h4 className="text-center mb-4 mb-4">Iniciar Sesión</h4>
            <Form.Item
              className="mb-3"
              label="Correo Electrónico"
              name="username"
              rules={[
                { required: true, message: "Ingrese su correo electrónico" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="mb-3"
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: "Ingrese su contraseña" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item className="text-center">
              <Button
                type="primary"
                htmlType="submit"
                className="btn btn-primary w-100"
                loading={loading}
            >
                Inicia Sesión
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-3">
            <a href="recuperar.html">¿Olvidaste tu contraseña?</a>
            <br />
            <Link to="/register">Crear una cuenta nueva</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;