import Input from "../components/common/Input";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { dbService } from "../myBase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Diary } from "../interface/tpyes";
import Diarys from "../components/Diarys";
import { useSelector } from "../store";
import Btn from "../components/common/Btn";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import { MainContainer, SubContainer } from "../styles/HomeStyle";

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const userStore = useSelector((state) => state.user);
  const uid = userStore.userUid;
  const [diarys, setDiarys] = useState<Diary[]>([]);

  const diaryData: JSX.Element[] = diarys.map((el) => {
    return <Diarys key={el.id} diary={el.text} obj={el} doc="diarys" />;
  });

  const onWritePageClick = () => {
    navigate("/write");
  };

  const createSimpeUserInfo = async () => {
    const q = query(
      collection(dbService, "userInfo"),
      where("userId", "==", userStore.userUid)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      const { id } = querySnapshot.docs[0];
      await updateDoc(doc(dbService, "userInfo", `${id}`), {
        userName: userStore.userName,
        userUrl: userStore.userUrl,
        userId: uid,
      });
    } else {
      await addDoc(collection(dbService, "userInfo"), {
        userName: userStore.userName,
        userUrl: userStore.userUrl,
        userId: uid,
      });
    }
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "diarys"),
      where("creatorId", "==", uid),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const diaryObject: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      createSimpeUserInfo();
      setDiarys(diaryObject);
    });
  }, []);

  return (
    <>
      <MainContainer>
        <SubContainer>
          <img
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            src={userStore.userUrl + "-mo"}
          />
          <Btn onClick={onWritePageClick} children="What's on your mind?" />
        </SubContainer>
        {diaryData}
      </MainContainer>
    </>
  );
};
export default Home;
