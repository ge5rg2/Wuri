import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
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
import { useSelector, useDispatch } from "../store";
import { userActions } from "../store/userSlice";
import { getAuth } from "firebase/auth";
import {
  SubContainer,
  MainContainer,
  IntroContainer,
  ConnectContainer,
  CalendarIcon,
  CoupleDiaryBox,
} from "../styles/CoupleStyle";
import CoupleDiarys from "../components/CoupleDiarys";
import Btn from "../components/common/Btn";
import { Diary } from "../interface/tpyes";
import Loading from "../components/common/Loading";
import { ExpandImgContainer } from "../styles/EditStyle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { startOfDay, endOfDay } from "date-fns";
import moment from "moment";
import Calendar from "react-calendar";
import { CalendarContainer } from "../styles/CalendarStyle";
import { Pagination } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { diaryActions } from "../store/diarySlice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7256ff",
    },
    secondary: {
      main: "#2B2B2B",
    },
  },
});

const Couple = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const diaryStore = useSelector((state) => state.diary);
  const todayCouple = diaryStore.todayCouple;
  const auth = getAuth();
  const { userUid, coupleId, userUrl, userName, coupleName, coupleUrl } =
    useSelector((state) => state.user);
  const user = auth.currentUser;
  const [diarys, setDiarys] = useState<Diary[]>([]);
  const [coupleCode, setCoupleCode] = useState<string>("");
  const [isCouple, setIsCouple] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [calendar, setCalendar] = useState(false);
  const [currentDiary, setCurrentDiary] = useState<Diary[]>([]);
  const [selectedDiary, setSelectedDiary] = useState<Diary[]>([]);
  const [isExistDiary, setIsExistDiary] = useState(false);
  const [isExistMonth, setIsExistMonth] = useState<boolean>(true);
  const [markDiary, setMarkDiary] = useState<string[]>([]);
  const [value, onChange] = useState(new Date());

  let date = new Date();

  const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    value = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    setCoupleCode(value);
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const codeRef = collection(dbService, "connect");

    if (!coupleCode) {
      alert("Please enter the code");
      return;
    }
    const snap = await getDoc(doc(dbService, "connect", `${coupleCode}`));
    if (typeof snap.data() == "undefined") {
      alert("That code is Undefind!");
      return setCoupleCode("");
    } else if (snap.data()?.creatorId == userUid) {
      alert("That is your own code! try again by use another code.");
      return setCoupleCode("");
    } else if (
      Math.floor(date.getTime() - snap.data()?.createdAt.toDate().getTime()) /
        1000 /
        60 >
      10
    ) {
      alert("The validity period of the existing code has expired.");
      return setCoupleCode("");
    } else {
      const data = snap.data();
      const userQuery = query(
        collection(dbService, "userInfo"),
        where("userId", "==", data?.creatorId)
      );
      const userQuerySnapshot = await getDocs(userQuery);
      const userData = userQuerySnapshot.docs[0].data();
      const ok = window.confirm(
        `Are you sure connected to ${userData.userName}?`
      );
      if (ok) {
        const date = new Date();
        const q = query(
          collection(dbService, "userInfo"),
          where("userId", "==", data?.creatorId)
        );
        const querySnapshot = await getDocs(q);
        const { id } = querySnapshot.docs[0];
        await updateDoc(doc(dbService, "userInfo", `${id}`), {
          coupleId: userUid,
          coupleDate: date,
        });
        const q2 = query(
          collection(dbService, "userInfo"),
          where("userId", "==", userUid)
        );
        const querySnapshot2 = await getDocs(q2);
        await updateDoc(
          doc(dbService, "userInfo", `${querySnapshot2.docs[0].id}`),
          {
            coupleId: data?.creatorId,
            coupleDate: date,
          }
        );
        const CoupleUserQuery = query(
          collection(dbService, "userInfo"),
          where("userId", "==", data?.creatorId)
        );
        const CoupleUserQuerySnapshot = await getDocs(CoupleUserQuery);
        const CoupleUserData = CoupleUserQuerySnapshot.docs[0].data();

        dispatch(
          userActions.setConnectCouple({
            coupleId: data?.creatorId,
            coupleName: CoupleUserData.userName,
            coupleUrl: CoupleUserData.userUrl,
          })
        );
        //delete connect document
        await deleteDoc(doc(dbService, "connect", `${coupleCode}`));
        // also need to delete couple code(if coupleuser also create code, that code need to delete)
        const CoupleUserCodeQuery = query(
          collection(dbService, "connect"),
          where("creatorId", "==", userUid)
        );
        const CoupleUserCodeQuerySnapshot = await getDocs(CoupleUserCodeQuery);
        if (CoupleUserCodeQuerySnapshot.size > 0) {
          await deleteDoc(
            doc(
              dbService,
              "connect",
              `${CoupleUserCodeQuerySnapshot.docs[0].id}`
            )
          );
        }
        alert(`Connected with ${userData.userName}`);
        return window.location.reload();
      } else {
        return alert("cancel");
      }
    }
  };

  const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    let pageDiary = diarys[page - 1];
    if (pageDiary) {
      setCurrentDiary([pageDiary]);
    }
  };

  const selectedDiaryData: JSX.Element[] = selectedDiary.map((el) => {
    return (
      <CoupleDiarys key={el.id} diary={el.text} obj={el} doc="couple_diarys" />
    );
  });

  const diaryData: JSX.Element[] = currentDiary.flat().map((el) => {
    return (
      <CoupleDiarys key={el.id} diary={el.text} obj={el} doc="couple_diarys" />
    );
  });

  const callMonthlyDiary = async (firstDay: Date, lastDay: Date) => {
    const q = query(
      collection(dbService, "couple_diarys"),
      where("creatorId", "in", [userUid, coupleId]),
      where("createdAt", ">=", firstDay),
      where("createdAt", "<=", lastDay),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    if (!snapshot.size) {
      return;
    }
    const diaryObject: any = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return diaryObject;
  };

  const onCalendarChange = async (value: any, e: any) => {
    const start = startOfDay(value);
    const end = endOfDay(value);
    // Date 숫자형 표현 console.log(value.valueOf());
    const q = query(
      collection(dbService, "couple_diarys"),
      where("creatorId", "in", [userUid, coupleId]),
      where("createdAt", ">=", start),
      where("createdAt", "<=", end)
    );
    const snapshot = await getDocs(q);
    if (snapshot) {
      const selectedDiaryObject: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (selectedDiaryObject.length > 0) {
        setSelectedDiary(selectedDiaryObject);
        setIsExistDiary(true);
      } else {
        setIsExistMonth(false);
        setIsExistDiary(false);
        setSelectedDiary([]);
      }
    }
  };

  const onCalendarAreaChange = async (activeStartDate: any, view: any) => {
    // activeStartDate 를 통해 find 후 state 에 저장
    const firstDayOfMonth = new Date(
      activeStartDate.getFullYear(),
      activeStartDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      activeStartDate.getFullYear(),
      activeStartDate.getMonth() + 1,
      0,
      23,
      59,
      59
    );
    setIsExistDiary(false);
    callMonthlyDiary(firstDayOfMonth, lastDayOfMonth)
      .then((diaryObject: any) => {
        if (!diaryObject) {
          return setIsExistMonth(false);
        }
        const weeklyDiarys = [];
        let startIndex = 0;
        while (startIndex < diaryObject.length) {
          const endIndex = startIndex + 7;
          const weeklyDiary = diaryObject.slice(startIndex, endIndex);
          weeklyDiarys.push(weeklyDiary);
          startIndex = endIndex;
        }
        const createdAts = weeklyDiarys
          .flatMap((diaryArray) =>
            diaryArray.map((diary: any) => diary.createdAt)
          )
          .map((createdAt) => {
            const date = new Date(createdAt.toDate());
            return `${date.getDate().toString().padStart(2, "0")}-${(
              date.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}-${date.getFullYear()}`;
          });

        setMarkDiary(createdAts);
        setIsExistMonth(true);
        setDiarys(weeklyDiarys);
        setCurrentDiary([weeklyDiarys[0]]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onCalendarIconClick = () => {
    if (!calendar) {
      document
        .getElementById("calendarContainer")
        ?.classList.remove("animateEnd");
      document
        .getElementById("calendarContainer")
        ?.classList.remove("animateDisplay");
      document
        .getElementById("calendarContainer")
        ?.classList.add("animateStart");
    } else {
      document
        .getElementById("calendarContainer")
        ?.classList.remove("animateStart");
      document.getElementById("calendarContainer")?.classList.add("animateEnd");
      setTimeout(() => {
        document
          .getElementById("calendarContainer")
          ?.classList.add("animateDisplay");
      }, 300);
    }
    setCalendar((prev) => !prev);
  };

  const callCoupleData = async () => {
    setLoading(true);
    if (coupleId) {
      const now = new Date();
      const start = startOfDay(now);
      const end = endOfDay(now);
      const todayQ = query(
        collection(dbService, "couple_diarys"),
        where("creatorId", "==", userUid),
        where("createdAt", ">=", start),
        where("createdAt", "<=", end)
      );
      const toDaySnapshot = await getDocs(todayQ);
      if (toDaySnapshot.size > 0) {
        dispatch(diaryActions.writenCouple());
      } else {
        dispatch(diaryActions.noneCouple());
      }
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59
      );
      callMonthlyDiary(firstDayOfMonth, lastDayOfMonth)
        .then((diaryObject: any) => {
          if (!diaryObject) {
            return setIsExistMonth(false);
          }
          const weeklyDiarys = [];
          let startIndex = 0;
          while (startIndex < diaryObject.length) {
            const endIndex = startIndex + 7;
            const weeklyDiary = diaryObject.slice(startIndex, endIndex);
            weeklyDiarys.push(weeklyDiary);
            startIndex = endIndex;
          }
          const createdAts = weeklyDiarys
            .flatMap((diaryArray) =>
              diaryArray.map((diary: any) => diary.createdAt)
            )
            .map((createdAt) => {
              const date = new Date(createdAt.toDate());
              return `${date.getDate().toString().padStart(2, "0")}-${(
                date.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}-${date.getFullYear()}`;
            });
          setMarkDiary(createdAts);
          setIsExistMonth(true);
          setDiarys(weeklyDiarys);
          setCurrentDiary([weeklyDiarys[0]]);
        })
        .catch((error) => {
          console.log(error);
        });

      setIsCouple(true);
      setLoading(false);
      /*       const q = query(
        collection(dbService, "couple_diarys"),
        where("creatorId", "in", [userUid, coupleId]),
        orderBy("createdAt", "desc")
      );
      await onSnapshot(q, (snapshot) => {
        const diaryObject: any = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setIsCouple(true);
        setDiarys(diaryObject);
        setLoading(false);
      }); */
    } else {
      return setLoading(false);
    }
  };

  const onWritePageClick = () => {
    navigate("/write/couple");
  };

  useEffect(() => {
    callCoupleData();
  }, []);

  return (
    <>
      <MainContainer style={!isCouple ? { justifyContent: "center" } : {}}>
        {loading ? (
          <ExpandImgContainer>
            <div className="modal__box">
              <Loading loading={loading} />
            </div>
          </ExpandImgContainer>
        ) : (
          ""
        )}
        {!isCouple && (
          <ConnectContainer>
            <h1>Verification🔑</h1>
            <form>
              <Input
                type="text"
                placeholder="Type couple code!"
                value={coupleCode}
                onChange={onCodeChange}
                maxLength={6}
              />
              <Btn
                type="submit"
                ButtonType="Emphasized"
                size="large"
                children="Check"
                onClick={onSubmit}
              />
            </form>
          </ConnectContainer>
        )}
        {isCouple && (
          <SubContainer>
            <div className="CoupleImg_Box">
              <img
                style={{ borderRadius: "50%", objectFit: "cover" }}
                src={userUrl + ""}
                className="OwnerImg"
                onClick={() => navigate("/profile")}
              />
              <div>♥️</div>
              <img
                style={{ borderRadius: "50%", objectFit: "cover" }}
                src={coupleUrl + ""}
                className="CoupleImg"
                onClick={() => navigate("/profile")}
              />
            </div>
            <IntroContainer>
              {todayCouple ? (
                <Btn
                  children="Write a new story tomorrow 🖐️"
                  ButtonType="Couple"
                />
              ) : (
                <Btn
                  ButtonType="Couple"
                  onClick={onWritePageClick}
                  children={
                    "How was your date today " +
                    userName +
                    ", " +
                    coupleName +
                    "?"
                  }
                />
              )}
            </IntroContainer>
            <CalendarIcon>
              <div onClick={onCalendarIconClick} className="calendarIcon__box">
                🗓
                {calendar ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </div>
            </CalendarIcon>
            <CalendarContainer
              id="calendarContainer"
              className="animateDisplay"
            >
              <Calendar
                onActiveStartDateChange={({
                  action,
                  activeStartDate,
                  value,
                  view,
                }) => onCalendarAreaChange(activeStartDate, view)}
                minDate={new Date(1672498800000)}
                minDetail="year"
                maxDate={new Date()}
                calendarType="US"
                locale="en-EN"
                value={value}
                onChange={onCalendarChange}
                tileClassName={({ date, view }) => {
                  if (
                    markDiary.find(
                      (x) => x === moment(date).format("DD-MM-YYYY")
                    )
                  ) {
                    return "highlight_cop";
                  }
                }}
              />
            </CalendarContainer>

            {isExistDiary ? (
              <>{selectedDiaryData}</>
            ) : isExistMonth ? (
              <>
                <CoupleDiaryBox>{diaryData}</CoupleDiaryBox>
                <ThemeProvider theme={theme}>
                  <Pagination
                    count={diarys.length}
                    color="primary"
                    onChange={onPageChange}
                  />
                </ThemeProvider>
              </>
            ) : (
              <div className="Nodata__box">
                <Btn
                  children="Oops, you didn't diary on that date! 😵"
                  ButtonType="Default"
                  size="large"
                />
              </div>
            )}
          </SubContainer>
        )}
      </MainContainer>
    </>
  );
};

export default Couple;
