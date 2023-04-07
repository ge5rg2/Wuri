import styled from "styled-components";
import palette from "./palette";

export const MainContainer = styled.div`
  padding-top: 3rem;
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
  img {
    border-radius: 50%;
  }
`;

export const UploadImgContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid ${palette.gray[400]};
`;

export const UploadBtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  input {
    padding: 1rem;
  }
  #file {
    display: none;
  }
  #dropzone {
    border: 1px solid ${palette.gray[400]};
    &:hover {
      border: 1px solid ${palette.gray[200]};
    }
  }
  .upload {
    cursor: pointer;
    text-align: center;
    label {
      cursor: pointer;
      display: block;
      padding: 2rem;

      color: ${palette.gray[400]};
      &:hover {
        color: ${palette.gray[200]};
      }
    }
  }
`;
