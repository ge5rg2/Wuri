import styled from "styled-components";
import palette from "./palette";

export const Subtitle = styled.div`
  margin: 1rem 0 0.5rem 0;
  text-align: start;
`;

export const MainContainer = styled.div`
  padding-top: 4rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const SubContainer = styled.div`
  margin: 0 auto;
  width: 350px;
`;

export const UploadImgContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  img {
    max-width: 300px;
    max-height: 500px;
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
    display: block;
    padding: 4rem;
    color: ${palette.gray[400]};
  }
  .filePlaceholder::before {
    content: "Drag & Drop a File Here";
    position: absolute;
    top: 10%;
    left: 25%;
  }
  .fileBtn {
    display: block;
    position: absolute;
    cursor: pointer;
    top: 40%;
    left: 30%;
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
