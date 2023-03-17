import { MainContainer } from "../styles/HomeStyle";
import React, { useEffect, useState } from "react";
import Input from "../components/common/Input";
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
} from "@firebase/firestore";
import { dbService, storageService } from "../myBase";
import { useSelector, useDispatch } from "../store";
import { getAuth } from "firebase/auth";
import Btn from "../components/common/Btn";

/**
 * todo
 * 1. check input code
 * 2. compare with connect code data and check expiration period
 * 3. if both of condition passed, addDoc "couple"
 * 4. couple content {couple [userId1, userId2]}
 */

const Couple = () => {
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
    } else {
      // check expirate
      const data = snap.data();
      console.log(data?.creatorId);
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
