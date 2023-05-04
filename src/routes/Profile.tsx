import {
  MainContainer,
  SubContainer,
  ProfileEditContainer,
  UploadImgContainer,
  UploadBtnContainer,
  FormContainer,
  SumContainer,
  CoupleContainer,
  ImgContainer,
} from "../styles/ProfileStyle";
import React, { useEffect, useState, useRef } from "react";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  getDoc,
  setDoc,
  getCountFromServer,
  deleteField,
  updateDoc,
} from "@firebase/firestore";
import { dbService, storageService } from "../myBase";
import { useSelector, useDispatch } from "../store";
import { getAuth, updateProfile } from "firebase/auth";
import Btn from "../components/common/Btn";
import Input from "../components/common/Input";
import { userActions } from "../store/userSlice";
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { ExpandImgContainer } from "../styles/EditStyle";
import imageCompression from "browser-image-compression";
import Loading from "../components/common/Loading";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginMethod, setLoginMethod] = useState<string>("");
  const [randomCode, setRandomCode] = useState<string>("");
  const [isCouple, setIsCouple] = useState<boolean>(false);
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [editUserName, setEditUserName] = useState<string>("");
  const [firstAttachment, setFirstAttachment] = useState<any>("");
  const [attachment, setAttachment] = useState<any>("");
  const [isDragging, setIsDragging] = useState(false);
  const [diarySize, setDiarySize] = useState(0);
  const [coupleDiarySize, setCoupleDiarySize] = useState(0);
  const [commentsSize, setCommentsSize] = useState(0);
  const [matchedDate, setMatchedDate] = useState<string>("");
  const [expandUserImg, setExpandUserImg] = useState<boolean>(false);
  const [expandCoupleImg, setExpandCoupleImg] = useState<boolean>(false);
  const { userUid, userUrl, userName, coupleId, coupleName, coupleUrl } =
    useSelector((state) => state.user);

  const [loading, setLoading] = useState<boolean>(true);

  const fileInput = useRef<HTMLInputElement>(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const provider = user?.providerData[0].providerId;
  let date = new Date();
  const defaultURL =
    "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/309/59932b0eb046f9fa3e063b8875032edd_crop.jpeg";

  const generateRandomCode = async () => {
    const codeRef = collection(dbService, "connect");
    const snapshot = await getCountFromServer(codeRef);
    let len = snapshot.data().count;
    for (let j = 0; j < len + 1; j++) {
      let str = "";
      for (let i = 0; i < 6; i++) {
        str += Math.floor(Math.random() * 10);
      }
      const snap = await getDoc(doc(dbService, "connect", `${str}`));
      if (typeof snap.data() == "undefined") {
        setRandomCode(str);
        return str;
      } else {
        str = "";
        continue;
      }
    }
  };

  const getMyAccount = async () => {
    const diaryQ = query(
      collection(dbService, "diarys"),
      where("creatorId", "==", userUid)
    );
    const coupleDiaryQ = query(
      collection(dbService, "couple_diarys"),
      where("creatorId", "==", userUid)
    );

    const commentsQ = query(
      collection(dbService, "comments"),
      where("creatorId", "==", userUid)
    );

    const diaryQuerySnapshot = await getDocs(diaryQ);
    const coupleDiarySnapshot = await getDocs(coupleDiaryQ);
    const commentsSnapshot = await getDocs(commentsQ);

    if (diaryQuerySnapshot) {
      setCoupleDiarySize(coupleDiarySnapshot.size);
    }
    if (coupleDiarySnapshot) {
      setDiarySize(diaryQuerySnapshot.size);
    }
    if (commentsSnapshot) {
      setCommentsSize(commentsSnapshot.size);
    }

    if (coupleId) {
      setIsCouple(true);
      getCoupleDate();
    } else {
      getCoupleCode();
    }
    if (user !== null) {
      getLoginMethod();
      if (userUrl) {
        setAttachment(userUrl);
        setFirstAttachment(userUrl);
      }
      if (userName) {
        setEditUserName(userName);
      }
    }

    setLoading(false);
  };

  const getCoupleCode = async () => {
    const codeRef = collection(dbService, "connect");
    const q = query(codeRef, where("creatorId", "==", userUid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      const currentCodeData = querySnapshot.docs[0].data();
      const connectCode = querySnapshot.docs[0].id;
      let codeTime = currentCodeData.createdAt.toDate().getTime();
      let expiration = Math.floor(date.getTime() - codeTime) / 1000 / 60;
      let deadLine = date.getTime() - codeTime;
      const second = 60 - Math.floor((deadLine / 1000) % 60);
      const minute = 10 - Math.floor((deadLine / 1000 / 60) % 60);
      console.log(`${minute}분 ${second}초 남음`);
      if (expiration > 10) {
        alert("The validity period of the existing code has expired.");
        await deleteDoc(doc(dbService, "connect", `${connectCode}`));
        return setRandomCode("");
      } else {
        return setRandomCode(connectCode);
      }
    }
  };

  const getCoupleDate = async () => {
    const userInfoQ = query(
      collection(dbService, "userInfo"),
      where("userId", "==", userUid)
    );

    const infoSnapshot = await getDocs(userInfoQ);
    const coupleDate = infoSnapshot.docs[0]
      .data()
      .coupleDate.toDate()
      .getTime();

    const matchingDate = new Date().getTime() - coupleDate;
    const day = Math.floor(matchingDate / 1000 / 60 / 60 / 24);
    setMatchedDate(`${day} day`);
    /*     setInterval(() => {
      const matchingDate = new Date().getTime() - coupleDate;
       
      const second = Math.floor((matchingDate / 1000) % 60);
      const minute = Math.floor((matchingDate / 1000 / 60) % 60);
      const hour = Math.floor(matchingDate / 1000 / 60 / 60) % 24; 
      
      const day = Math.floor(matchingDate / 1000 / 60 / 60 / 24);
      setMatchedDate(`💞${day}day`);
    }, 1000); */
  };

  const getLoginMethod = () => {
    if (user !== null) {
      if (provider == "password") {
        setLoginMethod("✉️ 이메일 계정으로 로그인 됨");
      } else if (provider == "google.com") {
        setLoginMethod("🌐 구글 계정으로 로그인 됨");
      } else if (provider == "github.com") {
        setLoginMethod("😺 깃허브 계정으로 로그인 됨");
      }
    }
  };

  const createCoupleCode = async () => {
    const random = await generateRandomCode();
    const codeRef = collection(dbService, "connect");
    const q = query(codeRef, where("creatorId", "==", userUid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      /*    get current user before code num   */
      const connectCode = querySnapshot.docs[0].id;
      await deleteDoc(doc(dbService, "connect", `${connectCode}`));
    }
    await setDoc(doc(codeRef, `${random}`), {
      createdAt: date,
      creatorId: userUid,
    });
  };

  const disconnectCouple = async () => {
    const CoupleUserQuery = query(
      collection(dbService, "userInfo"),
      where("userId", "==", coupleId)
    );
    const UserQuery = query(
      collection(dbService, "userInfo"),
      where("userId", "==", userUid)
    );
    const CoupleUserQuerySnapshot = await getDocs(CoupleUserQuery);
    const UserQuerySnapshot = await getDocs(UserQuery);
    const ok = window.confirm("Are you sure you want to disconnect Couple?");
    if (ok) {
      await updateDoc(
        doc(dbService, "userInfo", `${CoupleUserQuerySnapshot.docs[0].id}`),
        {
          coupleId: deleteField(),
          coupleDate: deleteField(),
        }
      );
      await updateDoc(
        doc(dbService, "userInfo", `${UserQuerySnapshot.docs[0].id}`),
        {
          coupleId: deleteField(),
          coupleDate: deleteField(),
        }
      );
      dispatch(
        userActions.setConnectCouple({
          coupleId: "",
          coupleName: "",
          coupleUrl: "",
        })
      );
      setIsCouple(false);
      alert("Disconnect complete!!");
    } else {
      return;
    }
  };

  const onEditProfile = () => {
    if (editProfile) {
      if (attachment == userUrl && editUserName == userName) {
        return setEditProfile((props) => !props);
      }
      const ok = window.confirm(
        "Changes made will be undone. Would you like to proceed?"
      );
      if (ok) {
        if (userUrl) {
          setAttachment(userUrl);
        }
        if (userName) {
          setEditUserName(userName);
        }
        return setEditProfile((props) => !props);
      } else {
        return;
      }
    } else {
      setEditProfile((props) => !props);
    }
  };

  const onClearAttachment = () => {
    setAttachment("");
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const handleImageCompress = async (file: File) => {
    const options = {
      maxSizeMB: 0.2, // 이미지 최대 용량
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
        setAttachment(result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

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

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files?.length) {
      const theFile = files[0];
      handleImageCompress(theFile);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setEditUserName(value);
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let attachmentUrl = "";
    let blank_pattern = /^\s+|\s+$/g;
    if (editUserName.replace(blank_pattern, "") == "") {
      document.getElementById("newName")?.focus();
      setEditUserName("");
      return alert("Do not allow spaces in names");
    }
    if (userName == editUserName && userUrl == attachment) {
      alert("Nothing changed!");
      return setEditProfile((props) => !props);
    }
    try {
      setLoading(true);
      if (attachment !== "") {
        if (attachment !== userUrl) {
          const fileRef = ref(storageService, `${userUid}/${uuidv4()}`);
          await uploadString(fileRef, attachment, "data_url").then(
            async (snapshot) => {
              attachmentUrl = await getDownloadURL(snapshot.ref);
            }
          );
          if (firstAttachment !== defaultURL) {
            const startIndex = firstAttachment.lastIndexOf("%2F") + 3;
            const endIndex = firstAttachment.indexOf("?", startIndex);
            const fileName = decodeURIComponent(
              firstAttachment.substring(startIndex, endIndex)
            );
            console.log(fileName);
            const desertRef = ref(storageService, `${userUid}/${fileName}`);
            // Delete the file
            await deleteObject(desertRef)
              .then(() => {
                // File deleted successfully

                console.log("DB 이미지를 성공적으로 삭제했습니다.");
              })
              .catch((error) => {
                // Uh-oh, an error occurred!
                console.log("Delete Img Error!" + " " + error);
              });
          }
        }
      } else {
        attachmentUrl = defaultURL;
        if (firstAttachment !== defaultURL && attachment == "") {
          const startIndex = firstAttachment.lastIndexOf("%2F") + 3;
          const endIndex = firstAttachment.indexOf("?", startIndex);
          const fileName = decodeURIComponent(
            firstAttachment.substring(startIndex, endIndex)
          );
          console.log(fileName);
          const desertRef = ref(storageService, `${userUid}/${fileName}`);
          // Delete the file
          await deleteObject(desertRef)
            .then(() => {
              // File deleted successfully
              console.log("DB 이미지를 성공적으로 삭제했습니다.");
            })
            .catch((error) => {
              // Uh-oh, an error occurred!
              console.log("Delete Img Error!" + " " + error);
            });
        }
      }
      if (user) {
        await updateProfile(user, {
          displayName: editUserName,
          photoURL: attachmentUrl == "" ? attachment : attachmentUrl,
        })
          .then(async () => {
            // Profile updated!
            // ...
            dispatch(
              userActions.setEditUser({
                userName: editUserName,
                userUrl: attachmentUrl == "" ? attachment : attachmentUrl,
              })
            );
            const userInfoQuery = query(
              collection(dbService, "userInfo"),
              where("userId", "==", userUid)
            );
            const userInfoSnapshot = await getDocs(userInfoQuery);

            const { id } = userInfoSnapshot.docs[0];
            await updateDoc(doc(dbService, "userInfo", `${id}`), {
              userName: editUserName,
              userUrl: attachmentUrl == "" ? attachment : attachmentUrl,
            });
            setFirstAttachment(attachmentUrl);
            alert("Profile updated!");
          })
          .catch((error) => {
            // An error occurred
            // ...
            alert("Error!!!");
            console.log(error);
          });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setLoading(false);
    setEditProfile((props) => !props);
    if (attachmentUrl == defaultURL) {
      setAttachment(defaultURL);
      setFirstAttachment(defaultURL);
    }
    // need to change userInfo document
  };

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

  useEffect(() => {
    getMyAccount();
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
      {expandUserImg ? (
        <ExpandImgContainer className="modal__container">
          <div className="modal__box">
            <img src={attachment} onClick={() => setExpandUserImg(false)} />
          </div>
        </ExpandImgContainer>
      ) : (
        ""
      )}
      {editProfile ? (
        <ProfileEditContainer>
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
          </FormContainer>
          <div className="edit__input">
            <span>User name</span>
            <Input
              type="text"
              id="newName"
              placeholder="User Name"
              value={editUserName}
              onChange={onChange}
            />
          </div>
          <div className="edit__btn">
            <Btn
              children="Update"
              ButtonType="Emphasized"
              size="medium"
              onClick={onSubmit}
            />
            <Btn
              onClick={onEditProfile}
              ButtonType="Critical"
              size="medium"
              children="Cancel"
            />
          </div>
        </ProfileEditContainer>
      ) : (
        <SubContainer>
          <ImgContainer onClick={() => setExpandUserImg(true)}>
            <img src={userUrl + ""} />
          </ImgContainer>
          <div className="profile__userName">{userName}</div>
          <div className="profile__loginMethod">{loginMethod}</div>
          <Btn
            children="Edit profile"
            ButtonType="Default"
            size="medium"
            onClick={onEditProfile}
          />
        </SubContainer>
      )}
      <div style={{ marginBottom: "0.5rem" }}>Summarize</div>
      <SumContainer>
        {diarySize != 0 || coupleDiarySize != 0 || commentsSize != 0 ? (
          <span style={{ fontSize: "0.7rem" }}>Posted</span>
        ) : (
          <span style={{ fontSize: "0.7rem", color: "red" }}>No data</span>
        )}
        {diarySize != 0 ? (
          <div className="sum__box">
            <span>📒 {diarySize} diarys</span>
          </div>
        ) : (
          ""
        )}
        {coupleDiarySize != 0 ? (
          <div className="sum__box">
            <span>📚 {coupleDiarySize} couple diarys</span>
          </div>
        ) : (
          ""
        )}
        {commentsSize != 0 ? (
          <div className="sum__box">
            <span>💬 {commentsSize} comments</span>
          </div>
        ) : (
          ""
        )}
      </SumContainer>
      {isCouple ? (
        <CoupleContainer>
          {expandCoupleImg ? (
            <ExpandImgContainer className="modal__container">
              <div className="modal__box">
                <img
                  src={coupleUrl + "-"}
                  onClick={() => setExpandCoupleImg(false)}
                />
              </div>
            </ExpandImgContainer>
          ) : (
            ""
          )}
          <div className="couple__title" style={{ marginBottom: "0.5rem" }}>
            Couple Info
          </div>
          <div className="couple__box">
            <div className="couple__box_info">
              <img
                src={coupleUrl + "-"}
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                onClick={() => setExpandCoupleImg(true)}
              />
              <div>{coupleName}</div>
            </div>
            <div className="couple__box_sub">
              <span>💞{matchedDate}</span>
              <Btn
                onClick={disconnectCouple}
                size="small"
                ButtonType="Critical"
                children="Disconnect"
              />
            </div>
          </div>
        </CoupleContainer>
      ) : randomCode ? (
        <div className="couple__code">
          <span style={{ textAlign: "center" }}>Code🔑</span>
          <div>{randomCode}</div>
          <Btn
            onClick={createCoupleCode}
            size="large"
            ButtonType="Couple"
            children="Code reissue"
          />
        </div>
      ) : (
        <>
          <div className="couple__code">
            <Btn
              onClick={createCoupleCode}
              size="large"
              ButtonType="Couple"
              children="Create couple code!"
            />
          </div>
        </>
      )}
    </MainContainer>
  );
};

export default Profile;
