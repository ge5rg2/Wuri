import { useNavigate } from "react-router-dom";
import { Wraper, SubContainer, MainContainer } from "..//styles/NavStyle";
import { getAuth, signOut } from "firebase/auth";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import React, { useState } from "react";
import { useDispatch, useSelector } from "../store";
import { menuActions } from "../store/menuSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const menuState = useSelector((state) => state.menu);
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

  const onAccountClcik = () => {
    navigate("/account");
  };

  const onMenuMouseOver = () => {
    dispatch(menuActions.openMenu());
  };

  const onMenuMouseLeave = () => {
    dispatch(menuActions.closeMenu());
  };

  return (
    <Wraper>
      <MainContainer>
        <div onMouseOver={onMenuMouseOver} onMouseLeave={onMenuMouseLeave}>
          {menuState.isMenu ? (
            <>
              <KeyboardDoubleArrowRightIcon
                style={{ color: "#ffff", cursor: "pointer" }}
                fontSize="large"
              />
              <SubContainer>
                <div className="subNav">
                  <div onClick={onSignOut} className="subNavDiv">
                    Sign out
                  </div>
                  <div className="subNavDiv" onClick={onAccountClcik}>
                    Account
                  </div>
                </div>
              </SubContainer>
            </>
          ) : (
            <MenuIcon
              style={{ color: "#ffff", cursor: "pointer" }}
              fontSize="large"
            />
          )}
          <img src="/img/WuriNone.png" />
        </div>
      </MainContainer>
    </Wraper>
  );
};

export default Nav;
