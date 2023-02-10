import Nav from "../components/Nav";
import Input from "../components/common/Input";
import React, { useState, useEffect } from "react";
import { dbService } from "../myBase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { Diary } from "../interface/tpyes";
import { useSelector } from "../store";

const Home = () => {
  const userStore = useSelector((state) => state.user);

  const [diary, setDiary] = useState("");
  const [diarys, setDiarys] = useState<Diary[]>([]);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const date = new Date();
    try {
      const docRef = await addDoc(collection(dbService, "diary"), {
        text: diary,
        createdAt: date,
        creatorId: userStore.userUid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setDiary("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDiary(value);
  };

  const diaryData: JSX.Element[] = diarys.map((el) => {
    return (
      <div key={el.id}>
        <h4>{el.text}</h4>
      </div>
    );
  });

  useEffect(() => {
    const q = query(
      collection(dbService, "diary"),
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
      <Nav />
      <h1>Diary</h1>
      <form onSubmit={onSubmit}>
        <Input
          value={diary}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
        />
        <Input type="submit" value="diary" />
      </form>
      {diaryData}
    </>
  );
};
export default Home;
