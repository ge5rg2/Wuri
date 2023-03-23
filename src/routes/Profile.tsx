import { MainContainer } from "../styles/HomeStyle";
import React, { useEffect, useState } from "react";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  getDoc,
  setDoc,
  getCountFromServer,
  deleteField,
  updateDoc,
} from "@firebase/firestore";
import { dbService } from "../myBase";
import { useSelector, useDispatch } from "../store";
import { getAuth } from "firebase/auth";
import Btn from "../components/common/Btn";
import { userActions } from "../store/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const [loginMethod, setLoginMethod] = useState<string>("");
  const [randomCode, setRandomCode] = useState<string>("");
  const [isCouple, setIsCouple] = useState<boolean>(false);
  const { userUid, userUrl, userName, coupleId, coupleName, coupleUrl } =
    useSelector((state) => state.user);
  const auth = getAuth();
  const user = auth.currentUser;
  const provider = user?.providerData[0].providerId;
  let date = new Date();

  const generateRandomCode = async () => {
    const codeRef = collection(dbService, "connect");
    const snapshot = await getCountFromServer(codeRef);
    let len = snapshot.data().count;
    for (let j = 0; j < len + 1; j++) {
      let str = "";
      for (let i = 0; i < 6; i++) {
        str += Math.floor(Math.random() * 10);
      }
      const snap = await getDoc(doc(dbService, "connect", `${str}`));
      if (typeof snap.data() == "undefined") {
        setRandomCode(str);
        return str;
      } else {
        str = "";
        continue;
      }
    }
  };

  const getMyAccount = async () => {
    /*     const q = query(
      collection(dbService, "diarys"),
      where("creatorId", "==", userInfo.userUid)
    );
    const querySnapshot = await getDocs(q);
       
    console.log(
      querySnapshot.forEach((doc) => console.log(doc.id, " => ", doc.data()))
    ); 
     */
    if (coupleId) {
      setIsCouple(true);
    } else {
      const codeRef = collection(dbService, "connect");
      const q = query(codeRef, where("creatorId", "==", userUid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        const currentCodeData = querySnapshot.docs[0].data();
        const connectCode = querySnapshot.docs[0].id;
        let codeTime = currentCodeData.createdAt.toDate().getTime();
        let expiration = Math.floor(date.getTime() - codeTime) / 1000 / 60;
        if (expiration > 10) {
          alert("The validity period of the existing code has expired.");
          await deleteDoc(doc(dbService, "connect", `${connectCode}`));
        } else {
          setRandomCode(connectCode);
        }
      }
    }
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

  const createCoupleCode = async () => {
    const random = await generateRandomCode();
    const codeRef = collection(dbService, "connect");
    const q = query(codeRef, where("creatorId", "==", userUid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      /*    get current user before code num   */
      const connectCode = querySnapshot.docs[0].id;
      await deleteDoc(doc(dbService, "connect", `${connectCode}`));
    }
    await setDoc(doc(codeRef, `${random}`), {
      createdAt: date,
      creatorId: userUid,
    });
  };

  const disconnectCouple = async () => {
    const CoupleUserQuery = query(
      collection(dbService, "userInfo"),
      where("userId", "==", coupleId)
    );
    const UserQuery = query(
      collection(dbService, "userInfo"),
      where("userId", "==", userUid)
    );
    const CoupleUserQuerySnapshot = await getDocs(CoupleUserQuery);
    const UserQuerySnapshot = await getDocs(UserQuery);
    const ok = window.confirm("Are you sure you want to disconnect Couple?");
    if (ok) {
      await updateDoc(
        doc(dbService, "userInfo", `${CoupleUserQuerySnapshot.docs[0].id}`),
        {
          coupleId: deleteField(),
        }
      );
      await updateDoc(
        doc(dbService, "userInfo", `${UserQuerySnapshot.docs[0].id}`),
        {
          coupleId: deleteField(),
        }
      );
      dispatch(
        userActions.setConnectCouple({
          coupleId: "",
          coupleName: "",
          coupleUrl: "",
        })
      );
      setIsCouple(false);
      alert("Disconnect complete!!");
    } else {
      return;
    }
  };

  useEffect(() => {
    getMyAccount();
  }, []);

  return (
    <MainContainer>
      <img
        src={userUrl + ""}
        style={{ height: "10%", width: "10%", borderRadius: "50%" }}
      />
      <div>{userName}</div>
      <div>{loginMethod}</div>
      {isCouple ? (
        <>
          <img
            src={coupleUrl + "-mo"}
            style={{ height: "10%", width: "10%", borderRadius: "50%" }}
          />
          <div>{coupleName}</div>
          <Btn onClick={disconnectCouple} children="Disconnect" />
        </>
      ) : randomCode ? (
        <>
          <div>{randomCode}</div>
          <Btn onClick={createCoupleCode} children="Code reissue." />
        </>
      ) : (
        <>
          <div>
            <Btn onClick={createCoupleCode} children="Create couple code!" />
          </div>
        </>
      )}
    </MainContainer>
  );
};

export default Profile;
