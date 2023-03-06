import Input from "../components/common/Input";
import React, { useState, useEffect, useRef } from "react";
import { dbService, storageService } from "../myBase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { useSelector } from "../store";
import { v4 as uuidv4 } from "uuid";
import Btn from "../components/common/Btn";
import { Diary } from "../interface/tpyes";

const Edit = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const userStore = useSelector((state) => state.user);
  const uid = userStore.userUid;
  const [diary, setDiary] = useState("");
  const [diarys, setDiarys] = useState<Diary[]>([]);
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
      const docRef = await addDoc(collection(dbService, "diarys"), {
        text: diary,
        createdAt: date,
        creatorId: uid,
        attachmentUrl,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setDiary("");
    onClearAttachment();
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDiary(value);
  };

  return (
    <>
      <div>Edit</div>
      <div>
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
      </div>
    </>
  );
};

export default Edit;
