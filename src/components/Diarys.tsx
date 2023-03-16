import { diaryProps } from "../interface/tpyes";
import { useState, useEffect } from "react";
import Btn from "./common/Btn";
import { useNavigate } from "react-router-dom";

const Diarys: React.FC<diaryProps> = ({ diary, isOwner, obj }) => {
  const navigate = useNavigate();

  const onToggleDetail = () => {
    console.log(obj);
    navigate(`/edit/${obj.id}`);
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
          {obj.attachmentUrl && (
            <img src={obj.attachmentUrl} height="50px" width="50px" />
          )}
          <h4>{diary}</h4>
          <Btn children="Detail" onClick={onToggleDetail} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Diarys;
