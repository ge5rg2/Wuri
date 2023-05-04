import { diaryProps } from "../interface/tpyes";
import { useState, useEffect } from "react";
import Btn from "./common/Btn";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0.5rem 0;
  text-align: center;
  .DateBox {
    margin-bottom: 0.5rem;
  }
`;

const Diarys: React.FC<diaryProps> = ({ diary, obj, doc }) => {
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();

  const onToggleDetail = () => {
    console.log(obj.title);
    navigate(`/edit/${doc}/${obj.id}`);
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

  useEffect(() => {
    let dataDate = obj.createdAt.toDate();
    setDate(
      `${new Intl.DateTimeFormat("en-EN", {
        year: "numeric",
        month: "long",
        weekday: "long",
        day: "numeric",
      }).format(dataDate)}`
    );
  }, []);

  return (
    <DiaryContainer>
      <div className="DateBox">{date}</div>
      <Btn
        children={obj.title ? obj.title : ""}
        onClick={onToggleDetail}
        ButtonType="Default"
        size="large"
      />
    </DiaryContainer>
  );
};

export default Diarys;
