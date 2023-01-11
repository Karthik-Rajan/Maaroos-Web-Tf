import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

const SignInForm = (props: any) => {
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
              {...props.register("mobile", {
                required: `Mobile field is required`,
              })}
            />
          </Form.Group>
          <Form.Group className="col-md-12">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Min 8 length"
              {...props.register("password", {
                required: `Password field is required`,
                pattern: {
                  value: /((?=.*\d)(?=.*[A-Z]|[a-z])(?=.*\W).{8,})/,
                  message: `Password does not match pattern. Password must contain atleast one number(0-9), one lowercase(a-z), one uppercase(A-Z)`,
                },
                minLength: {
                  value: 8,
                  message: `Password should have minimum 8 length`,
                },
              })}
            />
          </Form.Group>
          <Form.Group className="col-md-12">
            <ReCAPTCHA
              sitekey="6Le2eN0ZAAAAAKrQEbigFF2HPDH3sbqP2oIXCWUH"
              onChange={props.captchOnChange}
              onExpired={props.captchOnExpired}
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
            {props.form === "signin" && "Forgot your password? "}
          </Link>
        </div>
      </Form>
    </>
  );
};

export default SignInForm;
