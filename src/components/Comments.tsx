import { commentProps, commentUser } from "../interface/tpyes";
import Btn from "./common/Btn";
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
} from "@firebase/firestore";
import { CommentDataContainer } from "../styles/EditStyle";
import { dbService } from "../myBase";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";

const Comments: React.FC<commentProps> = ({ info }) => {
  const [createdUser, setCreatedUser] = useState<commentUser>({
    userName: "",
    userUrl: "",
  });
  const [date, setDate] = useState<string>("");
  const { text, creatorId, diaryid, id } = info;
  const currentUser = getAuth().currentUser;

  const getCommentUserInfo = async () => {
    const userQuery = query(
      collection(dbService, "userInfo"),
      where("userId", "==", creatorId)
    );

    const userQuerySnapshot = await getDocs(userQuery);
    const { userName, userUrl } = userQuerySnapshot.docs[0].data();
    setCreatedUser({ userName, userUrl });
  };

  const dateSet = () => {
    const dataDate = info.createdAt.toDate();
    setDate(
      `${dataDate.getFullYear()}년 ${
        dataDate.getMonth() + 1
      }월 ${dataDate.getDate()}일 ${new Intl.DateTimeFormat("ko-KR", {
        weekday: "long",
      }).format(dataDate)}`
    );
  };

  useEffect(() => {
    getCommentUserInfo();
    dateSet();
  }, []);

  return (
    <CommentDataContainer>
      <div className="CommentData_container">
        <div className="CommentData_img">
          <img
            src={createdUser.userUrl}
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        </div>
        <div className="CommentData_comment">
          <div>{createdUser.userName}</div>
          <div>{date}</div>
          <div>{text}</div>
          {currentUser?.uid == creatorId ? <Btn children="edit" /> : ""}
        </div>
      </div>
    </CommentDataContainer>
  );
};

export default Comments;
