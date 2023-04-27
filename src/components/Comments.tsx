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
import { CommentDataContainer, EditModal } from "../styles/EditStyle";
import { dbService } from "../myBase";
import { getAuth } from "firebase/auth";
import { useState, useEffect, useRef } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Input from "./common/Input";

const Comments: React.FC<commentProps> = ({ info }) => {
  const moreRef = useRef<HTMLDivElement>(null);
  const [createdUser, setCreatedUser] = useState<commentUser>({
    userName: "",
    userUrl: "",
  });
  const [date, setDate] = useState<string>("");
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [isMore, setIsMore] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newCommentValue, setNewCommentValue] = useState<string>("");
  const { text, creatorId, diaryid, id } = info;
  const currentUser = getAuth().currentUser;
  const CommetnRef = doc(dbService, "comments", `${id}`);

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
      setNewCommentValue(text);
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

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setNewCommentValue(value);
  };

  const onCommentUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let blank_pattern = /^\s+|\s+$/g;
    if (newCommentValue.replace(blank_pattern, "") == "") {
      document.getElementById("newCommentValue")?.focus();
      setNewCommentValue("");
      return alert("Blank titles are not allowed!");
    }
    await updateDoc(CommetnRef, {
      text: newCommentValue,
    });
    setIsEditing(false);
    setIsMore(false);
  };

  const onCommentCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setNewCommentValue(text);
    setIsEditing(false);
    setIsMore(false);
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this comment?");
    if (ok) {
      await deleteDoc(CommetnRef);
      return;
    } else {
      return;
    }
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
      {isEditing ? (
        <div className="CommemtForm_container">
          <div className="CommemtForm_img">
            <img
              src={createdUser.userUrl}
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            />
          </div>
          <div className="CommemtForm_form">
            <Input
              id="newCommentValue"
              placeholder="Commment"
              type="text"
              value={newCommentValue}
              onChange={onCommentChange}
              maxLength={50}
            />
            <div className="CommentForm_Btn">
              <Btn
                size="small"
                ButtonType="Critical"
                children="Cancel"
                value="Submit"
                onClick={onCommentCancel}
              />
              <Btn
                size="small"
                ButtonType="Emphasized"
                children="Update"
                value="Submit"
                onClick={onCommentUpdate}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {isMore ? (
            <EditModal id="editModal" className="animateStart">
              <div className="editIcon" onClick={onEditClick}>
                <EditIcon />
                <span>Edit comment</span>
              </div>
              <div className="deleteIcon" onClick={onDeleteClick}>
                <DeleteForeverIcon />
                <span>Delete comment</span>
              </div>
            </EditModal>
          ) : (
            ""
          )}
          <div
            className={
              isMore
                ? "ContainerOpacity CommentData_container"
                : "CommentData_container"
            }
          >
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
        </>
      )}
    </CommentDataContainer>
  );
};

export default Comments;
