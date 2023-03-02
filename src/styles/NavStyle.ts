import styled from "styled-components";
import palette from "./palette";

export const Wraper = styled.div`
  position: absolute;
  left: 10px;
`;

export const SubContainer = styled.div`
  position: absolute;
  top: 50px;
  border: 1px solid #fff;
  padding: 20px;
  .subNavDiv {
    border: 1px solid #fff;
    cursor: pointer;
    padding: 30px;
    margin: 30px 0;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  img {
    height: 25%;
    width: 25%;
    cursor: pointer;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;
