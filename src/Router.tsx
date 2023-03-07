import { Routes, Route } from "react-router-dom";
import { useSelector } from "./store";
import Home from "./routes/Home";
import Welcome from "./components/Welcome";
import Profile from "./routes/Profile";
import Write from "./routes/Write";
import Nav from "./components/Nav";
import Edit from "./routes/Edit";

const Router: React.FC = () => {
  const userStore = useSelector((state) => state.user);

  return (
    <>
      {userStore.isLoggedIn ? (
        <>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
          <Routes>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
          <Routes>
            <Route path="/write" element={<Write />}></Route>
          </Routes>
          <Routes>
            <Route path="/edit/:id" element={<Edit />}></Route>
          </Routes>
        </>
      ) : (
        <Welcome />
      )}
    </>
  );
};
export default Router;
