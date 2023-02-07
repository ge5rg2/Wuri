import React, { useState } from "react";
import Input from "./common/Input";
import Btn from "./common/Btn";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Welcome = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [newAccount, setNewAccount] = useState(true);

  const { email, password } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(inputs);
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
        console.log(inputs);
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          value=""
          name="email"
          label="E-mail"
          types="email"
        />
        <Input
          onChange={onChange}
          value=""
          name="pw"
          label="Password"
          types="password"
        />
        <Input value="Log In" types="submit" />
      </form>
      <div>
        <Btn children="Continue with Google" />
        <button>Continue with Github</button>
      </div>
    </>
  );
};

export default Welcome;
