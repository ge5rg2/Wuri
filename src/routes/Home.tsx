import Input from "../components/common/Input";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { dbService } from "../myBase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Diary } from "../interface/tpyes";
import Diarys from "../components/Diarys";
import { useSelector } from "../store";
import Btn from "../components/common/Btn";
import { v4 as uuidv4 } from "uuid";
import { MainContainer, SubContainer } from "../styles/HomeStyle";

const Home = () => {
  const navigate = useNavigate();
  const userStore = useSelector((state) => state.user);
  const uid = userStore.userUid;
  const [diarys, setDiarys] = useState<Diary[]>([]);

  const diaryData: JSX.Element[] = diarys.map((el) => {
    return (
      <Diarys
        key={el.id}
        diary={el.text}
        isOwner={el.creatorId === uid}
        obj={el}
      />
    );
  });

  const onEditPageClick = () => {
    navigate("/edit/1");
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "diarys"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const diaryObject: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDiarys(diaryObject);
    });
  }, []);

  return (
    <>
      <MainContainer>
        <SubContainer>
          <img src={userStore.userUrl + "-mo"} />
          <form>
            <Input
              onClick={onEditPageClick}
              type="text"
              placeholder="What's on your mind?"
            />
          </form>
        </SubContainer>
        {diaryData}
      </MainContainer>
    </>
  );
};
export default Home;
