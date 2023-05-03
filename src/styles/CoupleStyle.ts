import styled from "styled-components";
import palette from "./palette";

export const MainContainer = styled.div`
  padding-top: 4rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const SubContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5rem;
  width: 350px;
  img {
    border-radius: 50%;
  }
  .MuiPaginationItem-text {
    color: ${(props) => props.theme.textColor};
  }
  .Nodata__box {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
  }

  .animateDisplay {
    display: none;
  }

  .animateEnd {
    animation: 0.3s up;
    animation-fill-mode: forwards;
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

export const IntroContainer = styled.div`
  display: flex;
  position: relative;
  img {
    height: 60px;
    width: 60px;
    cursor: pointer;
  }
  Button {
    margin-left: 0.5rem;
    padding: 0 2rem;
  }

  .OwnerImg {
    z-index: 2;
    position: absolute;
    left: -1.5rem;
  }
`;

export const ConnectContainer = styled.div`
  padding-bottom: 3rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  button {
    width: 100%;
  }
  input {
    padding: 1rem;
    margin-bottom: 0.5rem;
  }
  h1 {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: 550;
  }
`;

export const CalendarIcon = styled.div`
  margin: 0.5rem 0;
  width: 90%;
  display: flex;
  justify-content: flex-end;
  .calendarIcon__box {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    &:hover {
      color: ${palette.defaultColor};
    }
  }
`;

export const CoupleDiaryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 600px;
`;
