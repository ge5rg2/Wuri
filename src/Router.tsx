import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Welcome from "./components/Welcome";
import { useSelector } from "./store";

const Router: React.FC = () => {
  const userStore = useSelector((state) => state.user);

  return (
    <>
      {userStore.isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      ) : (
        <Welcome />
      )}
    </>
  );
};
export default Router;
