import { MainContainer } from "../styles/HomeStyle";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { dbService } from "../myBase";
import { useSelector, useDispatch } from "../store";
import { getAuth } from "firebase/auth";
import { menuActions } from "../store/menuSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const auth = getAuth();
  const user = auth.currentUser;
  const provider = user?.providerData[0].providerId;
  const getMyAccount = async () => {
    const q = query(
      collection(dbService, "diarys"),
      where("creatorId", "==", userInfo.userUid)
    );
    const querySnapshot = await getDocs(q);
    /*     console.log(
      querySnapshot.forEach((doc) => console.log(doc.id, " => ", doc.data()))
    ); */
    if (user !== null) {
    }
  };

  useEffect(() => {
    dispatch(menuActions.openAccount());
    getMyAccount();
  }, []);

  return (
    <MainContainer>
      <img src={userInfo.userUrl + "-mo"} />
      <div>{userInfo.userName}</div>
      <div>{provider}</div>
    </MainContainer>
  );
};

export default Profile;
