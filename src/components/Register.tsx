import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import awsConfig from "../awsConfig.json";
import { useNavigate } from "react-router-dom";
import {
  OTPSENT,
  NOUSER,
  WRONGOTP,
  USEREXISTS,
  UNKNOWNERR,
} from "../ErrorConstants";

function Register() {
  Amplify.configure(awsConfig);
  let navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [info, setInfo] = useState("");
  const [session, setSession] = useState(null);
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = () => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const signIn = () => {
    Auth.signIn(number)
      .then((result) => {
        console.log(result);
        setSession(result);
        setInfo(OTPSENT);
        setMessage("");
      })
      .catch((e) => {
        setInfo("");
        console.log(e);
        if (e.code === "UserNotFoundException") {
          setMessage(NOUSER);
        } else if (e.code === "UsernameExistsException") {
          setMessage(USEREXISTS);
        } else {
          setMessage(UNKNOWNERR);
        }
      });
  };
  const signUp = async () => {
    setDisabled(true);
    const result = await Auth.signUp({
      username: number,
      password,
      attributes: {
        phone_number: number,
      },
    })
      .then(() => signIn())
      .catch((e) => {
        console.log(e);
        setDisabled(false);
        setInfo("");
        if (e.code === "UserNotFoundException") {
          setMessage(NOUSER);
        } else if (e.code === "UsernameExistsException") {
          setMessage(USEREXISTS);

          //signIn();
        } else {
          setMessage(UNKNOWNERR);
        }
      });
    return result;
  };

  const reset = () => {
    setSession(null);
    setInfo("");
    setMessage("");
    setDisabled(false);
  };

  const verifyOtp = () => {
    Auth.sendCustomChallengeAnswer(session, otp)
      .then((user) => {
        setSession(null);
        navigate("/");
      })
      .catch((err) => {
        setInfo("");
        setMessage(WRONGOTP);
        setOtp("");
      });
  };

  const reSend = () => {
    Auth.resendSignUp(number)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container fluid className="bg-white">
      <Row>
        <Col md={4} lg={6} className="d-none d-md-flex bg-image"></Col>
        <Col md={8} lg={6}>
          <div className="login d-flex align-items-center py-5">
            <Container>
              <Row>
                <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                  <h3 className="login-heading mb-4">Hey, New Buddy!</h3>
                  <Form>
                    {/* <PhoneInput
                      countrySelectProps={{ unicodeFlags: true }}
                      inputComponent={
                        <Form.Control
                          className={disabled ? "mobileDisabled" : ""}
                          type="mobile"
                          placeholder="Mobile Number"
                          id="inputEmail"
                          onChange={(event: any) =>
                            setNumber(event.target.value)
                          }
                          readOnly={disabled}
                        />
                      }
                      initialValueFormat="national"
                      placeholder="Mobile Number"
                      value={number}
                      onChange={(event: any) => {}}
                    /> */}
                    <div className="form-label-group">
                      <Form.Control
                        className={disabled ? "mobileDisabled" : ""}
                        type="mobile"
                        placeholder="Mobile Number"
                        id="inputEmail"
                        onChange={(event: any) => setNumber(event.target.value)}
                        readOnly={disabled}
                      />
                      <Form.Label
                        className={disabled ? "mobileDisabled" : ""}
                        htmlFor="inputEmail"
                      >
                        Mobile Number (eg : +919876543210)
                      </Form.Label>
                    </div>
                    <div className="form-label-group">
                      <Form.Control
                        type="password"
                        id="inputPassword"
                        placeholder="Password"
                        className="formInputSize"
                        readOnly={disabled}
                        onChange={(event: any) => {
                          setPassword(event.target.value);
                          if (event.target.value.length > 6) {
                          }
                        }}
                      />
                      <Form.Label htmlFor="inputPassword">
                        Password (Minimum 8 length)
                      </Form.Label>
                    </div>

                    {session ? (
                      <div className="form-label-group">
                        <Form.Control
                          type="text"
                          id="inputOtp"
                          placeholder="OTP"
                          className="formInputSize"
                          minLength={6}
                          onChange={(event: any) => {
                            setOtp(event.target.value);
                          }}
                        />
                        <Form.Label htmlFor="inputOtp">
                          OTP (6 Digits)
                        </Form.Label>
                      </div>
                    ) : (
                      ""
                    )}
                    <span id="signUpErr">{message}</span>
                    <span id="signUpInfo">{info}</span>

                    {!session ? (
                      <Link
                        to=""
                        className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        onClick={signUp}
                      >
                        Send OTP
                      </Link>
                    ) : (
                      <>
                        <Link
                          to=""
                          className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                          onClick={verifyOtp}
                        >
                          Register
                        </Link>
                        <Link
                          to=""
                          className="btn btn-lg btn-info btn-block btn-login text-uppercase font-weight-bold mb-2"
                          onClick={reset}
                        >
                          Reset
                        </Link>
                      </>
                    )}
                    {session ? (
                      <Link className="" to="" onClick={reSend}>
                        Resend OTP in 3 mins
                      </Link>
                    ) : (
                      ""
                    )}

                    <div className="text-center pt-3">
                      Already have an account?{" "}
                      <Link className="font-weight-bold" to="/login">
                        Sign In
                      </Link>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
