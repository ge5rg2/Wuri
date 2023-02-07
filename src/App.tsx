import React, { useState, useEffect } from "react";
import Router from "./Router";
import { GlobalStyle } from "./styles/GlobalStyle";
import Nav from "./components/Nav";
import { app } from "./myBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Welcome from "./components/Welcome";

function App() {
  console.log(app);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
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
