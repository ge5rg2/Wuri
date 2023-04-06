import styled from "styled-components";
import palette from "./palette";

export const MainContainer = styled.div`
  padding-top: 3rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const SubContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  img {
    border-radius: 50%;
  }
`;

export const IntroContainer = styled.div`
  display: flex;
  position: relative;
  img {
    height: 60px;
    width: 60px;
    cursor: pointer;
  }
  Button {
    margin-left: 0.5rem;
    padding: 0 2rem;
  }

  .OwnerImg {
    z-index: 2;
    position: absolute;
    left: -1.5rem;
  }
`;
