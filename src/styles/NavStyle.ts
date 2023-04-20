import styled from "styled-components";
import palette from "./palette";

export const Wraper = styled.div`
  width: 100%;
  position: fixed;
  height: 3rem;
  top: 0;
  z-index: 5;
  background-color: ${(props) => props.theme.bgColor};
`;

export const SubContainer = styled.div`
  @media all and (min-width: 320px) {
    position: absolute;
    top: 2.8rem;
    width: 100%;
    background-color: ${(props) => props.theme.bgColor};
    .subNavDiv {
      cursor: pointer;
      margin: 0.7rem 0;
      width: 6rem;
      transition: all ease-in-out 0.3s;
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.5rem;
      }
      &:hover {
        color: rgba(16, 163, 127);
      }
    }
  }

  @media all and (min-width: 1024px) {
    top: 50px;
    border: 1px solid #fff;
    padding: 20px;
    position: absolute;
    width: 200px;
    .subNavDiv {
      border: 1px solid #fff;
      cursor: pointer;
      padding: 30px;
      margin: 30px 0;
    }
  }
`;

export const MainContainer = styled.div`
  position: relative;
  left: 10px;
  display: flex;
  img {
    width: 100px;
    cursor: pointer;
  }
  .animateEnd {
    animation: 0.5s up;
    animation-fill-mode: forwards;
    pointer-events: none;
    @keyframes up {
      from {
        transform: translate(0, 0);
        opacity: 1;
      }
      to {
        transform: translate(0, -20px);
        opacity: 0;
      }
    }
  }
  .animateStart {
    animation: 0.3s ease-in down;
    @keyframes down {
      from {
        transform: translate(0, -20px);
        opacity: 0;
      }

      to {
        transform: translate(0, 0);
        opacity: 1;
      }
    }
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;
