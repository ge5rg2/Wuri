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
import { useState, useEffect, useRef } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Comments: React.FC<commentProps> = ({ info }) => {
  const moreRef = useRef<HTMLDivElement>(null);
  const [createdUser, setCreatedUser] = useState<commentUser>({
    userName: "",
    userUrl: "",
  });
  const [date, setDate] = useState<string>("");
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [isMore, setIsMore] = useState<boolean>(false);
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
    if (currentUser?.uid == creatorId) {
      setCanEdit(true);
    }
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

  const onMoreClick = () => {
    setIsMore((props) => !props);
  };

  useEffect(() => {
    getCommentUserInfo();
    dateSet();
    const handleClick = (event: any) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMore(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
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
        <div className="CommentData_comment_container">
          <div className="CommentData_comment_subcontainer">
            <div className="CommentData_comment_name">
              {createdUser.userName}
            </div>
            <div className="CommentData_comment_subcontainer_more">
              <div className="CommentData_comment_date">{date}</div>
              {isMore ? <div>ss</div> : ""}
              {canEdit ? (
                <div
                  ref={moreRef}
                  onClick={onMoreClick}
                  className="CommentData_comment_more"
                >
                  <MoreHorizIcon />
                </div>
              ) : (
                <div
                  className="CommentData_comment_more"
                  style={{ visibility: "hidden" }}
                >
                  <MoreHorizIcon />
                </div>
              )}
            </div>
          </div>
          <div className="CommentData_comment_text">{text}</div>
        </div>
      </div>
    </CommentDataContainer>
  );
};

export default Comments;
