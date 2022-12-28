import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ForgotForm from "./ForgotForm";
import {
  Form,
  InputGroup,
  Modal,
  ButtonToolbar,
  Button,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const SignInForm = (props: any) => {
  let errors = props.errors;
  return (
    <>
      <Form
        ref={props.signInFormRef}
        id="signInForm"
        onSubmit={props.handleSubmit(props.onSignInSubmit)}
      >
        <div className="form-row">
          <Form.Group className="col-md-12">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="+9190*****738"
              {...props.register("mobile", { required: true })}
            />
          </Form.Group>
          <Form.Group className="col-md-12">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Min 8 length"
              {...props.register("password", {
                required: true,
                min: 8,
                pattern: /^[\S]+.*[\S]+$/,
              })}
            />
          </Form.Group>
        </div>
        <div className="pt-3">
          <Link
            className="font-weight-bold"
            to=""
            onClick={() => {
              props.showForgot();
            }}
          >
            {props.form == "signin" && "Forgot your password? "}
          </Link>
        </div>
      </Form>

      {(errors.mobile || errors.password || props.message) && (
        <Alert
          variant="danger"
          dismissible
          role="alert"
          className=""
          onClose={() => {
            errors.mobile = undefined;
            errors.password = undefined;
            props.setMessage(null);
          }}
        >
          Errors:
          <ul>
            {props.message && <li>{props.message}</li>}

            {errors.mobile && <li>Mobile number field is required</li>}

            {errors.password && errors.password.type == "required" && (
              <li>Password field is required</li>
            )}

            {errors.password && errors.password.type == "pattern" && (
              <li>
                Password should :
                <br />
                1. Contains at least 1 number (0 to 9)
                <br />
                2. Contains at least 1 special character{" "}
                {`(^ $ * . [ ] { } ( ) ? - " ! @ # % & / \ , > < ' : ; | _ ~ ` +
                  `+ =)`}
              </li>
            )}

            {errors.password && errors.password.type == "min" && (
              <li>Password field needs atleast 8 length</li>
            )}
          </ul>
        </Alert>
      )}
    </>
  );
};

export default SignInForm;
