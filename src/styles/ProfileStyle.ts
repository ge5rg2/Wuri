import styled from "styled-components";
import palette from "./palette";

export const MainContainer = styled.div`
  padding-top: 4rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
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
    margin-top: 1rem;
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
    border: 2px dashed ${palette.gray[400]};
  }
  .dropzone_dragging {
    border-radius: 10px;
    transition: all ease-in-out 0.3s;
    border: 2px dashed ${palette.defaultColor};
    .upload {
      text-align: center;
      position: relative;
      background-color: ${palette.gray[600]};
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
    color: ${palette.gray[400]};
  }
  .filePlaceholder::before {
    content: "Drag & Drop a Img Here";
    position: absolute;
    top: 10%;
  }
  .fileBtn {
    display: flex;
    justify-content: center;
    position: absolute;
    cursor: pointer;
    top: 40%;
    left: 15%;
    padding: 1rem;
    border-radius: 10px;
    font-weight: 500;
    border: 1px solid ${(props) => props.theme.textColor};
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
