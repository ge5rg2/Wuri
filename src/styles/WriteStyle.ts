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
  form {
    display: flex;
    flex-direction: column;
  }
  img {
    border-radius: 50%;
  }
`;
