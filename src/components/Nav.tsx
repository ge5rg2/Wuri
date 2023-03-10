import { useNavigate } from "react-router-dom";
import {
  Wraper,
  SubContainer,
  MainContainer,
  IconContainer,
} from "..//styles/NavStyle";
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
    dispatch(menuActions.closeAccount());
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        dispatch(menuActions.closeMenu());
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };

  const onDiaryClcik = () => {
    dispatch(menuActions.closeAccount());
    navigate("/");
  };

  const onProfileClcik = () => {
    dispatch(menuActions.openAccount());
    navigate("/profile");
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
        <IconContainer
          onMouseOver={onMenuMouseOver}
          onMouseLeave={onMenuMouseLeave}
        >
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
                  {menuState.isProfile ? (
                    <div className="subNavDiv" onClick={onDiaryClcik}>
                      Diary
                    </div>
                  ) : (
                    <div className="subNavDiv" onClick={onProfileClcik}>
                      Profile
                    </div>
                  )}
                </div>
              </SubContainer>
            </>
          ) : (
            <MenuIcon
              style={{ color: "#ffff", cursor: "pointer" }}
              fontSize="large"
            />
          )}
        </IconContainer>
        <img onClick={onDiaryClcik} src="/img/WuriNone.png" />
      </MainContainer>
    </Wraper>
  );
};

export default Nav;
