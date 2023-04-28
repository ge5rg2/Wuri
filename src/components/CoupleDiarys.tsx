import { diaryProps } from "../interface/tpyes";
import { useState, useEffect } from "react";
import Btn from "./common/Btn";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
} from "@firebase/firestore";
import { dbService } from "../myBase";

const CoupleDiaryContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0.5rem 0;
  text-align: center;
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-top: 1rem;
  }
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
  const [userImg, setUserImg] = useState<string>("");
  const navigate = useNavigate();

  const onToggleDetail = () => {
    navigate(`/edit/${doc}/${obj.id}`);
  };

  const getUserImg = async () => {
    const userQuery = query(
      collection(dbService, "userInfo"),
      where("userId", "==", obj.creatorId)
    );

    const userQuerySnapshot = await getDocs(userQuery);
    const { userUrl } = userQuerySnapshot.docs[0].data();
    setUserImg(userUrl);
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
    getUserImg();
    let dataDate = obj.createdAt.toDate();
    setDate(
      `${new Intl.DateTimeFormat("en-EN", {
        year: "numeric",
        month: "long",
        weekday: "long",
      }).format(dataDate)}`
    );
  }, []);
  // img 파일은 되도록 div 안에서(style 적용 등)
  return (
    <CoupleDiaryContainer>
      <div>
        <img src={userImg + ""} style={{ objectFit: "cover" }} />
      </div>
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
