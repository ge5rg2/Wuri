import { MainContainer } from "../styles/HomeStyle";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { dbService } from "../myBase";
import { useSelector, useDispatch } from "../store";
import { getAuth } from "firebase/auth";
import { menuActions } from "../store/menuSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const [loginMethod, setLoginMethod] = useState<string>("");
  const userInfo = useSelector((state) => state.user);
  const auth = getAuth();
  const user = auth.currentUser;
  const provider = user?.providerData[0].providerId;

  const getMyAccount = async () => {
    console.log(provider);
    const q = query(
      collection(dbService, "diarys"),
      where("creatorId", "==", userInfo.userUid)
    );
    const querySnapshot = await getDocs(q);
    /*     
    console.log(
      querySnapshot.forEach((doc) => console.log(doc.id, " => ", doc.data()))
    ); 
    */
    if (user !== null) {
      getLoginMethod();
    }
  };

  const getLoginMethod = () => {
    if (user !== null) {
      if (provider == "password") {
        setLoginMethod("Log in via Email account");
      } else if (provider == "google.com") {
        setLoginMethod("Log in via Google account");
      } else if (provider == "github.com") {
        setLoginMethod("Log in via Github account");
      }
    }
  };

  useEffect(() => {
    dispatch(menuActions.openAccount());
    getMyAccount();
  }, []);

  return (
    <MainContainer>
      <img
        src={userInfo.userUrl + "-mo"}
        style={{ height: "10%", width: "10%", borderRadius: "50%" }}
      />
      <div>{userInfo.userName}</div>
      <div>{loginMethod}</div>
    </MainContainer>
  );
};

export default Profile;
