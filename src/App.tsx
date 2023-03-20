import React, { useState, useEffect } from "react";
import Router from "./Router";
import { GlobalStyle } from "./styles/GlobalStyle";
import { app, dbService } from "./myBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, collection, getDocs, query, where } from "@firebase/firestore";
import { useDispatch } from "./store";
import { userActions } from "./store/userSlice";

const App = () => {
  const [init, setInit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userInfoRef = collection(dbService, "userInfo");
        const userQuery = query(userInfoRef, where("userId", "==", uid));
        const userQuerySnapshot = await getDocs(userQuery);
        const coupleUserId = userQuerySnapshot.docs[0].data().coupleId;
        dispatch(
          userActions.setLoggedIn({
            isLoggedIn: true,
            userUid: uid,
            userName: user.displayName,
            userUrl: user.photoURL,
            coupleId: coupleUserId ? coupleUserId : "",
          })
        );
      } else {
        dispatch(
          userActions.setLoggedIn({
            isLoggedIn: false,
            userUid: "",
            userName: "",
            userUrl: "",
            coupleId: "",
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
