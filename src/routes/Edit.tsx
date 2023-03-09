import { MainContainer } from "../styles/HomeStyle";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "../myBase";
import { useEffect } from "react";

const Edit = () => {
  const param = useParams();

  const getDiaryInfo = async () => {
    const snap = await getDoc(doc(dbService, "diarys", "X71qs2yf1RcXcsPurPND"));

    if (snap.exists()) {
      console.log(snap.data());
    } else {
      console.log("No such document");
    }
  };

  useEffect(() => {
    getDiaryInfo();
  }, []);

  return (
    <>
      <MainContainer>
        <div>Edit</div>
      </MainContainer>
    </>
  );
};

export default Edit;
