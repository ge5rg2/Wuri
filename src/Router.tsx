import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
