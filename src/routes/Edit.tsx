import {
  MainContainer,
  DiaryContainer,
  ImgContainer,
  MainEditContainer,
  EditBtnContainer,
  CommentContainer,
  ExpandImgContainer,
} from "../styles/EditStyle";
import {
  UploadBtnContainer,
  FormContainer,
  UploadImgContainer,
  Subtitle,
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
  getDocs,
  where,
  orderBy,
  onSnapshot,
  deleteField,
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
import imageCompression from "browser-image-compression";
import Loading from "../components/common/Loading";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

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
  //const [attachment, setAttachment] = useState<any>("");
  const [editAble, setEditAble] = useState<boolean>(true);
  const [commentInfo, setCommentInfo] = useState<Comment[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [emojiValue, setEmojiValue] = useState("");
  const [expandImg, setExpandImg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLenOver, setLenOver] = useState<boolean>(false);
  const [inputCount, setInputCount] = useState<number>(0);
  const [firstAttachment, setFirstAttachment] = useState<any[]>([]);
  const [attachmentArr, setAttachmentArr] = useState<any[]>([]);
  // 현재 이미지
  const [currentImgIdx, setCurrentImgIdx] = useState<any>("");

  const DiaryTextRef = doc(dbService, `${docName}`, `${id}`);
  //const urlRef = ref(storageService, diaryInfo.attachmentUrl);

  /** 드래그 엔터 */
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  /** 드래그 떠날 때 */
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  /** 드래그 후 해당 박스안에 들어올 때 */
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };

  /** 해당 페이지를 불러올 때 해당 다이어리 정보를 불러오는 함수 */
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
      if (data.attachmentUrl == "" || data.attachmentUrl) {
        await updateDoc(DiaryTextRef, {
          attachmentUrls: [data.attachmentUrl],
          attachmentUrl: deleteField(),
        });
        return window.location.reload();
      }
      setDiaryInfo(data);
      setNewTitle(data.title);
      setNewDiary(data.text);
      setInputCount(data.text.length);
      //setAttachment(data.attachmentUrls[0]);
      setFirstAttachment(data.attachmentUrls);
      setAttachmentArr(data.attachmentUrls);
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

  /** 이미지 업로드 시 용량 압축 함수 */
  const handleImageCompress = async (file: File) => {
    const options = {
      maxSizeMB: 1, // 이미지 최대 용량
      maxWidthOrHeight: 1000, // 최대 넓이(혹은 높이)
      useWebWorker: true,
    };
    setLoading(true);
    try {
      const compressedFile = await imageCompression(file, options);
      console.log(compressedFile);
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const result = (finishedEvent.currentTarget as FileReader).result;
        //setAttachment(result);
        setAttachmentArr([result, ...attachmentArr]);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  /** 이미지가 드래그 후 드랍할 때 동작하는 함수 */
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer?.files;
    if (files?.length) {
      const theFile = files[0];
      handleImageCompress(theFile);
    }
    setIsDragging(false);
  };

  /** img가 변경될 때 동작하는 함수 */
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files?.length) {
      const theFile = files[0];
      handleImageCompress(theFile);
    }
  };

  /** Img Clear 버튼 클릭 시 동작하는 함수 */
  const onClearAttachment = () => {
    //setAttachment("");
    setAttachmentArr([]);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  /** Edit 버튼을 클릭하면 동작하는 함수  */
  const toggleEditing = () => {
    if (attachmentArr.length == 0) {
      setAttachmentArr(firstAttachment);
    }
    setEditing((prev) => !prev);
  };

  /** 본문 내용 변경 시 동작하는 함수 */
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = e.target;
    let { length } = value;
    if (length > 1500) {
      return setLenOver(true);
    } else if (length > 1499) {
      setLenOver(true);
      setInputCount(length);
      setNewDiary(value);
    } else {
      setLenOver(false);
      setInputCount(length);
      setNewDiary(value);
    }
  };

  /** 제목 변경 시 동작하는 함수 */
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    let { length } = value;
    if (length > 40) {
      return;
    } else {
      setNewTitle(value);
    }
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

  /** 게시물 삭제 클릭 시 동작하는 함수 */
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this diary?");
    if (ok) {
      if (docName == "couple_diarys") {
        const commentQuery = query(
          collection(dbService, "comments"),
          where("diaryid", "==", id)
        );
        const commentQuerySnapshot = await getDocs(commentQuery);
        if (commentQuerySnapshot.size > 0) {
          commentQuerySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        }
      }
      await deleteDoc(DiaryTextRef);
      if (diaryInfo.attachmentUrls.length > 0) {
        await Promise.all(
          diaryInfo.attachmentUrls.map((url: any) =>
            deleteObject(ref(storageService, url))
          )
        );
      }
      return docName === "diarys" ? navigate("/") : navigate("/couple");
    } else {
      return;
    }
  };

  /** Update 시 만약 기존 이미지를 삭제 후 빈 이미지로 업로드 시 동작하는 함수  */
  const deleteImgDB = async (Arr: string[]) => {
    for (let i = 0; i < Arr.length; i++) {
      const startIndex = Arr[i].lastIndexOf("%2F") + 3;
      const endIndex = Arr[i].indexOf("?", startIndex);
      const fileName = decodeURIComponent(
        Arr[i].substring(startIndex, endIndex)
      );
      const desertRef = ref(storageService, `${userUid}/${fileName}`);
      try {
        await deleteObject(desertRef);
        console.log("DB 이미지를 성공적으로 삭제했습니다.");
      } catch (error) {
        console.log("Delete Img Error!", error);
      }
    }
  };

  /** atthachmentArr과 firstAttachment 배열 같은지 비교 함수 */
  function arraysAreEqual(arr1: Array<string>, arr2: Array<string>) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let attachmentUrls: string[] = [];
    let blank_pattern = /^\s+|\s+$/g;
    if (newTitle.replace(blank_pattern, "") === "") {
      document.getElementById("newDiaryTitle")?.focus();
      setNewTitle("");
      return alert("Blank titles are not allowed!");
    }
    if (newDiary.replace(blank_pattern, "") === "") {
      document.getElementById("newDiaryText")?.focus();
      setNewDiary("");
      return alert("Blank text is not allowed!");
    }
    /**
     * 새로 추가된 url과 기존 url 비교. 기존 url에만 있는 url를 삭제
     * 기준점은 새로 추가된 url이기 때문에 기존 url은 어떤걸 삭제할지만 확인
     * 위 두 가정이 어렵다면 기존 파일 다 지우고 새롭게 update 하기
     */
    try {
      setLoading(true);
      let check = arraysAreEqual(firstAttachment, attachmentArr);
      // 초기 이미지와 현재 이미지가 다를 경우
      if (!check) {
        // 현재 이미지가 없는 경우
        if (attachmentArr.length == 0) {
          // 현재 이미지도 없지만 초기 이미지는 있는 경우
          if (firstAttachment.length !== 0) {
            await deleteImgDB(firstAttachment);
          }
        }
        // 현재 이미지가 있고 초기 이미지와 다른 경우 -> dbdelete 후 for문으로 새로 upload
        else {
          let deleteArr: string[] = [];
          /**
           * 1. first, attachArr 과 같은 ig url 은 deleteArr에 넣지 않는다.
           * 2. attachArr만 있고 first에는 없다면 새로 들어온 img -> upload
           * 3. first에만 있고 attachArr에 없다면 deleteArr에 추가
           * 4. first에 없다가 전부새로 추가된 경우
           */
          // case 4
          if (firstAttachment.length == 0) {
            for (let i = 0; i < attachmentArr.length; i++) {
              const attachment = attachmentArr[i];
              const fileRef = ref(storageService, `${userUid}/${uuidv4()}`);
              const snapshot = await uploadString(
                fileRef,
                attachment,
                "data_url"
              );
              const attachmentUrl = await getDownloadURL(snapshot.ref);
              attachmentUrls.push(attachmentUrl);
            }
          } else {
            // case 1,2
            for (let i = 0; i < attachmentArr.length; i++) {
              let attachment = attachmentArr[i];
              if (firstAttachment.includes(attachment)) {
                // 바뀌지 않은 값
                attachmentUrls.push(attachment);
              } else {
                // 새로 들어온 img임
                const fileRef = ref(storageService, `${userUid}/${uuidv4()}`);
                await uploadString(fileRef, attachment, "data_url").then(
                  async (snapshot) => {
                    let attachmentUrl = await getDownloadURL(snapshot.ref);
                    attachmentUrls.push(attachmentUrl);
                  }
                );
              }
            }
            // case 3
            for (let i = 0; i < firstAttachment.length; i++) {
              let firstAtt = firstAttachment[i];
              if (!attachmentArr.includes(firstAtt)) {
                // 삭제 img
                deleteArr.push(firstAtt);
              }
            }
            // 삭제할 deleteArr 가 있다면 db에서 이미지 삭제
            if (deleteArr.length > 0) {
              await deleteImgDB(deleteArr);
            }
          }
        }
        await updateDoc(DiaryTextRef, {
          text: newDiary,
          title: newTitle,
          attachmentUrls,
          isEdit: true,
        });
        setFirstAttachment(attachmentUrls);
      }

      if (check) {
        await updateDoc(DiaryTextRef, {
          text: newDiary,
          title: newTitle,
          isEdit: true,
        });
      }
      //setFirstAttachment(check ? firstAttachment : attachmentUrls);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    getDiaryInfo();
    onClearAttachment();
    setLoading(false);
    setEditing((prev) => !prev);
  };

  /** 댓글 내용 변경 시 동작하는 함수  */
  const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setCommentValue(value);
  };

  /** 댓글 전송시 동작 함수 */
  const onCommentSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let blank_pattern = /^\s+|\s+$/g;
    if (commentValue.replace(blank_pattern, "") == "") {
      document.getElementById("newComment")?.focus();
      setCommentValue("");
      return alert("Blank comments is not allowed!");
    }
    const date = new Date();
    await addDoc(collection(dbService, "comments"), {
      text: commentValue,
      createdAt: date,
      creatorId: userUid,
      diaryid: id,
    });
    setCommentValue("");
  };

  /** 댓글 data를 불러오기 위한 함수 */
  const getCommentInfo = async () => {
    const commentQuery = query(
      collection(dbService, "comments"),
      where("diaryid", "==", id),
      orderBy("createdAt", "desc")
    );
    const commentSnapshot = await getDocs(commentQuery);
    if (commentSnapshot.size > 0) {
      onSnapshot(commentQuery, (snapshot) => {
        const commentObject: any = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCommentInfo(commentObject);
      });
      setLoading(false);
    } else {
      return setLoading(false);
    }
  };
  /** couple diary 댓글 컴포넌트 */
  const commentData: JSX.Element[] = commentInfo.map((el) => {
    return <Comments key={el.id} info={el} />;
  });

  /** 본문 복사 시 작동 함수 */
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

  /** emoji 적용 함수  */
  const handleCompositionEnd = (e: any) => {
    const textarea = e.target as HTMLTextAreaElement;
    const newValue =
      emojiValue.slice(0, textarea.selectionStart) +
      e.data +
      emojiValue.slice(textarea.selectionEnd);
    setEmojiValue(newValue);
  };

  /** 이미지 클릭 시 확대 적용 함수  추후 배경 블러 처리*/
  const onImgClick = (index: number = 0) => {
    setCurrentImgIdx(index);
    setExpandImg(true);
  };

  /** 이미지 클릭 시 삭제 함수 */
  const onEachImgClick = (inx: number) => {
    let removedArr = attachmentArr.filter((arr: any) => {
      return arr !== attachmentArr[inx];
    });
    setAttachmentArr(removedArr);
  };

  /** zoom (img slide) 설정 */
  const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true,
  };

  useEffect(() => {
    getDiaryInfo();
    getCommentInfo();
  }, []);

  return (
    <MainContainer>
      {loading ? (
        <ExpandImgContainer className="modal__container">
          <div className="modal__box">
            <Loading loading={loading} />
          </div>
        </ExpandImgContainer>
      ) : (
        ""
      )}
      {expandImg ? (
        <ExpandImgContainer className="modal__container">
          <div className="modal__box">
            <img
              src={attachmentArr[currentImgIdx]}
              onClick={() => setExpandImg(false)}
            />
          </div>
        </ExpandImgContainer>
      ) : (
        ""
      )}
      <DiaryContainer>
        {editing ? (
          ""
        ) : (
          <>
            {attachmentArr.length == 0 ? (
              ""
            ) : attachmentArr.length == 1 ? (
              <ImgContainer className="slide-container">
                <img src={attachmentArr[0]} onClick={() => onImgClick()} />
              </ImgContainer>
            ) : (
              <ImgContainer className="slide-container">
                <Zoom {...zoomOutProperties}>
                  {attachmentArr.map((each: any, index: number) => (
                    <img
                      key={index}
                      src={each}
                      onClick={() => onImgClick(index)}
                    />
                  ))}
                </Zoom>
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
                {attachmentArr.length !== 0 ? (
                  <UploadImgContainer>
                    {attachmentArr.map((el: any, inx: number) => (
                      <img
                        src={el}
                        key={inx}
                        onClick={() => onEachImgClick(inx)}
                      />
                    ))}
                  </UploadImgContainer>
                ) : (
                  ""
                )}
                {attachmentArr.length >= 4 ? (
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
              <Subtitle>
                <div>{date}</div>
                <div className={isLenOver ? "overColor" : ""}>
                  <span>{inputCount}</span>
                  <span>/1500</span>
                </div>
              </Subtitle>
              <Input
                id="newDiaryTitle"
                className="title"
                type="text"
                maxLength={40}
                placeholder="Edit your diary title"
                value={newTitle}
                required
                onChange={onTitleChange}
              />
              <textarea
                id="newDiaryText"
                style={{ whiteSpace: "pre-wrap" }}
                value={newDiary}
                onChange={onContentChange}
                onCompositionEnd={handleCompositionEnd}
                onPaste={onPaste}
                maxLength={1500}
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
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="CommemtForm_form">
              <Input
                id="newComment"
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
