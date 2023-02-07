import React, { useState } from "react";
import Router from "./Router";
import { GlobalStyle } from "./styles/GlobalStyle";
import Nav from "./components/Nav";
import { app, auth } from "./myBase";
import Welcome from "./components/Welcome";

function App() {
  console.log(app);
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
