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
  padding-bottom: 5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    animation: 0.5s up;
    animation-fill-mode: forwards;
    @keyframes up {
      from {
        transform: translate(0, 0);
        opacity: 1;
      }
      to {
        transform: translate(0, -30px);
        opacity: 0;
      }
    }
  }
  .animateStart {
    animation: 0.5s ease-in down;
    @keyframes down {
      from {
        transform: translate(0, -30px);
        opacity: 0;
      }

      to {
        transform: translate(0, 0);
        opacity: 1;
      }
    }
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

export const IntroContainer = styled.div`
  display: flex;
  img {
    height: 60px;
    width: 60px;
    cursor: pointer;
  }
  Button {
    margin-left: 0.5rem;
    padding: 0 2rem;
  }
`;

export const DiaryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 600px;
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
