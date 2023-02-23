import styled from "styled-components";
import palette from "./palette";

export const Wraper = styled.div`
  position: absolute;
  left: 0;
`;

export const SubContainer = styled.div`
  img {
    height: 50px;
    cursor: pointer;
  }
  .subNav {
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
