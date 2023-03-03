import React, { useState, useEffect } from "react";
import Router from "./Router";
import { GlobalStyle } from "./styles/GlobalStyle";
import { app } from "./myBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "./store";
import { userActions } from "./store/userSlice";

const App = () => {
  const [init, setInit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(
          userActions.setLoggedIn({
            isLoggedIn: true,
            userUid: uid,
            userName: user.displayName,
            userUrl: user.photoURL,
          })
        );
      } else {
        dispatch(
          userActions.setLoggedIn({
            isLoggedIn: false,
            userUid: "",
            userName: "",
            userUrl: "",
          })
        );
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      <GlobalStyle />
      {init ? <Router /> : "Initializing..."}
    </>
  );
};

export default App;
