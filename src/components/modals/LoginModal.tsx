import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import SignInForm from "../common/SignInForm";
import SignUpForm from "../common/SignUpForm";
import ForgotForm from "../common/ForgotForm";
import { Modal, Button, Alert } from "react-bootstrap";
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import awsConfig from "../../awsConfig.json";
import {
  SIGNEDIN,
  OTPSENT,
  NOUSER,
  USERSIGNUP,
  WRONGUSER,
  RESET,
} from "../../ErrorConstants";

const LoginModal = (props: any) => {
  /** types */
  type Inputs = {
    mobile: string;
    password: string;
    otp: string;
    signUpMobile: string;
    signUpOtp: number;
    signUpPassword: string;
  };

  Amplify.configure(awsConfig);

  /*** SignIn */
  const [info, setInfo] = useState("");

  /*** Sign Up */
  const [showOtp, setShowOtp] = useState(false);
  const [mobileDisabled, setMobileDisabled] = useState(false);
  const [otpBtn, setOtpBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [isHuman, setIsHuman] = useState(false);

  /*** Forgot */
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotOtpBtn, setForgotOtpBtn] = useState(false);

  /**Common */
  const [form, setForm] = useState("signin");
  const [message, setMessage] = useState<any>(null);

  /** Form Ref */
  const signInFormRef = useRef();
  const signUpFormRef = useRef();
  const forgotForm = useRef();

  let errorMsg: any = [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSignInSubmit: SubmitHandler<Inputs> = (data) => {
    if (!isHuman) {
      setMessage(`Captcha is required`);
      return false;
    }
    const { mobile, password } = data;
    logIn(mobile, password);
  };

  const logIn = (mobile: any, password: any) => {
    Auth.signIn(mobile.replace("+", ""), password)
      .then((result) => {
        localStorage.setItem(
          "userIdToken",
          result.signInUserSession.idToken.jwtToken
        );
        setInfo(SIGNEDIN);
        window.location.reload();
      })
      .catch((e) => {
        if (e.code === "NotAuthorizedException") {
          setMessage(WRONGUSER);
        } else if (e.code === "UserNotFoundException") {
          setMessage(NOUSER);
        } else if (e.code === "UsernameExistsException") {
          setMessage(OTPSENT);
        } else {
          setMessage(e.message);
        }
      });
  };

  const onSignUpSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!isHuman) {
      setMessage(`Captcha is required`);
      return false;
    }
    let { signUpMobile, signUpPassword } = data;

    let userName = signUpMobile.replace("+", "");
    setMobile(signUpMobile);

    if (otp.length !== 6) {
      await Auth.signUp({
        username: userName,
        password: signUpPassword,
        attributes: {
          phone_number: signUpMobile,
          nickname: 0
        }
      })
        .then((res) => {
          setShowOtp(true);
          setOtpBtn(true);
          setMobileDisabled(true);
        })
        .catch((e) => {
          setInfo("");
          setOtpBtn(false);
          if (e.code === "UsernameExistsException") {
            resendOtp(signUpMobile);
          } else {
            setMessage(e.message);
          }
        });
    } else {
      onVerify(userName, otp, signUpPassword);
    }
  };

  const onVerify = (userName: any, signUpOtp: any, signUpPassword: any) => {
    Auth.confirmSignUp(userName, signUpOtp).then((res) => {
      setInfo(USERSIGNUP);
      logIn(userName, signUpPassword);
    });
  };

  const resendOtp = (userName?: any) => {
    if (!isHuman) {
      setMessage(`Captcha is required`);
      return false;
    }

    let resendMobile = userName ? userName : mobile;
    resendMobile = resendMobile.replace("+", "");
    Auth.resendSignUp(resendMobile)
      .then((res) => {
        setShowOtp(true);
        setIsHuman(false);
      })
      .catch((e) => {
        setMessage(e.message);
        setIsHuman(false);
      });
  };

  const onForgotFormSubmit = (data: any) => {
    let { forgotMobile, forgotPassword } = data;
    forgotMobile = forgotMobile.replace("+", "");
    if (forgotOtp.length > 0) {
      Auth.forgotPasswordSubmit(forgotMobile, forgotOtp, forgotPassword)
        .then((res) => {
          setInfo(RESET);
          setForm("signin");
        })
        .catch((e) => {
          setInfo("");
          setMessage(e.message);
        });
    } else {
      Auth.forgotPassword(forgotMobile)
        .then((res) => {
          setForgotOtpBtn(true);
          setShowForgotPassword(true);
        })
        .catch((e) => {
          setInfo("");
          setForgotOtpBtn(false);
          setMessage(e.message);
        });
    }
  };

  const showForgot = () => {
    setIsHuman(false);
    setShowForgotPassword(false);
    setMobile("");
    setForm("forgot");
  };

  const backToLogin = () => {
    setIsHuman(false);
    setMobile("");
    setForm("signin");
  };

  const backToSignUp = () => {
    setIsHuman(false);
    setOtpBtn(false);
    setForm(form === "signin" ? "signup" : "signin");
  };

  const onHide = () => {
    setIsHuman(false);
    props.onHide();
  };

  const captchOnChange = () => {
    setIsHuman(true);
  };

  const captchOnExpired = () => {
    setIsHuman(false);
  };

  return (
    <Modal show={props.visible} onHide={onHide} centered>
      <Modal.Header closeButton={true}>
        <Modal.Title as="h5" id="add-address">
          {form === "signin"
            ? `SIGN IN`
            : form === "forgot"
            ? `FORGOT`
            : `SIGN UP`}
          {form === "signin" && <i> - Welcome Back!</i>}
          {form === "forgot" && <i> - Reset your password</i>}
          {form === "signup" && <i> - Hey, New Buddy!</i>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {form === "signin" && (
          <SignInForm
            onSignInSubmit={onSignInSubmit}
            register={register}
            handleSubmit={handleSubmit}
            form={form}
            signInFormRef={signInFormRef}
            showForgot={showForgot}
            backToLogin={backToLogin}
            isHuman={isHuman}
            captchOnChange={captchOnChange}
            captchOnExpired={captchOnExpired}
          />
        )}

        {form === "forgot" && (
          <ForgotForm
            onForgotFormSubmit={onForgotFormSubmit}
            register={register}
            handleSubmit={handleSubmit}
            form={form}
            forgotForm={forgotForm}
            showForgotPassword={showForgotPassword}
            setShowForgotPassword={setShowForgotPassword}
            backToLogin={backToLogin}
            isHuman={isHuman}
            captchOnChange={captchOnChange}
            captchOnExpired={captchOnExpired}
            forgotOtp={forgotOtp}
            setForgotOtp={setForgotOtp}
            forgotOtpBtn={forgotOtpBtn}
          />
        )}

        {form === "signup" && (
          <SignUpForm
            onSignUpSubmit={onSignUpSubmit}
            register={register}
            handleSubmit={handleSubmit}
            form={form}
            showOtp={showOtp}
            otpBtn={otpBtn}
            signUpFormRef={signUpFormRef}
            mobileDisabled={mobileDisabled}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            setOtp={setOtp}
            otp={otp}
            resendOtp={resendOtp}
            isHuman={isHuman}
            captchOnChange={captchOnChange}
            captchOnExpired={captchOnExpired}
          />
        )}
      </Modal.Body>
      {info && (
        <Alert
          variant="success"
          dismissible
          role="alert"
          className="currentOrderInfo"
          onClose={() => {
            setInfo("");
          }}
        >
          {info}
        </Alert>
      )}

      {message && errorMsg.push(<li key={0.0}>{message}</li>)}

      {otp.length > 0 &&
        errorMsg.push(<li key={0.1}>OTP field is required</li>)}

      {Object.values(errors).forEach((err: any, index: any) => {
        if (typeof err !== "undefined")
          errorMsg.push(<li key={index}>{err.message}</li>);
      })}
      {errorMsg.length != 0 ? (
        <Alert
          variant="danger"
          dismissible
          role="alert"
          className=""
          onClose={() => {
            setMessage(null);
            errorMsg = [];
          }}
        >
          Errors:
          <ul>{errorMsg}</ul>
        </Alert>
      ) : (
        ""
      )}

      <Modal.Footer>
        <Button
          type="button"
          onClick={props.onHide}
          variant="outline-primary"
          className="d-flex w-100 text-center justify-content-center"
        >
          CANCEL
        </Button>
        {form === "signin" && (
          <Button
            type="submit"
            variant="primary"
            className="d-flex w-100 text-center justify-content-center"
            form="signInForm"
            disabled={!isHuman}
          >
            SIGN IN
          </Button>
        )}
        {form === "signup" && (
          <Button
            type="submit"
            variant="primary"
            form="signUpForm"
            className="d-flex w-100 text-center justify-content-center"
            disabled={!isHuman}
          >
            SIGN UP
          </Button>
        )}
        {form === "forgot" && (
          <Button
            type="submit"
            variant="primary"
            form="forgotForm"
            className="d-flex w-100 text-center justify-content-center"
            disabled={!isHuman}
          >
            Reset Password
          </Button>
        )}

        <div className="text-center pt-3">
          {form === "signin" && "Don't you have an account? "}
          {form === "signup" && "Already have an account? "}
          <Link className="font-weight-bold" to="" onClick={backToSignUp}>
            {form === "signin" && "Sign Up"}
            {form === "signup" && "Sign In"}
          </Link>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default LoginModal;
