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
  .DiaryContent_date {
    padding: 0.5rem 0;
  }
  .EditBtn_style {
    width: 100%;
    margin: 1rem 0;
  }
`;

export const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .DiaryContent {
    display: flex;
    flex-direction: column;
    border: 1px solid ${palette.gray[200]};
    border-radius: 10px;
    .DiaryContent_text {
      padding: 1rem;
      height: 50vh;
    }

    .DiaryContent_title {
      padding: 1rem;
      font-size: 1.5rem;
      border-bottom: 1px solid ${palette.gray[200]};
    }
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  img {
    cursor: pointer;
    max-width: 200px;
    max-height: 350px;
  }
`;

export const MainEditContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 350px;
  textarea {
    border-radius: 10px;
    resize: none;
    height: 50vh;
    width: 100%;
    color: ${palette.gray[200]};
    font-size: 1rem;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: ${(props) => props.theme.bgColor};
  }
  textarea::-webkit-scrollbar {
    width: 10px;
  }
  textarea::-webkit-scrollbar-thumb {
    background-color: ${palette.gray[200]};
    border-radius: 10px;
  }
`;

export const EditBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CommentContainer = styled.div`
  .CommemtForm_container {
    width: 350px;
    display: flex;
    .CommemtForm_img {
      margin-right: 0.5rem;
    }
    .CommemtForm_form {
      width: 100%;
      .CommentForm_Btn {
        display: flex;
        justify-content: flex-end;
        margin-top: 0.5rem;
      }
      input {
        width: 100%;
        padding: 1rem;
      }
    }
  }
`;

export const CommentDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .CommentData_container {
    display: flex;
    .CommentData_img {
    }
    .CommentData_comment {
    }
  }
`;
