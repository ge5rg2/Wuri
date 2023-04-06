import { diaryProps } from "../interface/tpyes";
import { useState, useEffect } from "react";
import Btn from "./common/Btn";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CoupleDiaryContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0.5rem 0;
  text-align: center;
`;

const DiaryContainer = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  h4 {
    font-weight: 500;
    color: ${(props) => props.theme.accentColor};
  }
`;

const CoupleDiarys: React.FC<diaryProps> = ({ diary, obj, doc }) => {
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();

  const onToggleDetail = () => {
    console.log(obj.creatorImg);
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
      }).format(dataDate)}`
    );
  }, []);

  return (
    <CoupleDiaryContainer>
      <img src={obj.creatorImg + ""} height="50px" width="50px" />
      <DiaryContainer>
        <h4>{date}</h4>
        <Btn
          size="large"
          children={obj.title}
          ButtonType="Default"
          onClick={onToggleDetail}
        />
      </DiaryContainer>
    </CoupleDiaryContainer>
  );
};

export default CoupleDiarys;
