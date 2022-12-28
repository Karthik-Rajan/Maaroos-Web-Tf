import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import SignInForm from "../common/SignInForm";
import SignUpForm from "../common/SignUpForm";
import ForgotForm from "../common/ForgotForm";
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
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import awsConfig from "../../awsConfig";
import {
  NOTSIGNIN,
  SIGNEDIN,
  OTPSENT,
  NOUSER,
  WRONGOTP,
  USEREXISTS,
  UNKNOWNERR,
  USERSIGNUP,
  WRONGUSER,
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
  const [disabled, setDisabled] = useState(false);
  const [mobileDisabled, setMobileDisabled] = useState(false);
  const [otpBtn, setOtpBtn] = useState(false);

  /*** Forgot */
  const [forgot, setForgot] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  /**Common */
  const [form, setForm] = useState("signin");
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState(false);

  /** Form Ref */
  const signInFormRef = useRef();
  const signUpFormRef = useRef();
  const forgotForm = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSignInSubmit: SubmitHandler<Inputs> = (data) => {
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
        console.log(e);
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
    let { signUpMobile, signUpPassword, signUpOtp } = data;

    let userName = signUpMobile.replace("+", "");

    if (!signUpOtp) {
      await Auth.signUp({
        username: userName,
        password: signUpPassword,
        attributes: {
          phone_number: signUpMobile,
        },
      })
        .then((res) => {
          setShowOtp(true);
          setOtpBtn(true);
          setMobileDisabled(true);
        })
        .catch((e) => {
          console.log(e);
          setDisabled(false);
          setInfo("");
          if (e.code === "UserNotFoundException") {
            setMessage(NOUSER);
          } else if (e.code === "UsernameExistsException") {
            setMessage(
              USEREXISTS + ` If you want to resend OTP, please try resending it`
            );
            //resendOtp(userName);

            //signIn();
          } else {
            setMessage(e.message);
          }
        });
    } else {
      onVerify(userName, signUpOtp, signUpPassword);
    }
  };

  const onVerify = (userName: any, signUpOtp: any, signUpPassword: any) => {
    setDisabled(true);

    Auth.confirmSignUp(userName, signUpOtp).then((res) => {
      console.log(res);
      setInfo(USERSIGNUP);
      logIn(userName, signUpPassword);
    });
  };

  const resendOtp = (resendMobile: any) => {
    resendMobile = resendMobile.replace("+", "");
    Auth.resendSignUp(resendMobile)
      .then((res) => {
        setShowOtp(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const reset = () => {
    setForm(form == "signin" ? "signup" : "signin");
    errors.mobile = undefined;
    errors.password = undefined;
    errors.signUpMobile = undefined;
    errors.signUpPassword = undefined;
    setNotification(false);
  };

  const showForgot = () => {
    setForm("forgot");
  };

  const onForgotFormSubmit = () => {};
  const backToLogin = () => {
    setForm("signin");
  };

  return (
    <Modal show={props.visible} onHide={props.onHide} centered>
      <Modal.Header closeButton={true}>
        <Modal.Title as="h5" id="add-address">
          {form == "signin"
            ? `SIGN IN`
            : form == "forgot"
            ? `FORGOT`
            : `SIGN UP`}
          {form == "signin" && <i> - Welcome Back!</i>}
          {form == "forgot" && <i> - Reset your password</i>}
          {form == "signup" && <i> - Hey, New Buddy!</i>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {form == "signin" && (
          <SignInForm
            onSignInSubmit={onSignInSubmit}
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            reset={reset}
            form={form}
            signInFormRef={signInFormRef}
            message={message}
            setMessage={setMessage}
            showForgot={showForgot}
            backToLogin={backToLogin}
          />
        )}

        {form == "forgot" && (
          <ForgotForm
            onForgotFormSubmit={onForgotFormSubmit}
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            reset={reset}
            form={form}
            forgotForm={forgotForm}
            message={message}
            setMessage={setMessage}
            showForgotPassword={showForgotPassword}
            setShowForgotPassword={setShowForgotPassword}
          />
        )}

        {form == "signup" && (
          <SignUpForm
            onSignUpSubmit={onSignUpSubmit}
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            reset={reset}
            form={form}
            showOtp={showOtp}
            otpBtn={otpBtn}
            signUpFormRef={signUpFormRef}
            message={message}
            setMessage={setMessage}
            mobileDisabled={mobileDisabled}
          />
        )}
      </Modal.Body>
      {info ? (
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
        {form == "signin" && (
          <Button
            type="submit"
            variant="primary"
            className="d-flex w-100 text-center justify-content-center"
            form="signInForm"
          >
            SIGN IN
          </Button>
        )}
        {form == "signup" && (
          <Button
            type="submit"
            variant="primary"
            form="signUpForm"
            className="d-flex w-100 text-center justify-content-center"
          >
            SIGN UP
          </Button>
        )}
        {form == "forgot" && (
          <Button
            type="submit"
            variant="primary"
            form="forgotForm"
            className="d-flex w-100 text-center justify-content-center"
          >
            Reset Password
          </Button>
        )}

        <div className="text-center pt-3">
          {form == "signin"
            ? "Don't you have an account? "
            : " Already have an account? "}
          <Link
            className="font-weight-bold"
            to=""
            onClick={() => {
              setForm(form == "signin" ? "signup" : "signin");
              errors.mobile = undefined;
              errors.password = undefined;
              errors.signUpMobile = undefined;
              errors.signUpPassword = undefined;
              setNotification(false);
            }}
          >
            {form == "signin" ? "Sign Up" : "Sign In"}
          </Link>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default LoginModal;
