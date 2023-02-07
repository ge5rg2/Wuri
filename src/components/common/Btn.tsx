import palette from "../../styles/palette";
import styled from "styled-components";

interface BaseProps {
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Base = styled.button<BaseProps>`
  background-color: ${palette.blue[300]};
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  variant?: "text" | "contained" | "outlined";
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  name?: string;
}
const Btn: React.FC<Props> = ({
  children,
  variant,
  disabled,
  size,
  startIcon,
  endIcon,
  name,

  ...props
}) => {
  return (
    <Base
      name={name}
      variant={variant}
      disabled={disabled}
      size={size}
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
