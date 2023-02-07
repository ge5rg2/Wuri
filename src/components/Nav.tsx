import { useNavigate } from "react-router-dom";
import { Wraper, SubContainer } from "..//styles/NavStyle";
import { getAuth, signOut } from "firebase/auth";
import React from "react";

const Nav = () => {
  const navigate = useNavigate();
  const onSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };

  return (
    <Wraper>
      <SubContainer>
        <div className="subNav">
          <div onClick={onSignOut} className="subNavDiv">
            Sign out
          </div>
          <div className="subNavDiv">Profile</div>
        </div>
      </SubContainer>
    </Wraper>
  );
};

export default Nav;
