import Nav from "../components/Nav";
import Input from "../components/common/Input";
import React, { useState, useEffect, useRef, forwardRef } from "react";
import { dbService } from "../myBase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { Diary } from "../interface/tpyes";
import Diarys from "../components/Diarys";
import { useSelector } from "../store";
import Btn from "../components/common/Btn";

const Home = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const userStore = useSelector((state) => state.user);
  const uid = userStore.userUid;

  const [diary, setDiary] = useState("");
  const [diarys, setDiarys] = useState<Diary[]>([]);
  const [attachment, setAttachment] = useState<string | ArrayBuffer | null>();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const date = new Date();
    try {
      const docRef = await addDoc(collection(dbService, "diarys"), {
        text: diary,
        createdAt: date,
        creatorId: uid,
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

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    console.log(fileInput);
    if (files?.length) {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const result = (finishedEvent.currentTarget as FileReader).result;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachment = () => {
    setAttachment(null);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

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
      <Nav />
      <h1>Diary</h1>
      <form onSubmit={onSubmit}>
        <Input
          value={diary}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
        />
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <Input type="submit" value="diary" />
        {attachment && typeof attachment === "string" && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <Btn onClick={onClearAttachment} children="Clear" />
          </div>
        )}
      </form>
      {diaryData}
    </>
  );
};
export default Home;
