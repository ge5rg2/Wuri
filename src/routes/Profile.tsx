import { MainContainer } from "../styles/HomeStyle";
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
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginMethod, setLoginMethod] = useState<string>("");
  const [randomCode, setRandomCode] = useState<string>("");
  const [isCouple, setIsCouple] = useState<boolean>(false);
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [editUserName, setEditUserName] = useState<string>("");
  const [attachment, setAttachment] = useState<any>("");
  const { userUid, userUrl, userName, coupleId, coupleName, coupleUrl } =
    useSelector((state) => state.user);

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
    /*     const q = query(
      collection(dbService, "diarys"),
      where("creatorId", "==", userInfo.userUid)
    );
    const querySnapshot = await getDocs(q);
       
    console.log(
      querySnapshot.forEach((doc) => console.log(doc.id, " => ", doc.data()))
    ); 
     */
    if (coupleId) {
      setIsCouple(true);
    } else {
      const codeRef = collection(dbService, "connect");
      const q = query(codeRef, where("creatorId", "==", userUid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        const currentCodeData = querySnapshot.docs[0].data();
        const connectCode = querySnapshot.docs[0].id;
        let codeTime = currentCodeData.createdAt.toDate().getTime();
        let expiration = Math.floor(date.getTime() - codeTime) / 1000 / 60;
        if (expiration > 10) {
          alert("The validity period of the existing code has expired.");
          await deleteDoc(doc(dbService, "connect", `${connectCode}`));
        } else {
          setRandomCode(connectCode);
        }
      }
    }
    if (user !== null) {
      getLoginMethod();
      if (userUrl) {
        setAttachment(userUrl);
      }
      if (userName) {
        setEditUserName(userName);
      }
    }
  };

  const getLoginMethod = () => {
    if (user !== null) {
      if (provider == "password") {
        setLoginMethod("Log in via Email account");
      } else if (provider == "google.com") {
        setLoginMethod("Log in via Google account");
      } else if (provider == "github.com") {
        setLoginMethod("Log in via Github account");
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
        }
      );
      await updateDoc(
        doc(dbService, "userInfo", `${UserQuerySnapshot.docs[0].id}`),
        {
          coupleId: deleteField(),
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setEditUserName(value);
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let attachmentUrl = "";
    try {
      if (attachment !== "") {
        if (attachment !== userUrl) {
          const fileRef = ref(storageService, `${userUid}/${uuidv4()}`);
          await uploadString(fileRef, attachment, "data_url").then(
            async (snapshot) => {
              attachmentUrl = await getDownloadURL(snapshot.ref);
            }
          );
        }
      } else {
        attachmentUrl = defaultURL;
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
    setEditProfile((props) => !props);
    if (attachmentUrl == defaultURL) {
      setAttachment(defaultURL);
    }
    // need to change userInfo document
  };

  useEffect(() => {
    getMyAccount();
  }, []);

  return (
    <MainContainer>
      {editProfile ? (
        <>
          <form>
            <Input
              type="text"
              placeholder="User Name"
              value={editUserName}
              onChange={onChange}
            />
            {attachment && typeof attachment === "string" && (
              <div>
                <img src={attachment} width="50px" height="50px" />
                <Btn onClick={onClearAttachment} children="Clear" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              ref={fileInput}
            />
          </form>
          <Btn children="Update Diary" onClick={onSubmit} />
          <Btn onClick={onEditProfile} children="Cancel" />
        </>
      ) : (
        <>
          <img
            src={userUrl + ""}
            style={{ height: "10%", width: "10%", borderRadius: "50%" }}
          />
          <div>{userName}</div>
          <div>{loginMethod}</div>
          <Btn children="Edit profile" onClick={onEditProfile} />
        </>
      )}
      {isCouple ? (
        <>
          <img
            src={coupleUrl + "-"}
            style={{ height: "10%", width: "10%", borderRadius: "50%" }}
          />
          <div>{coupleName}</div>
          <Btn onClick={disconnectCouple} children="Disconnect" />
        </>
      ) : randomCode ? (
        <>
          <div>{randomCode}</div>
          <Btn onClick={createCoupleCode} children="Code reissue." />
        </>
      ) : (
        <>
          <div>
            <Btn onClick={createCoupleCode} children="Create couple code!" />
          </div>
        </>
      )}
    </MainContainer>
  );
};

export default Profile;
