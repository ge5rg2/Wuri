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

const theme = createTheme({
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
  const auth = getAuth();
  const navigate = useNavigate();
  const userStore = useSelector((state) => state.user);
  const uid = userStore.userUid;
  const [diarys, setDiarys] = useState<Diary[]>([]);
  const [currentDiary, setCurrentDiary] = useState<Diary[]>([]);
  const [calendar, setCalendar] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState<Diary[]>([]);
  const [isExistDiary, setIsExistDiary] = useState(false);
  const [value, onChange] = useState(new Date());

  const onWritePageClick = () => {
    navigate("/write/single");
  };

  const callMonthlyDiary = async (firstDay: Date, lastDay: Date) => {
    const q = query(
      collection(dbService, "diarys"),
      where("creatorId", "==", uid),
      where("createdAt", ">=", firstDay),
      where("createdAt", "<=", lastDay),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
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
        setIsExistDiary(false);
        setSelectedDiary([]);
      }
    }
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
        const weeklyDiarys = [];
        let startIndex = 0;
        while (startIndex < diaryObject.length) {
          const endIndex = startIndex + 7;
          const weeklyDiary = diaryObject.slice(startIndex, endIndex);
          weeklyDiarys.push(weeklyDiary);
          startIndex = endIndex;
        }
        setDiarys(weeklyDiarys);
        setCurrentDiary([weeklyDiarys[0]]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MainContainer>
      <SubContainer>
        <IntroContainer>
          <img
            style={{ borderRadius: "50%" }}
            src={userStore.userUrl + ""}
            onClick={() => navigate("/profile")}
          />
          <Btn
            onClick={onWritePageClick}
            children={"What's on your mind " + userStore.userName + "?"}
            ButtonType="Emphasized"
          />
        </IntroContainer>
        <CalendarIcon>
          <div
            onClick={() => setCalendar((prev) => !prev)}
            className="calendarIcon__box"
          >
            📆{calendar ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        </CalendarIcon>
        {calendar ? (
          <CalendarContainer>
            <Calendar value={value} onChange={onCalendarChange} />
          </CalendarContainer>
        ) : (
          ""
        )}
        {isExistDiary ? <>{selectedDiaryData}</> : ""}
        {/*         <>
          <DiaryBox>{diaryData}</DiaryBox>
          <ThemeProvider theme={theme}>
            <Pagination
              count={diarys.length}
              color="primary"
              onChange={onPageChange}
            />
          </ThemeProvider>
        </> */}
      </SubContainer>
    </MainContainer>
  );
};
export default Home;
