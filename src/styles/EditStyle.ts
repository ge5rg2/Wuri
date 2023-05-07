import styled from "styled-components";
import palette from "./palette";

export const MainContainer = styled.div`
  padding-top: 4rem;
  padding-bottom: 5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  @media all and (min-width: 320px) {
    width: 300px;
  }
  @media all and (min-width: 1024px) {
    width: 350px;
  }
  .DiaryContent_date {
    padding: 0.5rem 0;
  }
  .EditBtn_style {
    width: 100%;
    margin: 1rem 0 0 0;
  }
`;

export const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .DiaryContent {
    display: flex;
    flex-direction: column;
    border: 1px solid
      ${(props) =>
        props.theme.mode === "dark" ? palette.gray[700] : palette.gray[200]};
    border-radius: 10px;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
    .DiaryContent_text {
      padding: 1rem;
      line-height: 1.3rem;
      min-height: 50vh;
    }

    .DiaryContent_title {
      padding: 1rem;
      font-size: 1.5rem;
      border-bottom: 1px solid
        ${(props) =>
          props.theme.mode === "dark" ? palette.gray[700] : palette.gray[200]};
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

export const ExpandImgContainer = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${(props) => props.theme.bgColor};
  .modal__box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    align-items: center;
    img {
      @media all and (min-width: 320px) {
        max-width: 300px;
        max-height: 450px;
      }
      @media all and (min-width: 1024px) {
        max-width: 500px;
        max-height: 650px;
      }
      cursor: pointer;
    }
  }
`;

export const MainEditContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 350px;
  @media all and (min-width: 320px) {
    width: 300px;
  }
  @media all and (min-width: 1024px) {
    width: 350px;
  }
  textarea {
    margin-top: 0.5rem;
    border-radius: 10px;
    resize: none;
    height: 50vh;
    width: 100%;
    color: ${(props) => props.theme.textColor};
    font-size: 1rem;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid
      ${(props) =>
        props.theme.mode === "dark" ? palette.gray[700] : palette.gray[200]};
    background-color: ${(props) => props.theme.bgColor};
    transition: all ease-in-out 0.3s;
    &:focus {
      border: 1px solid
        ${(props) =>
          props.theme.mode === "dark" ? palette.gray[600] : palette.gray[400]};
    }
  }
  textarea::-webkit-scrollbar {
    width: 10px;
  }
  /**스크롤바 색상 */
  textarea::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? palette.gray[700] : palette.gray[300]};
    border-radius: 10px;
  }
`;

export const EditBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media all and (min-width: 320px) {
    width: 300px;
    button {
      width: 95px;
    }
  }
  @media all and (min-width: 1024px) {
    width: 350px;
    button {
      width: 110px;
    }
  }
`;

export const CommentContainer = styled.div`
  margin: 1rem 0 0 0;
  .CommemtForm_container {
    width: 350px;
    @media all and (min-width: 320px) {
      width: 300px;
    }
    @media all and (min-width: 1024px) {
      width: 350px;
    }
    display: flex;
    margin-bottom: 1.5rem;
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
        word-wrap: break-word;
        padding: 1rem;
      }
    }
  }
  .ContainerOpacity {
    opacity: 0.2;
  }
`;

export const CommentDataContainer = styled.div`
  display: flex;
  transition: all ease-in-out 0.3s;
  flex-direction: column;
  margin: 0.5rem 0 1rem 0;
  width: 100%;
  position: relative;
  transition: all ease-in-out 0.3s;
  .CommentData_container {
    display: flex;
    .CommentData_img {
      margin-right: 0.5rem;
    }
    .CommentData_comment_container {
      .CommentData_comment_subcontainer {
        display: flex;
        align-items: center;
        .CommentData_comment_name {
          margin-right: 0.5rem;
        }
        .CommentData_comment_subcontainer_more {
          display: flex;
          align-items: center;
          .CommentData_comment_date {
            font-size: 0.8rem;
            color: ${(props) => props.theme.textColor};
          }
          .CommentData_comment_more {
            position: absolute;
            cursor: pointer;
            right: 0;
          }
        }
      }

      .CommentData_comment_text {
        padding-top: 0.5rem;
      }
    }
  }
  .CommentForm_Btn {
    button:first-child {
      margin-right: 0.5rem;
    }
  }
  .animateDisplay {
    display: none;
  }

  .animateEnd {
    animation: 0.3s Comentup;
    animation-fill-mode: forwards;
  }
  .animateStart {
    animation: 0.3s ease-in Comentdown;
  }
  @keyframes Comentup {
    from {
      transform: translate(0, 0);
      opacity: 1;
    }
    to {
      transform: translate(-7rem, 0);
      opacity: 0;
    }
  }

  @keyframes Comentdown {
    from {
      transform: translate(-7rem, 0);
      opacity: 0;
    }

    to {
      transform: translate(0, 0);
      opacity: 1;
    }
  }

  @media (max-width: 800px) {
    @keyframes Comentup {
      from {
        transform: translate(0, 0);
        opacity: 1;
      }
      to {
        transform: translate(-9rem, 0);
        opacity: 0;
      }
    }
    @keyframes Comentdown {
      from {
        transform: translate(-9rem, 0);
        opacity: 0;
      }

      to {
        transform: translate(0, 0);
        opacity: 1;
      }
    }
  }
`;

export const EditModal = styled.div`
  position: absolute;
  z-index: 5;
  @media all and (min-width: 320px) {
    right: 2rem;
    top: -0.1rem;
  }
  @media all and (min-width: 1024px) {
    right: 2rem;
    top: -0.2rem;
  }
  opacity: 1 !important;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? palette.gray[700] : palette.gray[200]};
  display: flex;
  .deleteIcon {
    span {
      font-size: 0.8rem;
    }
    transition: all ease-in-out 0.3s;
    padding: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
      background-color: ${palette.red[500]};
    }
  }
  .editIcon {
    span {
      font-size: 0.8rem;
    }
    transition: all ease-in-out 0.3s;
    display: flex;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    &:hover {
      background-color: ${palette.defaultColor};
    }
  }
`;
