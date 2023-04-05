import styled from "styled-components";
import palette from "./palette";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export const SubContainer = styled.div`
  margin: 0 auto;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .greetingContainer {
    text-align: center;
    div {
      padding: 0 0 1rem 0;
    }
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 50%;
  }
`;

export const BtnContianer = styled.div`
  display: flex;
  justify-content: center;
  .BtnContianer_Sub {
    padding: 0 0.5rem;
  }
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 300px;
  .AuthImgContainer {
    display: flex;
    justify-content: center;
    .AuthImgBox {
      top: 1rem;
      position: fixed;
      display: flex;
      justify-content: center;
      img {
        width: 50%;
      }
    }
  }
  .div_divider {
    text-align: center;
    padding-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    border: none;
    font-size: 12px;
    font-weight: 500;
    margin: 0;
    padding: 24px 0 0;
    span {
      flex: 0.2 0 auto;
      margin: 0;
    }
  }
  .div_divider:before {
    content: "";
    border-bottom: 1px solid #c2c8d0;
    flex: 1 0 auto;
    height: 0.5em;
    margin: 0;
  }
  .div_divider:after {
    content: "";
    border-bottom: 1px solid #c2c8d0;
    flex: 1 0 auto;
    height: 0.5em;
    margin: 0;
  }
`;

export const AuthHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 2rem;
    font-weight: 550;
  }
`;

export const AuthInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  input:first-child {
    margin-bottom: 0.5rem;
  }
`;

export const AuthPcontainer = styled.div`
  display: flex;
  justify-content: center;
  .a_SignUp {
    cursor: pointer;
    color: ${palette.defaultColor};
    &:hover {
      color: ${palette.defaultActionColor};
    }
  }
`;

export const AuthBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  Button {
    margin-top: 0.5rem;
  }
`;
