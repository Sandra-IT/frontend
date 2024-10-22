import React from "react";
import { Button, Form, Input } from "antd";

function Register(props) {
  const onFinish = (values) => {
    try {
      fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: values.username,
          clave: values.password,
        }),
      }).then((response) => {
        if (response.ok) {
          response.text().then((json) => {
            alert(json);
            props.change();
            window.location.reload();
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
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>Registro</h1>
      <br></br>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 300,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Correo"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Aceptar
          </Button>
        </Form.Item>

        <Button type="primary" onClick={props.change}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Register;
