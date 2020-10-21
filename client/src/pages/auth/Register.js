import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./../../redux/hooks";
import countryList from "country-list";

import Input from "./../../components/Input";
import Button from "./../../components/Button";
import Icon from "./../../components/Icon";
import Checkbox from "./../../components/Checkbox";

import { REGISTER_INITIAL_DATA } from "./../../helpers/formData";

import { Form, Container } from "react-bootstrap";

import "./Register.css";

const Register = () => {
  const { registerUser, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState(REGISTER_INITIAL_DATA);
  const [disabled, setDisabled] = useState(true);

  const { name, email, password, confirmPassword, country, newsletter } = formData;

  useEffect(() => {
    const isFilled = [name, email, password, confirmPassword, country].every((data) =>
      Boolean(data)
    );
    isFilled ? setDisabled(false) : setDisabled(true);
  }, [formData]);

  const onChange = (e) => {
    if (e.target.name === "newsletter") {
      return setFormData({ ...formData, [e.target.name]: e.target.checked });
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      registerUser(formData);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const countries = [{ code: "ZERO" }].concat(countryList.getData());

  return (
    <Container>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <Icon icon={"faUser"} fixedWidth /> Create Your Account
      </p>
      <Form>
        <Input
          label="Name"
          id="register-name"
          type="text"
          value={name}
          name="name"
          onChange={(e) => onChange(e)}
          placeholder="Name"
          autoComplete="off"
        />
        <Input
          label="Email"
          id="register-email"
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
          id="register-password"
          type="password"
          value={password}
          name="password"
          onChange={(e) => onChange(e)}
          placeholder="Create a password"
          autoComplete="off"
          minLength="6"
        />
        <Input
          label="Password"
          id="register-password-2"
          type="password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={(e) => onChange(e)}
          placeholder="Confirm Password"
          autoComplete="off"
          minLength="6"
        />
        <Input
          as="select"
          size="sm"
          id="country"
          label="Country"
          onChange={(e) => onChange(e)}
          value={country}
          name="country"
          autoComplete="off"
        >
          <>
            {countries.map((country) => {
              return (
                <option disabled={country.code === "ZERO"} key={country.code}>
                  {country.name}
                </option>
              );
            })}
          </>
        </Input>

        <Checkbox
          id="subscribe-newsletter"
          label="Subscribe to newsletter"
          checked={newsletter}
          name="newsletter"
          onChange={onChange}
        />
        <hr className="my-3" />
        <Button
          variant="primary"
          text="Register"
          onClick={(e) => onSubmit(e)}
          color="white"
          type="submit"
          className={`float-right`}
          id="user-register-button"
          disabled={disabled}
        />
      </Form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Container>
  );
};

export default Register;
