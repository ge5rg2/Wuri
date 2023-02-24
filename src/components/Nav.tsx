import { useNavigate } from "react-router-dom";
import { Wraper, SubContainer } from "..//styles/NavStyle";
import { getAuth, signOut } from "firebase/auth";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import React, { useState } from "react";
import { useDispatch, useSelector } from "../store";
import { menuActions } from "../store/menuSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const menuState = useSelector((state) => state.menu);
  const [menu, setMenu] = useState(false);
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
    dispatch(menuActions.openMenu);
    console.log(menuState.isMenu);
    setMenu(true);
  };

  const onMenuMouseLeave = () => {
    dispatch(menuActions.closeMenu);
    console.log(menuState.isMenu);
    setMenu(false);
  };

  return (
    <Wraper>
      <SubContainer>
        <div onMouseOver={onMenuMouseOver} onMouseLeave={onMenuMouseLeave}>
          {menu ? (
            <KeyboardDoubleArrowRightIcon
              style={{ color: "#ffff", cursor: "pointer" }}
              fontSize="large"
            />
          ) : (
            <MenuIcon
              style={{ color: "#ffff", cursor: "pointer" }}
              fontSize="large"
            />
          )}
        </div>
        <div className="subNav">
          <div onClick={onSignOut} className="subNavDiv">
            Sign out
          </div>
          <div className="subNavDiv" onClick={onAccountClcik}>
            Account
          </div>
          <img src="/img/WuriNone.png" />
        </div>
      </SubContainer>
    </Wraper>
  );
};

export default Nav;
