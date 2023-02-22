import { Routes, Route } from "react-router-dom";
import { useSelector } from "./store";
import Home from "./routes/Home";
import Welcome from "./components/Welcome";
import Account from "./routes/Account";

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
            <Route path="/account" element={<Account />}></Route>
          </Routes>
        </>
      ) : (
        <Welcome />
      )}
    </>
  );
};
export default Router;
