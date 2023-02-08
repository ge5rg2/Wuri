import Nav from "../components/Nav";
import Input from "../components/common/Input";
import React, { useState } from "react";
import { dbService } from "../myBase";
import { collection, addDoc } from "firebase/firestore";

const Home = () => {
  const [diary, setDiary] = useState("");

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const date = new Date();
    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
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
    </>
  );
};
export default Home;
