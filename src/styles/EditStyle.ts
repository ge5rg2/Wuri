import styled from "styled-components";
import palette from "./palette";

export const MainContainer = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  .EditBtn_style {
    width: 100%;
    margin: 1rem 0;
  }
`;

export const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .DiaryContent_date {
    padding: 1rem 0;
  }
  .DiaryContent {
    display: flex;
    flex-direction: column;
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
  display: flex;
  justify-content: center;
  img {
    cursor: pointer;
    max-width: 200px;
    max-height: 350px;
  }
`;
