import { MainContainer } from "../styles/HomeStyle";
import React, { useEffect, useState } from "react";
import Input from "../components/common/Input";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import { dbService, storageService } from "../myBase";
import { useSelector, useDispatch } from "../store";
import { userActions } from "../store/userSlice";
import { getAuth } from "firebase/auth";
import Btn from "../components/common/Btn";

const Couple = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const userUid = useSelector((state) => state.user.userUid);
  const user = auth.currentUser;
  const [coupleCode, setCoupleCode] = useState<string>("");
  let date = new Date();

  const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setCoupleCode(value);
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const codeRef = collection(dbService, "connect");
    const snap = await getDoc(doc(dbService, "connect", `${coupleCode}`));
    if (typeof snap.data() == "undefined") {
      alert("That code is Undefind!");
      return setCoupleCode("");
    } else if (snap.data()?.creatorId == userUid) {
      alert("That is your own code! try again by use another code.");
      return setCoupleCode("");
    } else if (
      Math.floor(date.getTime() - snap.data()?.createdAt.toDate().getTime()) /
        1000 /
        60 >
      10
    ) {
      alert("The validity period of the existing code has expired.");
      return setCoupleCode("");
    } else {
      const data = snap.data();
      console.log(data?.creatorId);
      const userQuery = query(
        collection(dbService, "userInfo"),
        where("userId", "==", data?.creatorId)
      );
      const userQuerySnapshot = await getDocs(userQuery);
      const userData = userQuerySnapshot.docs[0].data();
      console.log(userData);
      const ok = window.confirm(
        `Are you sure connected to ${userData.userName}?`
      );
      if (ok) {
        const q = query(
          collection(dbService, "userInfo"),
          where("userId", "==", data?.creatorId)
        );
        const querySnapshot = await getDocs(q);
        const { id } = querySnapshot.docs[0];
        await updateDoc(doc(dbService, "userInfo", `${id}`), {
          coupleId: userUid,
        });
        const q2 = query(
          collection(dbService, "userInfo"),
          where("userId", "==", userUid)
        );
        const querySnapshot2 = await getDocs(q2);
        await updateDoc(
          doc(dbService, "userInfo", `${querySnapshot2.docs[0].id}`),
          {
            coupleId: data?.creatorId,
          }
        );
        dispatch(
          userActions.setConnectCouple({
            coupleId: data?.creatorId,
          })
        );
        //delete connect document
        await deleteDoc(doc(dbService, "connect", `${coupleCode}`));
        // also need to delete couple code(if coupleuser also create code, that code need to delete)
        const CoupleUserCodeQuery = query(
          collection(dbService, "connect"),
          where("creatorId", "==", userUid)
        );
        const CoupleUserCodeQuerySnapshot = await getDocs(CoupleUserCodeQuery);
        if (CoupleUserCodeQuerySnapshot.size > 0) {
          await deleteDoc(
            doc(
              dbService,
              "connect",
              `${CoupleUserCodeQuerySnapshot.docs[0].id}`
            )
          );
        }
        return alert(`Connected with ${userData.userName}`);
      } else {
        return alert("cancel");
      }
    }
  };

  useEffect(() => {
    console.log(userUid);
  }, []);

  return (
    <>
      <MainContainer>
        <div>Couple</div>
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Type couple code!"
            value={coupleCode}
            onChange={onCodeChange}
            maxLength={6}
          />
          <Btn type="submit" children="Check" />
        </form>
      </MainContainer>
    </>
  );
};

export default Couple;
