import styled from "styled-components";
import palette from "./palette";

export const MainContainer = styled.div`
  padding-top: 3rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
`;

export const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .DiaryContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ffff;
    .DiaryContent_text {
      border: 1px solid #ffff;
      padding: 1rem;
      height: 50vh;
    }

    .DiaryContent_title {
      padding: 1rem;
      border: 1px solid #ffff;
      font-size: 1.5rem;
    }
  }
`;

export const FormContainer = styled.div``;

export const ImgContainer = styled.div`
  img {
    max-width: 300px;
    max-height: 450px;
  }
`;
