import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "./../../redux/hooks";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
import Icon from "./../../components/Icon";
import { Form, Container } from "react-bootstrap";
import { LOGIN_INITIAL_DATA } from "./../../helpers/formData";

const Login = () => {
  const { loginUser, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState(LOGIN_INITIAL_DATA);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <Icon icon={"faUser"} fixedWidth /> Sign Into Your Account
      </p>

      <Form>
        <Input
          label="Email"
          id="login-email"
          type="email"
          value={email}
          name="email"
          onChange={(e) => onChange(e)}
          placeholder="Email Address"
          required
          autoComplete="off"
        />
        <Input
          label="Password"
          id="login-password"
          type="password"
          value={password}
          name="password"
          onChange={(e) => onChange(e)}
          placeholder="Enter your password"
          autoComplete="off"
          minLength="6"
        />
        <Button
          variant="info"
          text="Login"
          onClick={(e) => onSubmit(e)}
          color="white"
          type="submit"
          className={` float-right`}
          id="user-login-button"
        />
      </Form>

      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Container>
  );
};

export default Login;
