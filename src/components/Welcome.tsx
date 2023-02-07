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

const Welcome = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [newAccount, setNewAccount] = useState(true);
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
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (event: React.MouseEvent) => {
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
      console.log(name);
    }
  };

  return (
    <>
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
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
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
      </div>
    </>
  );
};

export default Welcome;
