import Input from "../components/common/Input";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { dbService } from "../myBase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Diary } from "../interface/tpyes";
import Diarys from "../components/Diarys";
import { useSelector } from "../store";
import Btn from "../components/common/Btn";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import {
  MainContainer,
  SubContainer,
  IntroContainer,
  DiaryBox,
  CalendarIcon,
} from "../styles/HomeStyle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Pagination } from "@mui/material";
import Calendar from "react-calendar";
import { CalendarContainer } from "../styles/CalendarStyle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { startOfDay, endOfDay } from "date-fns";
import moment from "moment";
import Loading from "../components/common/Loading";
import { ExpandImgContainer } from "../styles/EditStyle";
import { useDispatch } from "../store";
import { diaryActions } from "../store/diarySlice";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#10a37f",
    },
    secondary: {
      main: "#2B2B2B",
    },
  },
});

const Home = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const userStore = useSelector((state) => state.user);
  const diaryStore = useSelector((state) => state.diary);
  const todaySingle = diaryStore.todaySingle;
  const uid = userStore.userUid;
  const [diarys, setDiarys] = useState<Diary[]>([]);
  const [currentDiary, setCurrentDiary] = useState<Diary[]>([]);
  const [calendar, setCalendar] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState<Diary[]>([]);
  const [isExistDiary, setIsExistDiary] = useState(false);
  const [isExistMonth, setIsExistMonth] = useState<boolean>(true);
  const [markDiary, setMarkDiary] = useState<string[]>([]);
  const [value, onChange] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(true);

  const onWritePageClick = () => {
    navigate("/write/single");
  };

  const callMonthlyDiary = async (firstDay: Date, lastDay: Date) => {
    const start = startOfDay(value);
    const end = endOfDay(value);
    const todayQ = query(
      collection(dbService, "diarys"),
      where("creatorId", "==", uid),
      where("createdAt", ">=", start),
      where("createdAt", "<=", end)
    );
    const toDaySnapshot = await getDocs(todayQ);
    if (toDaySnapshot.size > 0) {
      dispatch(diaryActions.writenSingle());
    } else {
      dispatch(diaryActions.noneSingle());
    }
    const q = query(
      collection(dbService, "diarys"),
      where("creatorId", "==", uid),
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

  const diaryData: JSX.Element[] = currentDiary.flat().map((el) => {
    return <Diarys key={el.id} diary={el.text} obj={el} doc="diarys" />;
  });

  const selectedDiaryData: JSX.Element[] = selectedDiary.map((el) => {
    return <Diarys key={el.id} diary={el.text} obj={el} doc="diarys" />;
  });

  const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    let pageDiary = diarys[page - 1];
    if (pageDiary) {
      setCurrentDiary([pageDiary]);
    }
  };

  const onCalendarChange = async (value: any, e: any) => {
    const start = startOfDay(value);
    const end = endOfDay(value);
    // Date 숫자형 표현 console.log(value.valueOf());
    const q = query(
      collection(dbService, "diarys"),
      where("creatorId", "==", uid),
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

  useEffect(() => {
    const now = new Date();

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
    setLoading(false);
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
        <IntroContainer>
          <img
            style={{ borderRadius: "50%", objectFit: "cover" }}
            src={userStore.userUrl + ""}
            onClick={() => navigate("/profile")}
          />
          {todaySingle ? (
            <Btn
              children="Write a new story tomorrow 🖐️"
              ButtonType="Emphasized"
            />
          ) : (
            <Btn
              onClick={onWritePageClick}
              children={"What's on your mind " + userStore.userName + "?"}
              ButtonType="Emphasized"
            />
          )}
        </IntroContainer>
        <CalendarIcon>
          <div onClick={onCalendarIconClick} className="calendarIcon__box">
            🗓{calendar ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        </CalendarIcon>
        <CalendarContainer id="calendarContainer" className="animateDisplay">
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
                markDiary.find((x) => x === moment(date).format("DD-MM-YYYY"))
              ) {
                return "highlight";
              }
            }}
          />
        </CalendarContainer>
        {isExistDiary ? (
          <>{selectedDiaryData}</>
        ) : isExistMonth ? (
          <>
            <DiaryBox>{diaryData}</DiaryBox>
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
    </MainContainer>
  );
};
export default Home;
