import styled from "styled-components";
import palette from "./palette";

export const MainContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SubContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  img {
    border-radius: 50%;
  }
`;

export const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;
