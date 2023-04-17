import {
  MainContainer,
  DiaryContainer,
  ImgContainer,
  MainEditContainer,
  EditBtnContainer,
  CommentContainer,
} from "../styles/EditStyle";
import {
  UploadBtnContainer,
  FormContainer,
  UploadImgContainer,
} from "../styles/WriteStyle";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import {
  deleteObject,
  ref,
  uploadString,
  getDownloadURL,
} from "@firebase/storage";
import { dbService, storageService } from "../myBase";
import { useEffect, useState, useRef } from "react";
import Input from "../components/common/Input";
import Btn from "../components/common/Btn";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "../store";
import Comments from "../components/Comments";
import { Comment } from "../interface/tpyes";

const Edit = () => {
  const navigate = useNavigate();
  const param = useParams();
  const { id, docName } = param;

  const { userUid, coupleId, userUrl, userName } = useSelector(
    (state) => state.user
  );
  const [diaryInfo, setDiaryInfo] = useState<any>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [newDiary, setNewDiary] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [commentValue, setCommentValue] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [attachment, setAttachment] = useState<any>("");
  const [firstAttachment, setFirstAttachment] = useState<any>("");
  const [editAble, setEditAble] = useState<boolean>(true);
  const [commentInfo, setCommentInfo] = useState<Comment[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [emojiValue, setEmojiValue] = useState("");

  const DiaryTextRef = doc(dbService, `${docName}`, `${id}`);
  const urlRef = ref(storageService, diaryInfo.attachmentUrl);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer?.files;
    if (files?.length) {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const result = (finishedEvent.currentTarget as FileReader).result;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    }
    setIsDragging(false);
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this diary?");
    if (ok) {
      await deleteDoc(DiaryTextRef);
      if (diaryInfo.attachmentUrl) {
        await deleteObject(urlRef);
      }
      return docName == "diarys" ? navigate("/") : navigate("/couple");
    } else {
      return;
    }
  };

  const getDiaryInfo = async () => {
    const snap = await getDoc(doc(dbService, `${docName}`, `${id}`));
    if (snap.exists()) {
      const data = snap.data();
      const dataDate = data.createdAt.toDate();
      if (data.coupleId) {
        if (data.coupleId == userUid) {
          setEditAble(false);
        }
      }
      setDiaryInfo(data);
      setNewTitle(data.title);
      setNewDiary(data.text);
      setAttachment(data.attachmentUrl);
      setFirstAttachment(data.attachmentUrl);
      setDate(
        `${new Intl.DateTimeFormat("en-EN", {
          year: "numeric",
          month: "long",
          weekday: "long",
          day: "numeric",
        }).format(dataDate)}`
      );
      /*       setDate(
        `${dataDate.getFullYear()}년 ${
          dataDate.getMonth() + 1
        }월 ${dataDate.getDate()}일 ${new Intl.DateTimeFormat("ko-KR", {
          weekday: "long",
        }).format(data.createdAt.toDate())}`
      ); */
    } else {
      console.log("No such document");
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files?.length) {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const result = (finishedEvent.currentTarget as FileReader).result;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachment = () => {
    setAttachment("");
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const toggleEditing = () => {
    if (attachment == "") {
      setAttachment(firstAttachment);
    }
    setEditing((prev) => !prev);
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = e.target;
    setNewDiary(value);
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setNewTitle(value);
  };

  /* 
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.classList[2];
    const {
      target: { value },
    } = e;
    if (type == "title") {
      setNewTitle(value);
    } else if (type == "text") {
      setNewDiary(value);
    }
  }; */

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let attachmentUrl = "";
    try {
      if (attachment !== "" && firstAttachment != attachment) {
        const fileRef = ref(storageService, `${userUid}/${uuidv4()}`);
        await uploadString(fileRef, attachment, "data_url").then(
          async (snapshot) => {
            attachmentUrl = await getDownloadURL(snapshot.ref);
          }
        );
      } else if (firstAttachment == attachment) {
        attachmentUrl = firstAttachment;
      }
      await updateDoc(DiaryTextRef, {
        text: newDiary,
        title: newTitle,
        attachmentUrl,
        isEdit: true,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    getDiaryInfo();
    onClearAttachment();
    setEditing((prev) => !prev);
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setCommentValue(value);
  };

  const onCommentSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const date = new Date();
    await addDoc(collection(dbService, "comments"), {
      text: commentValue,
      createdAt: date,
      creatorId: userUid,
      diaryid: id,
    });
    setCommentValue("");
  };

  const getCommentInfo = async () => {
    const commentQuery = query(
      collection(dbService, "comments"),
      where("diaryid", "==", id),
      orderBy("createdAt", "desc")
    );
    onSnapshot(commentQuery, (snapshot) => {
      const commentObject: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommentInfo(commentObject);
    });
  };

  const commentData: JSX.Element[] = commentInfo.map((el) => {
    return <Comments key={el.id} info={el} />;
  });

  const onPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardData = e.clipboardData;
    const pastedData = clipboardData.getData("text");
    const { selectionStart, selectionEnd } = e.currentTarget;
    const newValue =
      emojiValue.slice(0, selectionStart) +
      pastedData +
      emojiValue.slice(selectionEnd);
    setEmojiValue(newValue);
  };

  const handleCompositionEnd = (e: any) => {
    const textarea = e.target as HTMLTextAreaElement;
    const newValue =
      emojiValue.slice(0, textarea.selectionStart) +
      e.data +
      emojiValue.slice(textarea.selectionEnd);
    setEmojiValue(newValue);
  };

  useEffect(() => {
    getDiaryInfo();
    getCommentInfo();
  }, []);

  return (
    <MainContainer>
      <DiaryContainer>
        {editing ? (
          ""
        ) : (
          <>
            {attachment == "" ? (
              ""
            ) : (
              <ImgContainer>
                <img src={attachment} />
              </ImgContainer>
            )}
            <div className="DiaryContent_date" style={{ textAlign: "center" }}>
              {diaryInfo.isEdit
                ? date + " " + (diaryInfo.isEdit ? "(Edited)" : "")
                : date}
            </div>
            <div className="DiaryContent">
              <div className="DiaryContent_title">{diaryInfo.title}</div>
              <div
                className="DiaryContent_text"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {diaryInfo.text}
              </div>
            </div>
          </>
        )}
      </DiaryContainer>

      {editAble ? (
        editing ? (
          <MainEditContainer>
            <FormContainer>
              <div className={isDragging ? "dropzone_dragging" : "dropzone"}>
                {attachment && typeof attachment === "string" && (
                  <UploadImgContainer>
                    <img src={attachment} />
                  </UploadImgContainer>
                )}
                {attachment && typeof attachment === "string" ? (
                  <UploadBtnContainer>
                    <Btn
                      onClick={onClearAttachment}
                      children="Clear"
                      size="medium"
                      ButtonType="Default"
                    />
                  </UploadBtnContainer>
                ) : (
                  <div
                    className="upload"
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                  >
                    <label className="filePlaceholder" htmlFor="file"></label>
                    <label className="fileBtn" htmlFor="file">
                      Click to upload
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onFileChange}
                      ref={fileInput}
                      id="file"
                    />
                  </div>
                )}
              </div>
              <div
                className="DiaryContent_date"
                style={{ textAlign: "center" }}
              >
                {diaryInfo.isEdit
                  ? date + " " + (diaryInfo.isEdit ? "(Edited)" : "")
                  : date}
              </div>
              <Input
                className="title"
                type="text"
                maxLength={20}
                placeholder="Edit your diary title"
                value={newTitle}
                required
                onChange={onTitleChange}
              />
              <textarea
                style={{ whiteSpace: "pre-wrap" }}
                value={newDiary}
                onChange={onContentChange}
                onCompositionEnd={handleCompositionEnd}
                onPaste={onPaste}
                maxLength={500}
              />
            </FormContainer>
            <EditBtnContainer>
              <Btn
                ButtonType="Emphasized"
                size="large"
                children="Update"
                onClick={onSubmit}
              />
              <Btn
                ButtonType="Critical"
                size="large"
                children="Delete"
                onClick={onDeleteClick}
              />
              <Btn
                ButtonType="Default"
                size="large"
                onClick={toggleEditing}
                children="Cancel"
              />
            </EditBtnContainer>
          </MainEditContainer>
        ) : (
          <Btn
            className="EditBtn_style"
            children="Edit Diary"
            onClick={toggleEditing}
            ButtonType="Emphasized"
            size="large"
          />
        )
      ) : (
        ""
      )}
      {docName == "diarys" ? (
        ""
      ) : (
        <CommentContainer>
          <div className="CommemtForm_container">
            <div className="CommemtForm_img">
              <img
                src={userUrl + ""}
                style={{ height: "50px", width: "50px", borderRadius: "50%" }}
              />
            </div>
            <div className="CommemtForm_form">
              <Input
                placeholder="Commment"
                type="text"
                value={commentValue}
                onChange={onCommentChange}
                maxLength={50}
              />
              <div className="CommentForm_Btn">
                <Btn
                  size="small"
                  ButtonType="Emphasized"
                  children="Submit"
                  value="Submit"
                  onClick={onCommentSubmit}
                />
              </div>
            </div>
          </div>
          {commentData}
        </CommentContainer>
      )}
    </MainContainer>
  );
};

export default Edit;
