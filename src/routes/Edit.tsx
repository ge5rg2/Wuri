import { MainContainer, DiaryContainer } from "../styles/HomeStyle";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { dbService } from "../myBase";
import { useEffect, useState } from "react";
import Input from "../components/common/Input";
import Btn from "../components/common/Btn";

const Edit = () => {
  const param = useParams();
  const { id } = param;

  const [diaryInfo, setDiaryInfo] = useState<any>([]);
  const [editing, setEditing] = useState<boolean>(true);
  const [newDiary, setNewDiary] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const DiaryTextRef = doc(dbService, "diarys", `${id}`);

  const getDiaryInfo = async () => {
    const snap = await getDoc(doc(dbService, "diarys", `${id}`));
    if (snap.exists()) {
      const data = snap.data();
      const dataDate = data.createdAt.toDate();
      //console.log(snap.data());
      setDiaryInfo(data);
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
    const {
      target: { value },
    } = e;
    setNewDiary(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateDoc(DiaryTextRef, {
      text: newDiary,
    });
    setEditing(false);
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
          <div>{diaryInfo.title}</div>
          <div>{diaryInfo.text}</div>
        </DiaryContainer>
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Edit your diary"
            value={newDiary}
            required
            onChange={onChange}
            readOnly={editing}
          />
          <Input type="submit" value="Update Diary" />
        </form>
        <Btn
          onClick={toggleEditing}
          children="
              Cancel"
        />
      </MainContainer>
    </>
  );
};

export default Edit;
