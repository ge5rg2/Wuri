import styled from "styled-components";
import palette from "./palette";

export const Wraper = styled.div`
  position: absolute;
  left: 0;
`;

export const SubContainer = styled.div`
  position: absolute;
  border: 1px solid #fff;
  padding: 20px;
  .subNavDiv {
    padding: 30px;
  }
`;

export const MainContainer = styled.div`
  img {
    height: 25%;
    width: 25%;
    cursor: pointer;
  }
`;
