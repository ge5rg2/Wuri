import styled from "styled-components";
import palette from "./palette";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  }
`;
