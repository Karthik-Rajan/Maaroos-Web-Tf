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
import Icofont from "react-icofont";

const SignUpForm = (props: any) => {
  const errors = props.errors;
  return (
    <>
      <Form
        id="signUpForm"
        ref={props.signUpFormRef}
        onSubmit={props.handleSubmit(props.onSignUpSubmit)}
      >
        <div className="form-row">
          <Form.Group className="col-md-12">
            <Form.Label>Mobile Number</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                readOnly={props.mobileDisabled}
                placeholder="+9190*****738"
                {...props.register("signUpMobile", {
                  required: true,
                  mobile: true,
                })}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  type="submit"
                  form="signUpForm"
                  id="button-addon2"
                  disabled={props.otpBtn}
                >
                  <Icofont icon="iphone" />
                  {/* {count ? "Resend in " + count + " secs" : " Send OTP"} */}
                  Send OTP
                </Button>
              </InputGroup.Append>
            </InputGroup>
            {props.otpBtn && (
              <div className="pt-3">
                <Link
                  className="font-weight-bold text-right"
                  to=""
                  onClick={() => {
                    props.resendOtp();
                  }}
                >
                  Resend OTP
                </Link>
              </div>
            )}
          </Form.Group>

          <Form.Group className="col-md-12">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              readOnly={props.mobileDisabled}
              placeholder="Min 8 length"
              {...props.register("signUpPassword", {
                required: true,
                pattern: /^[\S]+.*[\S]+$/,
              })}
            />
          </Form.Group>
          {props.showOtp && (
            <Form.Group className="col-md-12">
              <Form.Label>OTP</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="2****7"
                  {...props.register("signUpOtp", {
                    min: 6,
                    required: true,
                  })}
                />
              </InputGroup>
            </Form.Group>
          )}
        </div>
      </Form>
      {errors.signUpMobile || errors.signUpPassword || props.message ? (
        <Alert
          variant="danger"
          dismissible
          role="alert"
          className=""
          onClose={() => {
            errors.signUpMobile = undefined;
            errors.signUpPassword = undefined;
            props.setMessage(null);
          }}
        >
          Errors:
          <ul>
            {props.message && <li>{props.message}</li>}

            {errors.signUpMobile && <li>Mobile number field is required</li>}

            {errors.signUpPassword &&
              (errors.signUpPassword.type == "required" ? (
                <li>Password field is required</li>
              ) : errors.signUpPassword.type == "pattern" ? (
                <li>
                  Password should :
                  <br />
                  1. Contains at least 1 number (0 to 9)
                  <br />
                  2. Contains at least 1 special character{" "}
                  {`(^ $ * . [ ] { } ( ) ? - " ! @ # % & / \ , > < ' : ; | _ ~ ` +
                    `+ =)`}
                </li>
              ) : errors.signUpPassword.type == "min" ? (
                <li>Password field needs atleast 8 length</li>
              ) : (
                ""
              ))}
          </ul>
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default SignUpForm;
