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
        dispatch(
          userActions.setLoggedIn({
            isLoggedIn: true,
            userUid: uid,
            userName: user.displayName,
            userUrl: user.photoURL,
            coupleId: "",
            coupleName: "",
            coupleUrl: "",
          })
        );
        if (typeof userQuerySnapshot.docs[0].data().coupleId !== "undefined") {
          const coupleId = userQuerySnapshot.docs[0].data().coupleId;
          const CoupleUserQuery = query(
            collection(dbService, "userInfo"),
            where("userId", "==", coupleId)
          );
          const CoupleUserQuerySnapshot = await getDocs(CoupleUserQuery);
          const CoupleUserData = CoupleUserQuerySnapshot.docs[0].data();
          dispatch(
            userActions.setConnectCouple({
              coupleId,
              coupleName: CoupleUserData.userName,
              coupleUrl: CoupleUserData.userUrl,
            })
          );
        }
      } else {
        dispatch(
          userActions.setLoggedIn({
            isLoggedIn: false,
            userUid: "",
            userName: "",
            userUrl: "",
            coupleId: "",
            coupleName: "",
            coupleUrl: "",
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
