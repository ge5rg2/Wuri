import Nav from "../components/Nav";
import { MainContainer } from "../styles/HomeStyle";
import React, { useEffect } from "react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { dbService } from "../myBase";
import { useSelector } from "../store";
import { getAuth } from "firebase/auth";

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userName = user?.displayName;
  const url: any = user?.photoURL;
  const provider = user?.providerData[0].providerId;
  const uid = useSelector((state) => state.user.userUid);

  const getMyAccount = async () => {
    const q = query(
      collection(dbService, "diarys"),
      where("creatorId", "==", uid)
    );
    const querySnapshot = await getDocs(q);
    /*     console.log(
      querySnapshot.forEach((doc) => console.log(doc.id, " => ", doc.data()))
    ); */
  };

  useEffect(() => {
    getMyAccount();
  }, []);

  return (
    <MainContainer>
      <Nav />
      <img src={url + "-mo"} />
      <div>{userName}</div>
      <div>{provider}</div>
    </MainContainer>
  );
};

export default Profile;
