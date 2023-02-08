import Nav from "../components/Nav";
import Input from "../components/common/Input";
import React, { useState, useEffect } from "react";
import { dbService } from "../myBase";
import { collection, addDoc, getDocs } from "firebase/firestore";

interface Diary {
  id: string;
  diary: any;
}

const Home = () => {
  const [diary, setDiary] = useState("");
  const [diarys, setDiarys] = useState<Diary[]>([]);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const date = new Date();
    try {
      const docRef = await addDoc(collection(dbService, "diary"), {
        diary,
        createdAt: date,
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
        <h4>{el.diary}</h4>
      </div>
    );
  });

  const getDiarys = async () => {
    try {
      const querySnapshot = await getDocs(collection(dbService, "diary"));
      querySnapshot.forEach((doc) => {
        const diaryObject: any = {
          id: doc.id,
          ...doc.data(),
        };
        console.log(diaryObject);
        setDiarys((prev: Diary[]) => [diaryObject, ...prev]);
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  useEffect(() => {
    getDiarys();
  }, []);

  return (
    <>
      <Nav />
      <h1>Home</h1>
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
