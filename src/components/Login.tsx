import React, { useState, useEffect } from "react";
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import FontAwesome from "./common/FontAwesome";
import awsConfig from "../awsConfig";
import LoginSlider from "../components/common/LoginSlider";

import {
  NOTSIGNIN,
  SIGNEDIN,
  OTPSENT,
  NOUSER,
  WRONGOTP,
  USEREXISTS,
  UNKNOWNERR,
} from "../ErrorConstants";

function Login() {
  Amplify.configure(awsConfig);

  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [info, setInfo] = useState("");

  let navigate = useNavigate();

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
        // setMessage(NOTSIGNIN);
      });
  };

  const signIn = () => {
    Auth.signIn(number, password)
      .then((result) => {
        setSession(result);
        navigate("/");
      })
      .catch((e) => {
        if (e.code === "UserNotFoundException") {
          setMessage(NOUSER);
        } else if (e.code === "UsernameExistsException") {
          setMessage(OTPSENT);
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
      .then((res) => console.log(res))
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
        setUser(user);
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
        <Col md={4} lg={4.5} className="d-none d-md-flex bg-image">
          <LoginSlider />
        </Col>
        <Col md={8} lg={6.5}>
          <div className="login d-flex align-items-center py-5">
            {isLogin ? (
              <Container>
                <Row>
                  <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                    <h1 className="login-heading mb-4">Welcome back!</h1>
                    <h6 className="mb-2">Good to see you again!!</h6>
                    <br />
                    <Form>
                      <Form.Label htmlFor="inputMobile">
                        Mobile Number (eg : +919876543210)
                      </Form.Label>
                      <div className="form-label-group">
                        <Form.Control
                          type="mobile"
                          id="inputMobile"
                          placeholder="Mobile Number"
                          onChange={(event: any) => {
                            setNumber(event.target.value);
                          }}
                        />
                      </div>
                      <Form.Label htmlFor="inputPassword">
                        Password (Minimum 8 length)
                      </Form.Label>
                      <div className="form-label-group">
                        <Form.Control
                          type="password"
                          id="inputPassword"
                          placeholder="Password"
                          onChange={(event: any) => {
                            setPassword(event.target.value);
                          }}
                        />
                      </div>

                      <Link
                        to=""
                        className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        onClick={signIn}
                      >
                        Sign In
                      </Link>
                      <div className="text-center pt-3">
                        Don’t have an account?{" "}
                        <Link
                          className="font-weight-bold"
                          to=""
                          onClick={() => {
                            setIsLogin(false);
                          }}
                        >
                          Sign Up
                        </Link>
                      </div>
                      {/* <hr className="my-4" />
                      <p className="text-center">LOGIN WITH</p>
                      <div className="row">
                        <div className="col pr-2">
                          <Button
                            className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase"
                            type="submit"
                          >
                            <FontAwesome icon="google" className="mr-2" />{" "}
                            Google
                          </Button>
                        </div>
                        <div className="col pl-2">
                          <Button
                            className="btn pl-1 pr-1 btn-lg btn-facebook font-weight-normal text-white btn-block text-uppercase"
                            type="submit"
                          >
                            <FontAwesome icon="facebook" className="mr-2" />{" "}
                            Facebook
                          </Button>
                        </div>
                      </div> */}
                    </Form>
                  </Col>
                </Row>
              </Container>
            ) : (
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
                      <Form.Label
                        className={disabled ? "mobileDisabled" : ""}
                        htmlFor="inputEmail"
                      >
                        Mobile Number (eg : +919876543210)
                      </Form.Label>
                      <div className="form-label-group">
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
                      </div>
                      <Form.Label htmlFor="inputPassword">
                        Password (Minimum 8 length)
                      </Form.Label>
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
                        <Link
                          className="font-weight-bold"
                          to=""
                          onClick={() => {
                            setIsLogin(true);
                          }}
                        >
                          Sign In
                        </Link>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </Container>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Login;
