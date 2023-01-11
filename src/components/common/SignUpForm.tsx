import React from "react";
import { Link } from "react-router-dom";
import OtpInput from "./OtpInput";
import { Form, InputGroup, Button } from "react-bootstrap";
import Icofont from "react-icofont";
import ReCAPTCHA from "react-google-recaptcha";

const SignUpForm = (props: any) => {
  const onChange = (value: string) => props.setOtp(value);

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
            <Form.Label>Set Password</Form.Label>

            <InputGroup>
              <Form.Control
                type={props.showPassword ? `text` : `password`}
                readOnly={props.mobileDisabled}
                placeholder="Min 8 length"
                {...props.register("signUpPassword", {
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
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  type="button"
                  id="showpasswordeye"
                  onClick={() => {
                    props.setShowPassword(!props.showPassword);
                  }}
                >
                  <Icofont icon={!props.showPassword ? `eye` : `eye-blocked`} />{" "}
                  {!props.showPassword ? `Show` : `Hide`}
                  {/* {count ? "Resend in " + count + " secs" : " Send OTP"} */}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>

          <Form.Group className="col-md-12">
            <ReCAPTCHA
              sitekey="6Le2eN0ZAAAAAKrQEbigFF2HPDH3sbqP2oIXCWUH"
              onChange={props.captchOnChange}
              onExpired={props.captchOnExpired}
            />
          </Form.Group>

          {props.showOtp && (
            <Form.Group className="col-md-12">
              <Form.Label>OTP</Form.Label>
              <InputGroup>
                <OtpInput
                  value={props.otp}
                  valueLength={6}
                  onChange={onChange}
                />
              </InputGroup>
            </Form.Group>
          )}
        </div>
      </Form>
    </>
  );
};

export default SignUpForm;
