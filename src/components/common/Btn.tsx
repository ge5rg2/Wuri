import palette from "../../styles/palette";
import styled from "styled-components";
import { css } from "styled-components";

interface BaseProps {
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  ButtonType?: "Critical" | "Default" | "Emphasized";
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const getButtonType = (ButtonType?: "Critical" | "Default" | "Emphasized") => {
  switch (ButtonType) {
    case "Default":
      return css`
        background-color: #30363d;
        border: 1px solid ${palette.gray[400]};
        &:hover {
          border: 1px solid ${palette.gray[200]};
        }
      `;
    case "Emphasized":
      return css`
        background-color: rgba(16, 163, 127);
        &:hover {
          background-color: #1a7f64;
        }
      `;
    case "Critical":
      return css`
        background-color: ${palette.red[600]};
        &:hover {
          background-color: ${palette.red[800]};
        }
      `;
    default:
      return css`
        background-color: ${(props) => props.theme.accentColor};
      `;
  }
};

const getButtonSize = (size?: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return css`
        height: 2rem; // 36px
        padding: 0.5rem 1.2rem; // 8px 19.2px
        font-size: 0.75rem; // 12px
      `;
    case "medium":
      return css`
        height: 2.5rem; // 40px
        padding: 0.625rem 1.5rem; // 10px 24px
        font-size: 0.875rem; // 14px
      `;
    case "large":
      return css`
        height: 3rem; // 48px
        padding: 0.75rem 1.8rem; // 12px 28.8px
        font-size: 1rem; // 16px
      `;
  }
};

const Base = styled.button<BaseProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  color: ${(props) => props.theme.textColor};
  font-weight: 500;
  border-radius: 10px;
  background: none;
  border: none;
  transition: all ease-in-out 0.3s;
  cursor: pointer;

  ${({ ButtonType }) => getButtonType(ButtonType)};
  ${({ size }) => getButtonSize(size)};
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  variant?: "text" | "contained" | "outlined";
  ButtonType?: "Critical" | "Default" | "Emphasized";
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}
const Btn: React.FC<Props> = ({
  children,
  variant,
  disabled,
  ButtonType,
  size,
  startIcon,
  endIcon,

  ...props
}) => {
  return (
    <Base
      variant={variant}
      disabled={disabled}
      size={size}
      ButtonType={ButtonType}
      startIcon={startIcon}
      endIcon={endIcon}
      {...props}
    >
      {children}
    </Base>
  );
};

export default Btn;
//  {...props} 지정을 해야 function 기능 작동
