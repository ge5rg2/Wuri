import { MainContainer } from "../styles/HomeStyle";
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
  const [date, setDate] = useState<any>();

  const DiaryTextRef = doc(dbService, "diarys", `${id}`);

  const getDiaryInfo = async () => {
    const snap = await getDoc(doc(dbService, "diarys", `${id}`));
    if (snap.exists()) {
      const data = snap.data();
      console.log(snap.data());
      setDiaryInfo(data);
      setNewDiary(data.text);
      console.log(data.createdAt.toDate().getFullYear());
      console.log(data.createdAt.toDate().getMonth() + 1);
      console.log(data.createdAt.toDate().getDate());
      console.log(data.createdAt.toDate().getDay());
      console.log(
        new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
          data.createdAt.toDate()
        )
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
        <img src={diaryInfo.attachmentUrl} height="100px" width="100px" />
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
        <div>{diaryInfo.title}</div>
        <div>{diaryInfo.text}</div>
      </MainContainer>
    </>
  );
};

export default Edit;
