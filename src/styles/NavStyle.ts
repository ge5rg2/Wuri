import styled from "styled-components";
import palette from "./palette";

export const Wraper = styled.div``;
export const MainContainer = styled.div`
  padding: 1.5rem 16rem;
  background-color: #ffff;
  img {
    max-width: 108px;
    cursor: pointer;
  }
`;

export const SubContainer = styled.div`
  background-color: #1e2443;
  .subNav {
    margin: 0 15rem;
    display: flex;
    .subNavDiv {
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 50px;
      padding: 1.2rem;
      cursor: pointer;
      :hover {
        background-color: ${palette.gray[600]};
      }
    }
  }
`;
