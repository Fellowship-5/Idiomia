import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./../../redux/hooks";
import countryList from "country-list";

import Input from "./../../components/Input";
import Button from "./../../components/Button";
import Icon from "./../../components/Icon";
import Checkbox from "./../../components/Checkbox";
import Section from "./../../components/Section";
import Breadcrumb from "./../../components/Breadcrumb";

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
    <>
      <Section
        id="page-title"
        title="MY ACCOUNT"
        containerClass="d-flex justify-content-between mx-5 align-items-center"
      >
        <Breadcrumb activePage="Register" />
      </Section>
      <Container className="register-container">
        <p className="register-title">
          <Icon icon={"faUser"} fixedWidth /> New Signup? Register for an
          Account
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
            labelClassName="input-form-label my-3"
            className="rounded"
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
            labelClassName="input-form-label my-3"
            className="rounded"
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
            labelClassName="input-form-label my-3"
            className="rounded"
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
            labelClassName="input-form-label my-3"
            className="rounded"
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
            labelClassName="input-form-label my-3"
            className="rounded"
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
            className="input-form-label my-4"
          />
          <hr className="my-3" />
          <Button
            variant="info"
            text="Register"
            onClick={(e) => onSubmit(e)}
            color="white"
            type="submit"
            className="button-custom float-right"
            id="user-register-button"
            disabled={disabled}
          />
        </Form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Container>
    </>
  );
};

export default Register;
