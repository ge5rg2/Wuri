import {
  MainContainer,
  DiaryContainer,
  FormContainer,
} from "../styles/HomeStyle";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { dbService, storageService } from "../myBase";
import { useEffect, useState } from "react";
import Input from "../components/common/Input";
import Btn from "../components/common/Btn";

const Edit = () => {
  const navigate = useNavigate();
  const param = useParams();
  const { id } = param;

  const [diaryInfo, setDiaryInfo] = useState<any>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [newDiary, setNewDiary] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");

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
    const snap = await getDoc(doc(dbService, "diarys", `${id}`));
    if (snap.exists()) {
      const data = snap.data();
      const dataDate = data.createdAt.toDate();
      //console.log(snap.data());
      setDiaryInfo(data);
      setNewTitle(data.title);
      setNewDiary(data.text);
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

  const onSubmit = async () => {
    await updateDoc(DiaryTextRef, {
      text: newDiary,
      title: newTitle,
    });
    getDiaryInfo();
    setEditing((prev) => !prev);
  };

  useEffect(() => {
    getDiaryInfo();
  }, []);

  return (
    <>
      <MainContainer>
        <DiaryContainer>
          <img src={diaryInfo.attachmentUrl} height="100px" width="100px" />
          <div>{date}</div>
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
            <FormContainer>
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
