import {
  MainContainer,
  DiaryContainer,
  FormContainer,
} from "../styles/HomeStyle";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  deleteObject,
  ref,
  uploadString,
  getDownloadURL,
} from "@firebase/storage";
import { dbService, storageService } from "../myBase";
import { useEffect, useState, useRef } from "react";
import Input from "../components/common/Input";
import Btn from "../components/common/Btn";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "../store";

const Edit = () => {
  const navigate = useNavigate();
  const param = useParams();
  const { id, docName } = param;

  const { userUid, coupleId } = useSelector((state) => state.user);
  const [diaryInfo, setDiaryInfo] = useState<any>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [newDiary, setNewDiary] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [attachment, setAttachment] = useState<any>("");
  const fileInput = useRef<HTMLInputElement>(null);

  const DiaryTextRef = doc(dbService, "diarys", `${id}`);
  const urlRef = ref(storageService, diaryInfo.attachmentUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this diary?");
    if (ok) {
      await deleteDoc(DiaryTextRef);
      if (diaryInfo.attachmentUrl) {
        await deleteObject(urlRef);
      }
      return navigate("/");
    } else {
      return;
    }
  };

  const getDiaryInfo = async () => {
    const snap = await getDoc(doc(dbService, `${docName}`, `${id}`));
    if (snap.exists()) {
      const data = snap.data();
      const dataDate = data.createdAt.toDate();
      setDiaryInfo(data);
      setNewTitle(data.title);
      setNewDiary(data.text);
      setAttachment(data.attachmentUrl);
      // get date information
      setDate(
        `${dataDate.getFullYear()}년 ${
          dataDate.getMonth() + 1
        }월 ${dataDate.getDate()}일 ${new Intl.DateTimeFormat("ko-KR", {
          weekday: "long",
        }).format(data.createdAt.toDate())}`
      );
    } else {
      console.log("No such document");
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

  const onClearAttachment = () => {
    setAttachment("");
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.classList[2];
    const {
      target: { value },
    } = e;
    if (type == "title") {
      setNewTitle(value);
    } else if (type == "text") {
      setNewDiary(value);
    }
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let attachmentUrl = "";
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
      await updateDoc(DiaryTextRef, {
        text: newDiary,
        title: newTitle,
        attachmentUrl,
        isEdit: true,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    getDiaryInfo();
    onClearAttachment();
    setEditing((prev) => !prev);
  };

  useEffect(() => {
    console.log(param);
    getDiaryInfo();
  }, []);

  return (
    <>
      <MainContainer>
        <DiaryContainer>
          <img src={diaryInfo.attachmentUrl} height="100px" width="100px" />
          <div>
            {diaryInfo.isEdit
              ? date + " " + (diaryInfo.isEdit ? "(편집됨)" : "")
              : date}
          </div>
          {editing ? (
            ""
          ) : (
            <>
              <div>{diaryInfo.title}</div>
              <div>{diaryInfo.text}</div>
            </>
          )}
        </DiaryContainer>

        {editing ? (
          <>
            {attachment && typeof attachment === "string" && (
              <div>
                <img src={attachment} width="50px" height="50px" />
                <Btn onClick={onClearAttachment} children="Clear" />
              </div>
            )}
            <FormContainer>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                ref={fileInput}
              />
              <Input
                className="title"
                type="text"
                placeholder="Edit your diary title"
                value={newTitle}
                required
                onChange={onChange}
              />
              <Input
                className="text"
                type="text"
                placeholder="Edit your diary"
                value={newDiary}
                required
                onChange={onChange}
              />
            </FormContainer>
            <Btn children="Update Diary" onClick={onSubmit} />
            <Btn children="Delete Diary" onClick={onDeleteClick} />
            <Btn onClick={toggleEditing} children="Cancel" />
          </>
        ) : (
          <>
            <Btn children="Edit Diary" onClick={toggleEditing} />
          </>
        )}
      </MainContainer>
    </>
  );
};

export default Edit;
