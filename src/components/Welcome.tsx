import React, { useState } from "react";
import Input from "./common/Input";

const Welcome = () => {
  const [userId, setUserId] = useState<string>();
  const [userPassword, setUserPassword] = useState<number>();

  const onSubmit = () => {
    alert("completed!");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input label="E-mail" types="email" />
        <Input label="Password" types="password" />
      </form>
    </>
  );
};

export default Welcome;
