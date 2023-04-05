import styled from "styled-components";
import palette from "./palette";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export const SubContainer = styled.div`
  margin: 0 auto;
  padding-bottom: 100px;
  .greetingContainer {
    text-align: center;
    div {
      padding: 0 0 1rem 0;
    }
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 50%;
  }
`;

export const BtnContianer = styled.div`
  display: flex;
  justify-content: center;
  .BtnContianer_Sub {
    padding: 0 0.5rem;
  }
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .AuthImgContainer {
    display: flex;
    justify-content: center;
    .AuthImgBox {
      top: 1rem;
      position: fixed;
      display: flex;
      justify-content: center;
      img {
        width: 50%;
      }
    }
  }
`;

export const AuthHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 2rem;
    font-weight: 550;
    padding: 1rem 4rem; // set screen width
  }
`;

export const AuthInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
`;
