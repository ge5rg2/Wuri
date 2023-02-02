import React, { useState } from "react";
import Router from "./Router";
import { GlobalStyle } from "./styles/GlobalStyle";
import Nav from "./components/Nav";
import { auth } from "./myBase";
import Welcome from "./components/Welcome";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  return (
    <>
      <GlobalStyle />
      {isLoggedIn ? (
        <>
          <Nav />
          <Router />
        </>
      ) : (
        <Welcome />
      )}
    </>
  );
}

export default App;
