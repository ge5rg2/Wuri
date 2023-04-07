import Input from "../components/common/Input";
import React, { useState, useRef, useEffect } from "react";
import { dbService, storageService } from "../myBase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { useSelector } from "../store";
import { v4 as uuidv4 } from "uuid";
import Btn from "../components/common/Btn";
import {
  MainContainer,
  SubContainer,
  FormContainer,
  UploadImgContainer,
  UploadBtnContainer,
} from "../styles/WriteStyle";
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
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer?.files;
    if (files?.length) {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const result = (finishedEvent.currentTarget as FileReader).result;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    }
    setIsDragging(false);
  };

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
        <FormContainer onSubmit={onSubmit}>
          <Input
            value={title}
            onChange={onTitleChange}
            type="text"
            maxLength={20}
            placeholder="Summarize your day in one sentence"
          />
          <div className={isDragging ? "dropzone_dragging" : "dropzone"}>
            {attachment && typeof attachment === "string" && (
              <UploadImgContainer>
                <img src={attachment} width="50px" height="50px" />
              </UploadImgContainer>
            )}
            {attachment && typeof attachment === "string" ? (
              <UploadBtnContainer>
                <Btn onClick={onClearAttachment} children="Clear" />
              </UploadBtnContainer>
            ) : (
              <div
                className="upload"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
              >
                <label className="filePlaceholder" htmlFor="file"></label>
                <label className="fileBtn" htmlFor="file">
                  Click to upload
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  ref={fileInput}
                  id="file"
                />
              </div>
            )}
          </div>

          <textarea value={diary} onChange={onContentChange} maxLength={500} />
          <Input type="submit" value="Submit" />
        </FormContainer>
      </SubContainer>
    </MainContainer>
  );
};

export default Write;
