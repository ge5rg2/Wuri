import styled from "styled-components";
import palette from "./palette";

export const Subtitle = styled.div`
  margin: 1rem 0 0.5rem 0;
  display: flex;
  justify-content: space-between;
`;

export const MainContainer = styled.div`
  padding-top: 4rem;
  padding-bottom: 5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  textarea {
    border-radius: 10px;
    resize: none;
    height: 50vh;
    width: 100%;
    color: ${(props) => props.theme.textColor};
    font-size: 1rem;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid
      ${(props) =>
        props.theme.mode === "dark" ? palette.gray[700] : palette.gray[200]};
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
  textarea::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? palette.gray[700] : palette.gray[300]};
    border-radius: 10px;
  }
`;

export const SubContainer = styled.div`
  margin: 0 auto;
  width: 350px;
  @media all and (min-width: 320px) {
    width: 300px;
  }
  @media all and (min-width: 1024px) {
    width: 350px;
  }
`;

export const UploadImgContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  img {
    @media all and (min-width: 320px) {
      max-width: 250px;
      max-height: 450px;
    }
    @media all and (min-width: 1024px) {
      max-width: 300px;
      max-height: 500px;
    }
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
      position: relative;
      border-radius: 10px;
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
    display: block;
    padding: 4rem;
    color: ${(props) => props.theme.textColor};
  }
  .filePlaceholder::before {
    content: "Drag & Drop a File Here";
    position: absolute;
    top: 10%;
    left: 25%;
    @media all and (min-width: 320px) {
      top: 10%;
      left: 20%;
    }
    @media all and (min-width: 1024px) {
      top: 10%;
      left: 25%;
    }
  }
  .fileBtn {
    display: block;
    position: absolute;
    cursor: pointer;
    top: 40%;
    left: 30%;
    @media all and (min-width: 320px) {
      top: 40%;
      left: 26%;
    }
    @media all and (min-width: 1024px) {
      top: 40%;
      left: 30%;
    }
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
