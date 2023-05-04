import styled from "styled-components";
import palette from "./palette";

export const MainContainer = styled.div`
  padding-top: 4rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  .couple__code {
    margin-top: 2rem;
    text-align: center;
    div {
      border: 1px solid ${(props) => props.theme.textColor};
      background-color: ${(props) => props.theme.bgColor};
      border-radius: 10px;
      padding: 0.75rem 1.8rem; // 12px 28.8px
      font-size: 1rem; // 16px
      margin-bottom: 0.5rem;
    }
  }
`;

export const SubContainer = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .profile__userName {
    font-size: 1rem;
    font-weight: 550;
    padding: 0.5rem 0 0 0;
  }
  .profile__loginMethod {
    font-size: 0.7rem;
    padding: 0 0 0.5rem 0;
  }
  img {
    border-radius: 50%;
    margin-bottom: 0.5rem;
    cursor: pointer;
  }
  button {
    width: 50%;
    margin-bottom: 2rem;
  }
`;

export const ProfileEditContainer = styled.div`
  display: flex;
  width: 350px;
  flex-direction: column;
  align-items: center;

  .edit__input {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    input {
      padding: 1rem;
    }
    span {
      font-size: 0.8rem;
      margin-bottom: 0.3rem;
    }
  }
  .edit__btn {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    button {
      width: 50%;
      margin: 0 0.9rem;
    }
  }
`;

export const UploadImgContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const UploadBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  Button {
    width: 30%;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  width: 60%;
  flex-direction: column;
  Button {
    margin-bottom: 1rem;
  }
  input {
    padding: 1rem;
  }
  #file {
    display: none;
  }
  .dropzone {
    border-radius: 10px;
    transition: all ease-in-out 0.3s;
    border: 2px dashed
      ${(props) =>
        props.theme.mode === "dark" ? palette.gray[500] : palette.gray[400]};
  }
  .dropzone_dragging {
    border-radius: 10px;
    transition: all ease-in-out 0.3s;
    border: 2px dashed ${palette.defaultColor};
    .upload {
      text-align: center;
      border-radius: 10px;
      position: relative;
      background-color: ${(props) =>
        props.theme.mode === "dark" ? palette.gray[700] : palette.gray[300]};
      cursor: pointer;
    }
    .fileBtn {
      opacity: 0.5;
    }
  }
  .filePlaceholder {
    cursor: pointer;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 4rem;
    color: ${(props) => props.theme.textColor};
  }
  .filePlaceholder::before {
    content: "Or drag an image";
    position: absolute;
    top: 10%;
  }
  .fileBtn {
    display: flex;
    justify-content: center;
    position: absolute;
    cursor: pointer;
    top: 40%;
    left: 16%;
    padding: 1rem;
    border-radius: 10px;
    font-weight: 500;
    border: 1px solid
      ${(props) =>
        props.theme.mode === "dark" ? palette.gray[700] : palette.gray[300]};
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    transition: all ease-in-out 0.3s;
    &:hover {
      background-color: ${(props) => props.theme.bgColor};
      color: ${(props) => props.theme.textColor};
    }
  }
  .upload {
    text-align: center;
    position: relative;
    cursor: pointer;
  }
`;

export const SumContainer = styled.div`
  width: 300px;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  background-color: ${(props) =>
    props.theme.mode === "dark" ? palette.gray[600] : "White"};
  border: 1px solid
    ${(props) =>
      props.theme.mode === "dark" ? palette.gray[700] : palette.gray[200]};
  border-radius: 10px;
  padding: 1rem;
  .sum__box {
    display: flex;
    margin: 0.5rem 0;
  }
`;

export const CoupleContainer = styled.div`
  margin-top: 1rem;
  padding-bottom: 4rem;
  .couple__title {
    text-align: center;
  }
  .couple__box {
    width: 300px;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
    background-color: ${(props) =>
      props.theme.mode === "dark" ? palette.gray[600] : "White"};
    border: 1px solid
      ${(props) =>
        props.theme.mode === "dark" ? palette.gray[700] : palette.gray[200]};
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    .couple__box_info {
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        font-size: 0.8rem;
      }
    }
    .couple__box_sub {
      margin-left: 1rem;
      width: 100%;
      padding: 1rem 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;

  img {
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
    width: 150px;
    height: 150px;
  }
`;
