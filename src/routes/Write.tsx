import Input from "../components/common/Input";
import React, { useState, useRef, useEffect } from "react";
import { dbService, storageService } from "../myBase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { useSelector } from "../store";
import { v4 as uuidv4 } from "uuid";
import Btn from "../components/common/Btn";
import { MainContainer, SubContainer } from "../styles/WriteStyle";
import { useNavigate, useParams } from "react-router-dom";

const Write = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);
  const { userUid, coupleId, userUrl } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [diary, setDiary] = useState("");
  const [diaryType, setDiaryType] = useState<string>("");
  const [attachment, setAttachment] = useState<any>("");

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let attachmentUrl = "";
    const date = new Date();
    try {
      if (attachment !== "") {
        const fileRef = ref(storageService, `${userUid}/${uuidv4()}`);
        const response = await uploadString(
          fileRef,
          attachment,
          "data_url"
        ).then(async (snapshot) => {
          attachmentUrl = await getDownloadURL(snapshot.ref);
        });
      }
      if (diaryType == "single") {
        await addDoc(collection(dbService, "diarys"), {
          title: title,
          text: diary,
          createdAt: date,
          creatorId: userUid,
          attachmentUrl,
        });
      } else {
        await addDoc(collection(dbService, "couple_diarys"), {
          title: title,
          text: diary,
          createdAt: date,
          creatorId: userUid,
          creatorImg: userUrl,
          coupleId: coupleId,
          attachmentUrl,
        });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setDiary("");
    setTitle("");
    onClearAttachment();
    return diaryType == "couple" ? navigate("/couple") : navigate("/");
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

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = e.target;
    setDiary(value);
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setTitle(value);
  };

  useEffect(() => {
    if (type) {
      setDiaryType(type);
    }
  }, []);

  return (
    <MainContainer>
      <div>Write</div>
      <SubContainer>
        <form onSubmit={onSubmit}>
          <Input
            value={title}
            onChange={onTitleChange}
            type="text"
            maxLength={20}
            placeholder="Summarize your day in one sentence"
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
          <textarea value={diary} onChange={onContentChange} maxLength={500} />
          <Input type="submit" value="Submit" />
        </form>
      </SubContainer>
    </MainContainer>
  );
};

export default Write;
