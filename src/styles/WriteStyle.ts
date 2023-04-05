import styled from "styled-components";
import palette from "./palette";

export const MainContainer = styled.div`
  padding-top: 3rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SubContainer = styled.div`
  margin: 0 auto;
  form {
    display: flex;
    flex-direction: column;
  }
  img {
    border-radius: 50%;
  }
`;
