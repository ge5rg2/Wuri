import Input from "../components/common/Input";
import React, { useState, useRef } from "react";
import { dbService, storageService } from "../myBase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { useSelector } from "../store";
import { v4 as uuidv4 } from "uuid";
import Btn from "../components/common/Btn";
import { MainContainer, SubContainer } from "../styles/WriteStyle";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);
  const userStore = useSelector((state) => state.user);
  const uid = userStore.userUid;
  const [title, setTitle] = useState("");
  const [diary, setDiary] = useState("");
  const [attachment, setAttachment] = useState<any>("");

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let attachmentUrl = "";
    const date = new Date();
    try {
      if (attachment !== "") {
        const fileRef = ref(storageService, `${uid}/${uuidv4()}`);
        const response = await uploadString(
          fileRef,
          attachment,
          "data_url"
        ).then(async (snapshot) => {
          attachmentUrl = await getDownloadURL(snapshot.ref);
        });
      }
      await addDoc(collection(dbService, "diarys"), {
        title: title,
        text: diary,
        createdAt: date,
        creatorId: uid,
        attachmentUrl,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setDiary("");
    setTitle("");
    onClearAttachment();
    return navigate("/");
  };

  const onClearAttachment = () => {
    setAttachment("");
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
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

  const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setDiary(value);
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setTitle(value);
  };

  return (
    <>
      <MainContainer>
        <div>Write</div>
        <SubContainer>
          <form onSubmit={onSubmit}>
            <Input
              value={title}
              onChange={onTitleChange}
              type="text"
              placeholder="Summarize your day in one word"
            />
            {attachment && typeof attachment === "string" && (
              <div>
                <img src={attachment} width="50px" height="50px" />
                <Btn onClick={onClearAttachment} children="Clear" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              ref={fileInput}
            />
            <Input
              value={diary}
              onChange={onContentChange}
              type="text"
              placeholder="What's on your mind?"
            />
            <Input type="submit" value="diary" />
          </form>
        </SubContainer>
      </MainContainer>
    </>
  );
};

export default Write;
