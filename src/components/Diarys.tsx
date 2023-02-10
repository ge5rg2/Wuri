import { diaryProps } from "../interface/tpyes";
import Btn from "./common/Btn";

const Diarys: React.FC<diaryProps> = ({ diary, isOwner }) => {
  console.log(isOwner);
  return (
    <>
      {isOwner ? (
        <div>
          <h4>{diary}</h4>
          <Btn children="Edit Diary" />
          <Btn children="Delete Diary" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Diarys;
