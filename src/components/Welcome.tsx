import React, { useState } from "react";
import Btn from "./common/Btn";
import Input from "./common/Input";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  MainContainer,
  SubContainer,
  ImgContainer,
  BtnContianer,
  AuthContainer,
  AuthHeaderContainer,
  AuthInputContainer,
  AuthPcontainer,
  AuthBtnContainer,
} from "../styles/WelcomeStyle";

type MyStateType = {
  isSignUp: boolean;
  isLogIn: boolean;
};

const Welcome = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [isAccount, setIsAccount] = useState(false);
  const [currentState, setCurrentState] = useState<MyStateType>({
    isSignUp: false,
    isLogIn: false,
  });
  const [error, setError] = useState("");
  const { email, password } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (currentState.isSignUp) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error: any) {
      console.log(error.message);
      alert(error.message);
      setError(error.message);
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        alert("This Email is already in use.");
        return setInputs({
          email: "",
          password: "",
        });
      }

      if (error.message == "Firebase: Error (auth/invalid-email).") {
        alert("Invalid account. Please enter again.");
        return setInputs({
          email: "",
          password: "",
        });
      }
    }
  };
  const toggleAccount = () => setIsAccount((prev) => !prev);

  const onAuthClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const { value } = e.target as HTMLInputElement;
    setIsAccount(true);
    if (value === "login") {
      setCurrentState((prevState) => ({
        isSignUp: false,
        isLogIn: true,
      }));
    } else if (value === "signUp") {
      setCurrentState((prevState) => ({
        isSignUp: true,
        isLogIn: false,
      }));
    }
  };

  const onSocialClick = async (event: React.MouseEvent) => {
    // 모바일에서는 기본적으로 새창이 열리는 것이 막혀있기 때문에 preventDefault 를 적용
    event.preventDefault();
    const { name } = event.target as HTMLInputElement;
    let provider;
    const auth = getAuth();
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    if (provider) {
      const data = await signInWithPopup(auth, provider);
      console.log(data);
    }
  };

  return (
    <MainContainer>
      {isAccount ? (
        currentState.isSignUp ? (
          <AuthContainer>
            <div className="AuthImgContainer">
              <div className="AuthImgBox">
                <img src="/img/WuriNone.png" />
              </div>
            </div>
            <AuthHeaderContainer>
              <h1>Create your account</h1>
            </AuthHeaderContainer>
            <AuthInputContainer>
              <Input
                name="email"
                type="email"
                placeholder="Emaill address"
                required
                size={3}
                value={email}
                onChange={onChange}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                size={3}
                value={password}
                onChange={onChange}
              />
            </AuthInputContainer>
            <AuthInputContainer>
              <Btn
                children="Continue"
                size="large"
                ButtonType="Emphasized"
                value="continue"
                onClick={onSubmit}
              />
            </AuthInputContainer>
            <AuthPcontainer>
              <p>
                {`Already have an account? `}
                <a
                  className="a_SignUp"
                  onClick={() =>
                    setCurrentState((prevState) => ({
                      isSignUp: false,
                      isLogIn: true,
                    }))
                  }
                >
                  Log in
                </a>
              </p>
            </AuthPcontainer>
            <div className="div_divider">
              <span>OR</span>
            </div>
            <AuthBtnContainer>
              <Btn
                Icon="google"
                onClick={onSocialClick}
                name="google"
                size="large"
                ButtonType="Default"
                children="Continue with Google"
              />
              <Btn
                Icon="github"
                onClick={onSocialClick}
                size="large"
                ButtonType="Default"
                name="github"
                children="Continue with Github"
              />
            </AuthBtnContainer>
          </AuthContainer>
        ) : (
          <AuthContainer>
            <div className="AuthImgContainer">
              <div className="AuthImgBox">
                <img src="/img/WuriNone.png" />
              </div>
            </div>
            <AuthHeaderContainer>
              <h1>Welcome back</h1>
            </AuthHeaderContainer>
            <AuthInputContainer>
              <Input
                name="email"
                type="email"
                placeholder="Emaill address"
                required
                size={3}
                value={email}
                onChange={onChange}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                size={3}
                value={password}
                onChange={onChange}
              />
            </AuthInputContainer>
            <AuthInputContainer>
              <Btn
                children="Continue"
                size="large"
                ButtonType="Emphasized"
                value="continue"
                onClick={onSubmit}
              />
            </AuthInputContainer>
            <AuthPcontainer>
              <p>
                {`Don't have an account? `}
                <a
                  className="a_SignUp"
                  onClick={() =>
                    setCurrentState((prevState) => ({
                      isSignUp: true,
                      isLogIn: false,
                    }))
                  }
                >
                  Sign up
                </a>
              </p>
            </AuthPcontainer>
            <div className="div_divider">
              <span>OR</span>
            </div>
            <AuthBtnContainer>
              <Btn
                Icon="google"
                onClick={onSocialClick}
                name="google"
                size="large"
                ButtonType="Default"
                children="Continue with Google"
              />
              <Btn
                Icon="github"
                onClick={onSocialClick}
                size="large"
                ButtonType="Default"
                name="github"
                children="Continue with Github"
              />
            </AuthBtnContainer>
          </AuthContainer>
        )
      ) : (
        <SubContainer>
          <ImgContainer>
            <img src="/img/WuriNone.png" />
          </ImgContainer>
          <div className="greetingContainer">
            <div>Welcome to Wuri</div>
            <div>Log in with your Wuri account to continue</div>
          </div>
          <BtnContianer>
            <div className="BtnContianer_Sub">
              <Btn
                size="medium"
                children="Log in"
                ButtonType="Emphasized"
                value="login"
                onClick={onAuthClick}
              />
            </div>
            <div className="BtnContianer_Sub">
              <Btn
                size="medium"
                children="Sign up"
                ButtonType="Emphasized"
                value="signUp"
                onClick={onAuthClick}
              />
            </div>
          </BtnContianer>
        </SubContainer>
      )}
    </MainContainer>
  );
};

export default Welcome;

/* 
<form onSubmit={onSubmit}>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
          />
          <input
            type="submit"
            value={isAccount ? "Create Account" : "Log In"}
          />
          {error}
        </form>
        <span onClick={toggleAccount}>
          {isAccount ? "Sign In" : "Create Account"}
        </span>
        <div>
          <Btn
            onClick={onSocialClick}
            name="google"
            children="Continue with Google"
          />
          <Btn
            onClick={onSocialClick}
            name="github"
            children="Continue with Github"
          />
        </div> */
