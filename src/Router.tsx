import { Routes, Route } from "react-router-dom";
import { useSelector } from "./store";
import Home from "./routes/Home";
import Welcome from "./components/Welcome";
import Profile from "./routes/Profile";

const Router: React.FC = () => {
  const userStore = useSelector((state) => state.user);

  return (
    <>
      {userStore.isLoggedIn ? (
        <>
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
          <Routes>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </>
      ) : (
        <Welcome />
      )}
    </>
  );
};
export default Router;
