import styled from "styled-components";
import palette from "./palette";

export const Wraper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 0;
`;

export const SubContainer = styled.div`
  top: 50px;
  border: 1px solid #fff;
  padding: 20px;
  position: absolute;
  .subNavDiv {
    border: 1px solid #fff;
    cursor: pointer;
    padding: 30px;
    margin: 30px 0;
  }
`;

export const MainContainer = styled.div`
  position: relative;
  left: 10px;
  display: flex;
  img {
    height: 10%;
    width: 10%;
    cursor: pointer;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;
