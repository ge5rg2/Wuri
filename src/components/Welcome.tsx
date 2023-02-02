import React, { useState } from "react";
import Input from "./common/Input";
import Btn from "./common/Btn";

const Welcome = () => {
  const [userId, setUserId] = useState<string>();
  const [userPassword, setUserPassword] = useState<any>();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("completed!");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name == "email") {
      setUserId(value);
    } else if (name == "pw") {
      setUserPassword(value);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          value={userId}
          name="email"
          label="E-mail"
          types="email"
        />
        <Input
          onChange={onChange}
          value={userPassword}
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
