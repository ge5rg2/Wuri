import Input from "../components/common/Input";
import React, { useState, useRef, useEffect } from "react";
import { dbService, storageService } from "../myBase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { useSelector } from "../store";
import { v4 as uuidv4 } from "uuid";
import Btn from "../components/common/Btn";
import {
  MainContainer,
  SubContainer,
  FormContainer,
  UploadImgContainer,
  UploadBtnContainer,
  Subtitle,
} from "../styles/WriteStyle";
import { useNavigate, useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { ExpandImgContainer } from "../styles/EditStyle";
import Loading from "../components/common/Loading";

const Write = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);
  const { userUid, coupleId, userUrl } = useSelector((state) => state.user);
  const { todayCouple, todaySingle } = useSelector((state) => state.diary);
  const [title, setTitle] = useState("");
  const [diary, setDiary] = useState("");
  const [diaryType, setDiaryType] = useState<string>("");
  //const [attachment, setAttachment] = useState<any>("");
  const [attachmentArr, setAttachmentArr] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [date, setDate] = useState<string>("");
  const [emojiValue, setEmojiValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isLenOver, setLenOver] = useState<boolean>(false);
  const [inputCount, setInputCount] = useState<number>(0);

  /** 드래그 상태로 이미지 박스로 들어올 때 함수 */
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  /** 드래그 상태로 이미지 박스 떠날 때의 함수 */
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  /** 드래그 상태로 이미지 박스 위에서의 함수 */
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let attachmentUrls: string[] = [];
    let blank_pattern = /^\s+|\s+$/g;
    if (title.replace(blank_pattern, "") == "") {
      document.getElementById("diaryTitle")?.focus();
      setTitle("");
      return alert("Blank titles are not allowed!");
    }
    if (diary.replace(blank_pattern, "") == "") {
      document.getElementById("diaryText")?.focus();
      setDiary("");
      return alert("Blank text is not allowed!");
    }

    const date = new Date();
    try {
      setLoading(true);
      if (attachmentArr.length > 0) {
        await Promise.all(
          attachmentArr.map(async (attachment: any) => {
            const fileRef = ref(storageService, `${userUid}/${uuidv4()}`);
            const response = await uploadString(
              fileRef,
              attachment,
              "data_url"
            );
            const attachmentUrl = await getDownloadURL(response.ref);
            attachmentUrls.push(attachmentUrl);
          })
        );
      }
      if (diaryType == "single") {
        await addDoc(collection(dbService, "diarys"), {
          title: title,
          text: diary,
          createdAt: date,
          creatorId: userUid,
          attachmentUrls,
        });
      } else {
        await addDoc(collection(dbService, "couple_diarys"), {
          title: title,
          text: diary,
          createdAt: date,
          creatorId: userUid,
          coupleId: coupleId,
          attachmentUrls,
        });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setDiary("");
    setTitle("");
    setLoading(false);
    onClearAttachment();
    return diaryType == "couple" ? navigate("/couple") : navigate("/");
  };

  /** 제출 시 동작하는 함수 */
  /*   const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let attachmentUrl = "";
    let blank_pattern = /^\s+|\s+$/g;
    if (title.replace(blank_pattern, "") == "") {
      document.getElementById("diaryTitle")?.focus();
      setTitle("");
      return alert("Blank titles are not allowed!");
    }
    if (diary.replace(blank_pattern, "") == "") {
      document.getElementById("diaryText")?.focus();
      setDiary("");
      return alert("Blank text is not allowed!");
    }
    const date = new Date();
    try {
      setLoading(true);
      if (attachment !== "") {
        const fileRef = ref(storageService, `${userUid}/${uuidv4()}`);
        const response = await uploadString(
          fileRef,
          attachment,
          "data_url"
        ).then(async (snapshot) => {
          attachmentUrl = await getDownloadURL(snapshot.ref);
        });
      }
      if (diaryType == "single") {
        await addDoc(collection(dbService, "diarys"), {
          title: title,
          text: diary,
          createdAt: date,
          creatorId: userUid,
          attachmentUrl,
        });
      } else {
        await addDoc(collection(dbService, "couple_diarys"), {
          title: title,
          text: diary,
          createdAt: date,
          creatorId: userUid,
          coupleId: coupleId,
          attachmentUrl,
        });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setDiary("");
    setTitle("");
    setLoading(false);
    onClearAttachment();
    return diaryType == "couple" ? navigate("/couple") : navigate("/");
  }; */

  /** 이미지 init 기능 함수 */
  const onClearAttachment = () => {
    //setAttachment("");
    setFileName("");
    // for Arr
    setAttachmentArr([]);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  /** 이미지 용량 줄이고 img state에 저장하는 함수 */
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
        // setAttachment(result);
        //Arr
        setAttachmentArr([result, ...attachmentArr]);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  /** 파일 드래그 후 드랍 시 동작하는 함수 */
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

  /** 파일 변화 감지 함수 */
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files?.length) {
      const theFile = files[0];
      handleImageCompress(theFile);
      setFileName(theFile.name);
    }
  };

  /** 이미지 클릭 시 삭제 함수 */
  const onEachImgClick = (inx: number) => {
    let removedArr = attachmentArr.filter((arr: any) => {
      return arr !== attachmentArr[inx];
    });
    setAttachmentArr(removedArr);
  };

  /** 본문 내용 변화 감지 함수 */
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = e.target;
    let { length } = value;
    if (length > 1500) {
      return setLenOver(true);
    } else if (length > 1499) {
      setLenOver(true);
      setInputCount(length);
      setDiary(value);
    } else {
      setLenOver(false);
      setInputCount(length);
      setDiary(value);
    }
  };

  /** title 변화 감지 함수 */
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    let { length } = value;
    if (length > 40) {
      return;
    } else {
      setTitle(value);
    }
  };

  /** emoji 입력 가능하게 만드는 함수 */
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

  /** emoji 입력 가능하게 만드는 함수 */
  const handleCompositionEnd = (e: any) => {
    const textarea = e.target as HTMLTextAreaElement;
    const newValue =
      emojiValue.slice(0, textarea.selectionStart) +
      e.data +
      emojiValue.slice(textarea.selectionEnd);
    setEmojiValue(newValue);
  };

  useEffect(() => {
    let dataDate = new Date();
    if (type == "single" && todaySingle) {
      alert(
        "Oops, you already wrote it today 😎, please write a new one tomorrow!"
      );
      return navigate("/");
    } else if (type == "couple" && todayCouple) {
      alert(
        "Oops, you already wrote it today 😎, please write a new one tomorrow!"
      );
      return navigate("/couple");
    } else {
      setDate(
        `${new Intl.DateTimeFormat("en-EN", {
          year: "numeric",
          month: "long",
          weekday: "long",
          day: "numeric",
        }).format(dataDate)}`
      );
      if (type) {
        setDiaryType(type);
      }
    }
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
      <SubContainer>
        <Subtitle>{title ? title : "Title"}</Subtitle>
        <FormContainer onSubmit={onSubmit}>
          <Input
            id="diaryTitle"
            value={title}
            onChange={onTitleChange}
            type="text"
            maxLength={40}
            placeholder="Summarize your day in one sentence"
          />
          <Subtitle>Image</Subtitle>
          <div className={isDragging ? "dropzone_dragging" : "dropzone"}>
            {attachmentArr.length > 0 ? (
              <UploadImgContainer>
                {attachmentArr.map((el: any, inx: number) => (
                  <img src={el} key={inx} onClick={() => onEachImgClick(inx)} />
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
            {/*  {attachment && typeof attachment === "string" && (
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
            )} */}
          </div>

          <Subtitle>
            <div>{diary ? date : "Diary"}</div>
            <div className={isLenOver ? "overColor" : ""}>
              <span>{inputCount}</span>
              <span>/1500</span>
            </div>
          </Subtitle>
          <textarea
            style={{ whiteSpace: "pre-wrap" }}
            value={diary}
            id="diaryText"
            onChange={onContentChange}
            onCompositionEnd={handleCompositionEnd}
            onPaste={onPaste}
            maxLength={1500}
          />

          <Btn
            children="Submit"
            size="large"
            ButtonType="Emphasized"
            value="Submit"
            onClick={onSubmit}
          />
        </FormContainer>
      </SubContainer>
    </MainContainer>
  );
};

export default Write;
