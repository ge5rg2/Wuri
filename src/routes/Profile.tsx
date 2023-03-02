import Nav from "../components/Nav";
import { MainContainer } from "../styles/HomeStyle";
import React, { useEffect } from "react";
import { collection, getDocs, query, where } from "@firebase/firestore";

const Profile = () => {
  useEffect(() => {
    console.log("Hi");
  }, []);

  return (
    <MainContainer>
      <Nav />
      <div>isProfile</div>
    </MainContainer>
  );
};

export default Profile;
