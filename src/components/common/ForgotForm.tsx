import React from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Icofont from "react-icofont";
import { Form, InputGroup, Button } from "react-bootstrap";

const ForgotForm = (props: any) => {
  return (
    <Form
      ref={props.forgotForm}
      id="signInForm"
      onSubmit={props.handleSubmit(props.onForgotFormSubmit)}
    >
      <div className="form-row">
        <Form.Group className="col-md-12">
          <Form.Label>Mobile Number</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="+9190*****738"
              {...props.register("forgotMobile", {
                required: `Mobile field is required`,
              })}
            />

            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                type="submit"
                form="signUpForm"
                id="button-addon2"
                disabled={!props.isHuman || props.otpBtn}
              >
                <Icofont icon="iphone" />
                {/* {count ? "Resend in " + count + " secs" : " Send OTP"} */}
                Send OTP
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>

        {props.showForgotPassword && (
          <Form.Group className="col-md-12">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Min 8 length"
              {...props.register("forgotPassword", {
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
        )}
        {props.showForgotOtp && (
          <Form.Group className="col-md-12">
            <Form.Label>OTP</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="2****7"
                {...props.register("forgotOtp", {
                  min: 6,
                  required: true,
                })}
              />
            </InputGroup>
          </Form.Group>
        )}
        <Form.Group className="col-md-12">
          <ReCAPTCHA
            sitekey="6Le2eN0ZAAAAAKrQEbigFF2HPDH3sbqP2oIXCWUH"
            onChange={() => {
              props.setIsHuman(true);
            }}
          />
        </Form.Group>
      </div>
      <div className="pt-3">
        <Link
          className="font-weight-bold"
          to=""
          onClick={() => {
            props.backToLogin();
          }}
        >
          {`<< Back to login`}
        </Link>
      </div>
    </Form>
  );
};
export default ForgotForm;
