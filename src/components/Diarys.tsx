import { diaryProps } from "../interface/tpyes";
import { useState, useEffect } from "react";
import Btn from "./common/Btn";
import Input from "./common/Input";
import { dbService } from "../myBase";
import { doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";

const Diarys: React.FC<diaryProps> = ({ diary, isOwner, obj }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [newDiary, setNewDiary] = useState<string>(obj.text);

  const DiaryTextRef = doc(dbService, "diarys", `${obj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this diary?");
    if (ok) {
      await deleteDoc(DiaryTextRef);
    } else {
      return;
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

  // firestore already give us data that edited diary
  /*   useEffect(() => {
    const unsubscribe = onSnapshot(DiaryTextRef, (doc) => {
      const diaryObject = doc.data();
      if (diaryObject) {
        setNewDiary(diaryObject.text);
      }
    });
    return () => unsubscribe();
  }, [DiaryTextRef]);
 */

  return (
    <>
      {isOwner ? (
        <div>
          {editing ? (
            <>
              <form onSubmit={onSubmit}>
                <Input
                  type="text"
                  placeholder="Edit your diary"
                  value={newDiary}
                  required
                  onChange={onChange}
                />
                <Input type="submit" value="Update Diary" />
              </form>
              <Btn
                onClick={toggleEditing}
                children="
              Cancel"
              />
            </>
          ) : (
            <>
              <h4>{diary}</h4>
              <Btn children="Edit Diary" onClick={toggleEditing} />
              <Btn children="Delete Diary" onClick={onDeleteClick} />
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Diarys;